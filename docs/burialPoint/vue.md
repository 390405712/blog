# vue埋点
## 埋点监听
  ### 初始化时
  - 获取浏览器内核、操作系统、ip、省市,并生成trackId
  - 给trackId设定一个生命期限（时间戳），监听到新的埋点时，将之前设定的生命期限（时间戳）去对比当前时间戳，超过了则生成一个新的trackId
  ```js
  const base = {
    kernel:'pc',
    host: "localhost:8080",
    system:'Windows NT 10.0; Win64; x64',
    user: "用户名",
    role: "角色名",
    ip:222.95.35.152,
    address:'江苏省南京市',
    timeStamp: 1578369327076
  }
  ```

  ### vue-router拦截器
  - 记录变化的路由路径、路由时间戳及距离上次路由时间的时间戳
  ```js
    {
      type:'router'
      value:{
        to: 'http://localhost:8080/home',
        from: 'http://localhost:8080/login',
        ...base
      },
      trackId
    }
  ```
  ### dom操作监听
  - input输入待失焦时 将input值记录
  ```js
    {
      type:'input',
      value:{
        value:'input值',
        ...base
      },
      trackId
    }
  ```
  - select发生change时 将select文本值记录
  ```js
    {
      type:'select',
      value:{
        value:'select文本值',
        ...base
      },
      trackId
    }
  ```
  - button发生click时 将button文本值记录
  ```js
    {
      type:'button',
      value:{
        value:'button文本值',
        ...base
      },
      trackId
    }
  ```
  - radio发生change时 将radio文本值记录
  ```js
    {
      type:'radio',
      value:{
        value:'radio文本值',
        ...base
      },
      trackId
    }
  ```
  - checkbox发生change时 将checkbox文本值记录
  ```js
    {
      type:'checkbox',
      value:{
        value:'checkbox文本值',
        ...base
      },
      trackId
    }
  ```
  - 自定义监听的dom节点发生click/change/blur时，将值记录
  ```js
    {
      type:'自定义',
      value:{
        value:'自定义的值',
        ...base
      },
    }
  ```

  ### axios请求拦截器
  - 记录接口请求内容并写入当前时间戳
  ```js
    {
      type:'xhrReq',
      value:{
        url:'http://...',
        headers:{...},
        // get
        method:'get',
        params:{...},
        // post
        method:'post',
        data:{...},
        ...base
      }
      trackId,
    }
  ```

  ### axios响应拦截器
  - 记录接口响应内容并写入当前时间戳
  ```js
    {
      type:'xhrRes',
      value:{
        url:'http://...',
        headers:{...},
        data:{...},
        status:200,
        ...base
      }
      trackId,
    }
  ```

## 埋点记录
- 将监听到的内容存至localStorage
```js
  const burialPoint = { 单个埋点内容 }
  const burialPointArr = localStoage.getItem('burialPoint')
                          ? JSON.parse(localStorage.getItem("burialPoint"))
                          : [];
  burialPointArr.push(burialPoint);
  localStorage.setItem('burialPoint',JSON.stringify(burialPointArr))
```

## 埋点发送
 ### 将本地保存的埋点数据发送后端的发送条件
  1. 本地存储的埋点长度为10
  2. axios响应拦截器完成埋点采集后5秒内如未触发axios请求拦截器

```js
const timeOut;
const burialPointArr = localStoage.getItem('burialPoint')
                        ? JSON.parse(localStoage.getItem('burialPoint'))
                        : []
if(burialPointArr.length >= 10){
  timeOut = setTimeout(() => {
    this.$api.sendBurialPoint(burialPointArr);
  }, 5000);
}
```

## 使用vue埋点监听模块
1. 创建埋点监听模块
```js
// /utils/monitor.js
import axios from 'axios';

export default {
  watch: {
    $route(to, from) {
      this.save({
        type: 'router',
        value: {
          to: `${window.location.origin}/#${to.path}`,
          from: `${window.location.origin}/#${from.path}`,
          timeStamp: this.getTime(), // 当前路由时间戳
          // duration: 123000, // 距离上次路由时间戳
        },
        // trackId,
      });
      this.initMonitor();
    },
  },
  mounted() {
    this.initMonitor();
    this.XHR();
    // console.log(window.location);
    axios.get('http://pv.sohu.com/cityjson?ie=utf-8').then((res) => {
      // eslint-disable-next-line no-undef
      // console.log(`${returnCitySN.cip},${returnCitySN.cname}`);
      console.log(res);
    });
    // axios.get('http://news.baidu.com/widget?id=LocalNews&ajax=json&t=1577342073684');
  },
  methods: {
    initMonitor() {
      setTimeout(() => {
        document.getElementById('app').onclick = (e) => {
          setTimeout(() => {
            // console.log(e);
            if (e.target.className === 'el-switch__core') {
              this.save({
                type: 'switch',
                value: {
                  title: e.target.parentElement.title,
                  value: e.target.parentElement.className.indexOf('is-checked') > -1,
                },
              });
              console.log(`【SWITCH】${e.target.parentElement.title}:${e.target.parentElement.className.indexOf('is-checked') > -1}`);
            } else if (e.target.className === 'el-checkbox__original') {
              this.save({
                type: 'checkbox',
                value: {
                  title: e.target.value,
                  value: e.target.parentElement.className.indexOf('is-checked') > -1,
                },
              });
              console.log(`【CHECKBOX】${e.target.value}:${e.target.parentElement.className.indexOf('is-checked') > -1}`);
            } else if (e.target.className === 'el-radio__original') {
              this.save({
                type: 'radio',
                value: {
                  title: e.target.value,
                  value: e.target.parentElement.className.indexOf('is-checked') > -1,
                },
              });
              console.log(`【RADIO】${e.target.value}:${e.target.parentElement.className.indexOf('is-checked') > -1}`);
            } else if (e.target.localName === 'button' || e.target.localName === 'span' || e.target.localName === 'div') {
              const reg = /[\r\n]/g;
              if (!reg.test(e.target.innerText)) {
                if (e.target.innerText || e.target.title) {
                  this.save({
                    type: e.target.localName,
                    value: e.target.innerText || e.target.title,
                  });
                  console.log(e.target.innerText || e.target.title);
                }
              }
            }
          }, 100);
        };

        // document.getElementById('app').onchange = (e) => {
        //   // if (e.target.localName !== 'div') {
        //   console.log(e.target.innerText || e.target.title || e.target.value);
        //   // }
        // };
        document.getElementsByTagName('textarea').forEach((item) => {
          item.onblur = (e) => {
            this.save({
              type: 'textarea',
              value: {
                title: e.target.title,
                value: e.target.value,
              },
            });
            console.log(`【TEXTAREA】${e.target.title}:${e.target.value}`);
          };
        });
        document.getElementsByTagName('input').forEach((item) => {
          item.onblur = (e) => {
            setTimeout(() => {
              if (e.target.className === 'el-input__inner') {
                this.save({
                  type: 'input',
                  value: {
                    title: e.target.title || e.target.parentElement.title || e.target.parentElement.parentElement.title,
                    value: e.target.value,
                  },
                });
                console.log(`【INPUT】${e.target.title || e.target.parentElement.title || e.target.parentElement.parentElement.title}:${e.target.value}`);
              }
            }, 300);
          };
        });
      }, 1000);
    },
    save(burialPoint) {
      const burialPointArr = localStorage.getItem('burialPoint') ? JSON.parse(localStorage.getItem('burialPoint')) : [];
      burialPointArr.push(burialPoint);
      localStorage.setItem('burialPoint', JSON.stringify(burialPointArr));
    },
    getTime() {
      const dt = new Date();
      return dt.getTime();
    },
    XHR() {
      axios.interceptors.request.use((config) => {
        const obj = config.method === 'get' ? { method: 'get', params: config.params } : { method: 'post', data: config.data };
        this.save({
          type: 'xhrReq',
          value: {
            url: config.url,
            headers: config.headers,
            timeStamp: this.getTime(),
            ...obj,
          },
          // trackId,
        });
        // return config;
      });
      axios.interceptors.response.use(
        (response) => {
          this.save({
            type: 'xhrRes',
            value: {
              url: response.url,
              headers: response.headers,
              data: response.data,
              status: response.status,
              timeStamp: this.getTime(),
            },
            // trackId,
          });
          // return Promise.reject(response.data.msg);
        },
        (error) => {
          this.save({
            type: 'xhrRes',
            value: {
              url: error.url,
              headers: error.headers,
              data: error.data,
              status: error.status,
              timeStamp: this.getTime(),
            },
            // trackId,
          });
          // return Promise.reject(error);
        }
      );
    },
  },
};

```

2. 引入App.vue
```html
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import monitor from '@/utils/monitor';

export default {
  mixins: [monitor],
};
</script>
```