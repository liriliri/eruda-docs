# API

## Eruda 实例 

### init

初始化 Eruda。

#### 选项

|参数名|类型|说明|
|-----|---|---|
|container|element|容器元素节点，如果未设置，它会直接在 HTML 根元素下添加一个元素|
|tool|string array|选择你想要的默认面板，默认情况下会添加所有面板|
|autoScale=true|boolean|为不同的视窗设置自动缩放 Eruda|
|useShadowDom=true|boolean|使用 Shadow DOM 进行 CSS 隔离|
|inline=false|boolean|开启后会移除入口按钮，并将窗口直接渲染到指定的节点中|
|defaults|object|默认设置|

可用的默认设置：

|参数名|类型|说明|
|-----|---|---|
|transparency|number|透明度，范围从 0 到 1|
|displaySize |number|显示大小，范围从 0 到 100|
|theme|string|主题，默认为 Light，暗黑模式下为 Dark|

```javascript
const el = document.createElement('div');
document.body.appendChild(el);

eruda.init({
    container: el,
    tool: ['console', 'elements'],
    useShadowDom: true,
    autoScale: true,
    defaults: {
        displaySize: 50,
        transparency: 0.9,
        theme: 'Monokai Pro'
    }
});
```

### destroy

销毁 Eruda。

注意：销毁后可以再次调用 **init** 方法。

```javascript
eruda.destroy();
```

### scale

设置或获取缩放比例。

```javascript
eruda.scale(); // -> 1
eruda.scale(1.5);
```

### position

设置或获取入口按钮的位置。

如果给定的位置超出视窗范围，将不会生效。

```javascript
eruda.position({x: 20, y: 20});
eruda.position(); // -> {x: 20, y: 20}
```

### get

获取面板实例，例如日志、元素面板。

```javascript
let console = eruda.get('console');
console.log('eruda');
```

### add

添加面板。

```javascript
eruda.add(new (eruda.Tool.extend({
    name: 'test'
})));

eruda.add(eruda.Network);
```

### remove

移除面板。

```javascript
eruda.remove('console');
```

### show

显示 Eruda 面板。

```javascript
eruda.show();
eruda.show('console');
```

### hide

隐藏 Eruda 面板。

```javascript
eruda.hide();
```

## Console

显示控制台日志。实现细节遵循 [console api 规范](https://console.spec.whatwg.org/)。

### 配置项

|参数名|类型|说明|
|-----|---|---|
|asyncRender|boolean|异步渲染|
|jsExecution|boolean|启用 JavaScript 执行|
|catchGlobalErr|boolean|捕获全局错误|
|overrideConsole|boolean|劫持 console 对象|
|displayExtraInfo|boolean|显示额外信息|
|displayUnenumerable|boolean|显示不可枚举属性|
|displayGetterVal|boolean|访问 getter 值|
|lazyEvaluation|boolean|点击时遍历对象|
|displayIfErr|boolean|如果发生错误自动显示|
|maxLogNum|string|最大日志数量|

```javascript
let console = eruda.get('console');
console.config.set('catchGlobalErr', true);
```

### log, error, info, warn, dir, time/timeLog/timeEnd, clear, count/countReset, assert, table, group/groupCollapsed/groupEnd

所有这些方法都可以像 window.console 对象一样使用。

注意：调用时会触发相应的事件。

```javascript
let console = eruda.get('console');
console.log('eruda is a console for %s.', 'mobile browsers');
console.table([{test: 1}, {test: 2}, {test2: 3}], 'test');
console.error(new Error('eruda'));
console.on('log', function () 
{
    // 做任何你想做的事，发送到服务器或保存到本地存储。
});
```

### filter

过滤日志。

|参数名|类型|说明|
|-----|---|---|
|filter|string regexp function|自定义过滤器|

```javascript
console.filter('eruda');
console.filter(/^eruda/);
console.filter(function (log)
{
    return log.type === 'error';
});
```

### html

输出 HTML。

|参数名|类型|说明|
|-----|---|---|
|html|string|HTML 字符串|

```javascript
console.html('<span style="color:red">Red</span>');
```

## Elements

检查 DOM 元素状态。

### 配置项

|参数名|类型|说明|
|-----|---|---|
|overrideEventTarget|boolean|捕获事件监听器|
|observeElement|boolean|自动刷新|

### select

选择要显示的节点。

|参数名|类型|说明|
|-----|---|---|
|node|ChildNode|要选择的节点|

```javascript
elements.select(document.body);
```

## Network

显示网络请求。

### clear

清除所有请求数据。

### requests

获取请求数据。

```javascript
network.clear();
```

## Resources

LocalStorage、sessionStorage、cookies、脚本、样式表和图片。

### 配置项

|参数名|类型|说明|
|-----|---|---|
|hideErudaSetting|boolean|隐藏 Eruda 设置|

## Sources

查看对象、HTML、JS 和 CSS。

### 配置项 

|参数名|类型|说明|
|-----|---|---|
|showLineNum|boolean|显示行号|

## Info

显示指定信息，可用于显示用户信息以跟踪用户日志。

默认情况下，显示页面 URL 和浏览器用户代理。

### clear

清除信息。

### add

添加信息。

|参数名|类型|说明|
|-----|---|---|
|name|string|信息名称|
|content|string function|信息内容|

```javascript
info.add('title', 'content');
info.add('location', () => location.href);
```

### get

获取信息或信息列表。

|参数名|类型|说明|
|-----|---|---|
|name|string|信息名称|
|返回值|string function|信息内容|

```javascript
info.add('title', 'content')
info.get(); // -> [{name: 'title', val: 'content'}]
info.get('title') // -> 'content'
```

### remove

移除指定信息。

|参数名|类型|说明|
|-----|---|---|
|name|string|信息名称|

```javascript
info.remove('title');
```

## Snippets

注册可以多次触发的代码片段。

### clear

清除代码片段。

### add

添加代码片段。

|参数名|类型|说明|
|-----|---|---|
|name|string|代码片段名称|
|fn|function|要触发的函数|
|desc|string|代码片段描述|

### remove

移除指定代码片段。

|参数名|类型|说明|
|-----|---|---|
|name|string|代码片段名称|

### run

运行指定代码片段。

|参数名|类型|说明|
|-----|---|---|
|name|string|代码片段名称|

```javascript
snippets.add('hello', function ()
{
    console.log('Hello World!');
}, 'Display hello on console');

snippets.run('hello');
snippets.remove('hello');
```

## Settings

所有面板的设置。

### clear

清除所有设置。

### remove

移除设置。

|参数名|类型|说明|
|-----|---|---|
|cfg|object|配置对象|
|name|string|选项名称|

### text

添加文本。

|参数名|类型|说明|
|-----|---|---|
|str|string|要显示的文本|

### switch

添加开关以切换布尔值。

|参数名|类型|说明|
|-----|---|---|
|cfg|object|配置对象|
|name|string|选项名称|
|desc|string|选项描述|

### select

添加选择框以选择多个字符串值。

|参数名|类型|说明|
|-----|---|---|
|cfg|object|配置对象|
|name|string|选项名称|
|desc|string|选项描述|
|values|array|要选择的字符串数组|

### range

添加范围输入以输入一个数字。

|参数名|类型|说明|
|-----|---|---|
|cfg|object|配置对象|
|name|string|选项名称|
|desc|string|选项描述|
|option|object|最小值、最大值、步长|

### separator

添加一个分隔符。

```javascript
import defaults from 'licia/defaults';

let cfg = eruda.Settings.createCfg('test');

cfg.set(defaults(cfg.get(), {
    testBool: true,
    testSelect: 'select1',
    testRange: 1
}));

settings.text('Test')
        .switch(cfg, 'testBool', 'Test Bool')
        .select(cfg, 'testSelect', 'Test Select', ['select1', 'select2'])
        .range(cfg, 'testRange', 'Test Range', {min: 0, max: 1, step: 0.1})
        .separator();

settings.remove(cfg, 'testBool')        
```
