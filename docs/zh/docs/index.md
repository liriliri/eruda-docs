# 简介

![screenshot](/screenshot.jpg)

## Demo

![Demo](https://eruda.liriliri.io/img/qrcode.png)

请扫描二维码或在手机上直接访问：[https://eruda.liriliri.io/](https://eruda.liriliri.io/)

如果想在其它页面尝试，请在浏览器地址栏上输入以下代码。

```javascript
javascript:(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/npm/eruda"; document.body.append(script); script.onload = function () { eruda.init(); } })();
```

## 功能清单

1. 按钮拖拽，面板透明度大小设置。

2. Console 面板：捕获 Console 日志，支持 log、error、info、warn、dir、time/timeEnd、clear、count、assert、table；支持占位符，包括 %c 自定义样式输出；支持按日志类型及正则表达式过滤；支持 JavaScript 脚本执行。

3. Elements 面板：查看标签内容及属性；查看应用在 Dom 上的样式；支持页面元素高亮；支持屏幕直接点击选取；查看 Dom 上绑定的各类事件。

4. Network 面板：捕获请求，查看发送数据、返回头、返回内容等信息。

5. Resources 面板：查看并清除 localStorage、sessionStorage 及 cookie；查看页面加载脚本及样式文件；查看页面加载图片。

6. Sources 面板：查看页面源码；格式化 html，css，js 代码及 json 数据。

7. Info 面板：输出 URL 及 User Agent；支持自定义输出内容。

8. Snippets 面板：页面元素添加边框；加时间戳刷新页面；支持自定义代码片段。

## 快速上手

通过CDN使用：

```html
<script src="//cdn.bootcdn.net/ajax/libs/eruda/2.3.3/eruda.js"></script>
<script>eruda.init();</script>
```

通过 npm 安装：

```bash
npm install eruda --save
```

在页面中加载脚本：

```html
<script src="node_modules/eruda/eruda.js"></script>
<script>eruda.init();</script>
```

JS 文件对于移动端来说略重（gzip 后大概 100kb）。建议通过 url 参数来控制是否加载调试器，比如：

```javascript
;(function () {
    var src = '//cdn.jsdelivr.net/npm/eruda';
    if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
})();
```

如果你使用的是现代 JavaScript 技术栈，可以像下边这样动态引入。

```javascript
if (import.meta.env.MODE === 'development') {
    import('eruda').then(eruda => eruda.default.init());
}
```

初始化时可以传入配置：
* container: 用于插件初始化的 Dom 元素，如果不设置，默认创建 div 作为容器直接置于 html 根结点下面。
* tool：指定要初始化哪些面板，默认加载所有。

```javascript
let el = document.createElement('div');
document.body.appendChild(el);

eruda.init({
    container: el,
    tool: ['console', 'elements'],
    useShadowDom: true
});
```

## 插件

* [eruda-monitor](https://github.com/liriliri/eruda-monitor): 展示页面的 fps 和内存信息。
* [eruda-features](https://github.com/liriliri/eruda-features)：浏览器特性检测。
* [eruda-timing](https://github.com/liriliri/eruda-timing)：展示性能资源数据。
* [eruda-code](https://github.com/liriliri/eruda-code)：运行 JavaScript 代码。
* [eruda-benchmark](https://github.com/liriliri/eruda-benchmark)：运行 JavaScript 性能测试。
* [eruda-geolocation](https://github.com/liriliri/eruda-geolocation)：测试地理位置接口。
* [eruda-orientation](https://github.com/liriliri/eruda-orientation)：测试重力感应接口。
* [eruda-touches](https://github.com/liriliri/eruda-orientation)：可视化屏幕 Touch 事件触发。
* [eruda-vue](https://github.com/liriliri/eruda-vue)：Vue 调试工具。

如果你想要自己编写插件，可以查看这里的[教程](/docs/plugin.md)。
