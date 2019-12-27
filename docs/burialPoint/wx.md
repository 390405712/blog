# 微信原生埋点
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
    path: 'pages/film/index',  // 页面路径
    elementTracks: [
      {
        element: '.playing-item',  // 监听的dom
        dataKeys:[
          'click',  // 写死
          'playingFilms[$INDEX].name' // 获取到动态数据
        ]
      }
    ],
  };
];
```

2. 将埋点模块引入app.js
```js
// app.js
import Tracker from './libs/xbossTrack/index'; // 埋点监听模块
import trackConfig from './tracks/index'; // 埋点配置表

new Tracker({ tracks: trackConfig });

App({...});
```

3. 在每个埋点页面中添加监听事件
```html
<!-- pages/film/index.wxml -->
<view class="page">
  <!-- 添加冒泡事件用于监听 -->
  <view catchtap='elementTracker'>
    <view class='playing-container'>
      <!-- 监听对象 -->
      <view class='playing-item' data-index="{{index}}" data-test='ttes' wx:for='{{playingFilms}}' wx:key='{{index}}'>
        <navigator url="/pages/film/detail?id={{item.filmId}}&origin={{item.cover.origin}}">
          <view class='info-container'>
              <view class='name'>{{item.name}}</view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</view>
```

4. 测试
- 在pages/film/index.wxml中点击 view.playing-item
- 得到 'click' 和 该item下的data数据

## 监听路由
1. 创建微信原生Page()的中间件
```js
// utils/router.js
function filter(pageObj) {
  if (pageObj.onShow) {
    let _onShow = pageObj.onShow;
    pageObj.onShow = function (options) {
      let currentInstance = getPageInstance();
      console.log(currentInstance.route); // 获取到路由路径
      let dt = new Date();
      save({
        type: 'router',
        value: {
          to: currentInstance.route,
          timeStamp: dt.getTime(), // 当前路由时间戳
          // duration: 123000, // 距离上次路由时间戳
        },
        // trackId,
      });
      _onShow.call(currentInstance, options);
    }
  }
  return pageObj;
}

function save(burialPoint) {
  let burialPointArr = [];
  wx.getStorage({
    key: 'burialPoint',
    success(res) {
      burialPointArr = res.data;
      burialPointArr.push(burialPoint);
      wx.setStorage({
        key: 'burialPoint',
        data: burialPointArr
      });
    },
    fail() {
      burialPointArr.push(burialPoint);
      wx.setStorage({
        key: 'burialPoint',
        data: burialPointArr
      });
    }
  })
}

// 获取当前页面
function getPageInstance() {
  let pages = getCurrentPages();
  console.log(pages);
  return pages[pages.length - 1];
}

exports.filter = filter;
```
2. 在每个页面插入中间件
```js
// pages/film/index.js
const router = require("../../utils/router.js");

Page(
  router.filter(  // 中间件在此嵌套
    {...}
  )
)
```

3. 测试
- 在页面onShow时得到该页面的路由地址

## 监听接口请求及响应
- 封装wx.request来实统一处理接口请求及响应
```js
// http.js
function _request(url, data, method = 'GET') {
  // 记录请求内容
  let dt = new Date();
  save({
    type: 'xhrReq',
    value: {
      url:url,
      timeStamp: dt.getTime(), // 当前路由时间戳
      // duration: 123000, // 距离上次路由时间戳
    },
    // trackId,
  });
  return new Promise((resolve, reject) => {
    wx.showLoading({ title: '加载中' });
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json',
      },
      data,
      method,
      success: (res) => {
        // 响应成功
        wx.hideLoading();
        save({
          type: 'xhrRes',
          value: {
            url:url,
            timeStamp: dt.getTime(), // 当前路由时间戳
            // duration: 123000, // 距离上次路由时间戳
          },
          // trackId,
        });
        resolve(res.data);

      },
      fail: (res) => {
        // 响应失败
        wx.hideLoading();
        save(...)
        reject(res);
      },
    });
  });
}

function get(url, data) {
  return _request(url, data, 'GET');
}

function post(url, data) {
  return _request(url, data, 'POST');
}

function save(burialPoint) {
  let burialPointArr = [];
  wx.getStorage({
    key: 'burialPoint',
    success(res) {
      burialPointArr = res.data;
      burialPointArr.push(burialPoint);
      wx.setStorage({
        key: 'burialPoint',
        data: burialPointArr
      });
    },
    fail() {
      burialPointArr.push(burialPoint);
      wx.setStorage({
        key: 'burialPoint',
        data: burialPointArr
      });
    }
  })
}

module.exports = {
  get,
  post,
};

```
