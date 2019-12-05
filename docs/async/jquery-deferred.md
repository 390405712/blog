# jquery-deferred（延迟）
## jQuery 1.5 的变化 - 1.5 之前
```js
var ajax = $.ajax({
  url:'xxx',
  success:function() {
    console.log(1);
    console.log(2);
    console.log(3);
  },
  error:function() {
    console.log('error');
  }
})
 console.log(ajax); //返回一个XHR对象
```

## jQuery 1.5 的变化 - 1.5 之后
```js
var ajax = $.ajax('data.json')
ajax.done(function() {
  console.log(1);
}).fail(function() {
  console.log('error');
}).done(function() {
  console.log(2);
})
 console.log(ajax); //返回一个 deferred对象
```
```js
var ajax = $.ajax('data.json')
ajax.then(
  function() {
  console.log(1);
  },
  function() {
    console.log('error1');
  }
)
.then(
  function() {
  console.log(2);
  },
  function() {
    console.log('error2');
  }
)
```

## jQuery 1.5 的变化 
-  无法改变 JS 异步和单线程的本质
-  只能从写法上杜绝 callback 这种形式
-  它是一种语法糖形式，但是解耦了代码
-  很好的体现：开放封闭原则

## 使用 jQuery Deferred
```js
var wait = function() {
  var task = function() {
    console.log('success');
  }
  setTimeout(task,2000)
}
wait()
```
```js
//封装Deferred方法
function waitHandle() {
  var dtd = $.Deferred() //创建一个deferred对象
  
  var wait = function(dtd) { //传入一个 deferred对象
    var task = function() {
      console.log('success');
      dtd.resolve() //表示异步任务已经完成
      // dtd.reject()
    }
    setTimeout(task,2000)
    return dtd //返回deferred对象
    
    //使用 dtd.promise()
    //return dtd.promise() //返回promise对象而不是deferred对象
  }
  return wait(dtd)
}

//写法一
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

//写法二
var q = waitHandle()
q.done(function() {
  console.log(1);
}).fail(function() {
  console.log('err1');
}).done(function() {
  console.log(2);
}).fail(function() {
  console.log('err2');
})


//使用 dtd.promise()
var p = waitHandle()
$.when(p).then(function() {
  console.log(1);
}).then(function() {
  console.log(2);
})
//p.reject() 会报错

```
