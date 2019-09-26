_('$event raf Class $data ajax upperFirst Url');

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

$event.on('#log-btn', 'click', function() {
    console.clear();
    console.log('log');
    console.warn('warn');
    console.error(Error('test'));
    console.info('info');
    console.debug('debug');
    console.dir(document.createElement('div'));
    console.time('test');
    console.timeEnd('test');
    console.count('eruda');
    console.count('eruda');
    console.assert(true, 'assert msg');
    var site1 = { name: 'Runoob', site: 'www.runoob.com' };
    var site2 = { name: 'Google', site: 'www.google.com' };
    var site3 = { name: 'Taobao', site: 'www.taobao.com' };
    console.table([site1, site2, site3], ['site']);
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
    console.log(navigator);
    console.log(location);
    console.log(performance);
    var arr = [];
    for (var i = 0; i < 10000; i++) arr.push(i);
    console.log(arr);
    eruda.show().show('console');
});

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
