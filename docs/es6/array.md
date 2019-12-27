# Array
## Array.from方法
- 将类数组转换为数组
```js
let array = {
    0: 'name',
    1: 'age',
    2: 'sex',
    3: ['user1','user2','user3'],
    'length': 4
}
let arr = Array.from( array )
console.log(arr) // ['name','age','sex',['user1','user2','user3']]


let array = {
    'name': 'name',
    'age': 'age',
    'sex': 'sex',
    'user': ['user1','user2','user3'],
    'length': 4
}
let arr = Array.from( array )
console.log(arr)  // [ undefined, undefined, undefined, undefined ]

// Array.from使用条件：对象的key必须为序列号
```

- 将Set解构的数据转换为数组
```js
let arr = [1,2,3,4,5,6,7,8,9]
let set = new Set(arr)
console.log(Array.from(set))  // [1,2,3,4,5,6,7,8,9]
console.log(Array.from(set, item => item + 1)) // 类似map()的处理方法 [2,3,4,5,6,7,8,9,10]

let  str = 'hello world!';
console.log(Array.from(str)) // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
```

- 将Map解构转为数组，最方便的做法就是使用扩展运算符(...)
```js
const myMap = new Map().set(true, 7)
console.log(myMap); //Map(1) {true => 7}
console.log([...myMap]); //[true ,7]
```