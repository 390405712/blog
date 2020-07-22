# event-loop（事件轮询）
## 分析1
```js
setTimeout(function() {
  console.log(100);
})
console.log(2200);
```

```js
//主进程
 console.log(200);

//异步队列
function() {
  console.log(100);
}
```

## 分析2
```js
setTimeout(function() {
  console.log(1);
},100)
setTimeout(function() {
  console.log(2);
})
 console.log(3);
```
```js
//主进程
 console.log(3);

//异步队列
  //立即放入
  function () {
    console.log(2);
  }
  // 100ms后放入
  function () {
    console.log(1);
  }
```

## 分析3
```js
$ajax({
  url:'xxx',
  success:function(res) {
    console.log(a);
  }
})
setTimeout(function() {
  console.log(b);
},100)
setTimeout(function() {
  console.log(c);
})
 console.log(d);
```

```js
//主进程
 console.log(d);
//异步队列
  //立即放入
  console.log(c);
  //100ms后放入
  console.log(b);
  //ajax加载完成时放入
  console.log(a);
```
