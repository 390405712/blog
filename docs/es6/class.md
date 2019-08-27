# Class
## JS构造函数
```js
function MathHandle(x,y) {
  this.x = x;
  this.y = y;
}

MathHandle.prototype.add = function() {
  return this.x + this.y;
};

var m = new MathHandle(1, 2);
console.log(m.add());
```
## Class语法
```js
class MathHandle{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  add(){
    return this.x + this.y;
  }
}

const m = new MathHandle(1, 2);
console.log(m.add());
```
 ## 语法糖
 ```js
class MathHandle{
  constructor(x, y){
      this.x = x;
      this.y = y;
    }
   ...
}
typeof MathHandle //function
MathHandle === MathHandle.prototype.constructor //true
```

## JS构造函数的关系
```js
function MathHandle(x, y) {
  this.x = x;
  this.y = y;
}

MathHandle.prototype.add = function() {
  return this.x = this.y;
}

var m = new MathHandle(1, 2)

typeof MathHandle //function
MathHandle.prototype.constructor === MathHandle //显式原型 === 它本身
m.__proto__ === MathHandle.prototype  //隐式原型 === 显式原型
```

## Class语法关系
```js
class MathHandle{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  add(){
    return this.x + this.y;
  }
}

const m = new MathHandle(1, 2);

typeof MathHandle //function
MathHandle.prototype.constructor === MathHandle //显式原型 === 它本身
m.__proto__ === MathHandle.prototype  //隐式原型 === 显式原型
```
JS构造函数的关系 === Class语法关系，所以确定 Class写法就是`语法糖`

## JS继承
```js
//动物
function Animal() {
  this.eat = function() {
    console.log('animal eat')
  }
}
//狗
function Dog() {
  this.bark = function() {
    console.log('dog bark')
  }
}

Dog.prototype = new Animal() //开始继承
var keji = new Dog()
```

## Class继承
```js
class Animal {
  constructor(name) {  
   this.name = name 
  }
  eat(){
    console.log(`${this.name} eat`)
  }
}

class Dog extends Animal{ //开始继承
  constructor(name){
    super(name)
    this.name = name
  }
  say(){
    console.log(`${this.name} say`)
  }
}

const dog = new Dog('keji')
dog.say()
dog.eat()
```
