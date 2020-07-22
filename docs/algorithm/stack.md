# 栈
## 棒球比赛
- 输入[5,2,C,D,+]
- 输出30
> 第一局得5分；第二局得2分，C表示上一局分数作废，D表示此局得分是前一轮得分的两倍（10），+表示此局得分是之前得分的总和（15）
```js
init([5,2,'C','D','+'])
function init(arr) {
  let newArr = [];
  arr.forEach(item => {
    if(typeof item == 'number'){
      newArr.push(item)
    } else { 
      if(item == 'C'){
        newArr.pop()
      } else if(item == 'D'){
        newArr.push(newArr[newArr.length - 1] * 2)
      } else {
        let total = 0;
        newArr.forEach(item => {
          total += item
        })
        newArr.push(total)
      }
    }
  })
  return newArr.reduce((total,num) => {
    return total + num
  })
}
```
