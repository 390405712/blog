# 事件
## 通用事件绑定
```js
var a = document.getElementById('link');
a.addEventListener('click',function(e) {
  e.preventDefault() //阻止默认行为
})
```
## 冒泡
```js
var p = document.getElementById('p')
var body = document.body
bindEvent(p,'click',function(e) {
  e.stopPropagation()
  alert('激活')
})
bindEvent(body,'click',function(e) {
  alert('取消')
})
```
## 代理
```js
var div1 = document.getElementById('div1')
div1.addEventListener('click',function(e) {
  if(e.target.nodeName == 'a'){
    alert(target.innerHTML)
  } 
})
```

## 完善
```js
function bindEvent(ele,type,selector,fn) {
  if(fn == null){
    fn = selector;
    selector = null
  }
  ele.addEventListener(type,function(e) {
    var target;
    if(selector){
      target = e.target
      if(target.matches(selector)){
        fn.call(target,e)
      }
    } else {
      fn(e)
    }
  })
}
//使用代理
var div1 = document.getElementById('div1')
bindEvent(div1,'click','a',function(e) {
  console.log(this.innerHTML);
})

//不使用代理
var a = document.getElementById('a')
bindEvent(div1,'click',function(e) {
  console.log(a.innerHTML);
})
```
