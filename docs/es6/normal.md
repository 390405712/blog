# 其他常用功能
## let / const
```js
var i = 10;
i = 100;
var j = 200;
j =200;

//es6
let i = 10;
i = 100; //正确
const j = 20;
j = 200; //报错
```
## 多行字符串 /  模板变量
```js
var name = 'zhangsan',age = 20,html = '';
html +='<div>';
html +='<p>'+ name + '</p>';
html +='<p>'+ age + '</p>';
html +='</div>';

//es6
const name = 'zhangsan',age = 20;
const html = `<div>
                <p>${name}</p>
                <p>${age}</p>
              </div>`;
console.log(html);
```

## 解构赋值
```js
 var obj = {a:100, b:200};
 var a = obj.a;
 var b = obj.b;
 
 var arr = ['xxx','yyy','zzz'];
 var x = arr[0];
 
 //es6
 const obj = {a:10, b:20, c:30};
 const {a, c} = obj;
 console.log(a);
 console.log(c);
 
 const arr = ['xxx','yyy','zzz']
 const [x,y,z] = arr;
 console.log(x);
 console.log(y);
 console.log(z);
 
```
## 块级作用域
```js
var obj = {a:100, b:200};
for (var item in obj){
  console.log(item);
}
console.log(item); //b

//es6
const obj = {a:100, b:200};
for (let item in obj){
  console.log(item);
}
console.log(item); //undefined
```
## 函数默认参数
```js
function f(a, b) {
  if(b == null){
    b = 0
  }
}

//es6
function f(a, b = 0){
  
}
```

## 箭头函数
```js
var arr = [1, 2, 3]

arr.map(function(item) {
  return item + 1
})

//es6
const arr = [1, 2, 3]

arr.map( item => item +1 )

arr.map((item, index) => {
  console.log(index);
  return item + 1;
})
```
```js
function f() {
  console.log('real',this); //real {a:100}
  var arr = [1, 2, 3];
  
  arr.map(function(item) {
    console.log('js',this); //js window
    return item + 1;
  })
  
  //es6
  arr.map( item => {
    console.log('es6',this); //es6 {a:100}
    return item + 1;
  })
}

f.call({a:100});
```


