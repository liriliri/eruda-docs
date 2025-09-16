<script setup>
import { ref } from 'vue'
import ajax from 'licia/ajax'
import upperFirst from 'licia/upperFirst'
import getUrlParam from 'licia/getUrlParam'
import { useData, defineClientComponent } from 'vitepress'

const lunaShaderToyPlayerRef = ref(null)
const LunaShaderToyPlayer = defineClientComponent(
  () => import('luna-shader-toy-player/vue'),
  [
    {
      ref: lunaShaderToyPlayerRef,
    },
  ]
)

// https://www.shadertoy.com/view/wtcXWr
const code = `#define S(a, b, t) smoothstep(a, b, t)

float distLine(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * t);
}

float line(vec2 p, vec2 a, vec2 b) {
  float d = distLine(p, a, b);
  float m = S(0.03, 0.01, d);
  float d2 = length(a - b);
  m *= S(1.2, 0.8, d2) * 0.5 + S(0.05, 0.03, abs(d2 - 0.75));
  return m;
}

float distTriangle(in vec2 p, in vec2 p0, in vec2 p1, in vec2 p2)
{
  vec2 e0 = p1 - p0;
  vec2 e1 = p2 - p1;
  vec2 e2 = p0 - p2;

  vec2 v0 = p - p0;
  vec2 v1 = p - p1;
  vec2 v2 = p - p2;

  vec2 pq0 = v0 - e0 * clamp(dot(v0, e0) / dot(e0, e0), 0.0, 1.0);
  vec2 pq1 = v1 - e1 * clamp(dot(v1, e1) / dot(e1, e1), 0.0, 1.0);
  vec2 pq2 = v2 - e2 * clamp(dot(v2, e2) / dot(e2, e2), 0.0, 1.0);

  float s = sign(e0.x * e2.y - e0.y * e2.x);
  vec2 d = min(min(vec2(dot(pq0, pq0), s * (v0.x * e0.y - v0.y * e0.x)),
    vec2(dot(pq1, pq1), s * (v1.x * e1.y - v1.y * e1.x))),
    vec2(dot(pq2, pq2), s * (v2.x * e2.y - v2.y * e2.x)));

  return -sqrt(d.x) * sign(d.y);
}

float triangle(vec2 p, vec2 a, vec2 b, vec2 c) {
  float d = distTriangle(p, a, b, c);
  float m = S(0.03, 0.01, d);
  float d2 = length(a - b);
  m *= S(1.2, 0.8, d2) * 0.5 + S(0.05, 0.03, abs(d2 - 0.75));
  return m;
}

float N21(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

vec2 N22(vec2 p) {
  float n = N21(p);
  return vec2(n, N21(p + n));
}

vec2 getPos(vec2 id, vec2 offset) {
  vec2 n = N22(id + offset) * iTime;
  return offset + sin(n) * 0.4;
}

float layer(vec2 uv) {
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  vec2 p[9];
  int i = 0;
  for (float y = -1.0; y <= 1.0; y++) {
    for (float x = -1.0; x <= 1.0; x++) {
      p[i++] = getPos(id, vec2(x, y));
    }
  }

  float t = iTime * 10.0;
  float m = 0.0;
  for (int i = 0; i < 9; i++) {
    m += line(gv, p[4], p[i]);

    vec2 j = (p[i] - gv) * 20.0;
    float sparkle = 1.0 / dot(j, j);

    m += sparkle * (sin(t + fract(p[i].x) * 10.0) * 0.5 + 0.5);

    for (int yi = i + 1; yi < 9; yi++) {
      for (int zi = yi + 1; zi < 9; zi++) {
        float len1 = abs(length(p[i] - p[yi]));
        float len2 = abs(length(p[yi] - p[zi]));
        float len3 = abs(length(p[i] - p[zi]));

        if ((len1 + len2 + len3) < 2.8) {
          m += triangle(gv, p[i], p[yi], p[zi]) * 0.8;
        }
      }
    }
  }
  m += line(gv, p[1], p[3]);
  m += line(gv, p[1], p[5]);
  m += line(gv, p[7], p[3]);
  m += line(gv, p[7], p[5]);

  return m;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

  float m = 0.0;
  float t = iTime * 0.1;

  float gradient = uv.y;

  float s = sin(t);
  float c = cos(t);
  mat2 rot = mat2(c, -s, s, c);
  uv *= rot;

  for (float i = 0.0; i < 1.0; i += 1.0 / 4.0) {
    float z = fract(i + t);
    float size = mix(10.0, 0.5, z);
    float fade = S(0.0, 0.5, z) * S(1.0, 0.8, z);

    m += layer(uv * size + i * 20.0) * fade;
  }

  vec3 base = sin(t * 5.0 * vec3(0.345, 0.456, 0.567)) * 0.4 + 0.6;
  vec3 col = m * base;

  col -= gradient * base;

  //vec2 gv = fract(uv) - 0.5;
  //if(gv.x > 0.48 || gv.y > 0.48){
  //	col = vec3(1.0, 0.0, 0.0);
  //}

  fragColor = vec4(col, 1.0);
}`

const renderPass = ref([
  {
    inputs: [],
    outputs: [],
    code,
    name: 'Image',
    description: '',
    type: 'image',
  },
])

const t = (en, zh) => (useData().lang.value === 'zh' ? zh : en)

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

function showEruda() {
  if (typeof eruda === 'undefined') {
    return
  }

  eruda.show()
}

const plugin = getUrlParam('plugin')
if (plugin) {
  setTimeout(() => showPlugin(plugin), 2000)
}
</script>

<template>
  <div class="container">
    <header class="header">
      <luna-shader-toy-player
        :controls="false"
        :renderPass="renderPass"
        :style="{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }"
      />
      <img src="/banner-bg.png" alt="Eruda" />
      <h1 class="title">Eruda</h1>
      <h2 class="subtitle">
        {{ t('Console for Mobile Browsers', '移动端调试工具') }}
      </h2>
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
    <p class="hint">
      {{ t('Click the', '点击') }}
      <span
        class="eruda-icon-tool"
        @click="showEruda"
        style="
          background: black;
          color: #fff;
          width: 25px;
          height: 25px;
          border-radius: 4px;
        "
      ></span>
      {{ t('button to inspect this page!', '按钮开始调试本页面！') }}
    </p>
    <ul class="buttons">
      <li
        id="error-btn"
        class="yellow"
        @click="triggerErr"
        style="z-index: 10"
        ontouchstart
      >
        {{ t('Trigger Error', '触发错误') }}
      </li>
      <li
        id="ajax-btn"
        class="orange"
        @click="sendAjaxRequest"
        style="z-index: 9"
        ontouchstart
      >
        {{ t('Send Ajax Request', '发送 Ajax 请求') }}
      </li>
      <li
        id="log-btn"
        class="purple"
        @click="logMessage"
        style="z-index: 8"
        ontouchstart
      >
        {{ t('Log Message', '打印信息') }}
      </li>
    </ul>
    <h2 class="plugin-title">{{ t('PLUGINS', '插件') }}</h2>
    <ul class="plugins">
      <li @click="showPlugin('vue')">
        <h3 style="border-top: 5px solid #212121">VUE</h3>
        <p>{{ t('Vue devtools', 'Vue 调试工具') }}</p>
      </li>
      <li @click="showPlugin('monitor')">
        <h3 style="border-top: 5px solid #212121">MONITOR</h3>
        <p>{{ t('Display fps and memory', '显示帧率和内存') }}</p>
      </li>
      <li @click="showPlugin('features')">
        <h3 style="border-top: 5px solid #424242">FEATURES</h3>
        <p>{{ t('Browser feature detections', '浏览器特性检测') }}</p>
      </li>
      <li @click="showPlugin('benchmark')">
        <h3 style="border-top: 5px solid #424242">BENCHMARK</h3>
        <p>
          {{ t('Run JavaScript benchmarks', '运行 JavaScript 基准测试') }}
        </p>
      </li>
      <li @click="showPlugin('geolocation')">
        <h3 style="border-top: 5px solid #424242">GEOLOCATION</h3>
        <p>{{ t('Test geolocation', '测试地理位置') }}</p>
      </li>
      <li @click="showPlugin('timing')">
        <h3 style="border-top: 5px solid #616161">TIMING</h3>
        <p>
          {{ t('Show performance and resource timing', '显示资源加载时间') }}
        </p>
      </li>
      <li @click="showPlugin('code')">
        <h3 style="border-top: 5px solid #9e9e9e">CODE</h3>
        <p>{{ t('Edit and run JavaScript', '编辑并运行 JavaScript') }}</p>
      </li>
      <li @click="showPlugin('orientation')">
        <h3 style="border-top: 5px solid #9e9e9e">ORIENTATION</h3>
        <p>{{ t('Test orientation api', '测试陀螺仪接口') }}</p>
      </li>
      <li @click="showPlugin('touches')">
        <h3 style="border-top: 5px solid #9e9e9e">TOUCHES</h3>
        <p>{{ t('Visualize screen touches', '可视化屏幕点击') }}</p>
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
