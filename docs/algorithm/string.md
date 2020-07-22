# 字符串
## 单词反转
- 输入`Let's take LeetCode contest`
- 输出`s'teL ekat edoCteeL tsetnoc`
```js
function f(str) {      
  //字符串按空格进行分隔，保存数组
                       //.split(/\s/g)
  return str.length ? str.match(/[\S]+/g).map(item => { 
    // 对数组进行遍历，然后每个元素进行反转
    return item.split('').reverse().join('')
  }).join(' ') : ''
}
```
## 01、10拼接
- 输入`00110011`
- 输出`['0011', '01', '1100', '10', '0011', '01']`
```js
function f(str) {
  // 建立数据结构，堆栈，保存数据
  let r = []
  // 给定任意子输入都返回第一个符合条件的子串
  let match = (str) => {
    let j = str.match(/^(0+|1+)/)[0]
    let o = (j[0] ^ 1).toString().repeat(j.length)
    let reg = new RegExp(`^(${j}${o})`)
    if (reg.test(str)) {
      return RegExp.$1
    } else {
      return ''
    }
  }
  // 通过for循环控制程序运行的流程
  for (let i = 0, len = str.length - 1; i < len; i++) {
    let sub = match(str.slice(i))
    if (sub) {
      r.push(sub)
    }
  }
  return r
}
```
