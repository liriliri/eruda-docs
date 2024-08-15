# Introduction

![screenshot](/screenshot.jpg)

## Demo

![Demo](/qrcode.png)

Browse it on your phone: [https://eruda.liriliri.io/](https://eruda.liriliri.io/)

In order to try it for different sites, execute the script below on browser address bar.

```javascript
javascript:(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/npm/eruda"; document.body.append(script); script.onload = function () { eruda.init(); } })();
```

## Features

* [Console](/docs/api.md#console): Display JavaScript logs.
* [Elements](/docs/api.md#elements): Check dom state.
* [Network](/docs/api.md#network): Show requests status.
* [Resources](/docs/api.md#resources): Show localStorage, cookie information.
* [Info](/docs/api.md#info): Show url, user agent info.
* [Snippets](/docs/api.md#snippets): Include snippets used most often.
* [Sources](/docs/api.md#sources): Html, js, css source viewer.

## Install

You can get it on npm.

```bash
npm install eruda --save
```

Add this script to your page.

```html
<script src="node_modules/eruda/eruda.js"></script>
<script>eruda.init();</script>
```

It's also available on [jsDelivr](http://www.jsdelivr.com/projects/eruda) and [cdnjs](https://cdnjs.com/libraries/eruda).

```html
<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
```

The JavaScript file size is quite huge(about 100kb gzipped) and therefore not suitable to include in mobile pages. It's recommended to make sure eruda is loaded only when eruda is set to true on url(http://example.com/?eruda=true), for example:

```javascript
;(function () {
    var src = '//cdn.jsdelivr.net/npm/eruda';
    if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
})();
```

If you are using modern JavaScript tooling, you can dynamically import it.

```javascript
if (import.meta.env.MODE === 'development') {
    import('eruda').then(eruda => eruda.default.init());
}
```

## Configuration

When initialization, a configuration object can be passed in.

* container: Container element. If not set, it will append an element directly
under html root element.
* tool: Choose which default tools you want, by default all will be added.

For more information, please check the [documentation](/docs/api.md).

```javascript
let el = document.createElement('div');
document.body.appendChild(el);

eruda.init({
    container: el,
    tool: ['console', 'elements']
});
```

## Plugins

* [eruda-monitor](https://github.com/liriliri/eruda-monitor): Display page fps and memory.
* [eruda-features](https://github.com/liriliri/eruda-features): Browser feature detections.
* [eruda-timing](https://github.com/liriliri/eruda-timing): Show performance and resource timing.
* [eruda-code](https://github.com/liriliri/eruda-code): Run JavaScript code.
* [eruda-benchmark](https://github.com/liriliri/eruda-benchmark): Run JavaScript benchmarks.
* [eruda-geolocation](https://github.com/liriliri/eruda-geolocation): Test geolocation.
* [eruda-orientation](https://github.com/liriliri/eruda-orientation): Test orientation api.
* [eruda-touches](https://github.com/liriliri/eruda-touches): Visualize screen touches.
* [eruda-vue](https://github.com/liriliri/eruda-vue): Vue devtools.

If you want to create a plugin yourself, follow the guides [here](/docs/plugin.md).