# diff算法
## 什么是diff算法
```text
//data1.text
  123
  123
  123
  
//data2.text
  123
  123456
  123456789

//linux中的diff函数
diff data1.txt data2.txt

//git中的diff函数
...
```

## diff实现
```html
<!--before-->
<ul id="list">
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
</ul>

<!--after-->
<ul id="list">
  <li class="item">Item 1</li>
  <li class="item">Item 22</li>
  <li class="item">Item 3</li>
</ul>
```
```js
//before
{
  tag:'ul',
  attrs:{id:'list'},
  children:[
    {
      tag:'li',
      attrs:{className:'item'},
      children:['Item 1']
    },
    {
      tag:'li',
      attrs:{className:'item'},
      children:['Item 2']
    }
  ]
}

//after
{
  tag:'ul',
  attrs:{id:'list'},
  children:[
    {
      tag:'li',
      attrs:{className:'item'},
      children:['Item 1']
    },
    {
      tag:'li',
      attrs:{className:'item'},
      children:['Item 22']
    },
    {
      tag:'li',
      attrs:{className:'item'},
      children:['Item 3']
    }
  ]
}
```
## patch实现
```js
//patch(container, vnode)
function createElement(vnode) {
  var tag = vnode.tag;
  var attrs = vnode.attrs || {};
  var children = vnode.children || [];
  
  if(!tag){
    return null
  }
  
  var elem = document.createElement(tag);
  var attrName;
  
  for(attrName in attrs){
    if(attrs.hasOwnProperty(attrName)){
      elem.setAttribute(attrName,attrs[attrName])
    }
  }
  
  children.forEach(function(childVnode) {
    elem.appendChild(createElement(childVnode))
  })
  return elem
}

//patch(vnode, newVnode)
function updateChildren(vnode,newVnode) {
  var children = vnode.children || [];
  var newChildren = newVnode.children || [];
  
  children.forEach(function(child, index) {
    var newChild = newChildren[index];
    if(newChild == null){
      return
    }
    if(child.tag === newChild.tag){
      updateChildren(child, newChild)
    } else{
      //在原有的vdom上添加新的vdom
      replaceNode(child, newChild)
    }
  })
}
function replaceNode(vnode, newVnode) {
  var elem = vnode.elem;
  var newEleme = createElement(newVnode);
  
  ......
}
```

## diff为何复杂
- 节点新增和删除
- 节点重新排序
- 节点属性、样式、事件变化
- 如何极致压榨性能



