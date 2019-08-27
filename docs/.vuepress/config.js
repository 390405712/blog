module.exports = {
    base: '/blog/',
    // dest: 'dist',
    title: "ExceedPeakWu's Blog",
    description: 'study notes',
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        // ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        // ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        // ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        // ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    serviceWorker: true,
    themeConfig: {
        repo: 'https://github.com/390405712/blog',
        editLinks: true,
        docsDir: 'docs',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [],
        sidebar: [
            {
                title: 'ES6语法',
                collapsable: false,
                children: [
                    ['es6/', 'Introduction'],
                    'es6/module',
                    'es6/class',
                    'es6/promise',
                    'es6/normal'
                ]
            },
            {
                title: '原型',
                collapsable: false,
                children: [
                    ['prototype/', 'Introduction'],
                    'prototype/jQuery',
                    'prototype/Zepto',
                ]
            },
            {
                title: '异步',
                collapsable: false,
                children: [
                    ['async/', 'Introduction'],
                    'async/single-thread',
                    'async/event-loop',
                    'async/jquery-deferred',
                    'async/promise',
                    'async/async-await',
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
