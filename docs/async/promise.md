# promise
## 异常捕获
```js
result.then(function(img) {
  console.log(img.width);
}).then(function(img) {
  console.log(img.height);
}).catch(function(err) {
  console.log(err);
})
```

## 多个串联
```js
  var src1 = 'imgsrc1'
  var result1 = loadImg(src1)
  var src2 = 'imgsrc2'
  var result2 = loadImg(src2)
  
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
  
  result1.then(function(img) {
    console.log('success1');
    return result2
  }).then(function(img) {
    console.log('success2');
  }).catch(function(err) {
    console.log(err);
  })
```

## Promise.all & Promise.race
```js
//待全部完成之后，统一执行success
Promise.all([result1,result2]).then(res => {
  console.log(res[0]);
  console.log(res[1]);
})

//只要有一个完成，就执行success
Promise.race([result1,result2]).then(res => {
  console.log(res);
})
```

## Promise 标准 - 状态变化
- 三种状态：pending fulfilled rejected
- pending 变为 fulfilled ，或者 pending 变为 rejected
- 状态变化不可逆

## Promise 标准 - then
- Promise 实例必须实现 then 这个方法
- then() 必须可以接收两个函数作为参数
- then() 返回的必须是一个 Promise 实例

