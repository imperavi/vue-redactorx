# Redactor X Vue.js Component

Vue-redactorx helps [Redactor X](https://imperavi.com/redactorx/) to work as a Vue.js component. The Redactor X Vue component is under MIT license. 
However, to use this component, you should purchase a Redactor X license. 

Please see [the buying page](https://imperavi.com/redactorx/buy/) and [License Agreement](https://imperavi.com/redactorx/license/).

## Compatibility

- Vue.js 2.x

## Intialization

### One Way Binding

Import

```html
import '/your-dist-path/redactorx.min.js';
import './vue-redactorx.js';
```

Component

```html
<div id="app">
    <RedactorX v-model="content" :config="configOptions"></RedactorX>
    {{ content }}
</div>
```

App

```js
new Vue({
    el: '#app',
    data() {
        return {
            content: '<h1>Hello and welcome</h1>',
            configOptions: {}
        }
    }
});
```

### Two Way Binding

Import

```html
import '/your-dist-path/redactorx.min.js';
import './vue-redactorx.js';
```

Component

```html
<div id="app">
    <RedactorX v-model="content" :config="configOptions"></RedactorX>
    <textarea v-model="content"></textarea>
</div>
```

App

```js
new Vue({
    el: '#app',
    data() {
        return {
            content: '<h1>Hello and welcome</h1>',
            configOptions: {}
        }
    }
});
```

### Call with options

```js
new Vue({
    el: '#app',
    data() {
        return {
            content: '<h1>Hello and welcome</h1>',
            configOptions: {
                plugins: ['table']
            }
        }
    }
});
```
