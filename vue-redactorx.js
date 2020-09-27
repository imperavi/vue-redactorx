/*
    Redactor X Vue Component
    Version 1.0
    Updated: September 27, 2020

    http://imperavi.com/redactorx/

    Copyright 2020, Imperavi Ltd.
    License: MIT
*/
Vue.component('Redactorx', {
    template: '<textarea ref="redactorx" :name="name" :placeholder="placeholder" :value="value" />',
    redactor: false,
    props: {
        value: {
            default: '',
            type: String
        },
        placeholder: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        config: {
            default: {},
            type: Object
        }
    },
    watch: {
        value (newValue, oldValue) {
            if (!this.redactorx.editor.isFocus()) {
                this.redactorx.app.$element.val(newValue);
            }
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.destroy()
    },
    methods: {
        init () {
            var me = this;
            var subscribe = {
                'editor.change': function(event) {
                    var html = event.get('html');
                    me.handleInput(html);
                    return html
                }
            };

            // extend config
            if (typeof this.config.subscribe === 'undefined') {
                Vue.set(this.config, 'subscribe', subscribe);
            }
            else {
                this.config.subscribe['editor.change'] = subscribe['editor.change'];
            }

            // call Redactor X
            var app = RedactorX(this.$refs.redactorx, this.config);

            // set instance
            this.redactorx = app;
            this.$parent.redactorx = app;
        },
        destroy () {
            // Call destroy on redactor to cleanup event handlers
            RedactorX(this.$refs.redactorx, 'destroy');

            // unset instance for garbage collection
            this.redactorx = null;
            this.$parent.redactorx = null;
        },
        handleInput (val) {
            this.$emit('input', val);
        }
    }
});
