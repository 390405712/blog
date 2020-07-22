# 使用文档

## 使用插件前项目环境及编码规范

### 前端
- 非单页面应用的环境下,应避免页面跳转时公共js重新加载的情况（就是避免F5）,这会造成插件初始化导致漏监听的情况
- 页面中按钮使用button命名
- 监听的dom文本没有值时（图标按钮、输入框、文本域等等），在该dom上添加属性`point="dom描述"`

### 后端
- 后端返回数据应使用json，不要使用字符串json

## 插件说明

插件名 | 监听dom操作的实现方式 | 监听路由的实现方式 | 监听xhr的实现方式 | 前端缓存方式 | 是否必须使用babel插件转es5
-|-|-|-|-|-|
record-point-js | js原生 | js原生 | js原生 | indexedDB或者localStorage | 是
record-point-layui | js原生 + jquery + layui | js原生 | js原生 | indexedDB或者localStorage | 是
record-point-vue | js原生 + vue + elementui | vue-router | axios | indexedDB或者localStorage | 否

### record-point-layui 使用顺序
1. 在根目录html中引入`record-point-layui.js`（注：在jquery.js之后的位置），根据实际情况添加async属性（能尽早的开始监听）
2. 在`record-point-layui.js`中的`DATA`变量中配置租户信息
```js
  DATA.host: {
    client_id: 'wfystfw', // 客户端id
    redirect_uri: 'http://111.229.161.253:22222/pcstfw/canteen/foodReserve', // 重定向地址
    accessAddress: '111.229.161.253:22222', // 平台地址
    client_secret: 'wfystfw' // 客户端secret
  }
```
3. 在`record-point-layui.js`中的`baseGenerator`方法中的`DATA.base`中写入用户及角色值
```js
  DATA.base = {
    user: 视项目实际情况获取用户,
    role: 视项目实际情况获取角色,
  };
```

### record-point-js 使用顺序
1. 在根目录html中引入`record-point-js.js`（注：在jquery.js之后的位置），根据实际情况添加async属性（能尽早的开始监听）
2. 在`record-point-js.js`中的`DATA`变量中配置租户信息
```js
  DATA.host: {
    client_id: 'wfystfw', // 客户端id
    redirect_uri: 'http://111.229.161.253:22222/pcstfw/canteen/foodReserve', // 重定向地址
    accessAddress: '111.229.161.253:22222', // 平台地址
    client_secret: 'wfystfw' // 客户端secret
  }
```
3. 在`record-point-js.js`中的`baseGenerator`方法中的`DATA.base`中写入用户及角色值，根据项目实际情况获取
```js
  DATA.base = {
    user: 视项目实际情况获取用户,
    role: 视项目实际情况获取角色,
  };
```

### record-point-vue 使用顺序
1. 在main.js中引入`record-point-vue.js` 或者App.vue中import并在mixins中添加
2. 如项目中axios使用响应拦截需要return原主体
```js
axios.interceptors.response.use(
  (response) => {
    return response
  }
)
```
3. 在`record-point-vue.js`中的`data`变量中配置租户信息
```js
  host: {
    client_id: 'wfystfw', // 客户端id
    redirect_uri: 'http://111.229.161.253:22222/pcstfw/canteen/foodReserve', // 重定向地址
    accessAddress: '111.229.161.253:22222', // 平台地址
    client_secret: 'wfystfw' // 客户端secret
  }
```
4. 在`record-point-vue.js`中的`baseGenerator`方法中的`DATA.base`中写入用户及角色值
```js
  _self.base = {
    user: 视项目实际情况获取用户,
    role: 视项目实际情况获取角色,
  }
```