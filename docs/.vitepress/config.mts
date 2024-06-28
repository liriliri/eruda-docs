import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Eruda',
  description: 'Eruda Documentation',
  outDir: '../dist',
  themeConfig: {
    logo: {
      src: '/logo.png',
      width: 48,
      height: 48,
    },
  },
})
