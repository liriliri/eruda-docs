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
    nav: [{ text: 'Docs', link: '/docs/' }],
    sidebar: {
      '/docs': [
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
              link: '/docs/api',
            },
            {
              text: '插件开发',
              link: '/docs/plugin',
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
