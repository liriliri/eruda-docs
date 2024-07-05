# API

## Eruda Instance

### init

Initialize eruda.

#### Options

|Name             |Type        |Desc                                                                                     |
|-----------------|------------|-----------------------------------------------------------------------------------------|
|container        |element     |Container element. If not set, it will append an element directly under html root element|
|tool             |string array|Choose which default tools you want, by default all will be added                        |
|autoScale=true   |boolean     |Auto scale eruda for different viewport settings                                         |
|useShadowDom=true|boolean     |Use shadow dom for css encapsulation                                                     |
|defaults         |object      |Default settings                                                                         |

Available default settings:

|Name        |Type  |Desc                                         |
|------------|------|---------------------------------------------|
|transparency|number|Transparency, 0 to 1                         |
|displaySize |number|Display size, 0 to 100                       |
|theme       |string|Theme, defaults to Light or Dark in dark mode|

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

Destory eruda. 

Note: You can call **init** method again after destruction.

```javascript
eruda.destroy();
```

### scale

Set or get scale.

```javascript
eruda.scale(); // -> 1
eruda.scale(1.5);
```

### position

Set or get entry button position.

It will not take effect if given pos is out of range.

```javascript
eruda.position({x: 20, y: 20});
eruda.position(); // -> {x: 20, y: 20}
```

### get

Get tool, eg. console, elements panels.

```javascript
let console = eruda.get('console');
console.log('eruda');
```

### add

Add tool.

```javascript
eruda.add(new (eruda.Tool.extend({
    name: 'test'
})));

eruda.add(eruda.Network);
```

### remove

Remove tool.

```javascript
eruda.remove('console');
```

### show

Show eruda panel.

```javascript
eruda.show();
eruda.show('console');
```

### hide

Hide eruda panel.

```javascript
eruda.hide();
```

## Console

Display console logs. Implementation detail follows the [console api spec](https://console.spec.whatwg.org/).

### Config

|Name               |Type   |Desc                           |
|-------------------|-------|-------------------------------|
|asyncRender        |boolean|Asynchronous rendering         |
|jsExecution        |boolean|Enable JavaScript execution    |
|catchGlobalErr     |boolean|Catch global errors            |
|overrideConsole    |boolean|Override console               |
|displayExtraInfo   |boolean|Display extra information      |
|displayUnenumerable|boolean|Display unenumerable properties|
|displayGetterVal   |boolean|Access getter value            |
|lazyEvaluation     |boolean|Stringify object when clicked  |
|displayIfErr       |boolean|Auto display if error occurs   |
|maxLogNum          |string |Max log number                 |

```javascript
let console = eruda.get('console');
console.config.set('catchGlobalErr', true);
```

### log, error, info, warn, dir, time/timeLog/timeEnd, clear, count/countReset, assert, table, group/groupCollapsed/groupEnd

All these methods can be used in the same way as window.console object. 

Note: When called, a corresponding event is triggered.

```javascript
let console = eruda.get('console');
console.log('eruda is a console for %s.', 'mobile browsers');
console.table([{test: 1}, {test: 2}, {test2: 3}], 'test');
console.error(new Error('eruda'));
console.on('log', function () 
{
    // Do whatever you want, send to server or save on local storage.
});
```

### filter

Filter logs.

|Name  |Type                  |Desc         |
|------|----------------------|-------------|
|filter|string regexp function|Custom filter|

```javascript
console.filter('eruda');
console.filter(/^eruda/);
console.filter(function (log)
{
    return log.type === 'error';
});
```

### html

Log out html content.

|Name|Type  |Desc       |
|----|------|-----------|
|html|string|Html string|

```javascript
console.html('<span style="color:red">Red</span>');
```

## Elements

Check dom element status.

### Config

|Name               |Type   |Desc                 |
|-------------------|-------|---------------------|
|overrideEventTarget|boolean|Catch Event Listeners|
|observeElement     |boolean|Auto Refresh         |

### select

Select node to show.

|Name|Type     |Desc               |
|----|---------|-------------------|
|node|ChildNode|Node to be selected|

```javascript
elements.select(document.body);
```

## Network

Display requests.

### clear

Clear requests.

### requests

Get request data.

```javascript
network.clear();
```

## Resources

LocalStorage, sessionStorage, cookies, scripts, styleSheets and images.

### Config

|Name            |Type   |Desc                 |
|----------------|-------|---------------------|
|hideErudaSetting|boolean|Hide Eruda Setting   |

## Sources

View object, html, js, and css.

### Config

|Name       |Type   |Desc             |
|-----------|-------|-----------------|
|showLineNum|boolean|Show Line Numbers|
|formatCode |boolean|Beautify Code    |
|indentSize |string |Indent Size      |

## Info

Display special information, could be used for displaying user info to track
user logs.

By default, page url and browser user agent is shown.

### clear

Clear infos.

### add

Add info.

|Name   |Type           |Desc        |
|-------|---------------|------------|
|name   |string         |Info name   |
|content|string function|Info content|

```javascript
info.add('title', 'content');
info.add('location', () => location.href);
```

### get

Get info or infos.

|Name  |Type           |Desc        |
|------|---------------|------------|
|name  |string         |Info name   |
|return|string function|Info content|

```javascript
info.add('title', 'content')
info.get(); // -> [{name: 'title', val: 'content'}]
info.get('title') // -> 'content'
```

### remove

Remove specified info.

|Name|Type  |Desc     |
|----|------|---------|
|name|string|Info name|

```javascript
info.remove('title');
```

## Snippets

Allow you to register small functions that can be triggered multiple times.

### clear

Clear snippets.

### add

Add snippet.

|Name|Type    |Desc                    |
|----|--------|------------------------|
|name|string  |Snippet name            |
|fn  |function|Function to be triggered|
|desc|string  |Snippet description     |

### remove

Remove specified snippet.

|Name|Type  |Desc             |
|----|------|-----------------|
|name|string|Snippet to remove|

### run

Run specified snippet.

|Name|Type  |Desc          |
|----|------|--------------|
|name|string|Snippet to run|

```javascript
snippets.add('hello', function ()
{
    console.log('Hello World!');
}, 'Display hello on console');

snippets.run('hello');
snippets.remove('hello');
```

## Settings

Customization for all tools.

### clear

Clear settings.

### remove

Remove setting.

|Name|Type  |Desc         |
|----|------|-------------|
|cfg |object|Config object|
|name|string|Option name  |

### text

Add text.

|Name|Type  |Desc             |
|----|------|-----------------|
|str |string|String to display|

### switch

Add switch to toggle a boolean value.

|Name|Type  |Desc                                   |
|----|------|---------------------------------------|
|cfg |object|Config object created by util.createCfg|
|name|string|Option name                            |
|desc|string|Option description                     |

### select

Add select to select a number of string values.

|Name  |Type  |Desc                      |
|------|------|--------------------------|
|cfg   |object|Config object             |
|name  |string|Option name               |
|desc  |string|Option description        |
|values|array |Array of strings to select|

### range

Add range to input a number.

|Name  |Type  |Desc              |
|------|------|------------------|
|cfg   |object|Config object     |
|name  |string|Option name       |
|desc  |string|Option description|
|option|object|Min, max, step    |

### separator

Add a separator.

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
