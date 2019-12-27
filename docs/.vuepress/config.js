module.exports = {
  base: '/blog/',
  // dest: 'dist',
  title: "ExceedPeakWu's Blog",
  description: 'study notes',
  head: [
    ['link', {rel: 'icon', href: `/ChristmasLogo.png`}],
    ['link', {rel: 'manifest', href: '/manifest.json'}],
    // ['meta', {name: 'theme-color', content: '#3eaf7c'}],
    // ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
    // ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
    // ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: ['@vuepress/pwa', {
    serviceWorker: true,
    updatePopup: true
  }],
  serviceWorker: true,
  themeConfig: {
    repo: 'https://github.com/390405712/blog',
    editLinks: false,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: [],
    sidebar: [
      {
        title:'js基础',
        collapsable: false,
        children: [
          'base/variable',
          'base/prototype',
          'base/scope',
        ]
      },
      {
        title:'js-Web-Api',
        collapsable: false,
        children: [
          'js-Web-Api/DomBom',
          'js-Web-Api/event',
          'js-Web-Api/storage',
        ]
      },
      {
        title: 'ES6语法',
        collapsable: false,
        children: [
          'es6/',
          'es6/module',
          'es6/class',
          'es6/promise',
          'es6/normal',
          'es6/array',
        ]
      },
      {
        title: '原型',
        collapsable: false,
        children: [
          'prototype/',
          'prototype/prototype',
          'prototype/jQuery',
          'prototype/Zepto',
        ]
      },
      {
        title: '异步',
        collapsable: false,
        children: [
          'async/',
          'async/single-thread',
          'async/event-loop',
          'async/jquery-deferred',
          'async/promise',
          'async/async-await',
        ]
      },
      {
        title: '虚拟DOM',
        collapsable: false,
        children: [
          'vdom/',
          'vdom/vdom-jquery',
          'vdom/vdom-snabbdom',
          'vdom/diff-algorithm',
        ]
      },
      {
        title: 'MVVM和vue',
        collapsable: false,
        children: [
          'vue/',
          'vue/mvc',
          'vue/mvvm',
          'vue/defineProperty',
          'vue/template',
        ]
      },
      {
        title: 'Vue实际使用',
        collapsable: false,
        children: [
          'vueAdvanced/interpolation',
          'vueAdvanced/api',
          'vueAdvanced/template',
        ]
      },
      {
        title: '组件化和react',
        collapsable: false,
        children: []
      },
      {
        title: 'hybrid',
        collapsable: false,
        children: []
      },
      {
        title:'开发环境',
        collapsable: false,
        children: [
          'IDE/git',
          'IDE/linux',
        ]
      },
      {
        title:'性能优化',
        collapsable: false,
        children: [
          'performance/performance',
        ]
      },
      {
        title:'算法',
        collapsable: false,
        children: [
          'algorithm/string',
          'algorithm/array',
          'algorithm/reg',
          'algorithm/sort',
          'algorithm/recursion',
          'algorithm/stack',
          // 'algorithm/queue',
          // 'algorithm/linked-list',
          // 'algorithm/matrix',
          // 'algorithm/binary-tree',
          // 'algorithm/heap',
          // 'algorithm/greedy',
          // 'algorithm/dynamic',
        ]
      },
      {
        title:'style',
        collapsable: false,
        children: [
          'style/flex',
          'style/scss',
        ]
      },
      {
        title:'埋点',
        collapsable: false,
        children: [
          'burialPoint/vue',
          'burialPoint/wx',
          'burialPoint/wepy',
        ]
      },

      // {
      //     title: '准备工作',
      //     collapsable: false,
      //     children: [
      //         ['prepare/', 'Introduction'],
      //         'prepare/flow',
      //         'prepare/directory',
      //         'prepare/build',
      //         'prepare/entrance'
      //     ]
      // },
      // {
      //     title: '数据驱动',
      //     collapsable: false,
      //     children: [
      //         ['data-driven/', 'Introduction'],
      //         'data-driven/new-vue',
      //         'data-driven/mounted',
      //         'data-driven/render',
      //         'data-driven/virtual-dom',
      //         'data-driven/create-element',
      //         'data-driven/update'
      //     ]
      // },
      // {
      //     title: '组件化',
      //     collapsable: false,
      //     children: [
      //         ['components/', 'Introduction'],
      //         'components/create-component',
      //         'components/patch',
      //         'components/merge-option',
      //         'components/lifecycle',
      //         'components/component-register',
      //         'components/async-component'
      //     ]
      // },
      // {
      //     title: '深入响应式原理',
      //     collapsable: false,
      //     children: [
      //         ['reactive/', 'Introduction'],
      //         'reactive/reactive-object',
      //         'reactive/getters',
      //         'reactive/setters',
      //         'reactive/next-tick',
      //         'reactive/questions',
      //         'reactive/computed-watcher',
      //         'reactive/component-update',
      //         'reactive/summary'
      //     ]
      // },
      // {
      //     title: '编译',
      //     collapsable: false,
      //     children: [
      //         ['compile/', 'Introduction'],
      //         'compile/entrance',
      //         'compile/parse',
      //         'compile/optimize',
      //         'compile/codegen'
      //     ]
      // },
      // {
      //     title: '扩展',
      //     collapsable: false,
      //     children: [
      //         ['extend/', 'Introduction'],
      //         'extend/event',
      //         'extend/v-model',
      //         'extend/slot',
      //         'extend/keep-alive',
      //         'extend/tansition',
      //         'extend/tansition-group'
      //     ]
      // },
      // {
      //     title: 'Vue Router',
      //     collapsable: false,
      //     children: [
      //         ['vue-router/', 'Introduction'],
      //         'vue-router/install',
      //         'vue-router/router',
      //         'vue-router/matcher',
      //         'vue-router/transition-to'
      //     ]
      // },
      // {
      //     title: 'Vuex',
      //     collapsable: false,
      //     children: [
      //         ['vuex/', 'Introduction'],
      //         'vuex/init',
      //         'vuex/api',
      //         'vuex/plugin'
      //     ]
      // }
    ]
  }
}
