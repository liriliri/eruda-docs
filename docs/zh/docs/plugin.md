# 插件开发 

通过编写插件，可以为 Eruda 创建自定义面板，增加更多功能。

## 创建插件 

为 Eruda 添加插件非常简单，你只需要传递一个实现了几个方法的对象。

```javascript
eruda.add({
    name: 'test',
    init($el) {
        $el.html('Hello, this is my first eruda plugin!');
        this._$el = $el;
    },
    show() {
        this._$el.show();
    },
    hide() {
        this._$el.hide();
    },
    destroy() {}
});
```

## 基本结构

### name

每个插件必须有一个唯一的名称，这个名称将显示在顶部的标签上。

### init

该方法在插件被添加时调用，并传入一个用于显示内容的元素节点。

该元素被包装成一个类似 jQuery 的对象，由 [licia](https://licia.liriliri.io/docs.html) 工具库提供。

### show

该方法在切换到该面板时调用，通常只需要显示容器节点。

### hide

该方法在切换到其他面板时调用，你至少应该在这里隐藏容器节点。

### destroy

在调用 `eruda.remove('plugin name')` 移除插件时调用。

## 值得一提

除了传递一个对象，你还可以传递一个返回对象的函数，Eruda 会自动调用该函数并使用它返回的对象。

```javascript
eruda.add(function (eruda) {
    // eruda.Tool 实现了这四个方法。
    class Test extends eruda.Tool {
        constructor() {
            super()
            this.name = 'test';
            this.style = eruda.util.evalCss('.eruda-test { background: #000; }');
        }
        init($el) {
            super.init($el);
        }
        destroy() {
            super.destroy();
            eruda.util.evalCss.remove(this.style);
        }
    }

    return new Test();
});
```

Eruda 还提供了一个用于插件初始化的工具，可以点击[这里](https://github.com/liriliri/eruda-plugin)查看。

## 工具函数

在编写插件时，你可以使用 Eruda 提供的工具函数。

### evalCss

将 CSS 加载到页面中。

|参数名|说明|
|-----|---|
|css|CSS 代码|
|返回值|样式元素|

```javascript
evalCss('body{background:#08c}');
```

### isErudaEl

检查值是否为 Eruda 容器下的元素节点。

|参数名|说明|
|-----|---|
|val|要检查的值|
|返回值|如果值是 Eruda 容器下元素节点则为 true|

```javascript
isErudaEl(document.body); // -> false
```

### getTheme

获取当前主题名称。

```javascript
getTheme(); // -> 'Light'
```

### isDarkTheme

检查 Eruda 是否使用了暗色主题。

|参数名|说明|
|-----|---|
|theme|主题名称|
|返回值|如果主题是暗色主题则为 true|

```javascript
isDarkTheme('Dark'); // -> true
```