# 作用域和闭包
## 作用域
### 变量提升
```js
console.log(a);
var a = 100;

fn('200');
function fn(val) {
  console.log(val);
}
```
相当于
```js
var a; //undefined
function fn(val){
  console.log(val);
}
console.log(a)
a = 100;
fn('200')
```

### this
```js
var a = {
  name: 'A',
  fn: function() {
    console.log(this.name);
  }
}
a.fn(); //this === a
a.fn.call({name: 'B'})  //this === {name:'B'}
var fn1 = a.fn();
fn1() //this === window
```
### 作为构造函数执行
```js
function Foo(name) {
  // this = {}
  this.name = name;
  // return this
}
var f = new Foo()
```
### 作为对象属性执行
```js
var obj = {
  name: 'A',
  printName: function() {
    console.log(this.name);
  }
}
obj.printName() //A
```
### 作为普通函数执行
```js
function fn() {
  console.log(this);
}
fn() // this === window
```
### call apply bind （修改this的值）
```js
function fn1(name) {
  console.log(this); //this === window
  console.log(name); //111
}
fn1('111')

function fn2(name) {
  console.log(this); //{x:100}
  console.log(name); //222
}
fn2.call({x:100},'222') //this,name

var fn3 = function (name) {
  console.log(this); //{y:200}
  console.log(name); //333
}.bind({y:200})
fn3('333')
```

### 作用域
```js
//无块级作用域
console.log(name) //123
if(true){
  var name = '123'
}
console.log(name) //123
//函数和全局作用域
var a = 100
function fn() {
  var a = 200
  console.log('fn',a); //fn200
}
console.log('global',a); //global100
fn()
```

### 作用域链
```js
var a = 100;
function fn() {
  var b = 200;
  console.log(a); //100 自由变量
  console.log(b); //200
}
fn()
```

## 闭包

```js
function f() {
  var a = 100
  return function() {
    console.log(a);
  }
}
var f1 = f()
var a = 200
f1() //100
```
```js
function f1() {
  var a = 100
  return function() {
    console.log(a);
  }
}
var f = f1()
function f2(fn){
  var a = 200
  fn()
}
f2(f) // 100
```
### 实际使用
```js
for(var i = 0;i< 10;i++){
  (function(i) {
    var a = document.createElement('a');
    a.innerHTML = i + '</br>';
    a.addEventListener('click',function(e) {
      e.preventDefault();
      alert(i)
    })
    document.body.appendChild(a)
  })(i)
}
```
```js
function fn() {
  var _list = [];
  return function(id) {
    if(_list.indexOf(id) >= 0){
      return false
    } else {
      _list.push(id)
      return true
    }
  }
}

var f = fn();
f(10) //true
f(10) //false
f(20) //true
f(20) //false
```
