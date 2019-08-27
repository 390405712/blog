# Promise
## Callback Hell
```js
function loadImg(src, callback, fail) {
  var img = document.createElement('img')
  img.onload = function() {
    callback(img);
  }
  img.onerror = function() {
    fail();
  }
  img.src = src
}

var src = 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super';
loadImg(src,function(img) {
  console.log(img.width);
},function() {
  console.log('failed');
})
```

## Promise语法
```js
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

var src = 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super';
var result = loadImg(src);

result.then(function(img) {
  console.log(img.width)
})

result.then(function(img) {
  console.log(img.height)
})
```
