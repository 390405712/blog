# 单线程
## 单线程只能关注一件事
```js
var i, sum = 0;
for(i = 0; i< 100000000; i++){
  sum ++;
}
console.log(sum);

console.log(1)
alert('stop')  //同步
console.log(2)
```

## 原因：避免DOM渲染冲突
-  浏览器需要渲染 DOM
-  JS 可以修改 DOM 结构
-  JS 执行的时候，浏览器 DOM 渲染会暂停
-  两段 JS 也不能同时执行（都修改 DOM 就冲突了）
-  webworker 支持多线程，但是不能访问 DOM

## 解决方案 ： 异步
```js
console.log(100)
setTimeout(function() {
  console.log(200);
},1000)
console.log(300);
console.log(400);
//100 300 400 200
```

```js
console.log(100);
$.ajax({
  url:'xxx',
  succcess:function(res) {
    console.log(res);
  }
})
console.log(300);
console.log(400);
//100 300 400 res
```

## 异步方案的缺点
- 没按照书写方式执行，可读性差
- callback 中不容易模块化

