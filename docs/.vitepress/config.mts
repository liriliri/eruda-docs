import { defineConfig } from 'vitepress'
import * as fs from 'fs'
import * as path from 'path'

const icon = (name: string) => {
  return fs.readFileSync(path.resolve(__dirname, `${name}.svg`), 'utf8')
}

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
    nav: [{ text: 'Docs', link: '/docs/' }],
    sidebar: {
      '/docs/': [
        {
          text: 'Introduction',
          link: '/docs/',
        },
        {
          text: 'API',
          link: '/docs/api',
        },
        {
          text: 'Writing a Plugin',
          link: '/docs/plugin',
        },
      ],
    },
    socialLinks: [
      {
        icon: {
          svg: icon('kofi'),
        },
        link: 'https://ko-fi.com/surunzi',
      },
      {
        icon: {
          svg: icon('opencollective'),
        },
        link: 'https://opencollective.com/eruda',
      },
      {
        icon: 'github',
        link: 'https://github.com/liriliri/eruda',
      },
    ],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '中文',
      lang: 'zh',
      themeConfig: {
        outlineTitle: '在这一页上',
        nav: [{ text: '文档', link: '/zh/docs/' }],
        sidebar: {
          '/zh/docs/': [
            {
              text: '简介',
              link: '/zh/docs/',
            },
            {
              text: 'API',
              link: '/zh/docs/api',
            },
            {
              text: '插件开发',
              link: '/zh/docs/plugin',
            },
          ],
        },
      },
    },
  },
  head: [
    [
      'script',
      {
        src: '/eruda.js',
        onload: 'eruda.init()',
      },
    ],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-KGLJXEGV2X',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KGLJXEGV2X');`,
    ],
  ],
})
