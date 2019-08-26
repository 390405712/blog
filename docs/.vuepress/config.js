module.exports = {
    base: '/',
    dest: 'dist',
    title: "ExceedPeakWu's Blog",
    description: 'study notes',
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }],
        // ['link', {rel: 'manifest', href: '/manifest.json'}],
        // ['meta', {name: 'theme-color', content: '#be313f'}],
        // ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        // ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        // ['link', { rel: 'apple-touch-icon', href: `/logo.jpg` }],
        // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#be313f' }],
        // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    serviceWorker: false,
    themeConfig: {
        repo: '390405712/blog',
        editLinks: true,
        docsDir: 'dist',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        sidebar: [
            {
                title: '准备工作',
                collapsable: false,
                children: [
                    ['prepare/', 'Introduction'],
                    'prepare/flow',
                    'prepare/directory',
                    'prepare/build',
                    'prepare/entrance'
                ]
            },
        ]
    }
}
