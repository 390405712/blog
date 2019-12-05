# Dom & Bom
## DOM（Document Object Model）
### Dom的本质
- xml：能够描述任何结构性的语言
- html：xml中的特殊类，html中有规范的写法
- property：针对js对象属性的获取、修改
- Attribute：针对html标签属性的获取、修改
####Dom节点操作
```js
var div1 = document.getElementById('div1') //元素
div1.appendChild('<div>child</div>')
div1.removeChild(div1.childNodes[0])

var divList = document.getElementsByTagName('div') //集合
console.log(divList.length)
console.log(divList[0])

var containerList = document.getElementsByClassName('.contaniner') //集合
var pList = document.querySelectorAll('p') //集合
var p = pList[0] //js对象
p.style.width = '100px'
p.className = 'p1'
p.setAttribute('data-name','1111')
p.getAttribute('data-name')
```

## Bom(Brower Object Model)
- navigator
- screen
- location
- history
```js
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')

console.log(screen.width)
console.log(screen.height)

console.log(location.href)

history.back()
history.forward()
```
