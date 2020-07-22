# 原型链
## 什么是原型
- 每个对象都有一个原型对象
- 这个原型对象的内置属性`_proto_`指向他的构造函数的`prototype`指向的对象
- 所以任何对象都是由一个构造函数创建的
- 但不是每个对象都有`prototype`，只有`function`才有`prototype`
 
## 什么是构造函数
 - 用`function`声明的都是构造函数
 - 如果直接调用，那`function`就是一个普通函数
 - 只有用函数`new`产生对象时，这个函数才是`new`出来对象的构造函数

## 创建对象的过程（使用new）
- 当声明function时，会为这个方法添加一个prototype属性，指向默认的原型对象
- 并且此prototype的constructor属性也指向function对象
- function.prototype === funciton.constructor
```js
function fn() {}
console.log(fn.prototype);
//Object {} -- > 内部的constructor 指向Hello方法
//{
//  constructor: fn(),
//  __proto__: Object
//}
console.log(fn.constructor); //function fn(){}


var h = new fn();
console.log(h.constructor); //function fn(){}
console.log(Object.getPrototypeOf(h) === fn.prototype); //true  getPrototypeOf()获取_proto_
```
- `new`出来的对象，它的`constructor`指向了方法对象，它的`_proto_`和`function.prototype`相等

## new的过程
```js
//常规例子
function person(name) {
  this.name = name;
}

var p = new person('pname');

console.log(p);

//剖析new的过程
function core(name) {
  var obj = {};
  obj.__proto__ = person.prototype;
  obj.constructor = person.prototype.constructor;
  var result = person.call(obj, name);  //call：改变this的指向
  return typeof  result === 'object' && result != null ? result : obj;
}

var pp = core('ppname');
console.log(pp);
```
过程
1. 先创建一个`空对象`
2. 设置一个`_proto_`指向`function.prototype`
3. 设置`constructor`指向`function.prototype.constructor`
4. 用新对象做`this`指向`function`,返回新对象

## 什么是原型链
- 原型链的核心就是依赖对象的_proto_指向，当资得很不存在属性时，就一层层扒出创建对象的构造函数，直至到object时，就没有_proto_指向了。
- 因为_proto_实质找的是prototype，所以我们只要找这个链条上的
