import { defineConfig } from 'vitepress'
import {
  icon,
  logo,
  kofi,
  wechatpay,
  googleAnalytics,
} from './share/config.mts'

export default defineConfig({
  title: 'Eruda',
  description: 'Eruda Documentation',
  outDir: '../dist',
  themeConfig: {
    logo,
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
        {
          text: 'Contributing Guide',
          link: '/docs/contributing',
        },
      ],
    },
    socialLinks: [
      {
        icon: {
          svg: icon('opencollective'),
        },
        link: 'https://opencollective.com/eruda',
      },
      kofi,
      wechatpay,
      {
        icon: 'github',
        link: 'https://github.com/liriliri/eruda',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2016-present liriliri',
    },
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
            {
              text: '贡献指南',
              link: '/zh/docs/contributing',
            },
          ],
        },
        footer: {
          message: '基于 MIT 许可发布',
          copyright: '版权所有 © 2016 至今 liriliri',
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
    ...googleAnalytics('G-KGLJXEGV2X'),
  ],
})
