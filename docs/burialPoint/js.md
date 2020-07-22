# js原生埋点
## 埋点监听
 ### 初始化时
 - 获取浏览器内核、操作系统、ip、省市,并生成trackId
 - 给trackId设定一个生命期限（时间戳），监听到新的埋点时，将之前设定的生命期限（时间戳）去对比当前时间戳，超过了则生成一个新的trackId
 ```js
  // 获得基础信息
  const baseGenerator = () => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = ' http://pv.sohu.com/cityjson?ie=utf-8';
    document.body.appendChild(s);
    let windowObj = window.navigator;
    save({
      type: 'base',
      value: {
        kernel:windowObj.userAgent,
        system:windowObj.appVersion,
        ip:returnCitySN.cip,
        address:returnCitySN.cname,
      },
    });
  }
  baseGenerator();
 ```
  ### 路由监听
  - 路由监听：vue-router使用版本为2.7.0，其他版本触发不了onhashchange或者onpopstate
  ```js
  window.onhashchange = () => {
    save({
      type: 'router',
      value: {
        to: window.location.href,
        timeStamp: Date.now(),
      },
    });
  };
  ```

  ### dom操作监听
  ```js
  const initDomListener = () => {
    setTimeout(() => {
      document.getElementById('app').onclick = (e) => {
        setTimeout(() => {
          // console.log(e);
          if (e.target.className === 'el-switch__core') {
            save({
              type: 'switch',
              value: {
                title: e.target.parentElement.title,
                value: e.target.parentElement.className.indexOf('is-checked') > -1,
              },
            });
            console.log(`【SWITCH】${e.target.parentElement.title}:${e.target.parentElement.className.indexOf('is-checked') > -1}`);
          } else if (e.target.className === 'el-checkbox__original') {
            save({
              type: 'checkbox',
              value: {
                title: e.target.value,
                value: e.target.parentElement.className.indexOf('is-checked') > -1,
              },
            });
            console.log(`【CHECKBOX】${e.target.value}:${e.target.parentElement.className.indexOf('is-checked') > -1}`);
          } else if (e.target.className === 'el-radio__original') {
            save({
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
                save({
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
          save({
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
              save({
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
  };
  initDomListener();
  ```

  ### xhr监听
  ```js
  let xhrReq = {};
  let xhrRes = {};
  const isJSON = (str) => {
    if (typeof str === 'string') {
      try {
        const obj = JSON.parse(str);
        if (typeof obj === 'object' && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  };
  const response = (xhr) => {
    // console.log(xhr);
    xhrRes = {
      url: xhrReq.url,
      headers: {},
      data: isJSON(xhr.xhr.response) ? JSON.parse(xhr.xhr.response) : xhr.xhr.response,
      status: xhr.status,
      timeStamp: Date.now(),
    };
    save({
      type: 'xhrRes',
      value: xhrRes,
    });
  };
  const realXhr = 'RealXMLHttpRequest';
  const XHRListener = (proxy) => {
    window[realXhr] = window[realXhr] || XMLHttpRequest;
    XMLHttpRequest = function () {
      const xhr = new window[realXhr]();

      for (const attr in xhr) {
        let type = '';
        try {
          type = typeof xhr[attr];
        } catch (e) {
        }
        if (type === 'function') {
          this[attr] = hookFunction(attr);
        } else {
          Object.defineProperty(this, attr, {
            get: getterFactory(attr),
            set: setterFactory(attr),
            enumerable: true
          });
        }
      }
      this.xhr = xhr;
    };
    function getterFactory(attr) {
      return function () {
        const v = this.hasOwnProperty(`${attr}_`) ? this[`${attr}_`] : this.xhr[attr];
        const attrGetterHook = (proxy[attr] || {}).getter;
        return attrGetterHook && attrGetterHook(v, this) || v;
      };
    }
    function setterFactory(attr) {
      return function (v) {
        const { xhr } = this;
        const that = this;
        const hook = proxy[attr];
        if (typeof hook === 'function') {
          xhr[attr] = function () {
            proxy[attr](that) || v.apply(xhr, arguments);
          };
        } else {
          const attrSetterHook = (hook || {}).setter;
          v = attrSetterHook && attrSetterHook(v, that) || v;
          try {
            xhr[attr] = v;
          } catch (e) {
            this[`${attr}_`] = v;
          }
        }
      };
    }
    function hookFunction(fun) {
      return function () {
        const args = [].slice.call(arguments);
        if (proxy[fun] && proxy[fun].call(this, args, this.xhr)) {
          return;
        }
        return this.xhr[fun].apply(this.xhr, args);
      };
    }
    return window[realXhr];
  };
  XHRListener({
    open: (req) => {
      // console.log(req);
      xhrReq = {
        url: req[1].url ? req[1].url : req[1],
        headers: {},
        method: req[0],
        timeStamp: Date.now(),
      };
      xhrReq = Object.assign(xhrReq, req[1].data ? { data: req[1].data } : {});
    },
    setRequestHeader: (req) => {
      xhrReq.headers[req[0]] = req[1];
    },
    send: (data) => {
      // console.log(data);
      if (data[0] !== null) {
        xhrReq.data = data;
      }
      save({
        type: 'xhrReq',
        value: xhrReq,
      });
    },
    getAllResponseHeaders: (res) => {
      if (res.length > 0) {
        // console.log(res);
        xhrRes.headers[res[0]] = res[1];
      }
    },
    onreadystatechange: response,
    onload: response
  });
  ```


## 埋点记录及提交
```js
let trackId = localStorage.getItem('trackId')
  ? (Date.now() - localStorage.getItem('trackId') <= 60000
    ? localStorage.getItem('trackId')
    : Date.now())
  : Date.now();
let actionTime = localStorage.getItem('actionTime') ? localStorage.getItem('actionTime') : trackId;
const save = (burialPoint) => {
  // console.log(burialPoint);
  const burialPointArr = localStorage.getItem('burialPoint') ? JSON.parse(localStorage.getItem('burialPoint')) : [];
  if (burialPointArr.length > 0) {
    if (burialPointArr[burialPointArr.length - 1].type === 'xhrRes') {
      if (burialPointArr[burialPointArr.length - 1].value.url === burialPoint.value.url) {
        return false;
      }
    }
  }
  trackId = Date.now() - actionTime <= 60000 ? trackId : Date.now();
  actionTime = Date.now();
  localStorage.setItem('actionTime', actionTime);
  burialPoint = Object.assign(burialPoint, { trackId });
  burialPointArr.push(burialPoint);
  if (burialPointArr.length >= 10) {
    // 提交服务器
  }
  localStorage.setItem('burialPoint', JSON.stringify(burialPointArr));
  return true;
};
```


## 使用埋点
- 将埋点js文件引入main.js
```js
// main.js
import '@/utils/burial-point-js';
```