# 编码规范(前端版)

### 项目文件结构
```json
┌── dist                       # 生产包
├── public                     # 静态资源
│   ├── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 开发路径
│   ├── assets                 # 静态资源
│   │    ├── iconfont          # 图标
│   │    ├── image             # 图片
│   │    ├── svg               # svg
│   │    └── ...               # 其他静态资源
│   ├── components             # 公用组件
│   ├── router                 # 路由、路由拦截
│   ├── services               # 所有请求、axios封装（请求、响应拦截）
│   │    ├── base              # 基础模块接口类
│   │    ├── user              # 用户模块接口类
│   │    └── ...               # 其他模块接口类
│   ├── styles                 # 公用样式
│   ├── utils                  # 公用方法
│   ├── views                  # 业务层页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 注册全局组件 初始化等
│   └── store                  # 全局 store管理
│       ├── base               # 基础状态管理
│       ├── user               # 用户状态管理
│       └── ...                # 其他状态管理
├── .eslintrc.js               # eslint 配置项
├── .eslintignore              # 屏蔽eslint检查的区域
├── .prettierrc                # prettier配置项
├── babel.config.js            # babel配置项
├── guide.js                   # 快捷启动表
├── vue.config.js              # vue-cli配置
└── package.json               # 依赖包配置
```

### 静态资源
- 图标不使用切图，需和UI配合，在iconfont上建立组，使用iconfont生成图标
- svg同上
- 图片在不失真的情况下压缩，压缩工具：https://zh.recompressor.com/

### 封装
- 可复用的组件应封装
- 可复用的方法应封装
- 可复用的样式应封装（sass）

### 样式
- 组件样式不污染全局样式，优先使用局部样式

### 文件路径
- 路径用修饰符起头

### 文件页眉信息
```html
<!--
 * @Author: wulihua
 * @Date: 2020-03-30 09:04:50
 * @LastEditors: wulihua
 * @LastEditTime: 2020-04-03 10:55:26
 * @Description: 用户行为分析
 * @FilePath: \judicial-bigdata-web\src\views\UserBehavior\index.vue
 -->
```

# 统一IDE模板和检查工具(前端版)

### IDE
使用vscode
#### 插件：
- Vetur
- Vue 2 Snippets
- VueHelper
- ESLint
- Prettier - Code formatter
- HTML Snippets
- HTMLHint
- JavaScript (ES6) code snippets
- JavaScript Snippet Pack
- koroFileHeader
- GitLens — Git supercharged

### 尾行序列
格式选择  LF

### eslint语法检查
```js
// .eslintrc.js

/*
 * @Author: wulihua
 * @Date: 2019-12-06 16:43:08
 * @LastEditors: wulihua
 * @LastEditTime: 2020-03-24 09:20:52
 * @Description: ESLint配置，基于aribnb规则 http://airbnb.io/javascript/ ，eslint 禁用命令 https://www.cnblogs.com/smzd/p/9848691.html
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 * @FilePath: \judicial-bigdata-web\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
   parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  // parser: "vue-eslint-parser",
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
      },
    },
  },
  rules: {
    "max-len": 0, //一行最大长度，单位为字符
    "no-param-reassign": 0, //不允许重新分配函数参数"no-proto": 2, //不允许使用__proto__属性
    // 允许使用 for-of，https://github.com/airbnb/javascript#iterators--nope
    'no-restricted-syntax': 0,
    // 允许v-if和v-for同时使用，https://vuejs.github.io/eslint-plugin-vue/rules/no-use-v-if-with-v-for.html
    'vue/no-use-v-if-with-v-for': ['error', {
      allowUsingIterationVar: false,
    }],
    "no-underscore-dangle": 0,//标识符不能以_开头或结尾
    "no-plusplus": 0, //不允许使用++ --运算符
    "comma-dangle": ["error", "only-multiline"],//是否允许对象中出现结尾逗号
    'no-console': 0,  //不允许出现console语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, //不允许出现debugger语句
    "guard-for-in": 0, //监视for in循环，防止出现不可预料的情况
    "no-nested-ternary": 0, //不允许使用嵌套的三目运算符
    "no-shadow": 0, //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    "func-names": 0, //函数表达式必须有名字
    "space-before-function-paren": [0, { "anonymous": "always", "named": "never" }], //函数定义时括号前的空格
    "radix": 0, //使用parseInt时强制使用基数来指定是十进制还是其他进制
    "no-unused-vars": 0, //不允许有声明后未使用的变量或者参数
    "prefer-destructuring": 0, // 使用es6解构赋值
    "operator-linebreak": 0, // 换行
  },
};
```

### prettier代码美化
```js
// .prettierrc

{
  "printWidth": 200,
  "singleQuote": true,
  "trailingComma": "es5",
  "arrowParens": "always"
}
```

### lint-staged（git暂存前语法检查）
```json
// package.json

"gitHooks": {
    "pre-commit": "lint-staged"
},
"lint-staged": {
  "*.js": [
    "vue-cli-service lint",
    "git add"
  ],
  "*.vue": [
    "vue-cli-service lint",
    "git add"
  ]
},
```
