# 响应式defineProperty
## 核心：Object.defineProperty
```js
var vm = {}
var data = {
  name:'zhangsan',
  age:20
}
var key;
for(key in data){
  (function (key) {
    Object.defineProperty(vm,key,{
      get:function () {
        return data[key]
      },
      set:function (newVal) {
        data[key] = newVal;
      }
    })
  })(key)
}
```
