# 模板解析
## 模板是什么？
- 本质：字符串
- 有逻辑，如 v-if v-for 等
- 与 html 格式很像，但有很大区别
- 最终还要转换为 html 来显示
- 模板最终必须转换成 JS 代码
- 因为有逻辑（v-if v-for），必须用 JS 才能实现（图灵完备）
- 转换为 html 渲染页面，必须用 JS 才能实现
- 因此，模板最重要转换成一个 JS 函数（render 函数）

## render-with用法
```js
var obj = {
  name:'name1',
  age:20,
  getAddress: function() {
    alert('nanjing')
  }
}

function f() {
  with(obj){
    alert(name), // obj.name
    alert(age),  // obj.age
    getAddress() // obj.getAddress()
  }
}
```
## 使用render-with
```html
<div id="app">
  <p>{{price}}</p>
</div>

<script>
// before
var vm = new Vue({
  el:'#app',
  data:{
    price:100
  }
})

// after
function render() {
  with(this){
    return _c(
      'div',
      { 
        attrs:{"id":"app"} 
      },
      [
        _c( 'p', [ _v( _s( price ) ) ] ) 
      ]
    )
  }
}
</script>
```
- 模板中所有信息都包含在了 render 函数中
- this 即 vm
- price 即 this.price 即 vm.price，即 data 中的 price
- _c 即 this._c 即 vm._c

- _c: h函数
- _v: createTextVNode 
- _s: toString(val)

##  v-model、v-on:click、v-for实现方法 实现方法
```html
<div>
  <input type="text" v-model="title"/>
  <button @click="add">submit</button>
</div>
<ul>
  <li v-for="item in list" >{{item}}</li>
</ul>
<script>
export default {
  data(){
    return{
      title:'',
      list:[]
    }
  },
  methods:{
    add(){
      this.list.push(this.title);
      this.title = '';
    }
  }
}
</script>
```
```js
// vue.js : code.render()
with (this) {
  return _c(
    'div',
    {
      attrs: {"id": "app"}
    }, 
    [
      _c(
        'div', 
        [_c(
            'input',  // <input type="text" v-model="input"/>
            {
              directives: [ //指令
                {
                  name: "model",
                  rawName: "v-model",
                  value: (title),
                  expression: "title"
                }
              ], 
              domProps: {
                "value": (title)
              }, 
              on: {
                "input": function ($event) { //双向数据绑定
                  if ($event.target.composing) return;
                  title = $event.target.value
                }
              }
            }
          ), 
          _v(" "), 
          _c(
            'button', // <button @click="add">submit</button>
            {on: {"click": add}}, 
            [_v("submit")]
          )
        ]
      ), 
      _v(" "), //因为换行的缘故
      _c(
        'div', 
        [
          _c( 
            'ul', //<li v-for="item in list" >{{item}}</li>
            _l(  //调用renderList方法
              (list), // 返回数组
              function (item) {
              return _c('li', [_v(_s(item))])
              }
            )
          )
        ]
      )
    ]
  )
}
```
```js
//code.render()中的 _l 函数
function renderList (val,render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}
```
## render函数 和 vdom
- vm._c 其实就相当于 snabbdom 中的 h 函数
- render 函数执行之后，返回的是 vnode
```js
vm._update(vnode){
  const prevVnode = vm._vnode;
  vm._vnode = vnode;
  if(!prevVnode){
    vm.$el = vm.__patch__(vm.$el, vnode);
  } else {
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
}

function updateComponent() {
  vm._update(vm._render())
}
```
- updateComponent 中实现了 vdom 的 patch
- 页面首次渲染执行 updateComponent
- data 中每次修改属性，执行 updateComponent



