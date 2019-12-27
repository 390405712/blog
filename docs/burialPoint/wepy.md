# wepy埋点
## 初始化时
  - 获取手机型号、操作系统版本、ip、省市,并生成trackId
  - 给trackId设定一个生命期限（时间戳），监听到新的埋点时，将之前设定的生命期限（时间戳）去对比当前时间戳，超过了则生成一个新的trackId
  ```js
    {
      type:'base',
      value:{
        model: "iPhone 6",
        system: "iOS 10.0.1",
        ip:222.95.35.152,
        address:'江苏省南京市',
      },
      trackId
    }
  ```
## 手动埋点
1. 配置埋点
```js
// tracks/index.js
const trackConfig = [
  const tracks = {
    path: 'pages/client/login',  // 页面路径
    elementTracks: [
      {
        element: '.login-btn',  // 监听的dom
        dataKeys:[
          '登录',  // 写死
          'phone', // 得到data中手机号
          'code' //得到data中验证码
        ]
      }
    ],
  };
];
```
2. 将埋点模块引入app.wpy
```html
<script>
  // app.wpy
  import Tracker from './xbossTrack/index'; // 埋点监听模块
  import trackConfig from './tracks/index'; // 埋点配置表
  import wepy from "wepy";
  import "wepy-async-function";

  new Tracker({ tracks: trackConfig });

  export default class extends wepy.app{...}
</script>
```
3. 在每个埋点页面中添加监听事件
```html
<!-- pages/client/login.wpy -->
<template>
  <!-- 添加冒泡事件用于监听 -->
  <view class="login" catchtap='elementTracker'>
    <!-- ... -->
    <!-- ... -->
    <!-- ... -->
    <!-- 监听对象 -->
    <view class="btn login-btn" @tap="login">登录</view>
  </view>
</template>
```
4. 测试
- 在pages/client/login.wpy中点击 view.login-btn
- 得到 '登录'和 手机号、验证码 的值


## 监听路由
1. 创建wepy的mixin组件
```js
//router.js
import wepy from 'wepy';

export default class TestMixin extends wepy.mixin {
  onShow() {
    let pages = getCurrentPages();
    console.log(pages[pages.length - 1].route)  // 获得页面路由地址
  }
}
```

2.在每个页面中引入该mixin
```html
<!-- pages/client/login.wpy -->
<script>
import wepy from "wepy";
import router from '../../utils/router.js';
export default class Index extends wepy.page {
  mixins = [router];
  config = {...},
  data = {...},
  methods ={...},
}
</script>
```

3. 测试
- 在页面onShow时得到该页面的路由地址


## 监听接口请求及响应
- 使用wepy接口拦截器,在app.wpy中使用
```html
<script>
export default class extends wepy.app {
  constructor() {
    super();
    this.use('promisify');
    this.use('requestfix');
    // 使用wepy拦截器
    this.intercept('request', {
      config (req) {
        // 请求拦截
        console.log('config: ', req);
        return p;
      },
      success (res) {
        // 成功响应拦截
        console.log('success: ', p);
        return p;
      },
      fail (){
        // 失败响应拦截
      }
    });
  }
}
</script>
```
