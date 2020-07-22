# Async-Await
## then 只是将 callback 拆分了
```js
var w = waitHandle()
w.then(function() {
  console.log(1);
},function() {
  console.log('err1');
}).then(function() {
  console.log(2);
},function() {
  console.log('err2');
})
```

## 最直接的同步写法
```js
var src1 = 'imgsrc1'
var src2 = 'imgsrc2'

function loadImg(src) {
  const promise = new Promise(function(resolve, reject) {
    var img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject()
    }
    img.src = src
  })
  return promise
}

const load = async function () {
  const result1 = await loadImg(src1)
  console.log(result1);
  const result2 = await loadImg(src2)
  console.log(result2);
}
load()
```

## 用法
- 使用 await ，函数必须用 async 标识
- await 后面跟的是一个 Promise 实例
- 需要 babel-polyfill

