# 全局api
## set
- Vue.set(target, propertyName/index, value) 或者 this.$set(target, propertyName/index, value)
- 向响应式数据添加一个属性，并且保证该属性也是响应式的，且能够触发视图的更新。
```js
this.$set(this.obj,'key','value') // 增、改通用
this.$set(this.arr,0,'value')// 增、改通用
```

## delete
- Vue.delete( target, propertyName/index )
- 删除一个对象的属性，如果属性是响应式的，确保删除属性并且更新视图
```js
this.$delete(this.obj,'key')
this.$delete(this.arr,0)
```

## use
```js
import Vue from 'vue'
import Router from 'vue-router'

// 调用
Vue.use(VueRouter)
```
## directive
```js
// 注册(指令函数)
Vue.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})

// 注册 (指令函数)
Vue.directive('my-directive', function () {
  // 这里将会被 `bind` 和 `update` 调用
})

// getter，返回已注册的指令
var myDirective = Vue.directive('my-directive')
```
- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 。
- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- unbind：只调用一次，指令与元素解绑时调用。
- 钩子函数的参数 有( el、binding、vnode 和 oldVnode)。
组件内局部添加：
```js
export default {
  /* 局部指令 */
  directives:{
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
}
```

## filter
```js
//全局过滤器
import Vue from 'vue';
Vue.filter('formatString', function (value) {
  var msg = value.length > 10 ? value.slice(0,3): value;
  return msg;
});
```
```js
//局部过滤器
export default {
  /* 局部过滤器 */
  filters:{
    formatString: function(value){
      var msg = value.length > 10 ? value.slice(0,3): value;
      return msg;
    }
  },
}
```
```js
//使用
// 用在v-bind或者{{}}插入值之后，用 |隔开
// 参数：
// {string} id
// {Function} [definition]
<template>
  <div id="app">
    {{msg | formatString}}
    {{student.name | formatString}}
    <ChildComponent v-bind:message="msg | formatString"></ChildComponent>
  </div>
</template>
```
```html
<p>{{info | upperCase('进行大写转换后为：')}}</p>

// filters下的upperCase做如下修改
upperCase (val, str : '进行大写转换后为：') {
  return `${val} ${str} ${val.toUpperCase()}`;
},
```
- 在src的根目录下建立filters文件夹，然后在文件夹内建立filters.js文件，里面内容如下
```js
let upperCase = (val) => {
    return `${val.toUpperCase()}`;
};

let reverse = (val) => {
    return val.split("").reverse().join("");
};

export { upperCase, reverse }
```
- 在组件内引入刚刚添加的文件
```js
import * as filter from './../../filters/filters';
filters:{
  ...filter
}
```

## 关于 data、computed、watch、filters的使用
- data通常是定义基础数据
- computed关心的是data中的属性值变化
- watch关心的是值的更新，可以是data，也可以是computed
- filters是对模板插值的补充

## nextTick
- 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
```js
//全局
Vue.nextTick(function () {
  // DOM 更新完毕
})；

//组件内部
export default {
  mounted(){
    this.$nextTick(function(){
      // DOM 更新完毕
    })
  }
```

## slot
### 具名slot
```html
<slotshow>
  vue2.6以前
  <p>{{msg}}</p>
  <h6 slot="slotName">内容</h6>

  vue2.6以上的版本
  <h6 v-slot:slotName>内容</h6>
</slotshow>


<!-- slotshow -->
<div class="slotcontent">
  <slot></slot>
  <slot name="slotName"></slot>
</div>
```

### 作用域插槽
```html
<!-- slot组件 -->
<template>
  <ul>
    // 通过:text="item.text"进行传值
    <slot name="item" v-for="item in items" :text="item.text">默认值</slot>
  </ul>
</template>
<script>
export default {
  data(){
    return{
      items:[
        {id:1,text:'第1段'},
        {id:2,text:'第2段'},
        {id:3,text:'第3段'},
      ]
    }
  }
}
</script>

<!-- 父组件 -->
<template>
  <div class="parent">
      <p>父组件</p>
      <child>
              // 通过props进行接收
            <template slot="item" scope="props">
            <li>{{ props.text }}</li>
            </template>
      </child>
  </div>
</template>
<script>
export default {
  components:{
    'child': childNode
  }
}
</script>
```

## event
```html
<parent-com @on-click="handleClick"></parent-com>

<!-- 子组件 -->
<button>点击</button>
<!-- 在子组件中触发 -->
this.$emit('on-click', event);
```

```html
<!-- 加上.native就是原生方法 -->
<parent-com @click.native="handleClick"></parent-com>

<!-- 子组件 -->
<button>点击</button>
```

## props
- type：类型
- default：如果是对象，数组，必须要写成方法进行返回
  ```js
  msg:{
    type: Array,
    default: ()=>[]
  }
  ```
- validator：校验，有一个参数value
- inheritAttrs 是否继承html特性
- 子组件不能修改父组件传递过来的prop

## props和$emit
- props父传子，$emit子传父
```html
<!-- 父组件 -->
<template>
  <div>
    <child @setChildFun = "setChildFun"
           :parentData = "parentData">
  </div>
</template>
<script>
export default {
  data(){
    return {
      parentData:'123'
    }
  }
  methods:{
    setChildFun(getChildMsg){
      console.log(getChildMsg)
      this.parentData = getChildMsg;
    }
  }
}
</script>

<!-- 子组件 -->
<template>
  <div @click = "sendParentFun" ></div>
</template>
<script>
export default {
  props:{
    parentData:{
      /**
       * @description:
       * @param {type} 类型 String、Number、Boolean、Function、Object、Array、Symbol
       * @return:
       */
      type: String,
      default: ''
    },
    parentData1: String,
    parentData2: [String,Number],
    parentData3: {
      type:[String,Number],
      required: true
    }
    parentData3: {
      type:Number,
      validator: (val) => {
        return val > 10;
      }
    }
  },
  methods:{
    sendParentFun(){
      this.$emit('setChildFun','456')
    }
  }
}
</script>

```

## 中央事件总线Bus
- bus.vue
```html
<template>
  <brother1/>
  <brother2/>
</template>
<script>
import brother1 from 'brother1.vue';
import brother2 from 'brother2.vue';
export default {
  components:{
    brother1,
    brother2
  }
}
</script>
```
- brother1.vue
```html
<template>
  <div>
    <p>this is brother1 compoent!</p>
    <input type="text"
           v-model="mymessage"
           @input="passData(mymessage)">
  </div>

</template>
<script>
import 'bus.vue';
export default {
  data() {
    return {
      mymessage : 'brother1msg'
    }
  },
  methods:{
    passData(val){
        //触发全局事件globalEvent
        bus.$emit('globalEvent',val)
    }
  }
}
</script>
```

- brother2.vue
```html
<template>
  <div>
    <p>this is brother2 compoent!</p>
    <p>brother1传递过来的数据：{{brothermessage}}</p>
  </div>

</template>
<script>
import 'bus.vue';
export default {
  data() {
    return {
      brothermessage : ''
    }
  },
  mounted(){
    //绑定全局事件globalEvent
    bus.$on('globalEvent',(val)=>{
      this.brothermessage=val;
    })
  }
}
</script>
```
## provide和inject
- 子组件
```html
<template>
  <div> {{ message }}</div>
</template>
<script>
export default {
  inject:['parent_var'],//得到父组件传递过来的数据
  data() {
    return {
      message : this.parent_var
    }
  },
}
</script>
```

- 父组件
```html
<template>
  <child></child>
</template>
<script>
import child from 'child.vue'
export default {
  components:{
    child
  }
  provide:{
      parent_var:'随便什么都可以（可以是this,可以是data中的数据）'
  },
  data() {
    return {
       message:'传递的值'
    }
  },
}
</script>
```

## $attrs和$listeners
- app.vue引入A组件
```html
<template>
  <div id="app">
    {{app}}
    // ******关键点*****
    <A :app="app" @test="doTest"/>
  </div>
</template>

<script>
import A from "./components/A";

export default {
  name: "App",
  data() {
    return {
      app: "我是App的数据"
    };
  },
  components: {
    A
  },
  methods: {
    doTest() {
      console.log(this.app)
    }
  }
};
```

- A.vue引入B组件
```html
<template>
  <div class="hello">
    <h6>这里是A组件</h6>
    <p>$attrs: {{$attrs}}</p>
    <p>$listeners: {{$listeners}}</p>
     // ******关键点***** v-bind传递的都是$attrs,v-on传递的都是$listeners
    <B v-bind="$attrs" v-on="$listeners"/>
  </div>
</template>

<script>
import B from "./B";

export default {
  name: "A",
  props: {
    msg: String
  },
  components: { B },
  mounted() {
    console.log(this.$listeners);
  }
};
</script>
```

- B组件
```html
<template>
  <div class="hello">
    <h6>这里是B组件</h6>
     // ******关键点*****
    <p>$attrs: {{$attrs}}</p>
  </div>
</template>

<script>

export default {
  name: "B",
  props: {
    msg: String
  },
  mounted() {
   // ******关键点*****
   // 为啥这里直接能emitApp组件传递的test呢？
   // 因为在A组件中有一个关键操作是  <B v-bind="$attrs" v-on="$listeners"/>
    this.$emit("test");
  }
};
</script>
```

## $parent和$children
- 子组件
```html
<template>
  <div>
      <input type="text" v-model="mymessage" @change="changeValue">
  </div>
</template>

<script>
export default {
  props:{
    value:String, //v-model会自动传递一个字段为value的prop属性
  },
  data(){
    return {
      mymessage:this.value
    }
  },
  methods:{
    changeValue(){
      this.$parent.message = this.mymessage;//通过如此调用可以改变父组件的值
    }
  },
};
</script>
```

- 父组件
```html
<template>
  <div>
    <button @click="changeChildValue">test</button >
    <child ref="childRef"></child>
  </div>
</template>

<script>
import child from 'child.vue';
export default {
  components:{
    child
  },
  methods:{
    changeChildValue(){
      this.$refs.childRef.mymessage = 'hello'; // 推荐使用这种，改变第一个子组件中的值
      this.$children[0].mymessage = 'hello'; // 改变第一个子组件中的值
    }
  },
  data(){
    return {
      message:'hello'
    }
  }
};
</script>
```

## mixin
```js
// 创建mixin.js
export const mixinTest1 = {
    created() {
        this.hello();
    },
    methods: {
        hello() {
            console.log('mixinTest1');
        }
    }
};
```

```js
import {mixinTest1} from './../assets/js/mixin';
export default {
    mixins:[mixinTest1],
    name: 'hello',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
```

## compile
- Vue.compile(template)
- 参数： template {string}
- 在 render 函数中编译模板字符串。只在独立构建时有效

## observable
- 让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。
- 返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景
```js
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```
