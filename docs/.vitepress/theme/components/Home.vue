<script setup>
import { ref, onMounted } from 'vue'
import ajax from 'licia/ajax'
import upperFirst from 'licia/upperFirst'
import getUrlParam from 'licia/getUrlParam'
import initCanvas from '../lib/canvas'

const canvas = ref(null)

onMounted(() => {
  initCanvas(canvas.value)
})

console.log.apply(console, [
  '%c %c %c Hello, this is Eruda :) %c %c ',
  'background: #707d8b; padding:5px 0;',
  'background: #707d8b; padding:5px 0;',
  'color: #fff; background: #76a2ee; padding: 5px 0;',
  'background: #707d8b; padding:5px 0;',
  'background: #707d8b; padding:5px 0;',
])

function triggerErr() {
  console.clear()
  try {
    triggerError()
  } catch (e) {
    eruda.show().show('console')
    throw e
  }
}

function sendAjaxRequest() {
  ajax.get('/test.json')
  eruda.show().show('network')
}

let differentLogs = true
function logMessage() {
  differentLogs ? logDifferently() : logMassively()
  differentLogs = !differentLogs
  eruda.show().show('console')
}

async function logDifferently() {
  console.clear()
  console.log('log')
  console.log('number:', 5)
  console.log('boolean:', true, false)
  console.log('null:', null)
  console.log('undefined:', undefined)
  console.log('regexp:', /test/gi)
  for (var i = 0; i < 10; i++) {
    console.log('repeat log')
  }
  console.warn('warn')
  console.error(Error('test'))
  console.info('info')
  console.debug('debug')
  console.time('test')
  console.timeEnd('test')
  console.count('luna')
  console.count('luna')
  console.assert(true, 'assert msg')
  var site1 = { name: 'Runoob', site: 'www.runoob.com' }
  var site2 = { name: 'Google', site: 'www.google.com' }
  var site3 = { name: 'Taobao', site: 'www.taobao.com' }
  console.table([site1, site2, site3], ['site'])
  const toEl = await import('licia/toEl')
  var el = toEl.default(
    '<div class="test"><div class="test-inner"></div></div>'
  )
  console.log('test dom', el)
  console.dir(el)
  console.log('%c Oh my heavens!', 'background: #222; color: #bada55')
  console.log('This is the outer level')
  console.group()
  console.log('Level 2')
  console.group()
  console.log('Level 3')
  console.warn('More of level 3')
  console.groupEnd()
  console.log('Back to level 2')
  console.groupEnd()
  console.log('Back to the outer level')
  console.log(
    'navigator: %o location: %o performance: %o',
    navigator,
    location,
    performance
  )
  var arr = []
  for (var i = 0; i < 10000; i++) arr.push(i)
  console.log(arr)
}

function logMassively() {
  console.clear()
  for (var i = 0; i < 10000; i++) {
    console.log('Number: ', i)
  }
}

function showPlugin(plugin) {
  if (typeof eruda === 'undefined') {
    return
  }

  eruda.show()
  if (eruda.get(plugin)) {
    eruda.show(plugin)
  }
  eruda.get('snippets').run('Load ' + upperFirst(plugin) + ' Plugin')
}

const plugin = getUrlParam('plugin')
if (plugin) {
  setTimeout(() => showPlugin(plugin), 2000)
}
</script>

<template>
  <div class="container">
    <header class="header">
      <canvas id="c" ref="canvas"></canvas>
      <img src="/banner-bg.png" alt="Eruda" />
      <h1 class="title">Eruda</h1>
      <h2 class="subtitle">Console for Mobile Browsers</h2>
    </header>
    <svg
      id="triangle"
      width="800"
      height="70"
      viewBox="0,0,80,5"
      preserveAspectRatio="none"
    >
      <polygon
        points="0,0 0,5 80,5 80,0 60,5 20,5"
        style="fill: var(--vp-c-bg)"
      />
    </svg>
    <p class="hint">Click the right bottom button to inspect this page!</p>
    <ul class="buttons">
      <li
        id="error-btn"
        class="yellow"
        @click="triggerErr"
        style="z-index: 10"
        ontouchstart
      >
        Trigger Error
      </li>
      <li
        id="ajax-btn"
        class="orange"
        @click="sendAjaxRequest"
        style="z-index: 9"
        ontouchstart
      >
        Send Ajax Request
      </li>
      <li
        id="log-btn"
        class="purple"
        @click="logMessage"
        style="z-index: 8"
        ontouchstart
      >
        Log Message
      </li>
    </ul>
    <h2 class="plugin-title">PLUGINS</h2>
    <ul class="plugins">
      <li @click="showPlugin('monitor')">
        <h3 style="border-top: 5px solid #212121">MONITOR</h3>
        <p>Display fps and memory</p>
      </li>
      <li @click="showPlugin('features')">
        <h3 style="border-top: 5px solid #424242">FEATURES</h3>
        <p>Browser feature detections</p>
      </li>
      <li @click="showPlugin('benchmark')">
        <h3 style="border-top: 5px solid #424242">BENCHMARK</h3>
        <p>Run JavaScript benchmarks</p>
      </li>
      <li @click="showPlugin('geolocation')">
        <h3 style="border-top: 5px solid #424242">GEOLOCATION</h3>
        <p>Test geolocation</p>
      </li>
      <li @click="showPlugin('timing')">
        <h3 style="border-top: 5px solid #616161">TIMING</h3>
        <p>Show performance and resource timing</p>
      </li>
      <li @click="showPlugin('code')">
        <h3 style="border-top: 5px solid #9e9e9e">CODE</h3>
        <p>Edit and run JavaScript</p>
      </li>
      <li @click="showPlugin('orientation')">
        <h3 style="border-top: 5px solid #9e9e9e">ORIENTATION</h3>
        <p>Test orientation api</p>
      </li>
      <li @click="showPlugin('touches')">
        <h3 style="border-top: 5px solid #9e9e9e">TOUCHES</h3>
        <p>Visualize screen touches</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  background: var(--vp-c-bg);
  margin: 0 auto;
  padding-bottom: 20px;
}
.header {
  background: #b2bfd9;
  position: relative;
  margin: 0;
  padding: 30px 0 40px 0;
  color: #fff;
}
#c {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
.header img {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}
#triangle {
  width: 100%;
  position: relative;
  top: -50px;
  margin-bottom: -25px;
}
.title,
.subtitle,
.hint,
.plugin-title,
.plugins {
  font-family: 'Avenir Next', Avenir, 'Helvetica Neue', Helvetica,
    'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', Arial,
    sans-serif;
  text-align: center;
}
.title {
  font-size: 36px;
  padding-left: 15px;
  text-align: left;
  margin-bottom: 10px;
  position: relative;
  z-index: 10;
  font-weight: 700;
  line-height: normal;
  margin-top: 24px;
}
.subtitle {
  text-align: left;
  font-size: 12px;
  position: relative;
  z-index: 10;
  padding-left: 15px;
  margin-top: 10px;
  margin-bottom: 50px;
  text-decoration: underline;
  font-weight: 700;
}
.hint {
  color: var(--vp-c-text-1);
  margin-bottom: 50px;
}
.buttons {
  padding: 0;
  margin: 0;
  list-style: none;
}
.buttons li {
  color: #fff;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 1px -2px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
}
.buttons li.yellow {
  background: #f2d367;
  color: #feb58c;
}
.buttons li.yellow:active {
  background: #bca351;
}
.buttons li.orange {
  background: #e17555;
  color: #9c3c53;
}
.buttons li.orange:active {
  background: #bc5f45;
}
.buttons li.purple {
  background: #9d3b53;
  color: #513056;
}
.buttons li.purple:active {
  background: #843245;
}
.plugin-title {
  color: var(--vp-c-text-1);
  margin-top: 50px;
}
.plugins {
  list-style: none;
  margin: 20px 0;
  padding: 0;
  color: var(--vp-c-text-1);
  margin-bottom: 40px;
}
.plugins h3 {
  margin: 0;
  padding: 5px;
  text-decoration: underline;
  font-size: 18px;
}
.plugins p {
  padding: 5px;
  margin: 0;
  font-size: 16px;
}
.plugins li {
  cursor: pointer;
  margin: 0 6% 15px 6%;
  margin-bottom: 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
</style>
