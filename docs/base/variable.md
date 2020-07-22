# js基础
## 值类型与引用类型
```js
// 值类型
var a = 100;
var b = a;
a = 200;
console.log(b) //100

// 引用类型
var a = {age: 20};
var b = a;
b.age = 21;
console.log(a.age); //21
```

## typeof
- 类型有:`string` `number` `boolean` `undefined` `object` `function` `symbol`
```js
typeof undefined //undefined
typeof 'string' //string
typeof 123  //number
typeof true //boolean
typeof {}  //object
typeof []  //object
typeof null  //object
typeof console.log //function
```

## 运算符
```js
var  a = 100 + 10 //110
var b = 100 + '10' //10010

100 == '100' //true
100 === '100' //false
0 == '' //true
null == undefined //true 
null === undefined // false

var a = true
var b = 100
if(a){} //true
if(b){} //true

console.log(10 && 0) //true
console.log('' || 'abc') // 'abc'
console.log(!window.abc) //true

var a = 100
console.log(!!a)  //将number转为boolean
```

## js内置函数
`Object` `Array` `Boolean` `Number` `String` `Function` `Date` `RegExp` `Error`

## JSON
```js
JSON.stringify(Object);
JSON.parse(StringObject);
```

## 获取日期
```js
Date.now() //时间戳 1567749106812
var dt = new Date() //国际格式 Fri Sep 06 2019 13:52:03 GMT+0800 (中国标准时间)
dt.getTime() //时间戳 1567749123207
dt.getFullYear() //年 2019
dt.getMonth() //月 8 需要 +=1
dt.getDate() //日 6
dt.getHours() //时 13
dt.getMinutes() //分 52
dt.getSeconds() //秒 3
```

## Math
```js
Math.random() // 0 ~ 1  0.3852691508472208 
```
## 数组api
- forEach 遍历所有元素
- every 判断所有元素是否都符合条件
- some 判断是否至少有一个元素符合条件
- sort 排序
- map 对元素重新组装，生成新数组
- filter 过滤符合条件的元素
### forEach
```js
var arr = [1,3,5,2,4]
var forEach = arr.forEach(function(item,index) {
  console.log(index,item);
})

var every = arr.every(function(item,index) {
  if(item < 4){
    return true
  }
})

var some = arr.some(function(item,index) {
  if(item <4){
    return true
  }
})

var sort = arr.sort(function(a,b) {
  //从小到大
  return a - b
  //从大到小
  // return b - a
})

var map = arr.map(function(item,index) {
  return '<div>'+ item + '</div>'
})

var filter = arr.filter(function(item,index) {
  if(item <4){
    return true
  }
})
console.log('forEach:',forEach);// 0 1 1 3 2 5 3 2 4 4
console.log('every:',every); //false
console.log('some:',some); //true
console.log('sort:',sort);//[1, 2, 3, 4, 5]
console.log('map:',map);// ["<div>1</div>", "<div>2</div>", "<div>3</div>", "<div>4</div>", "<div>5</div>"]
console.log('filter:',filter); //[1, 2, 3]
```
## 对象api
```js
var obj = {a:1,b:2,c:3}
for (var key in obj){
  if(obj.hasOwnProperty(key)){
    console.log(key,obj[key]);
  }
}
// a 1
// b 2
// c 3
```
