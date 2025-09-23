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

// https://www.shadertoy.com/view/cdj3DW
const code = `const int MAX_ITER = 18;

float field(vec3 p, float s, int iter)
{
  float accum = s / 4.0;
  float prev = 0.0;
  float tw = 0.0;
  for (int i = 0; i < MAX_ITER; ++i)
  {
    if (i >= iter) // drop from the loop if the number of iterations has been completed - workaround for GLSL loop index limitation
    {
      break;
    }
    float mag = dot(p, p);
    p = abs(p) / mag + vec3(-0.5, -0.4, -1.487);
    float w = exp(-float(i) / 5.0);
    accum += w * exp(-9.025 * pow(abs(mag - prev), 2.2));
    tw += w;
    prev = mag;
  }
  return max(0.0, 5.2 * accum / tw - 0.65);
}

vec3 nrand3(vec2 co)
{
  vec3 a = fract(cos(co.x * 8.3e-3 + co.y) * vec3(1.3e5, 4.7e5, 2.9e5));
  vec3 b = fract(sin(co.x * 0.3e-3 + co.y) * vec3(8.1e5, 1.0e5, 0.1e5));
  vec3 c = mix(a, b, 0.5);
  return c;
}

vec4 starLayer(vec2 p, float time)
{
  vec2 seed = 1.9 * p.xy;
  seed = floor(seed * max(iResolution.x, 600.0) / 1.5);
  vec3 rnd = nrand3(seed);
  vec4 col = vec4(pow(rnd.y, 17.0));
  float mul = 10.0 * rnd.x;
  col.xyz *= sin(time * mul + mul) * 0.25 + 1.0;
  return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  float time = iTime / (iResolution.x / 1000.0);

  // first layer of the kaliset fractal
  vec2 uv = 2.0 * fragCoord / iResolution.xy - 1.0;
  vec2 uvs = uv * iResolution.xy / max(iResolution.x, iResolution.y);
  vec3 p = vec3(uvs / 2.5, 0.0) + vec3(0.8, -1.3, 0.0);
  p += 0.45 * vec3(sin(time / 32.0), sin(time / 24.0), sin(time / 64.0));

  // adjust first layer position based on mouse movement
  p.x += mix(-0.02, 0.02, (iMouse.x / iResolution.x));
  p.y += mix(-0.02, 0.02, (iMouse.y / iResolution.y));

  float freqs[4];
  freqs[0] = 0.45;
  freqs[1] = 0.4;
  freqs[2] = 0.15;
  freqs[3] = 0.9;

  float t = field(p, freqs[2], 13);
  float v = (1.0 - exp((abs(uv.x) - 1.0) * 6.0)) * (1.0 - exp((abs(uv.y) - 1.0) * 6.0));

  // second layer of the kaliset fractal
  vec3 p2 = vec3(uvs / (4.0 + sin(time * 0.11) * 0.2 + 0.2 + sin(time * 0.15) * 0.3 + 0.4), 4.0) + vec3(2.0, -1.3, -1.0);
  p2 += 0.16 * vec3(sin(time / 32.0), sin(time / 24.0), sin(time / 64.0));

  // adjust second layer position based on mouse movement
  p2.x += mix(-0.01, 0.01, (iMouse.x / iResolution.x));
  p2.y += mix(-0.01, 0.01, (iMouse.y / iResolution.y));
  float t2 = field(p2, freqs[3], 18);
  vec4 c2 = mix(0.5, 0.2, v) * vec4(5.5 * t2 * t2 * t2, 2.1 * t2 * t2, 2.2 * t2 * freqs[0], t2);

  // add stars (source: https://glslsandbox.com/e#6904.0)
  vec4 starColour = vec4(0.0);
  starColour += starLayer(p.xy, time); // add first layer of stars
  starColour += starLayer(p2.xy, time); // add second layer of stars

  const float brightness = 1.0;
  vec4 colour = mix(freqs[3] - 0.3, 1.0, v) * vec4(1.5 * freqs[2] * t * t * t, 1.2 * freqs[1] * t * t, freqs[3] * t, 1.0) + c2 + starColour;
  fragColor = vec4(brightness * colour.xyz, 1.0);
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
        class="player"
        :controls="false"
        :renderPass="renderPass"
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
.player {
  position: absolute;
  left: 0;
  top: 0;
  width: '100%';
  height: '100%';
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
