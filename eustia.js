// Built by eustia.
window._ = (function()
{
    /* eslint-disable */

    var _ = {};

    if (typeof window === 'object' && window._) _ = window._;

    /* ------------------------------ isObj ------------------------------ */

    var isObj = _.isObj = (function (exports) {
        /* Check if value is the language type of Object.
         *
         * |Name  |Desc                      |
         * |------|--------------------------|
         * |val   |Value to check            |
         * |return|True if value is an object|
         *
         * [Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
         */

        /* example
         * isObj({}); // -> true
         * isObj([]); // -> true
         */

        /* typescript
         * export declare function isObj(val: any): boolean;
         */
        exports = function(val) {
            var type = typeof val;
            return !!val && (type === 'function' || type === 'object');
        };

        return exports;
    })({});

    /* ------------------------------ isUndef ------------------------------ */

    var isUndef = _.isUndef = (function (exports) {
        /* Check if value is undefined.
         *
         * |Name  |Desc                      |
         * |------|--------------------------|
         * |val   |Value to check            |
         * |return|True if value is undefined|
         */

        /* example
         * isUndef(void 0); // -> true
         * isUndef(null); // -> false
         */

        /* typescript
         * export declare function isUndef(val: any): boolean;
         */
        exports = function(val) {
            return val === void 0;
        };

        return exports;
    })({});

    /* ------------------------------ types ------------------------------ */

    var types = _.types = (function (exports) {
        /* Used for typescript definitions only.
         */

        /* typescript
         * export declare namespace types {
         *     interface Collection<T> {}
         *     interface List<T> extends Collection<T> {
         *         [index: number]: T;
         *         length: number;
         *     }
         *     interface ListIterator<T, TResult> {
         *         (value: T, index: number, list: List<T>): TResult;
         *     }
         *     interface Dictionary<T> extends Collection<T> {
         *         [index: string]: T;
         *     }
         *     interface ObjectIterator<T, TResult> {
         *         (element: T, key: string, list: Dictionary<T>): TResult;
         *     }
         *     interface MemoIterator<T, TResult> {
         *         (prev: TResult, curr: T, index: number, list: List<T>): TResult;
         *     }
         *     interface MemoObjectIterator<T, TResult> {
         *         (prev: TResult, curr: T, key: string, list: Dictionary<T>): TResult;
         *     }
         *     type Fn<T> = (...args: any[]) => T;
         *     type AnyFn = Fn<any>;
         *     type PlainObj<T> = { [name: string]: T };
         * }
         * export declare const types: {};
         */
        exports = {};

        return exports;
    })({});

    /* ------------------------------ isBrowser ------------------------------ */

    var isBrowser = _.isBrowser = (function (exports) {
        /* Check if running in a browser.
         */

        /* example
         * console.log(isBrowser); // -> true if running in a browser
         */

        /* typescript
         * export declare const isBrowser: boolean;
         */
        exports =
            typeof window === 'object' &&
            typeof document === 'object' &&
            document.nodeType === 9;

        return exports;
    })({});

    /* ------------------------------ toStr ------------------------------ */

    var toStr = _.toStr = (function (exports) {
        /* Convert value to a string.
         *
         * |Name  |Desc            |
         * |------|----------------|
         * |val   |Value to convert|
         * |return|Result string   |
         */

        /* example
         * toStr(null); // -> ''
         * toStr(1); // -> '1'
         * toStr(false); // -> 'false'
         * toStr([1, 2, 3]); // -> '1,2,3'
         */

        /* typescript
         * export declare function toStr(val: any): string;
         */
        exports = function(val) {
            return val == null ? '' : val.toString();
        };

        return exports;
    })({});

    /* ------------------------------ noop ------------------------------ */

    var noop = _.noop = (function (exports) {
        /* A no-operation function.
         */

        /* example
         * noop(); // Does nothing
         */

        /* typescript
         * export declare function noop(): void;
         */
        exports = function() {};

        return exports;
    })({});

    /* ------------------------------ has ------------------------------ */

    var has = _.has = (function (exports) {
        /* Checks if key is a direct property.
         *
         * |Name  |Desc                            |
         * |------|--------------------------------|
         * |obj   |Object to query                 |
         * |key   |Path to check                   |
         * |return|True if key is a direct property|
         */

        /* example
         * has({ one: 1 }, 'one'); // -> true
         */

        /* typescript
         * export declare function has(obj: {}, key: string): boolean;
         */
        var hasOwnProp = Object.prototype.hasOwnProperty;

        exports = function(obj, key) {
            return hasOwnProp.call(obj, key);
        };

        return exports;
    })({});

    /* ------------------------------ keys ------------------------------ */

    var keys = _.keys = (function (exports) {
        /* Create an array of the own enumerable property names of object.
         *
         * |Name  |Desc                   |
         * |------|-----------------------|
         * |obj   |Object to query        |
         * |return|Array of property names|
         */

        /* example
         * keys({ a: 1 }); // -> ['a']
         */

        /* typescript
         * export declare function keys(obj: any): string[];
         */

        /* dependencies
         * has 
         */

        if (Object.keys && !false) {
            exports = Object.keys;
        } else {
            exports = function(obj) {
                var ret = [];

                for (var key in obj) {
                    if (has(obj, key)) ret.push(key);
                }

                return ret;
            };
        }

        return exports;
    })({});

    /* ------------------------------ idxOf ------------------------------ */

    var idxOf = _.idxOf = (function (exports) {
        /* Get the index at which the first occurrence of value.
         *
         * |Name     |Desc                |
         * |---------|--------------------|
         * |arr      |Array to search     |
         * |val      |Value to search for |
         * |fromIdx=0|Index to search from|
         * |return   |Value index         |
         */

        /* example
         * idxOf([1, 2, 1, 2], 2, 2); // -> 3
         */

        /* typescript
         * export declare function idxOf(arr: any[], val: any, fromIdx?: number): number;
         */
        exports = function(arr, val, fromIdx) {
            return Array.prototype.indexOf.call(arr, val, fromIdx);
        };

        return exports;
    })({});

    /* ------------------------------ create ------------------------------ */

    var create = _.create = (function (exports) {
        /* Create new object using given object as prototype.
         *
         * |Name  |Desc                   |
         * |------|-----------------------|
         * |proto |Prototype of new object|
         * |return|Created object         |
         */

        /* example
         * const obj = create({ a: 1 });
         * console.log(obj.a); // -> 1
         */

        /* typescript
         * export declare function create(proto?: object): any;
         */

        /* dependencies
         * isObj 
         */

        exports = function(proto) {
            if (!isObj(proto)) return {};
            if (objCreate && !false) return objCreate(proto);

            function noop() {}

            noop.prototype = proto;
            return new noop();
        };

        var objCreate = Object.create;

        return exports;
    })({});

    /* ------------------------------ inherits ------------------------------ */

    var inherits = _.inherits = (function (exports) {
        /* Inherit the prototype methods from one constructor into another.
         *
         * |Name      |Desc       |
         * |----------|-----------|
         * |Class     |Child Class|
         * |SuperClass|Super Class|
         */

        /* example
         * function People(name) {
         *     this._name = name;
         * }
         * People.prototype = {
         *     getName: function() {
         *         return this._name;
         *     }
         * };
         * function Student(name) {
         *     this._name = name;
         * }
         * inherits(Student, People);
         * const s = new Student('RedHood');
         * s.getName(); // -> 'RedHood'
         */

        /* typescript
         * export declare function inherits(
         *     Class: types.AnyFn,
         *     SuperClass: types.AnyFn
         * ): void;
         */

        /* dependencies
         * create types 
         */

        exports = function(Class, SuperClass) {
            Class.prototype = create(SuperClass.prototype);
        };

        return exports;
    })({});

    /* ------------------------------ optimizeCb ------------------------------ */

    var optimizeCb = _.optimizeCb = (function (exports) {
        /* Used for function context binding.
         */

        /* typescript
         * export declare function optimizeCb(
         *     fn: types.AnyFn,
         *     ctx: any,
         *     argCount?: number
         * ): types.AnyFn;
         */

        /* dependencies
         * isUndef types 
         */

        exports = function(fn, ctx, argCount) {
            if (isUndef(ctx)) return fn;

            switch (argCount == null ? 3 : argCount) {
                case 1:
                    return function(val) {
                        return fn.call(ctx, val);
                    };

                case 3:
                    return function(val, idx, collection) {
                        return fn.call(ctx, val, idx, collection);
                    };

                case 4:
                    return function(accumulator, val, idx, collection) {
                        return fn.call(ctx, accumulator, val, idx, collection);
                    };
            }

            return function() {
                return fn.apply(ctx, arguments);
            };
        };

        return exports;
    })({});

    /* ------------------------------ identity ------------------------------ */

    var identity = _.identity = (function (exports) {
        /* Return the first argument given.
         *
         * |Name  |Desc       |
         * |------|-----------|
         * |val   |Any value  |
         * |return|Given value|
         */

        /* example
         * identity('a'); // -> 'a'
         */

        /* typescript
         * export declare function identity<T>(val: T): T;
         */
        exports = function(val) {
            return val;
        };

        return exports;
    })({});

    /* ------------------------------ upperFirst ------------------------------ */

    var upperFirst = _.upperFirst = (function (exports) {
        /* Convert the first character of string to upper case.
         *
         * |Name  |Desc             |
         * |------|-----------------|
         * |str   |String to convert|
         * |return|Converted string |
         */

        /* example
         * upperFirst('red'); // -> Red
         */

        /* typescript
         * export declare function upperFirst(str: string): string;
         */
        exports = function(str) {
            if (str.length < 1) return str;
            return str[0].toUpperCase() + str.slice(1);
        };

        return exports;
    })({});

    /* ------------------------------ toEl ------------------------------ */

    var toEl = _.toEl = (function (exports) {
        /* Convert html string to dom elements.
         *
         * There should be only one root element.
         *
         * |Name  |Desc        |
         * |------|------------|
         * |str   |Html string |
         * |return|Html element|
         */

        /* example
         * toEl('<div>test</div>');
         */

        /* typescript
         * export declare function toEl(str: string): Element;
         */
        var doc = document;

        exports = function(str) {
            var fragment = doc.createElement('body');
            fragment.innerHTML = str;
            return fragment.childNodes[0];
        };

        if (doc.createRange && doc.body) {
            var range = doc.createRange();
            range.selectNode(doc.body);

            if (range.createContextualFragment) {
                exports = function(str) {
                    return range.createContextualFragment(str).childNodes[0];
                };
            }
        }

        return exports;
    })({});

    /* ------------------------------ objToStr ------------------------------ */

    var objToStr = _.objToStr = (function (exports) {
        /* Alias of Object.prototype.toString.
         *
         * |Name  |Desc                                |
         * |------|------------------------------------|
         * |val   |Source value                        |
         * |return|String representation of given value|
         */

        /* example
         * objToStr(5); // -> '[object Number]'
         */

        /* typescript
         * export declare function objToStr(val: any): string;
         */
        var ObjToStr = Object.prototype.toString;

        exports = function(val) {
            return ObjToStr.call(val);
        };

        return exports;
    })({});

    /* ------------------------------ isArgs ------------------------------ */

    var isArgs = _.isArgs = (function (exports) {
        /* Check if value is classified as an arguments object.
         *
         * |Name  |Desc                                |
         * |------|------------------------------------|
         * |val   |Value to check                      |
         * |return|True if value is an arguments object|
         */

        /* example
         * isArgs(
         *     (function() {
         *         return arguments;
         *     })()
         * ); // -> true
         */

        /* typescript
         * export declare function isArgs(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function(val) {
            return objToStr(val) === '[object Arguments]';
        };

        return exports;
    })({});

    /* ------------------------------ isArr ------------------------------ */

    var isArr = _.isArr = (function (exports) {
        /* Check if value is an `Array` object.
         *
         * |Name  |Desc                              |
         * |------|----------------------------------|
         * |val   |Value to check                    |
         * |return|True if value is an `Array` object|
         */

        /* example
         * isArr([]); // -> true
         * isArr({}); // -> false
         */

        /* typescript
         * export declare function isArr(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        if (Array.isArray && !false) {
            exports = Array.isArray;
        } else {
            exports = function(val) {
                return objToStr(val) === '[object Array]';
            };
        }

        return exports;
    })({});

    /* ------------------------------ castPath ------------------------------ */

    var castPath = _.castPath = (function (exports) {
        /* Cast value into a property path array.
         *
         * |Name  |Desc               |
         * |------|-------------------|
         * |path  |Value to inspect   |
         * |obj   |Object to query    |
         * |return|Property path array|
         */

        /* example
         * castPath('a.b.c'); // -> ['a', 'b', 'c']
         * castPath(['a']); // -> ['a']
         * castPath('a[0].b'); // -> ['a', '0', 'b']
         * castPath('a.b.c', { 'a.b.c': true }); // -> ['a.b.c']
         */

        /* typescript
         * export declare function castPath(path: string | string[], obj?: any): string[];
         */

        /* dependencies
         * has isArr 
         */

        exports = function(str, obj) {
            if (isArr(str)) return str;
            if (obj && has(obj, str)) return [str];
            var ret = [];
            str.replace(regPropName, function(match, number, quote, str) {
                ret.push(quote ? str.replace(regEscapeChar, '$1') : number || match);
            });
            return ret;
        }; // Lodash _stringToPath

        var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var regEscapeChar = /\\(\\)?/g;

        return exports;
    })({});

    /* ------------------------------ safeGet ------------------------------ */

    var safeGet = _.safeGet = (function (exports) {
        /* Get object property, don't throw undefined error.
         *
         * |Name  |Desc                     |
         * |------|-------------------------|
         * |obj   |Object to query          |
         * |path  |Path of property to get  |
         * |return|Target value or undefined|
         */

        /* example
         * const obj = { a: { aa: { aaa: 1 } } };
         * safeGet(obj, 'a.aa.aaa'); // -> 1
         * safeGet(obj, ['a', 'aa']); // -> {aaa: 1}
         * safeGet(obj, 'a.b'); // -> undefined
         */

        /* typescript
         * export declare function safeGet(obj: any, path: string | string[]): any;
         */

        /* dependencies
         * isUndef castPath 
         */

        exports = function(obj, path) {
            path = castPath(path, obj);
            var prop;
            prop = path.shift();

            while (!isUndef(prop)) {
                obj = obj[prop];
                if (obj == null) return;
                prop = path.shift();
            }

            return obj;
        };

        return exports;
    })({});

    /* ------------------------------ isFn ------------------------------ */

    var isFn = _.isFn = (function (exports) {
        /* Check if value is a function.
         *
         * |Name  |Desc                       |
         * |------|---------------------------|
         * |val   |Value to check             |
         * |return|True if value is a function|
         *
         * Generator function is also classified as true.
         */

        /* example
         * isFn(function() {}); // -> true
         * isFn(function*() {}); // -> true
         * isFn(async function() {}); // -> true
         */

        /* typescript
         * export declare function isFn(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function(val) {
            var objStr = objToStr(val);
            return (
                objStr === '[object Function]' ||
                objStr === '[object GeneratorFunction]' ||
                objStr === '[object AsyncFunction]'
            );
        };

        return exports;
    })({});

    /* ------------------------------ getProto ------------------------------ */

    var getProto = _.getProto = (function (exports) {
        /* Get prototype of an object.
         *
         * |Name  |Desc                                         |
         * |------|---------------------------------------------|
         * |obj   |Target object                                |
         * |return|Prototype of given object, null if not exists|
         */

        /* example
         * const a = {};
         * getProto(Object.create(a)); // -> a
         */

        /* typescript
         * export declare function getProto(obj: any): any;
         */

        /* dependencies
         * isObj isFn 
         */

        var getPrototypeOf = Object.getPrototypeOf;
        var ObjectCtr = {}.constructor;

        exports = function(obj) {
            if (!isObj(obj)) return;
            if (getPrototypeOf && !false) return getPrototypeOf(obj);
            var proto = obj.__proto__;
            if (proto || proto === null) return proto;
            if (isFn(obj.constructor)) return obj.constructor.prototype;
            if (obj instanceof ObjectCtr) return ObjectCtr.prototype;
        };

        return exports;
    })({});

    /* ------------------------------ isMiniProgram ------------------------------ */

    var isMiniProgram = _.isMiniProgram = (function (exports) {
        /* Check if running in wechat mini program.
         */

        /* example
         * console.log(isMiniProgram); // -> true if running in mini program.
         */

        /* typescript
         * export declare const isMiniProgram: boolean;
         */

        /* dependencies
         * isFn 
         */
        /* eslint-disable no-undef */

        exports = typeof wx !== 'undefined' && isFn(wx.openLocation);

        return exports;
    })({});

    /* ------------------------------ isStr ------------------------------ */

    var isStr = _.isStr = (function (exports) {
        /* Check if value is a string primitive.
         *
         * |Name  |Desc                               |
         * |------|-----------------------------------|
         * |val   |Value to check                     |
         * |return|True if value is a string primitive|
         */

        /* example
         * isStr('licia'); // -> true
         */

        /* typescript
         * export declare function isStr(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function(val) {
            return objToStr(val) === '[object String]';
        };

        return exports;
    })({});

    /* ------------------------------ isNum ------------------------------ */

    var isNum = _.isNum = (function (exports) {
        /* Check if value is classified as a Number primitive or object.
         *
         * |Name  |Desc                                 |
         * |------|-------------------------------------|
         * |val   |Value to check                       |
         * |return|True if value is correctly classified|
         */

        /* example
         * isNum(5); // -> true
         * isNum(5.1); // -> true
         * isNum({}); // -> false
         */

        /* typescript
         * export declare function isNum(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function(val) {
            return objToStr(val) === '[object Number]';
        };

        return exports;
    })({});

    /* ------------------------------ isArrLike ------------------------------ */

    var isArrLike = _.isArrLike = (function (exports) {
        /* Check if value is array-like.
         *
         * |Name  |Desc                       |
         * |------|---------------------------|
         * |val   |Value to check             |
         * |return|True if value is array like|
         *
         * Function returns false.
         */

        /* example
         * isArrLike('test'); // -> true
         * isArrLike(document.body.children); // -> true;
         * isArrLike([1, 2, 3]); // -> true
         */

        /* typescript
         * export declare function isArrLike(val: any): boolean;
         */

        /* dependencies
         * isNum isFn 
         */

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        exports = function(val) {
            if (!val) return false;
            var len = val.length;
            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
        };

        return exports;
    })({});

    /* ------------------------------ each ------------------------------ */

    var each = _.each = (function (exports) {
        /* Iterate over elements of collection and invokes iterator for each element.
         *
         * |Name    |Desc                          |
         * |--------|------------------------------|
         * |obj     |Collection to iterate over    |
         * |iterator|Function invoked per iteration|
         * |ctx     |Function context              |
         */

        /* example
         * each({ a: 1, b: 2 }, function(val, key) {});
         */

        /* typescript
         * export declare function each<T>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, void>,
         *     ctx?: any
         * ): types.List<T>;
         * export declare function each<T>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, void>,
         *     ctx?: any
         * ): types.Collection<T>;
         */

        /* dependencies
         * isArrLike keys optimizeCb types 
         */

        exports = function(obj, iterator, ctx) {
            iterator = optimizeCb(iterator, ctx);
            var i, len;

            if (isArrLike(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    iterator(obj[i], i, obj);
                }
            } else {
                var _keys = keys(obj);

                for (i = 0, len = _keys.length; i < len; i++) {
                    iterator(obj[_keys[i]], _keys[i], obj);
                }
            }

            return obj;
        };

        return exports;
    })({});

    /* ------------------------------ createAssigner ------------------------------ */

    var createAssigner = _.createAssigner = (function (exports) {
        /* Used to create extend, extendOwn and defaults.
         *
         * |Name    |Desc                          |
         * |--------|------------------------------|
         * |keysFn  |Function to get object keys   |
         * |defaults|No override when set to true  |
         * |return  |Result function, extend...    |
         */

        /* typescript
         * export declare function createAssigner(
         *     keysFn: types.AnyFn,
         *     defaults: boolean
         * ): types.AnyFn;
         */

        /* dependencies
         * isUndef each types 
         */

        exports = function(keysFn, defaults) {
            return function(obj) {
                each(arguments, function(src, idx) {
                    if (idx === 0) return;
                    var keys = keysFn(src);
                    each(keys, function(key) {
                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                    });
                });
                return obj;
            };
        };

        return exports;
    })({});

    /* ------------------------------ extendOwn ------------------------------ */

    var extendOwn = _.extendOwn = (function (exports) {
        /* Like extend, but only copies own properties over to the destination object.
         *
         * |Name       |Desc              |
         * |-----------|------------------|
         * |destination|Destination object|
         * |...sources |Sources objects   |
         * |return     |Destination object|
         */

        /* example
         * extendOwn({ name: 'RedHood' }, { age: 24 }); // -> {name: 'RedHood', age: 24}
         */

        /* typescript
         * export declare function extendOwn(destination: any, ...sources: any[]): any;
         */

        /* dependencies
         * keys createAssigner 
         */

        exports = createAssigner(keys);

        return exports;
    })({});

    /* ------------------------------ values ------------------------------ */

    var values = _.values = (function (exports) {
        /* Create an array of the own enumerable property values of object.
         *
         * |Name  |Desc                    |
         * |------|------------------------|
         * |obj   |Object to query         |
         * |return|Array of property values|
         */

        /* example
         * values({ one: 1, two: 2 }); // -> [1, 2]
         */

        /* typescript
         * export declare function values(obj: any): any[];
         */

        /* dependencies
         * each 
         */

        exports = function(obj) {
            var ret = [];
            each(obj, function(val) {
                ret.push(val);
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ contain ------------------------------ */

    var contain = _.contain = (function (exports) {
        /* Check if the value is present in the list.
         *
         * |Name  |Desc                                |
         * |------|------------------------------------|
         * |target|Target object                       |
         * |val   |Value to check                      |
         * |return|True if value is present in the list|
         */

        /* example
         * contain([1, 2, 3], 1); // -> true
         * contain({ a: 1, b: 2 }, 1); // -> true
         * contain('abc', 'a'); // -> true
         */

        /* typescript
         * export declare function contain(arr: any[] | {} | string, val: any): boolean;
         */

        /* dependencies
         * idxOf isStr isArrLike values 
         */

        exports = function(arr, val) {
            if (isStr(arr)) return arr.indexOf(val) > -1;
            if (!isArrLike(arr)) arr = values(arr);
            return idxOf(arr, val) >= 0;
        };

        return exports;
    })({});

    /* ------------------------------ isEmpty ------------------------------ */

    var isEmpty = _.isEmpty = (function (exports) {
        /* Check if value is an empty object or array.
         *
         * |Name  |Desc                  |
         * |------|----------------------|
         * |val   |Value to check        |
         * |return|True if value is empty|
         */

        /* example
         * isEmpty([]); // -> true
         * isEmpty({}); // -> true
         * isEmpty(''); // -> true
         */

        /* typescript
         * export declare function isEmpty(val: any): boolean;
         */

        /* dependencies
         * isArrLike isArr isStr isArgs keys 
         */

        exports = function(val) {
            if (val == null) return true;

            if (isArrLike(val) && (isArr(val) || isStr(val) || isArgs(val))) {
                return val.length === 0;
            }

            return keys(val).length === 0;
        };

        return exports;
    })({});

    /* ------------------------------ isMatch ------------------------------ */

    var isMatch = _.isMatch = (function (exports) {
        /* Check if keys and values in src are contained in obj.
         *
         * |Name  |Desc                              |
         * |------|----------------------------------|
         * |obj   |Object to inspect                 |
         * |src   |Object of property values to match|
         * |return|True if object is match           |
         */

        /* example
         * isMatch({ a: 1, b: 2 }, { a: 1 }); // -> true
         */

        /* typescript
         * export declare function isMatch(obj: any, src: any): boolean;
         */

        /* dependencies
         * keys 
         */

        exports = function(obj, src) {
            var _keys = keys(src);

            var len = _keys.length;
            if (obj == null) return !len;
            obj = Object(obj);

            for (var i = 0; i < len; i++) {
                var key = _keys[i];
                if (src[key] !== obj[key] || !(key in obj)) return false;
            }

            return true;
        };

        return exports;
    })({});

    /* ------------------------------ ltrim ------------------------------ */

    var ltrim = _.ltrim = (function (exports) {
        /* Remove chars or white-spaces from beginning of string.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to trim    |
         * |chars |Characters to trim|
         * |return|Trimmed string    |
         */

        /* example
         * ltrim(' abc  '); // -> 'abc  '
         * ltrim('_abc_', '_'); // -> 'abc_'
         * ltrim('_abc_', ['a', '_']); // -> 'bc_'
         */

        /* typescript
         * export declare function ltrim(str: string, chars?: string | string[]): string;
         */
        var regSpace = /^\s+/;

        exports = function(str, chars) {
            if (chars == null) {
                if (str.trimLeft) {
                    return str.trimLeft();
                }

                return str.replace(regSpace, '');
            }

            var start = 0;
            var len = str.length;
            var charLen = chars.length;
            var found = true;
            var i;
            var c;

            while (found && start < len) {
                found = false;
                i = -1;
                c = str.charAt(start);

                while (++i < charLen) {
                    if (c === chars[i]) {
                        found = true;
                        start++;
                        break;
                    }
                }
            }

            return start >= len ? '' : str.substr(start, len);
        };

        return exports;
    })({});

    /* ------------------------------ matcher ------------------------------ */

    var matcher = _.matcher = (function (exports) {
        /* Return a predicate function that checks if attrs are contained in an object.
         *
         * |Name  |Desc                              |
         * |------|----------------------------------|
         * |attrs |Object of property values to match|
         * |return|New predicate function            |
         */

        /* example
         * const filter = require('licia/filter');
         *
         * const objects = [
         *     { a: 1, b: 2, c: 3 },
         *     { a: 4, b: 5, c: 6 }
         * ];
         * filter(objects, matcher({ a: 4, c: 6 })); // -> [{a: 4, b: 5, c: 6}]
         */

        /* typescript
         * export declare function matcher(attrs: any): types.AnyFn;
         */

        /* dependencies
         * extendOwn isMatch types 
         */

        exports = function(attrs) {
            attrs = extendOwn({}, attrs);
            return function(obj) {
                return isMatch(obj, attrs);
            };
        };

        return exports;
    })({});

    /* ------------------------------ restArgs ------------------------------ */

    var restArgs = _.restArgs = (function (exports) {
        /* This accumulates the arguments passed into an array, after a given index.
         *
         * |Name      |Desc                                   |
         * |----------|---------------------------------------|
         * |function  |Function that needs rest parameters    |
         * |startIndex|The start index to accumulates         |
         * |return    |Generated function with rest parameters|
         */

        /* example
         * const paramArr = restArgs(function(rest) {
         *     return rest;
         * });
         * paramArr(1, 2, 3, 4); // -> [1, 2, 3, 4]
         */

        /* typescript
         * export declare function restArgs(
         *     fn: types.AnyFn,
         *     startIndex?: number
         * ): types.AnyFn;
         */

        /* dependencies
         * types 
         */

        exports = function(fn, startIdx) {
            startIdx = startIdx == null ? fn.length - 1 : +startIdx;
            return function() {
                var len = Math.max(arguments.length - startIdx, 0);
                var rest = new Array(len);
                var i;

                for (i = 0; i < len; i++) {
                    rest[i] = arguments[i + startIdx];
                } // Call runs faster than apply.

                switch (startIdx) {
                    case 0:
                        return fn.call(this, rest);

                    case 1:
                        return fn.call(this, arguments[0], rest);

                    case 2:
                        return fn.call(this, arguments[0], arguments[1], rest);
                }

                var args = new Array(startIdx + 1);

                for (i = 0; i < startIdx; i++) {
                    args[i] = arguments[i];
                }

                args[startIdx] = rest;
                return fn.apply(this, args);
            };
        };

        return exports;
    })({});

    /* ------------------------------ mergeArr ------------------------------ */

    var mergeArr = _.mergeArr = (function (exports) {
        /* Merge the contents of arrays together into the first array.
         *
         * |Name  |Desc                                |
         * |------|------------------------------------|
         * |first |Array to merge                      |
         * |arrays|Arrays to merge into the first array|
         * |return|First array                         |
         */

        /* example
         * const a = [1, 2];
         * mergeArr(a, [3, 4], [5, 6]);
         * console.log(a); // -> [1, 2, 3, 4, 5, 6]
         */

        /* typescript
         * export declare function mergeArr<T, U>(
         *     first: ArrayLike<T>,
         *     ...arrays: ArrayLike<U>[]
         * ): ArrayLike<T | U>;
         */

        /* dependencies
         * restArgs 
         */

        exports = restArgs(function(first, arrays) {
            var end = first.length;

            for (var i = 0, len = arrays.length; i < len; i++) {
                var arr = arrays[i];

                for (var j = 0, _len = arr.length; j < _len; j++) {
                    first[end++] = arr[j];
                }
            }

            first.length = end;
            return first;
        });

        return exports;
    })({});

    /* ------------------------------ now ------------------------------ */

    var now = _.now = (function (exports) {
        /* Gets the number of milliseconds that have elapsed since the Unix epoch.
         */

        /* example
         * now(); // -> 1468826678701
         */

        /* typescript
         * export declare function now(): number;
         */
        if (Date.now && !false) {
            exports = Date.now;
        } else {
            exports = function() {
                return new Date().getTime();
            };
        }

        return exports;
    })({});

    /* ------------------------------ raf ------------------------------ */

    var raf = _.raf = (function (exports) {
        /* Shortcut for requestAnimationFrame.
         *
         * Use setTimeout if native requestAnimationFrame is not supported.
         */

        /* example
         * const id = raf(function tick() {
         *     // Animation stuff
         *     raf(tick);
         * });
         * raf.cancel(id);
         */

        /* typescript
         * export declare namespace raf {
         *     function cancel(id: number): void;
         * }
         * export declare function raf(cb: types.AnyFn): number;
         */

        /* dependencies
         * now isBrowser types 
         */

        var raf, cancel;
        var lastTime = 0;

        if (isBrowser) {
            raf = window.requestAnimationFrame;
            cancel = window.cancelAnimationFrame;
            var vendors = ['ms', 'moz', 'webkit', 'o'];

            for (var i = 0, len = vendors.length; i < len && !raf; i++) {
                raf = window[vendors[i] + 'RequestAnimationFrame'];
                cancel =
                    window[vendors[i] + 'CancelAnimationFrame'] ||
                    window[vendors[i] + 'CancelRequestAnimationFrame'];
            }

            if (raf) {
                raf = raf.bind(window);
                cancel = cancel.bind(window);
            }
        }

        raf =
            raf ||
            function(cb) {
                var curTime = now();
                var timeToCall = Math.max(0, 16 - (curTime - lastTime));
                var id = setTimeout(function() {
                    cb(curTime + timeToCall);
                }, timeToCall);
                lastTime = curTime + timeToCall;
                return id;
            };

        cancel =
            cancel ||
            function(id) {
                clearTimeout(id);
            };

        raf.cancel = cancel;
        exports = raf;

        return exports;
    })({});

    /* ------------------------------ property ------------------------------ */

    var property = _.property = (function (exports) {
        /* Return a function that will itself return the key property of any passed-in object.
         *
         * |Name  |Desc                       |
         * |------|---------------------------|
         * |path  |Path of the property to get|
         * |return|New accessor function      |
         */

        /* example
         * const obj = { a: { b: 1 } };
         * property('a')(obj); // -> {b: 1}
         * property(['a', 'b'])(obj); // -> 1
         */

        /* typescript
         * export declare function property(path: string | string[]): types.AnyFn;
         */

        /* dependencies
         * isArr safeGet types 
         */

        exports = function(path) {
            if (!isArr(path)) return shallowProperty(path);
            return function(obj) {
                return safeGet(obj, path);
            };
        };

        function shallowProperty(key) {
            return function(obj) {
                return obj == null ? void 0 : obj[key];
            };
        }

        return exports;
    })({});

    /* ------------------------------ safeCb ------------------------------ */

    var safeCb = _.safeCb = (function (exports) {
        /* Create callback based on input value.
         */

        /* typescript
         * export declare function safeCb(
         *     val?: any,
         *     ctx?: any,
         *     argCount?: number
         * ): types.AnyFn;
         */

        /* dependencies
         * isFn isObj isArr optimizeCb matcher identity types property 
         */

        exports = function(val, ctx, argCount) {
            if (val == null) return identity;
            if (isFn(val)) return optimizeCb(val, ctx, argCount);
            if (isObj(val) && !isArr(val)) return matcher(val);
            return property(val);
        };

        return exports;
    })({});

    /* ------------------------------ filter ------------------------------ */

    var filter = _.filter = (function (exports) {
        /* Iterates over elements of collection, returning an array of all the values that pass a truth test.
         *
         * |Name     |Desc                                   |
         * |---------|---------------------------------------|
         * |obj      |Collection to iterate over             |
         * |predicate|Function invoked per iteration         |
         * |ctx      |Predicate context                      |
         * |return   |Array of all values that pass predicate|
         */

        /* example
         * filter([1, 2, 3, 4, 5], function(val) {
         *     return val % 2 === 0;
         * }); // -> [2, 4]
         */

        /* typescript
         * export declare function filter<T>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, boolean>,
         *     context?: any
         * ): T[];
         * export declare function filter<T>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, boolean>,
         *     context?: any
         * ): T[];
         */

        /* dependencies
         * safeCb each types 
         */

        exports = function(obj, predicate, ctx) {
            var ret = [];
            predicate = safeCb(predicate, ctx);
            each(obj, function(val, idx, list) {
                if (predicate(val, idx, list)) ret.push(val);
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ unique ------------------------------ */

    var unique = _.unique = (function (exports) {
        /* Create duplicate-free version of an array.
         *
         * |Name  |Desc                         |
         * |------|-----------------------------|
         * |arr   |Array to inspect             |
         * |cmp   |Function for comparing values|
         * |return|New duplicate free array     |
         */

        /* example
         * unique([1, 2, 3, 1]); // -> [1, 2, 3]
         */

        /* typescript
         * export declare function unique(
         *     arr: any[],
         *     cmp?: (a: any, b: any) => boolean | number
         * ): any[];
         */

        /* dependencies
         * filter 
         */

        exports = function(arr, cmp) {
            cmp = cmp || isEqual;
            return filter(arr, function(item, idx, arr) {
                var len = arr.length;

                while (++idx < len) {
                    if (cmp(item, arr[idx])) return false;
                }

                return true;
            });
        };

        function isEqual(a, b) {
            return a === b;
        }

        return exports;
    })({});

    /* ------------------------------ allKeys ------------------------------ */

    var allKeys = _.allKeys = (function (exports) {
        /* Retrieve all the names of object's own and inherited properties.
         *
         * |Name   |Desc                       |
         * |-------|---------------------------|
         * |obj    |Object to query            |
         * |options|Options                    |
         * |return |Array of all property names|
         *
         * Available options:
         *
         * |Name              |Desc                     |
         * |------------------|-------------------------|
         * |prototype=true    |Include prototype keys   |
         * |unenumerable=false|Include unenumerable keys|
         * |symbol=false      |Include symbol keys      |
         *
         * Members of Object's prototype won't be retrieved.
         */

        /* example
         * const obj = Object.create({ zero: 0 });
         * obj.one = 1;
         * allKeys(obj); // -> ['zero', 'one']
         */

        /* typescript
         * export declare namespace allKeys {
         *     interface IOptions {
         *         prototype?: boolean;
         *         unenumerable?: boolean;
         *     }
         * }
         * export declare function allKeys(
         *     obj: any,
         *     options: { symbol: true } & allKeys.IOptions
         * ): Array<string | Symbol>;
         * export declare function allKeys(
         *     obj: any,
         *     options?: ({ symbol: false } & allKeys.IOptions) | allKeys.IOptions
         * ): string[];
         */

        /* dependencies
         * keys getProto unique 
         */

        var getOwnPropertyNames = Object.getOwnPropertyNames;
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;

        exports = function(obj) {
            var _ref =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {},
                _ref$prototype = _ref.prototype,
                prototype = _ref$prototype === void 0 ? true : _ref$prototype,
                _ref$unenumerable = _ref.unenumerable,
                unenumerable = _ref$unenumerable === void 0 ? false : _ref$unenumerable,
                _ref$symbol = _ref.symbol,
                symbol = _ref$symbol === void 0 ? false : _ref$symbol;

            var ret = [];

            if ((unenumerable || symbol) && getOwnPropertyNames) {
                var getKeys = keys;
                if (unenumerable && getOwnPropertyNames) getKeys = getOwnPropertyNames;

                do {
                    ret = ret.concat(getKeys(obj));

                    if (symbol && getOwnPropertySymbols) {
                        ret = ret.concat(getOwnPropertySymbols(obj));
                    }
                } while (
                    prototype &&
                    (obj = getProto(obj)) &&
                    obj !== Object.prototype
                );

                ret = unique(ret);
            } else {
                if (prototype) {
                    for (var key in obj) {
                        ret.push(key);
                    }
                } else {
                    ret = keys(obj);
                }
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ defaults ------------------------------ */

    var defaults = _.defaults = (function (exports) {
        /* Fill in undefined properties in object with the first value present in the following list of defaults objects.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |obj   |Destination object|
         * |...src|Sources objects   |
         * |return|Destination object|
         */

        /* example
         * defaults({ name: 'RedHood' }, { name: 'Unknown', age: 24 }); // -> {name: 'RedHood', age: 24}
         */

        /* typescript
         * export declare function defaults(obj: any, ...src: any[]): any;
         */

        /* dependencies
         * createAssigner allKeys 
         */

        exports = createAssigner(allKeys, true);

        return exports;
    })({});

    /* ------------------------------ extend ------------------------------ */

    var extend = _.extend = (function (exports) {
        /* Copy all of the properties in the source objects over to the destination object.
         *
         * |Name       |Desc              |
         * |-----------|------------------|
         * |destination|Destination object|
         * |...sources |Sources objects   |
         * |return     |Destination object|
         */

        /* example
         * extend({ name: 'RedHood' }, { age: 24 }); // -> {name: 'RedHood', age: 24}
         */

        /* typescript
         * export declare function extend(destination: any, ...sources: any[]): any;
         */

        /* dependencies
         * createAssigner allKeys 
         */

        exports = createAssigner(allKeys);

        return exports;
    })({});

    /* ------------------------------ map ------------------------------ */

    var map = _.map = (function (exports) {
        /* Create an array of values by running each element in collection through iteratee.
         *
         * |Name    |Desc                          |
         * |--------|------------------------------|
         * |object  |Collection to iterate over    |
         * |iterator|Function invoked per iteration|
         * |context |Function context              |
         * |return  |New mapped array              |
         */

        /* example
         * map([4, 8], function(n) {
         *     return n * n;
         * }); // -> [16, 64]
         */

        /* typescript
         * export declare function map<T, TResult>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, TResult>,
         *     context?: any
         * ): TResult[];
         * export declare function map<T, TResult>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, TResult>,
         *     context?: any
         * ): TResult[];
         */

        /* dependencies
         * safeCb keys isArrLike types 
         */

        exports = function(obj, iterator, ctx) {
            iterator = safeCb(iterator, ctx);

            var _keys = !isArrLike(obj) && keys(obj);

            var len = (_keys || obj).length;
            var results = Array(len);

            for (var i = 0; i < len; i++) {
                var curKey = _keys ? _keys[i] : i;
                results[i] = iterator(obj[curKey], curKey, obj);
            }

            return results;
        };

        return exports;
    })({});

    /* ------------------------------ toArr ------------------------------ */

    var toArr = _.toArr = (function (exports) {
        /* Convert value to an array.
         *
         * |Name  |Desc            |
         * |------|----------------|
         * |val   |Value to convert|
         * |return|Converted array |
         */

        /* example
         * toArr({ a: 1, b: 2 }); // -> [{a: 1, b: 2}]
         * toArr('abc'); // -> ['abc']
         * toArr(1); // -> [1]
         * toArr(null); // -> []
         */

        /* typescript
         * export declare function toArr(val: any): any[];
         */

        /* dependencies
         * isArrLike map isArr isStr 
         */

        exports = function(val) {
            if (!val) return [];
            if (isArr(val)) return val;
            if (isArrLike(val) && !isStr(val)) return map(val);
            return [val];
        };

        return exports;
    })({});

    /* ------------------------------ Class ------------------------------ */

    var Class = _.Class = (function (exports) {
        /* Create JavaScript class.
         *
         * |Name   |Desc                             |
         * |-------|---------------------------------|
         * |methods|Public methods                   |
         * [statics|Static methods                   |
         * |return |Function used to create instances|
         */

        /* example
         * const People = Class({
         *     initialize: function People(name, age) {
         *         this.name = name;
         *         this.age = age;
         *     },
         *     introduce: function() {
         *         return 'I am ' + this.name + ', ' + this.age + ' years old.';
         *     }
         * });
         *
         * const Student = People.extend(
         *     {
         *         initialize: function Student(name, age, school) {
         *             this.callSuper(People, 'initialize', arguments);
         *
         *             this.school = school;
         *         },
         *         introduce: function() {
         *             return (
         *                 this.callSuper(People, 'introduce') +
         *                 '\n I study at ' +
         *                 this.school +
         *                 '.'
         *             );
         *         }
         *     },
         *     {
         *         is: function(obj) {
         *             return obj instanceof Student;
         *         }
         *     }
         * );
         *
         * const a = new Student('allen', 17, 'Hogwarts');
         * a.introduce(); // -> 'I am allen, 17 years old. \n I study at Hogwarts.'
         * Student.is(a); // -> true
         */

        /* typescript
         * export declare namespace Class {
         *     class Base {
         *         toString(): string;
         *     }
         *     class IConstructor extends Base {
         *         constructor(...args: any[]);
         *         static extend(methods: any, statics: any): IConstructor;
         *         static inherits(Class: types.AnyFn): void;
         *         static methods(methods: any): IConstructor;
         *         static statics(statics: any): IConstructor;
         *         [method: string]: any;
         *     }
         * }
         * export declare function Class(methods: any, statics?: any): Class.IConstructor;
         */

        /* dependencies
         * extend toArr inherits safeGet isMiniProgram types 
         */

        exports = function(methods, statics) {
            return Base.extend(methods, statics);
        };

        function makeClass(parent, methods, statics) {
            statics = statics || {};
            var className =
                methods.className || safeGet(methods, 'initialize.name') || '';
            delete methods.className;

            var ctor = function() {
                var args = toArr(arguments);
                return this.initialize
                    ? this.initialize.apply(this, args) || this
                    : this;
            };

            if (!isMiniProgram) {
                // unsafe-eval CSP violation
                try {
                    ctor = new Function(
                        'toArr',
                        'return function ' +
                            className +
                            '()' +
                            '{' +
                            'var args = toArr(arguments);' +
                            'return this.initialize ? this.initialize.apply(this, args) || this : this;' +
                            '};'
                    )(toArr);
                } catch (e) {
                    /* eslint-disable no-empty */
                }
            }

            inherits(ctor, parent);
            ctor.prototype.constructor = ctor;

            ctor.extend = function(methods, statics) {
                return makeClass(ctor, methods, statics);
            };

            ctor.inherits = function(Class) {
                inherits(ctor, Class);
            };

            ctor.methods = function(methods) {
                extend(ctor.prototype, methods);
                return ctor;
            };

            ctor.statics = function(statics) {
                extend(ctor, statics);
                return ctor;
            };

            ctor.methods(methods).statics(statics);
            return ctor;
        }

        var Base = (exports.Base = makeClass(Object, {
            className: 'Base',
            callSuper: function(parent, name, args) {
                var superMethod = parent.prototype[name];
                return superMethod.apply(this, args);
            },
            toString: function() {
                return this.constructor.name;
            }
        }));

        return exports;
    })({});

    /* ------------------------------ Select ------------------------------ */

    var Select = _.Select = (function (exports) {
        /* Simple wrapper of querySelectorAll to make dom selection easier.
         *
         * ### constructor
         *
         * |Name    |Desc               |
         * |--------|-------------------|
         * |selector|Dom selector string|
         *
         * ### find
         *
         * Get desdendants of current matched elements.
         *
         * |Name    |Desc               |
         * |--------|-------------------|
         * |selector|Dom selector string|
         *
         * ### each
         *
         * Iterate over matched elements.
         *
         * |Name|Desc                                |
         * |----|------------------------------------|
         * |fn  |Function to execute for each element|
         */

        /* example
         * const $test = new Select('#test');
         * $test.find('.test').each(function(idx, element) {
         *     // Manipulate dom nodes
         * });
         */

        /* typescript
         * export declare class Select {
         *     constructor(selector: string | Element | Document);
         *     find(selector: string): Select;
         *     each(fn: types.AnyFn): Select;
         * }
         */

        /* dependencies
         * Class isStr each types mergeArr 
         */

        exports = Class({
            className: 'Select',
            initialize: function(selector) {
                this.length = 0;
                if (!selector) return this;
                if (isStr(selector)) return rootSelect.find(selector);

                if (selector.nodeType) {
                    this[0] = selector;
                    this.length = 1;
                }
            },
            find: function(selector) {
                var ret = new exports();
                this.each(function() {
                    mergeArr(ret, this.querySelectorAll(selector));
                });
                return ret;
            },
            each: function(fn) {
                each(this, function(element, idx) {
                    fn.call(element, idx, element);
                });
                return this;
            }
        });
        var rootSelect = new exports(document);

        return exports;
    })({});

    /* ------------------------------ $safeEls ------------------------------ */

    var $safeEls = _.$safeEls = (function (exports) {
        /* Convert value into an array, if it's a string, do querySelector.
         *
         * |Name  |Desc             |
         * |------|-----------------|
         * |val   |Value to convert |
         * |return|Array of elements|
         */

        /* example
         * $safeEls(document.querySelector('.test'));
         * $safeEls(document.querySelectorAll('.test'));
         * $safeEls('.test'); // -> Array of elements with test class
         */

        /* typescript
         * export declare namespace $safeEls {
         *     type El = Element | Element[] | NodeListOf<Element> | string;
         * }
         * export declare function $safeEls(val: $safeEls.El): Element[];
         */

        /* dependencies
         * isStr toArr Select 
         */

        exports = function(val) {
            return toArr(isStr(val) ? new Select(val) : val);
        };

        return exports;
    })({});

    /* ------------------------------ $attr ------------------------------ */

    var $attr = _.$attr = (function (exports) {
        /* Element attribute manipulation.
         *
         * Get the value of an attribute for the first element in the set of matched elements.
         *
         * |Name   |Desc                            |
         * |-------|--------------------------------|
         * |element|Elements to manipulate          |
         * |name   |Attribute name                  |
         * |return |Attribute value of first element|
         *
         * Set one or more attributes for the set of matched elements.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to manipulate|
         * |name   |Attribute name        |
         * |val    |Attribute value       |
         *
         * |Name      |Desc                                  |
         * |----------|--------------------------------------|
         * |element   |Elements to manipulate                |
         * |attributes|Object of attribute-value pairs to set|
         *
         * ### remove
         *
         * Remove an attribute from each element in the set of matched elements.
         *
         * |Name   |Desc                  |
         * |-------|----------------------|
         * |element|Elements to manipulate|
         * |name   |Attribute name        |
         */

        /* example
         * $attr('#test', 'attr1', 'test');
         * $attr('#test', 'attr1'); // -> test
         * $attr.remove('#test', 'attr1');
         * $attr('#test', {
         *     attr1: 'test',
         *     attr2: 'test'
         * });
         */

        /* typescript
         * export declare namespace $attr {
         *     function remove(element: $safeEls.El, name: string): void;
         * }
         * export declare function $attr(
         *     element: $safeEls.El,
         *     name: string,
         *     value: string
         * ): void;
         * export declare function $attr(
         *     element: $safeEls.El,
         *     attributes: types.PlainObj<string>
         * ): void;
         * export declare function $attr(element: $safeEls.El, name: string): string;
         */

        /* dependencies
         * toArr isObj isStr each isUndef $safeEls types 
         */

        exports = function(els, name, val) {
            els = $safeEls(els);
            var isGetter = isUndef(val) && isStr(name);
            if (isGetter) return getAttr(els[0], name);
            var attrs = name;

            if (!isObj(attrs)) {
                attrs = {};
                attrs[name] = val;
            }

            setAttr(els, attrs);
        };

        exports.remove = function(els, names) {
            els = $safeEls(els);
            names = toArr(names);
            each(els, function(node) {
                each(names, function(name) {
                    node.removeAttribute(name);
                });
            });
        };

        function getAttr(el, name) {
            return el.getAttribute(name);
        }

        function setAttr(els, attrs) {
            each(els, function(el) {
                each(attrs, function(val, name) {
                    el.setAttribute(name, val);
                });
            });
        }

        return exports;
    })({});

    /* ------------------------------ $data ------------------------------ */

    var $data = _.$data = (function (exports) {
        /* Wrapper of $attr, adds data- prefix to keys.
         */

        /* example
         * $data('#test', 'attr1', 'eustia');
         */

        /* typescript
         * export declare function $data(
         *     element: $safeEls.El,
         *     name: string,
         *     value: string
         * ): void;
         * export declare function $data(
         *     element: $safeEls.El,
         *     attributes: types.PlainObj<string>
         * ): void;
         * export declare function $data(element: $safeEls.El, name: string): string;
         */

        /* eslint-disable no-unused-vars */

        /* dependencies
         * $attr isStr isObj each $safeEls types 
         */

        exports = function(nodes, name, val) {
            var dataName = name;
            if (isStr(name)) dataName = 'data-' + name;

            if (isObj(name)) {
                dataName = {};
                each(name, function(val, key) {
                    dataName['data-' + key] = val;
                });
            }

            return $attr(nodes, dataName, val);
        };

        return exports;
    })({});

    /* ------------------------------ delegate ------------------------------ */

    var delegate = _.delegate = (function (exports) {
        /* Event delegation.
         *
         * ### add
         *
         * Add event delegation.
         *
         * |Name    |Desc          |
         * |--------|--------------|
         * |el      |Parent element|
         * |type    |Event type    |
         * |selector|Match selector|
         * |cb      |Event callback|
         *
         * ### remove
         *
         * Remove event delegation.
         */

        /* example
         * const container = document.getElementById('container');
         * function clickHandler() {
         *     // Do something...
         * }
         * delegate.add(container, 'click', '.children', clickHandler);
         * delegate.remove(container, 'click', '.children', clickHandler);
         */

        /* typescript
         * export declare const delegate: {
         *     add(el: Element, type: string, selector: string, cb: types.AnyFn): void;
         *     remove(el: Element, type: string, selector: string, cb: types.AnyFn): void;
         * };
         */

        /* dependencies
         * Class contain types 
         */

        function retTrue() {
            return true;
        }

        function retFalse() {
            return false;
        }

        function trigger(e) {
            var handlers = this.events[e.type];
            var handler;
            var handlerQueue = formatHandlers.call(this, e, handlers);
            e = new exports.Event(e);
            var i = 0,
                j,
                matched,
                ret;

            while ((matched = handlerQueue[i++]) && !e.isPropagationStopped()) {
                e.curTarget = matched.el;
                j = 0;

                while (
                    (handler = matched.handlers[j++]) &&
                    !e.isImmediatePropagationStopped()
                ) {
                    ret = handler.handler.apply(matched.el, [e]);

                    if (ret === false) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        }

        function formatHandlers(e, handlers) {
            var current = e.target;
            var ret = [];
            var delegateCount = handlers.delegateCount;
            var selector;
            var matches;
            var handler;
            var i;

            if (current.nodeType) {
                for (; current !== this; current = current.parentNode || this) {
                    matches = [];

                    for (i = 0; i < delegateCount; i++) {
                        handler = handlers[i];
                        selector = handler.selector + ' ';

                        if (matches[selector] === undefined) {
                            matches[selector] = contain(
                                this.querySelectorAll(selector),
                                current
                            );
                        }

                        if (matches[selector]) matches.push(handler);
                    }

                    if (matches.length)
                        ret.push({
                            el: current,
                            handlers: matches
                        });
                }
            }

            if (delegateCount < handlers.length) {
                ret.push({
                    el: this,
                    handlers: handlers.slice(delegateCount)
                });
            }

            return ret;
        }

        exports = {
            add: function(el, type, selector, fn) {
                var handler = {
                    selector: selector,
                    handler: fn
                };
                var handlers;
                if (!el.events) el.events = {};

                if (!(handlers = el.events[type])) {
                    handlers = el.events[type] = [];
                    handlers.delegateCount = 0;
                    el.addEventListener(
                        type,
                        function() {
                            trigger.apply(el, arguments);
                        },
                        false
                    );
                }

                selector
                    ? handlers.splice(handlers.delegateCount++, 0, handler)
                    : handlers.push(handler);
            },
            remove: function(el, type, selector, fn) {
                var events = el.events;
                if (!events || !events[type]) return;
                var handlers = events[type];
                var i = handlers.length;
                var handler;

                while (i--) {
                    handler = handlers[i];

                    if (
                        (!selector || handler.selector == selector) &&
                        handler.handler == fn
                    ) {
                        handlers.splice(i, 1);

                        if (handler.selector) {
                            handlers.delegateCount--;
                        }
                    }
                }
            },
            Event: Class({
                className: 'Event',
                initialize: function Event(e) {
                    this.origEvent = e;
                },
                isDefaultPrevented: retFalse,
                isPropagationStopped: retFalse,
                isImmediatePropagationStopped: retFalse,
                preventDefault: function() {
                    var e = this.origEvent;
                    this.isDefaultPrevented = retTrue;
                    if (e && e.preventDefault) e.preventDefault();
                },
                stopPropagation: function() {
                    var e = this.origEvent;
                    this.isPropagationStopped = retTrue;
                    if (e && e.stopPropagation) e.stopPropagation();
                },
                stopImmediatePropagation: function() {
                    var e = this.origEvent;
                    this.isImmediatePropagationStopped = retTrue;
                    if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
                    this.stopPropagation();
                }
            })
        };

        return exports;
    })({});

    /* ------------------------------ $event ------------------------------ */

    var $event = _.$event = (function (exports) {
        /* bind events to certain dom elements.
         */

        /* example
         * function clickHandler() {
         *     // Do something...
         * }
         * $event.on('#test', 'click', clickHandler);
         * $event.off('#test', 'click', clickHandler);
         */

        /* typescript
         * export declare const $event: {
         *     on(
         *         element: $safeEls.El,
         *         event: string,
         *         selector: string,
         *         handler: types.AnyFn
         *     ): void;
         *     on(element: $safeEls.El, event: string, handler: types.AnyFn): void;
         *     off(
         *         element: $safeEls.El,
         *         event: string,
         *         selector: string,
         *         handler: types.AnyFn
         *     ): void;
         *     off(element: $safeEls.El, event: string, handler: types.AnyFn): void;
         * };
         */

        /* dependencies
         * delegate isUndef $safeEls each types 
         */

        exports = {
            on: eventFactory('add'),
            off: eventFactory('remove')
        };

        function eventFactory(type) {
            return function(nodes, event, selector, handler) {
                nodes = $safeEls(nodes);

                if (isUndef(handler)) {
                    handler = selector;
                    selector = undefined;
                }

                each(nodes, function(node) {
                    delegate[type](node, event, selector, handler);
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ rtrim ------------------------------ */

    var rtrim = _.rtrim = (function (exports) {
        /* Remove chars or white-spaces from end of string.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to trim    |
         * |chars |Characters to trim|
         * |return|Trimmed string    |
         */

        /* example
         * rtrim(' abc  '); // -> ' abc'
         * rtrim('_abc_', '_'); // -> '_abc'
         * rtrim('_abc_', ['c', '_']); // -> '_ab'
         */

        /* typescript
         * export declare function rtrim(str: string, chars?: string | string[]): string;
         */
        exports = function(str, chars) {
            if (chars == null) {
                if (str.trimRight) {
                    return str.trimRight();
                }

                chars = ' \r\n\t\f\v';
            }

            var end = str.length - 1;
            var charLen = chars.length;
            var found = true;
            var i;
            var c;

            while (found && end >= 0) {
                found = false;
                i = -1;
                c = str.charAt(end);

                while (++i < charLen) {
                    if (c === chars[i]) {
                        found = true;
                        end--;
                        break;
                    }
                }
            }

            return end >= 0 ? str.substring(0, end + 1) : '';
        };

        return exports;
    })({});

    /* ------------------------------ trim ------------------------------ */

    var trim = _.trim = (function (exports) {
        /* Remove chars or white-spaces from beginning end of string.
         *
         * |Name  |Desc              |
         * |------|------------------|
         * |str   |String to trim    |
         * |chars |Characters to trim|
         * |return|Trimmed string    |
         */

        /* example
         * trim(' abc  '); // -> 'abc'
         * trim('_abc_', '_'); // -> 'abc'
         * trim('_abc_', ['a', 'c', '_']); // -> 'b'
         */

        /* typescript
         * export declare function trim(str: string, chars?: string | string[]): string;
         */

        /* dependencies
         * ltrim rtrim 
         */

        exports = function(str, chars) {
            if (chars == null && str.trim) {
                return str.trim();
            }

            return ltrim(rtrim(str, chars), chars);
        };

        return exports;
    })({});

    /* ------------------------------ query ------------------------------ */

    var query = _.query = (function (exports) {
        /* Parse and stringify url query strings.
         *
         * ### parse
         *
         * Parse a query string into an object.
         *
         * |Name  |Desc        |
         * |------|------------|
         * |str   |Query string|
         * |return|Query object|
         *
         * ### stringify
         *
         * Stringify an object into a query string.
         *
         * |Name  |Desc        |
         * |------|------------|
         * |obj   |Query object|
         * |return|Query string|
         */

        /* example
         * query.parse('foo=bar&eruda=true'); // -> {foo: 'bar', eruda: 'true'}
         * query.stringify({ foo: 'bar', eruda: 'true' }); // -> 'foo=bar&eruda=true'
         * query.parse('name=eruda&name=eustia'); // -> {name: ['eruda', 'eustia']}
         */

        /* typescript
         * export declare const query: {
         *     parse(str: string): any;
         *     stringify(object: any): string;
         * };
         */

        /* dependencies
         * trim each isUndef isArr map isEmpty filter isObj 
         */

        exports = {
            parse: function(str) {
                var ret = {};
                str = trim(str).replace(regIllegalChars, '');
                each(str.split('&'), function(param) {
                    var parts = param.split('=');
                    var key = parts.shift(),
                        val = parts.length > 0 ? parts.join('=') : null;
                    key = decodeURIComponent(key);
                    val = decodeURIComponent(val);

                    if (isUndef(ret[key])) {
                        ret[key] = val;
                    } else if (isArr(ret[key])) {
                        ret[key].push(val);
                    } else {
                        ret[key] = [ret[key], val];
                    }
                });
                return ret;
            },
            stringify: function(obj, arrKey) {
                return filter(
                    map(obj, function(val, key) {
                        if (isObj(val) && isEmpty(val)) return '';
                        if (isArr(val)) return exports.stringify(val, key);
                        return (
                            (arrKey
                                ? encodeURIComponent(arrKey)
                                : encodeURIComponent(key)) +
                            '=' +
                            encodeURIComponent(val)
                        );
                    }),
                    function(str) {
                        return str.length > 0;
                    }
                ).join('&');
            }
        };
        var regIllegalChars = /^(\?|#|&)/g;

        return exports;
    })({});

    /* ------------------------------ Url ------------------------------ */

    var Url = _.Url = (function (exports) {
        /* Simple url manipulator.
         *
         * ### constructor
         *
         * |Name        |Desc      |
         * |------------|----------|
         * |url=location|Url string|
         *
         * ### setQuery
         *
         * Set query value.
         *
         * |Name  |Desc       |
         * |------|-----------|
         * |name  |Query name |
         * |val   |Query value|
         * |return|this       |
         *
         * |Name  |Desc        |
         * |------|------------|
         * |query |query object|
         * |return|this        |
         *
         * ### rmQuery
         *
         * Remove query value.
         *
         * |Name  |Desc      |
         * |------|----------|
         * |name  |Query name|
         * |return|this      |
         *
         * ### parse
         *
         * [static] Parse url into an object.
         *
         * |Name  |Desc      |
         * |------|----------|
         * |url   |Url string|
         * |return|Url object|
         *
         * ### stringify
         *
         * [static] Stringify url object into a string.
         *
         * |Name  |Desc      |
         * |------|----------|
         * |url   |Url object|
         * |return|Url string|
         *
         * An url object contains the following properties:
         *
         * |Name    |Desc                                                                                  |
         * |--------|--------------------------------------------------------------------------------------|
         * |protocol|The protocol scheme of the URL (e.g. http:)                                           |
         * |slashes |A boolean which indicates whether the protocol is followed by two forward slashes (//)|
         * |auth    |Authentication information portion (e.g. username:password)                           |
         * |hostname|Host name without port number                                                         |
         * |port    |Optional port number                                                                  |
         * |pathname|URL path                                                                              |
         * |query   |Parsed object containing query string                                                 |
         * |hash    |The "fragment" portion of the URL including the pound-sign (#)                        |
         */

        /* example
         * const url = new Url('http://example.com:8080?eruda=true');
         * console.log(url.port); // -> '8080'
         * url.query.foo = 'bar';
         * url.rmQuery('eruda');
         * url.toString(); // -> 'http://example.com:8080/?foo=bar'
         */

        /* typescript
         * export declare namespace Url {
         *     interface IUrl {
         *         protocol: string;
         *         auth: string;
         *         hostname: string;
         *         hash: string;
         *         query: any;
         *         port: string;
         *         pathname: string;
         *         slashes: boolean;
         *     }
         * }
         * export declare class Url {
         *     protocol: string;
         *     auth: string;
         *     hostname: string;
         *     hash: string;
         *     query: any;
         *     port: string;
         *     pathname: string;
         *     slashes: boolean;
         *     constructor(url?: string);
         *     setQuery(name: string, val: string | number): Url;
         *     setQuery(query: types.PlainObj<string | number>): Url;
         *     rmQuery(name: string | string[]): Url;
         *     toString(): string;
         *     static parse(url: string): Url.IUrl;
         *     static stringify(object: Url.IUrl): string;
         * }
         */

        /* dependencies
         * Class extend trim query isEmpty each isArr toArr isBrowser isObj types toStr 
         */

        exports = Class(
            {
                className: 'Url',
                initialize: function(url) {
                    if (!url && isBrowser) url = window.location.href;
                    extend(this, exports.parse(url || ''));
                },
                setQuery: function(name, val) {
                    var query = this.query;

                    if (isObj(name)) {
                        each(name, function(val, key) {
                            query[key] = toStr(val);
                        });
                    } else {
                        query[name] = toStr(val);
                    }

                    return this;
                },
                rmQuery: function(name) {
                    var query = this.query;
                    if (!isArr(name)) name = toArr(name);
                    each(name, function(key) {
                        delete query[key];
                    });
                    return this;
                },
                toString: function() {
                    return exports.stringify(this);
                }
            },
            {
                parse: function(url) {
                    var ret = {
                        protocol: '',
                        auth: '',
                        hostname: '',
                        hash: '',
                        query: {},
                        port: '',
                        pathname: '',
                        slashes: false
                    };
                    var rest = trim(url);
                    var slashes = false;
                    var proto = rest.match(regProto);

                    if (proto) {
                        proto = proto[0];
                        ret.protocol = proto.toLowerCase();
                        rest = rest.substr(proto.length);
                    }

                    if (proto) {
                        slashes = rest.substr(0, 2) === '//';

                        if (slashes) {
                            rest = rest.slice(2);
                            ret.slashes = true;
                        }
                    }

                    if (slashes) {
                        var host = rest;
                        var hostEnd = -1;

                        for (var i = 0, len = hostEndingChars.length; i < len; i++) {
                            var pos = rest.indexOf(hostEndingChars[i]);
                            if (pos !== -1 && (hostEnd === -1 || pos < hostEnd))
                                hostEnd = pos;
                        }

                        if (hostEnd > -1) {
                            host = rest.slice(0, hostEnd);
                            rest = rest.slice(hostEnd);
                        }

                        var atSign = host.lastIndexOf('@');

                        if (atSign !== -1) {
                            ret.auth = decodeURIComponent(host.slice(0, atSign));
                            host = host.slice(atSign + 1);
                        }

                        ret.hostname = host;
                        var port = host.match(regPort);

                        if (port) {
                            port = port[0];
                            if (port !== ':') ret.port = port.substr(1);
                            ret.hostname = host.substr(0, host.length - port.length);
                        }
                    }

                    var hash = rest.indexOf('#');

                    if (hash !== -1) {
                        ret.hash = rest.substr(hash);
                        rest = rest.slice(0, hash);
                    }

                    var queryMark = rest.indexOf('?');

                    if (queryMark !== -1) {
                        ret.query = query.parse(rest.substr(queryMark + 1));
                        rest = rest.slice(0, queryMark);
                    }

                    ret.pathname = rest || '/';
                    return ret;
                },
                stringify: function(obj) {
                    var ret =
                        obj.protocol +
                        (obj.slashes ? '//' : '') +
                        (obj.auth ? encodeURIComponent(obj.auth) + '@' : '') +
                        obj.hostname +
                        (obj.port ? ':' + obj.port : '') +
                        obj.pathname;
                    if (!isEmpty(obj.query)) ret += '?' + query.stringify(obj.query);
                    if (obj.hash) ret += obj.hash;
                    return ret;
                }
            }
        );
        var regProto = /^([a-z0-9.+-]+:)/i;
        var regPort = /:[0-9]*$/;
        var hostEndingChars = ['/', '?', '#'];

        return exports;
    })({});

    /* ------------------------------ ajax ------------------------------ */

    var ajax = _.ajax = (function (exports) {
        /* Perform an asynchronous HTTP request.
         *
         * |Name   |Desc        |
         * |-------|------------|
         * |options|Ajax options|
         *
         * Available options:
         *
         * |Name                                         |Desc                       |
         * |---------------------------------------------|---------------------------|
         * |type=get                                     |Request type               |
         * |url                                          |Request url                |
         * |data                                         |Request data               |
         * |dataType=json                                |Response type(json, xml)   |
         * |contentType=application/x-www-form-urlencoded|Request header Content-Type|
         * |success                                      |Success callback           |
         * |error                                        |Error callback             |
         * |complete                                     |Callback after request     |
         * |timeout                                      |Request timeout            |
         *
         * ### get
         *
         * Shortcut for type = GET;
         *
         * ### post
         *
         * Shortcut for type = POST;
         *
         * |Name    |Desc            |
         * |--------|----------------|
         * |url     |Request url     |
         * |data    |Request data    |
         * |success |Success callback|
         * |dataType|Response type   |
         */

        /* example
         * ajax({
         *     url: 'http://example.com',
         *     data: { test: 'true' },
         *     error() {},
         *     success(data) {
         *         // ...
         *     },
         *     dataType: 'json'
         * });
         *
         * ajax.get('http://example.com', {}, function(data) {
         *     // ...
         * });
         */

        /* typescript
         * export declare namespace ajax {
         *     function get(
         *         url: string,
         *         data: string | {},
         *         success: types.AnyFn,
         *         dataType?: string
         *     ): XMLHttpRequest;
         *     function get(
         *         url: string,
         *         success: types.AnyFn,
         *         dataType?: string
         *     ): XMLHttpRequest;
         *     function post(
         *         url: string,
         *         data: string | {},
         *         success: types.AnyFn,
         *         dataType?: string
         *     ): XMLHttpRequest;
         *     function post(
         *         url: string,
         *         success: types.AnyFn,
         *         dataType?: string
         *     ): XMLHttpRequest;
         * }
         * export declare function ajax(options: {
         *     type?: string;
         *     url: string;
         *     data?: string | {};
         *     dataType?: string;
         *     contentType?: string;
         *     success?: types.AnyFn;
         *     error?: types.AnyFn;
         *     complete?: types.AnyFn;
         *     timeout?: number;
         * }): XMLHttpRequest;
         */

        /* dependencies
         * isFn noop defaults isObj query types 
         */

        exports = function(options) {
            defaults(options, exports.setting);
            var type = options.type;
            var url = options.url;
            var data = options.data;
            var dataType = options.dataType;
            var success = options.success;
            var error = options.error;
            var timeout = options.timeout;
            var complete = options.complete;
            var xhr = options.xhr();
            var abortTimeout;

            xhr.onreadystatechange = function() {
                if (xhr.readyState !== 4) return;
                clearTimeout(abortTimeout);
                var result;
                var status = xhr.status;

                if ((status >= 200 && status < 300) || status === 304) {
                    result = xhr.responseText;
                    if (dataType === 'xml') result = xhr.responseXML;

                    try {
                        if (dataType === 'json') result = JSON.parse(result);
                        /* eslint-disable no-empty */
                    } catch (e) {}

                    success(result, xhr);
                } else {
                    error(xhr);
                }

                complete(xhr);
            };

            if (type === 'GET') {
                data = query.stringify(data);
                if (data) url += url.indexOf('?') > -1 ? '&' + data : '?' + data;
            } else if (options.contentType === 'application/x-www-form-urlencoded') {
                if (isObj(data)) data = query.stringify(data);
            } else if (options.contentType === 'application/json') {
                if (isObj(data)) data = JSON.stringify(data);
            }

            xhr.open(type, url, true);
            xhr.setRequestHeader('Content-Type', options.contentType);

            if (timeout > 0) {
                abortTimeout = setTimeout(function() {
                    xhr.onreadystatechange = noop;
                    xhr.abort();
                    error(xhr, 'timeout');
                    complete(xhr);
                }, timeout);
            }

            xhr.send(type === 'GET' ? null : data);
            return xhr;
        };

        exports.setting = {
            type: 'GET',
            success: noop,
            error: noop,
            complete: noop,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded',
            data: {},
            xhr: function() {
                return new XMLHttpRequest();
            },
            timeout: 0
        };

        exports.get = function() {
            return exports(parseArgs.apply(null, arguments));
        };

        exports.post = function() {
            var options = parseArgs.apply(null, arguments);
            options.type = 'POST';
            return exports(options);
        };

        function parseArgs(url, data, success, dataType) {
            if (isFn(data)) {
                dataType = success;
                success = data;
                data = {};
            }

            return {
                url: url,
                data: data,
                success: success,
                dataType: dataType
            };
        }

        return exports;
    })({});

    /* ------------------------------ index ------------------------------ */

    (function () {
        /* dependencies
         * $event raf Class $data ajax upperFirst Url toEl 
         */

        console.log.apply(console, [
            '%c %c %c Hello, this is Eruda :) %c %c ',
            'background: #707d8b; padding:5px 0;',
            'background: #707d8b; padding:5px 0;',
            'color: #fff; background: #76a2ee; padding: 5px 0;',
            'background: #707d8b; padding:5px 0;',
            'background: #707d8b; padding:5px 0;'
        ]);

        $event.on('#error-btn', 'click', function() {
            console.clear();
            try {
                triggerError();
            } catch (e) {
                eruda.show().show('console');
                throw e;
            }
        });

        $event.on('#ajax-btn', 'click', function() {
            ajax.get('test.json');
            eruda.show().show('network');
        });

        var differentLogs = true;

        $event.on('#log-btn', 'click', function() {
            differentLogs ? logDifferently() : logMassively();
            differentLogs = !differentLogs;
            eruda.show().show('console');
        });

        function logDifferently() {
            console.clear();
            console.log('log');
            for (let i = 0; i < 10; i++) {
                console.log('repeat log');
            }
            console.warn('warn');
            console.error(Error('test'));
            console.info('info');
            console.debug('debug');
            console.time('test');
            console.timeEnd('test');
            console.count('luna');
            console.count('luna');
            console.assert(true, 'assert msg');
            var site1 = { name: 'Runoob', site: 'www.runoob.com' };
            var site2 = { name: 'Google', site: 'www.google.com' };
            var site3 = { name: 'Taobao', site: 'www.taobao.com' };
            console.table([site1, site2, site3], ['site']);
            const el = toEl(
                '<div class="test"><div class="test-inner"></div></div>'
            );
            console.log('test dom', el);
            console.dir(el);
            console.log('%c Oh my heavens!', 'background: #222; color: #bada55');
            console.log('This is the outer level');
            console.group();
            console.log('Level 2');
            console.group();
            console.log('Level 3');
            console.warn('More of level 3');
            console.groupEnd();
            console.log('Back to level 2');
            console.groupEnd();
            console.log('Back to the outer level');
            console.log(
                'navigator: %o location: %o performance: %o',
                navigator,
                location,
                performance
            );
            var arr = [];
            for (var i = 0; i < 10000; i++) arr.push(i);
            console.log(arr);
        }

        function logMassively() {
            console.clear();
            for (var i = 0; i < 10000; i++) {
                console.log('Number: ', i);
            }
        }

        $event.on('.plugins li', 'click', function() {
            showPlugin($data(this, 'plugin'));
        });

        function showPlugin(plugin) {
            eruda.show();
            if (eruda.get(plugin)) eruda.show(plugin);
            eruda.get('snippets').run('Load ' + upperFirst(plugin) + ' Plugin');
        }

        var url = new Url();
        if (url.query.plugin) showPlugin(url.query.plugin);

        // http://codepen.io/towc/pen/mJzOWJ/
        var c = document.getElementById('c');
        var w = (c.width = getCanvasWidth()),
            h = (c.height = 210),
            ctx = c.getContext('2d'),
            opts = {
                len: 20,
                count: 50,
                baseTime: 10,
                addedTime: 10,
                dieChance: 0.05,
                spawnChance: 1,
                sparkChance: 0.1,
                sparkDist: 10,
                sparkSize: 2,
                color: 'hsl(hue,100%,light%)',
                baseLight: 50,
                addedLight: 10, // [50-10,50+10]
                shadowToTimePropMult: 6,
                baseLightInputMultiplier: 0.01,
                addedLightInputMultiplier: 0.02,
                cx: w / 2,
                cy: h / 2,
                repaintAlpha: 0.04,
                hueChange: 0.1
            },
            tick = 0,
            lines = [],
            dieX = w / 2 / opts.len,
            dieY = h / 2 / opts.len,
            baseRad = (Math.PI * 2) / 6;

        ctx.fillStyle = '#eda29b';
        ctx.fillRect(0, 0, w, h);

        function loop() {
            raf(loop);

            ++tick;

            ctx.globalCompositeOperation = 'source-over';
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(237, 162, 155,alp)'.replace('alp', opts.repaintAlpha);
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'lighter';

            if (lines.length < opts.count && Math.random() < opts.spawnChance)
                lines.push(new Line());

            lines.map(function(line) {
                line.step();
            });
        }

        var Line = Class({
            className: 'Line',
            initialize: function() {
                this.reset();
            },
            reset: function() {
                this.x = 0;
                this.y = 0;
                this.addedX = 0;
                this.addedY = 0;

                this.rad = 0;

                this.lightInputMultiplier =
                    opts.baseLightInputMultiplier +
                    opts.addedLightInputMultiplier * Math.random();

                this.color = opts.color.replace('hue', tick * opts.hueChange);
                this.cumulativeTime = 0;

                this.beginPhase();
            },
            beginPhase: function() {
                this.x += this.addedX;
                this.y += this.addedY;

                this.time = 0;
                this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;

                this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
                this.addedX = Math.cos(this.rad);
                this.addedY = Math.sin(this.rad);

                if (
                    Math.random() < opts.dieChance ||
                    this.x > dieX ||
                    this.x < -dieX ||
                    this.y > dieY ||
                    this.y < -dieY
                ) {
                    this.reset();
                }
            },
            step: function() {
                ++this.time;
                ++this.cumulativeTime;

                if (this.time >= this.targetTime) this.beginPhase();

                var prop = this.time / this.targetTime,
                    wave = Math.sin((prop * Math.PI) / 2),
                    x = this.addedX * wave,
                    y = this.addedY * wave;

                ctx.shadowBlur = prop * opts.shadowToTimePropMult;
                ctx.fillStyle = ctx.shadowColor = this.color.replace(
                    'light',
                    opts.baseLight +
                        opts.addedLight *
                            Math.sin(this.cumulativeTime * this.lightInputMultiplier)
                );
                ctx.fillRect(
                    opts.cx + (this.x + x) * opts.len,
                    opts.cy + (this.y + y) * opts.len,
                    2,
                    2
                );

                if (Math.random() < opts.sparkChance)
                    ctx.fillRect(
                        opts.cx +
                            (this.x + x) * opts.len +
                            Math.random() *
                                opts.sparkDist *
                                (Math.random() < 0.5 ? 1 : -1) -
                            opts.sparkSize / 2,
                        opts.cy +
                            (this.y + y) * opts.len +
                            Math.random() *
                                opts.sparkDist *
                                (Math.random() < 0.5 ? 1 : -1) -
                            opts.sparkSize / 2,
                        opts.sparkSize,
                        opts.sparkSize
                    );
            }
        });

        loop();

        window.addEventListener('resize', function() {
            w = c.width = getCanvasWidth();
            h = c.height = 210;
            ctx.fillStyle = '#eda29b';
            ctx.fillRect(0, 0, w, h);

            opts.cx = w / 2;
            opts.cy = h / 2;

            dieX = w / 2 / opts.len;
            dieY = h / 2 / opts.len;
        });

        function getCanvasWidth() {
            return window.innerWidth > 800 ? 800 : window.innerWidth;
        }
    })();

    return _;
})();