# 性能优化
## 资源合并压缩
- fis
- webpack
- gulp
## 图片优化
- jpg：有损压缩，压缩率高，不支持透明
- png8：256色 + 支持透明（利于性能优化）
- png24：2^24色 + 不支持透明
- png32：2^32色 + 支持透明
- svg：矢量图，代码内嵌相对较小（能用就用）
- base64：img标签直接接收inline
- webp：安卓环境下比较优秀
## css与js的装载和执行
<img :src="$withBase('/assets/performance-RenderTree.png')"/>

1. 根据`HTML`结构生成`DOM Tree`
2. 根据`CSS`生成`CSSOM`
3. 将`DOM`和`CSSOM`整合形成`RenderTree`
4. 根据`RenderTree`开始渲染和展示
5. 遇到`<script>`会执行并阻塞渲染
## 懒加载和预加载
 - 路由懒加载
 - 图片懒加载
## 重绘与回流
- 重绘：当`RenderTree`中一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的，比如background-color
- 回流（reflow）：当`RenderTree`中一部分因为元素的规模尺寸布局隐藏被改变而需要重新构建
- 回流必将触发重绘，重绘不一定触发回流

### 避免回流
- 用translate替代top
- 用opacity替代visibility
- 先定义好class,最后一次性的修改DOM的className
- 先将DOM display:none,然后修改属性，最后display:block
- 不将DOM结点属性遍历
- 不使用table布局
- 动画实现的速度的选择
- 对于动画新建图层
- 启动GPU硬件加速:transform:translate3d(0,0,0)
## 浏览器存储
- cookie：浪费请求资源
- localStorage：不消失
- sessionStorage：页面关闭则消失
- service worker：PWA（progressive web app）

## 缓存：httpheader
<img :src="$withBase('/assets/performance-httpheader.png')"/>


1. **cache-control**
- `max-age`：缓存时间长度，状态为200
- `s-maxage`：优先级高于max-age，只缓存公共资源，例如cdn,状态为304
- `private`：私人缓存，该账号及使用的浏览器
- `public`：共用缓存，与private相反
- `no-cache`：先会去请求服务器，在判断读不读缓存
- `no-store`：不会使用缓存
<img :src="$withBase('/assets/performance-cache1.png')"/>


2. **expires：指定过期日期**
3. **last-modified & if-modified-since**
- 状态为304，需要和cache-control共同使用
- `last-modified`：response中出现，表示服务端缓存此文件的时间点
- `if-modified-since`：发送此文件当前收到的last-modified到request，让服务端去判断是否可以使用客户端缓存文件
4. **etag & if-none-match**
- `etag`：response中出现，文件内容hash值
- `if-none-match`：将etag值发送至request，规则与last-modified & if-modified-since相同

<img :src="$withBase('/assets/performance-cache.png')"/>

## 服务端渲染
- 过去使用jsp/php
- 现在使用nuxtjs（Vue）、nextjs（React）实现
<img :src="$withBase('/assets/performance-ssr.png')"/>

- `Universal Application Code`：套在vue外面，应用在服务端，处理了部分（mounted）钩子
- 将`app.js`拆分成`Server entry`和`Client entry`
- 再通过`webpack`构造`Server Bundle`和`Client Bundle`
- 在Node服务器下`Server Bundle`通过`Bundle Renderer`处理成`HTML`发送给浏览器
- 在浏览器下通过`Client Bundle`去解析服务端传来的`HTML`

## CDN加速
### vuecli3中vue.config.js添加CDN配置
```js
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
module.exports = {
  chainWebpack: (config) => {
    config.externals({
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        echarts: 'echarts',
        axios: 'axios',
        lodash: '_',
    });
    config.plugin('html-assets').use(HtmlWebpackIncludeAssetsPlugin, [
      {
        assets: [
          '/vue/2.6.7/vue.min.js',
          '/vuex/3.1.0/vuex.min.js',
          '/vue-router/3.0.2/vue-router.min.js',
          '/element-ui/2.12.0/index.js',
          '/element-ui/2.12.0/theme-chalk/index.css',
          '/axios/0.19.0-beta.1/axios.min.js',
          '/lodash.js/4.17.11/lodash.min.js',
          '/echarts/4.2.1/echarts.min.js',
        ],
        append: false,
        publicPath: 'https://cdn.bootcss.com',
      },
    ]);
  }
}
```