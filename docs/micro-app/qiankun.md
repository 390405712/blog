# qiankun 框架的应用实例

## 项目结构

```md
┌── dist # 生产包
│ ├── micro-app-main # 基座外网生产包
│ ├── micro-app-search # 子项目 A 外网生产包
│ ├── micro-app-search # 子项目 B 外网生产包
│ ├── judicial-bigdata-main 内网.zip # 基座内网压缩包
│ ├── judicial-bigdata-search 内网.zip # 子项目 A 内网压缩包
│ └── judicial-bigdata-visual 内网.zip # 子项目 B 内网压缩包
├── micro-app-main # 基座开发入口
├── micro-app-search # 子项目 A 开发入口
├── micro-app-visual # 子项目 B 开发入口
└── package.json # 批量执行所有项目的 npm 命令
```

## 基座项目配置

- `yarn add qiankun`
- micro-app-main/public/index.html 中`<div id="app"></div>` 改为 `<div id="main-app"></div>`

```js
// vue.config.js
devServer: {
  port: 8080,
  open: true,
  disableHostCheck: true,
},
```

```js
// main.js
import Vue from 'vue'
import router from './router'
import ElementUI from './components/elementui'

// 引入基座公共资源（子项目独立运行时需单独引入）
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

// 引入qiankun框架
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
  setDefaultMountApp,
  initGlobalState,
} from 'qiankun'

Vue.use(ElementUI)

const actions = initGlobalState({ menuType: 0, routePath: '' }) // 创建通信
Vue.prototype.$actions = actions // 全局调用微前端通信

// 配置开发/生产环境地址
const ENV = process.env.NODE_ENV || 'development'
const CONFIG = {
  development: {
    'micro-app-search': '//localhost:10322',
    'micro-app-visual': '//localhost:10323',
  },
  production: {
    'micro-app-search': '//xxx.xxx.xxx.xxx:xxxxx',
    'micro-app-visual': '//xxx.xxx.xxx.xxx:xxxxx',
  },
}

const MICROAPP = []
// 收集子项目配置
for (const KEY in CONFIG[ENV]) {
  MICROAPP.push({
    name: KEY,
    entry: CONFIG[ENV][KEY],
    container: '#micro-app',
    activeRule: `/${KEY}`,
  })
}
// 注册子项目及生命周期
registerMicroApps(MICROAPP, {
  beforeLoad: (app) => {
    console.log('before load', app.name, app)
    return Promise.resolve()
  },
  afterMount: (app) => {
    console.log('after mount', app.name, app)
    return Promise.resolve()
  },
})
// 初始化调用子项目
setDefaultMountApp('/micro-app-search/login')
// 监听加载子项目的报错
addGlobalUncaughtErrorHandler((event) => {
  console.error(event)
})
// 执行微前端
start()

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#main-app')
```

## 子项目配置

```js
// vue.config.js
devServer: {
  port: 10322 || 10323,
  disableHostCheck: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
},
```

```js
// main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRoutes from './router'
import ElementUI from './components/elementui'
import actions from './actions' // 用于映射到基座项目

Vue.prototype.$actions = actions // 全局调用微前端通信
Vue.use(VueRouter)
Vue.use(ElementUI)

let instance = null // 接收vue
let router = null // 接收路由

function render(props = {}) {
  // 接收子项目生命周期传递的值
  if (props) actions.setActions(props)
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/micro-app-search' : '/',
    mode: 'history',
    routes: constantRoutes,
  })
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount('#app')
}

// 判断是否为微前端环境
if (!window.__POWERED_BY_QIANKUN__) {
  // 独立运行子项目时主动加载基座公共资源 _main:../micro-app-main/src
  import('_main/assets/iconfont/iconfont.css')
  import('_main/assets/iconfont/iconfont')
  import('_main/styles/index.scss')
  import('element-ui/lib/theme-chalk/index.css')
  render()
} else {
  // 子项目资源重定向
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

// 以下是子项目生命周期
export async function bootstrap() {
  console.log('micro-app-search bootstraped')
}

export async function mount(props = {}) {
  console.log('micro-app-search mount', props)
  render(props)
}

export async function unmount(props = {}) {
  console.log('micro-app-search unmount', props)
  instance.$destroy()
  instance = null
  router = null
}
```

## 项目间通信

```js
// 基座项目
this.$actions.onGlobalStateChange((state, prev) => {
  this.$store.state.base.menuType = state.menuType
  this.$store.state.base.routePath = state.routePath
})
```

```js
// 子项目
this.$actions.setGlobalState({
  routePath: '/',
  menuType: 1,
})
```

## nginx 配置

```jsx
http{
  server {
    listen       8080;
    server_name  127.0.0.1;
    location / {
      root   基座入口;
      try_files $uri $uri/ /index.html;
      index  index.html index.htm;
    }
  }
  server {
    listen       10322;
    server_name  127.0.0.1;
    location / {
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Methods' '*';
      add_header 'Access-Control-Allow-Headers' '*';
      root   子项目A入口;
      try_files $uri $uri/ /index.html;
      index  index.html index.htm;
    }
  }
  server {
    listen       10323;
    server_name  127.0.0.1;
    location / {
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Methods' '*';
      add_header 'Access-Control-Allow-Headers' '*';
      root   子项目B入口;
      try_files $uri $uri/ /index.html;
      index  index.html index.htm;
    }
  }
}

```

## 注意点

- 基座项目打印 window：`Window:{...}`
- 子项目打印 window：`Proxy {...}`
- 子项目获取基座项目 window：`globalThis`
- 子项目获取自身 origin：`window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__`
