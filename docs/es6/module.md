# 模块化

## ES6模块语法

### export 语法
```js
/* util1.js */
export default {
  a: 100
}

/* util2.js */
export function fn1() {
  alert('fn1')
}
export function fn2() {
  alert('fn2')
}
```

### import 语法
```js
/* index.js */
import util1 from './util1.js'
import { fn1, fn2 } from './util2.js'

console.log(util1)
fn1()
fn2()
```
## babel (解决语法兼容问题)
### 安装babel
1. `在node环境下`
2. `npm init`
3. `npm install --save-dev babel-core babel-preset-es2015 babel-preset-latest`
4. `创建 .babelrc 文件`
5. `npm install --global babel-cli`
6. `babel —version`

### 运行babel
```js
/* index.js */

[1, 2, 3].map(item => item + 1);

/* 运行 babel index.js 后 */

[1, 2, 3].map(function(item) {
  return item + 1;
})
```

## webpack
### 安装webpack
1. `npm install webpack babel-loader --save-dev`
2. `配置 webpack.config.js`
3. `配置 package.json 中的 scripts`
4. `运行 npm start`

### 配置webpack.config.js
```js
module.exports = {
  /* index.js */
  /*
    import util1 from './util1.js'
    import { fn1, fn2 } from './util2.js'
    console.log(util1)
    fn1()
    fn2()
  */
  entry: './src/index.js',
  output: {
    path:__dianame,
    filename:'./build/bundle.js'
  },
  module:{
    rules:[{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      load: 'babel-loader'
    }]
  }
}
```

### 配置package.json启动命令
```json
{
   ...
   "scripts":{
    "start":"webpack"
   }
}
```

### 创建测试页面
```html
  <!--index.html-->

  <script type="text/javascript" src="./build/bundle.js"></script>

  <!--运行结果-->
  console.log({a: 100})
  alert('fn1')
  alert('fn2')
```
## rollup(vue、react打包用)
- `特点：small pieces!!`
### 使用rollup
1. `npm init`
2. `npm i rollup rollup-plugin-node-resolve rollup-plugin-babel babel-plugin-external-helpers babel-preset-latest babel-core --save-dev`
3. `配置  .babelrc`

```json
  {
    "presets": [
      ["latest",{
        "es2015": {
          "modules": false
        }
      }]
    ],
    "plugins": ["external-helpers"]
  }
```

4. `配置  rollup.config.js`
```js
  import  babel from 'rollup-plugin-babel'
  import resolve from 'rollup-plugin-node-resolve'

  export default {
    entry: 'src/index.js',
    format:'umd', //封装引入方式：是否支持exports\modules......
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ],
    dest: 'build/bundle.js'
  }
```
5. `将 webpack 环境的 JS 代码拷贝过来`
6. `修改 package.json 的 scripts`
```json
  {
    ...
    "scripts": {
      "start": "rollup -c rollup.config.js"
    }
  }
```
7. `运行 npm start`


## js模块化标准经历了哪些
1. `没有模块化`
2. `AMD成为标准，require.js(也有CMD)`
3. `前端打包工具，nodejs模块化可以被使用`
4. `ES6出现，统一了模块化标准`
