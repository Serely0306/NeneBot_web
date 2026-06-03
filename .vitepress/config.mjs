import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Nenebot 使用说明',
  description: '世界计划多功能QQBOT',
  base: '/nenebot/',
  cleanUrls: true,
  appearance: true,
  outDir: 'dist',
  srcExclude: ['DEPLOY.md', 'VUE_REFACTOR_PLAN.md'],

  head: [
    ['script', {}, `(function(){var k='vitepress-theme-appearance';if(!localStorage.getItem(k)){localStorage.setItem(k,'light')}})();`],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;600&display=swap' }]
  ],

  themeConfig: {
    logo: null,
    outline: [2, 3],
    outlineTitle: '目录',

    nav: [
      { text: '首页', link: '/' },
      { text: '使用帮助', link: '/help/' },
      { text: '工具', link: '/help/tools' },
      { text: 'FAQ', link: '/help/faq' },
      { text: '加群申请', link: '/apply' }
    ],

    sidebar: [
      {
        text: '使用帮助',
        items: [
          { text: '使用入门', link: '/help/' },
          {
            text: '世界计划 (PJSK)',
            items: [
              { text: 'HarukiBot', link: '/help/haruki' },
              { text: 'SakuraBot', link: '/help/sakura' },
              { text: 'LunaBot — Sekai 查询', link: '/help/lunabot-sekai' },
            ]
          },
          {
            text: '娱乐与工具',
            items: [
              { text: 'LunaBot — 综合服务', link: '/help/lunabot' },
              { text: 'ZeroBot', link: '/help/zerobot' },
            ]
          },
        ]
      },
      {
        text: '相关网页',
        items: [
          { text: '抓包帮助', link: '/upload/help' },
          { text: 'Suite 上传', link: '/upload/suite' },
          { text: 'MySekai 上传', link: '/upload/mysekai' },
          { text: '加群申请', link: '/apply' },
        ]
      },
      {
        text: '其他页面',
        items: [
          { text: 'FAQ', link: '/help/faq' },
        ]
      }
    ],

    footer: {
      copyright: '© 2026 Nenebot'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    socialLinks: []
  }
})
