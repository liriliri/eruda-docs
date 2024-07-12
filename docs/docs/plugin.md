# Writing a Plugin

It is possible to enhance Eruda with more features by writing plugins, which means, creating your own custom panels.

## Creating a Plugin

Adding plugins is super easy for eruda. All you have to do is passing an object with a few methods implemented.

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

## Basic Structure

### name

Every plugin must have a unique name, which will be shown as the tab name on the top.

### init

Called when plugin is added, and a document element used to display content is passed in.

The element is wrapped as a jQuery like object, provided by the [licia](https://licia.liriliri.io/docs.html) utility library.

### show

Called when switch to the panel. Usually all you need to do is to show the container element.

### hide

Called when switch to other panel. You should at least hide the container element here.

### destroy

Called when plugin is removed using `eruda.remove('plugin name')`.

## Worth Mentioning

Apart from passing an object, you can also pass in a function that returns an object. Eruda will automatically invoke the function and use the object it returns.

```javascript
eruda.add(function (eruda) {
    // eruda.Tool implements those four methods.
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

There is also a tool for plugin initialization, check it out [here](https://github.com/liriliri/eruda-plugin).

## Utility

When writing plugins, you can use utilities exposed by Eruda.

### evalCss

Load css into page.

|Name  |Desc         |
|------|-------------|
|css   |Css code     |
|return|Style element|

```javascript
evalCss('body{background:#08c}');
```

### isErudaEl

Check if value is eruda container element.

|Name  |Desc                                    |
|------|----------------------------------------|
|val   |Value to check                          |
|return|True if value is eruda container element|

```javascript
isErudaEl(document.body); // -> false
```

### getTheme

Get current theme name.

```javascript
getTheme(); // -> 'Light'
```

### isDarkTheme

Check eruda is using a dark theme.

|Name  |Desc                         |
|------|-----------------------------|
|theme |Theme name                   |
|return|True if theme is a dark theme|

```javascript
isDarkTheme('Dark'); // -> true
```