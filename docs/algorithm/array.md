# 数组
## 电话号码组合
- 输入`234`
- 输出`[
        'adg', 'adh', 'adi',
        'aeg', 'aeh', 'aei',
        'afg', 'afh', 'afi',
        'bdg', 'bdh', 'bdi',
        'beg', 'beh', 'bei',
        'bfg', 'bfh', 'bfi',
        'cdg', 'cdh', 'cdi',
        'ceg', 'ceh', 'cei',
        'cfg', 'cfh', 'cfi'
      ]`
```js
function f(str) {
  // 对输入做处理，如果小于1返回空（LeetCode测试用例）
  if (str.length < 1) return []
  // 建立电话号码键盘映射
  let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  // 如果只给了一个按键，直接把按键内容取出来并按单个字符分组就可以了（LeetCode测试用例）
  if (str.length < 2) return map[str].split('')
  // 把输入字符串按单字符分隔变成数组，234=>[2,3,4]
  let num = str.split('')
  // 保存键盘映射后的字母内容，如 23=>['abc','def']
  let code = []
  num.forEach(item => {
    if (map[item]) {
      code.push(map[item])
    }
  })
  let comb = (arr) => {
    // 临时变量用来保存前两个组合的结果
    let tmp = []
    // 最外层的循环是遍历第一个元素，里层的循环是遍历第二个元素
    for (let i = 0, il = arr[0].length; i < il; i++) {
      for (let j = 0, jl = arr[1].length; j < jl; j++) {
        tmp.push(`${arr[0][i]}${arr[1][j]}`)
      }
    }
    arr.splice(0, 2, tmp)
    if (arr.length > 1) {
      comb(arr)
    } else {
      return tmp
    }
    return arr[0]
  }
  return comb(code)
}
```
## 卡牌分组
- 输入`[1, 2, 3, 4, 4, 3, 2, 1]`
- 输出`true`
### 方法1
```js
function f(arr) {
  // 存储每张卡牌的总数
  // 修改排序的方式修改为直接统计每个相同字符的数量，思路不变
  let group = []
  let tmp = {}
  arr.forEach(item => {
    tmp[item] = tmp[item] ? tmp[item] + 1 : 1
  })
  for (let v of Object.values(tmp)) {
    group.push(v)
  }
  // 此时group已经存放的是每张牌的总数了（数组只遍历一遍，避免了排序和正则的耗时）
  // 求两个数的最大公约数
  let gcd = (a, b) => {
    if (b === 0) {
      return a
    } else {
      return gcd(b, a % b)
    }
  }
  while (group.length > 1) {
    let a = group.shift()
    let b = group.shift()
    let v = gcd(a, b)
    if (v === 1) {
      return false
    } else {
      group.unshift(v)
    }
  }
  return group.length ? group[0] > 1 : false
}
```

### 方法2
```js
function f(arr) {
  let obj = {};
  for(let i in arr){
    obj[arr[i]] = obj[arr[i]] ? obj[arr[i]]+1 : 1
  }
  for(let key in obj){
    if(obj[key]%2!=0) return false
  }
  return true
}
```

## 种花
- 给一个范围1表示已经种了，0表示空地，能种的条件是相邻的两个数是0（头尾只看一个），计算最多能种多少颗
- 输入`[1, 0, 0, 0, 1, 0, 0]`
- 输出`2`
```js
function f(arr) {
  let max = 0
  // 右边界补充[0,0,0],最后一块地能不能种只取决于前面的是不是1，所以默认最后一块地的右侧是0（无须考虑右侧边界有阻碍）
  arr.push(0)
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0) {
      if (i === 0 && arr[1] === 0) {
        max++
        i++
      } else if (arr[i - 1] === 0 && arr[i + 1] === 0) {
        max++
        i++
      }
    }
  }
  return max
}
```

## 格雷编码
- 输入非负整数，例如输入1：0 1,输入2：00 01 11 10，输入3:
- 输入`3`
- 输出`[000,001,011,010,110,111,101,100]`
```js
function f(n) {
  let make = (n) => {
    if (n === 1) {
      return ['0', '1']
    } else {
      let prev = make(n - 1)
      let result = []
      let max = Math.pow(2, n) - 1
      for (let i = 0, len = prev.length; i < len; i++) {
        result[i] = `0${prev[i]}`
        result[max - i] = `1${prev[i]}`
      }
      return result
    }
  }
  return make(n)
}
```
