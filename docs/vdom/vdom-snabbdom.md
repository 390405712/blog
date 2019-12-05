# vdom的起源：snabbdom
## 核心函数
- h函数 : `h(‘<标签名>’, {…属性…}, […子元素…])` 、 `h(‘<标签名>’, {…属性…}, ‘….’)`
- patch函数：`patch(container, vnode)` 、 `patch(vnode, newVnode) `

```js
var container = document.getElementById('container')

var vnode = h( tag: string, attrs: object, text: string / [vnode]: arr )

patch( container, vnode )

var newVnode =  h( tag: string, attrs: object, text: string  / [vnode]: arr )

patch( vnode, newVnode )
```

## 使用snabbdom
```js
var snabbdom = window.snabbdom;

var patch = snabbdom.init([
  snabbdom_class,
  snabbdom_props,
  snabbdom_style,
  snabbdom_eventlisteners,
]);

var container = document.getElementById('container');

var h = snabbdom.h;

var vnode;

var data = [
   {
     name:'张三',
     age:20,
     address:'北京'
   },
   {
     name:'李四',
     age:21,
     address:'上海'
   },
];

function redner() {
  var newVnode = h('table',{},data.map(function(item) {
    var tds = [];
    var i;
    for(i in item){
      if(item.hasOwnProperty(i)){
        tds.push(h( 'td', {}, [ item[i] + '' ] ));
      }
    }
    return h( 'td', {}, tds );
  }))
  
  if(vnode){
    // re-render
    patch(vnode, newVnode);
  } else {
    // render
    patch(container, vnode);
  }
  //save vnode
  vnode = newVnode;
}

redner();

document.getElementById('btn').addEventListener('click',function() {
  data[0].age = 33;
  data[1].address = '深圳';
  redner();
})
```
