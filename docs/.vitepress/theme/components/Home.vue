<script setup>
console.log.apply(console, [
  '%c %c %c Hello, this is Eruda :) %c %c ',
  'background: #707d8b; padding:5px 0;',
  'background: #707d8b; padding:5px 0;',
  'color: #fff; background: #76a2ee; padding: 5px 0;',
  'background: #707d8b; padding:5px 0;',
  'background: #707d8b; padding:5px 0;',
])

function triggerError() {
  console.clear()
  try {
    triggerError()
  } catch (e) {
    eruda.show().show('console')
    throw e
  }
}
</script>

<template>
  <div class="container">
    <header class="header">
      <canvas id="c"></canvas>
      <img src="" alt="Eruda" />
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
      <polygon points="0,0 0,5 80,5 80,0 60,5 20,5" style="fill: #fff" />
    </svg>
    <p class="github-link">
      View it on <a href="https://github.com/liriliri/eruda">GitHub</a>
    </p>
    <p class="hint">Click the right bottom button to inspect this page!</p>
    <ul class="buttons">
      <li
        id="error-btn"
        class="yellow"
        @click="triggerError()"
        style="z-index: 10"
        ontouchstart
      >
        Trigger Error
      </li>
      <li id="ajax-btn" class="orange" style="z-index: 9" ontouchstart>
        Send Ajax Request
      </li>
      <li id="log-btn" class="purple" style="z-index: 8" ontouchstart>
        Log Message
      </li>
    </ul>
    <h2 class="plugin-title">PLUGINS</h2>
    <ul class="plugins">
      <li data-plugin="monitor">
        <h3 style="border-top: 5px solid #212121">MONITOR</h3>
        <p>Display fps and memory</p>
      </li>
      <li data-plugin="features">
        <h3 style="border-top: 5px solid #424242">FEATURES</h3>
        <p>Browser feature detections</p>
      </li>
      <li data-plugin="benchmark">
        <h3 style="border-top: 5px solid #424242">BENCHMARK</h3>
        <p>Run JavaScript benchmarks</p>
      </li>
      <li data-plugin="geolocation">
        <h3 style="border-top: 5px solid #424242">GEOLOCATION</h3>
        <p>Test geolocation</p>
      </li>
      <li data-plugin="timing">
        <h3 style="border-top: 5px solid #616161">TIMING</h3>
        <p>Show performance and resource timing</p>
      </li>
      <li data-plugin="code">
        <h3 style="border-top: 5px solid #9e9e9e">CODE</h3>
        <p>Edit and run JavaScript</p>
      </li>
      <li data-plugin="orientation">
        <h3 style="border-top: 5px solid #9e9e9e">ORIENTATION</h3>
        <p>Test orientation api</p>
      </li>
      <li data-plugin="touches">
        <h3 style="border-top: 5px solid #9e9e9e">TOUCHES</h3>
        <p>Visualize screen touches</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  background: #fff;
  margin: 0 auto;
  padding-bottom: 20px;
}
.header {
  background: #eda29b;
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
.github-link {
  font-size: 14px;
  color: #555;
  margin-top: 0;
}
.title,
.subtitle,
.github-link,
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
}
.subtitle {
  text-align: left;
  font-size: 12px;
  position: relative;
  z-index: 10;
  padding-left: 15px;
  margin-bottom: 50px;
  text-decoration: underline;
}
.github-link a {
  color: #76a2ee;
  font-size: 18px;
}
.hint {
  color: #555;
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
  transition: background 0.3s, color 0.3s;
  cursor: pointer;
}
.buttons li.yellow {
  background: #f2d367;
  color: #e07556;
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
  color: #555;
  margin-top: 50px;
}
.plugins {
  list-style: none;
  margin: 20px 0;
  padding: 0;
  color: #555;
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
