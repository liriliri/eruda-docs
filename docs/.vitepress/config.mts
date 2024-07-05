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
        }
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/liriliri/eruda',
      },
    ],
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
