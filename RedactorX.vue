<template>
  <textarea ref="redactorx" :name="name" :placeholder="placeholder" />
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    config: {
      default: {},
      type: Object,
    },
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    init() {
      var me = this
      var subscribe = {
        "editor.change": function (event) {
          var html = event.get("html")
          me.handleInput(html)
          return html
        },
      }

      // extend config
      if (typeof this.config.subscribe === "undefined") {
        this.config.subscribe = subscribe
      } else {
        this.config.subscribe["editor.change"] = subscribe["editor.change"]
      }

      // call Redactor X
      var app = RedactorX(this.$refs.redactorx, this.config)

      // set instance
      this.redactorx = app
      this.$parent.redactorx = app
    },
    destroy() {
      // Call destroy on redactor to cleanup event handlers
      RedactorX(this.$refs.redactorx, "destroy")

      // unset instance for garbage collection
      this.redactorx = null
      this.$parent.redactorx = null
    },
    handleInput(val) {
      this.$emit("update:modelValue", val)
    },
  },
}
</script>
