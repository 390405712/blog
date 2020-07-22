## 原型、原型链、构造函数

### 构造函数
```js
function Foo(name) {
  this.name = name;
  // return this   //默认带有return
}

var f = new Foo('f')
var n = new Foo('n')  //可创建多个对象
```
- `var a = {}` 其实是 `var a = new Object()` 的语法糖
- `var a = []` 其实是 `var a = new Array()` 的语法糖
- `function Foo(){...}` 其实是 `var Foo = new Function(...)`
- 使用 `instanceof` 判断一个函数是否是一个变量的构造函数

## 原型规则
- 所有引用类型（`array、object、function`）都具有对象特性，可自由扩展属性（除`null`）
- 所有引用类型都有一个 `_proto_` （隐式原型），属性值是一个普通的对象
- 所有函数都有一个 `prototype` （显式原型） ，属性值也是一个普通的对象
- 所有引用类型的 `_proto_` 属性值指向它的构造函数 `prototype` 属性值
- 变量的 `_proto_` 恒等于 它的构造函数的 `prototype`

## 循环对象自身属性
```js
function Foo(name) {
  this.name = name
}
Foo.prototype.alertName = function() {
  alert(this.name)
}

var f = new Foo('123')
f.printName = function() {
  console.log(this.name);
}

var item;
for(item in f){
  if(f.hasOwnProperty(item)){
    console.log(item);
  }
}
```

## instanceof
- 判断引用类型属性是哪个构造函数的方法
- f instanceof Foo 的判断逻辑：f._proto_ 一层一层往上，能否对应到Foo.prototype
- f instanceof Object，最终指向null
```js
var arr = []
arr instanceof Array //true
typeof arr //object
```

## 原型链继承例子
```js
function Elem(id) {
  this.elem = document.getElementById(id)
}
Elem.prototype.html = function(val) {
  var elem = this.elem;
  if(val){
    elem.innerHTML = val;
    return this;
  } else {
    return elem.innerHTML;
  }
}

Elem.prototype.on = function(type, fn) {
  var elem = this.elem;
  elem.addEventListener(type, fn)
}

var div = new Elem('div');
console.log(div.html());
div.html('<div>clike me</div>');
div.on('click',function() {
  alert('clicked')
})
```

- 所有的构造器的constructor都指向Function
- Function的prototype指向一个特殊匿名函数，而这个特殊匿名函数的__proto__指向Object.prototype
- 原型链顶端是Object.prototype
- 构造函数创建的对象（Object、Function、Array、普通对象等）都是Function的实例，它们的__proto__均指向Function.prototype
- 除了Object，所有对象（或叫构造函数）的prototype，均继承自Object.prototype