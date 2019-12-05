# 模板
## 递归组件
```html
<!-- 组件A -->
<template>
  // 要将treeData通过prop进行传递
  <B :propTreeData="treeData"/>
</template>
<script>
import B from './B'
export default {
  name: "Tree",
  data() {
    return {
      treeData: [
        {
          menuName: "A",
          children: [
            {
              menuName: "a1",
            },
            {
              menuName: "a2",
            }
          ]
        },
        {
          menuName: "B",
          children: [
            {
              menuName: "b1",
            },
            {
              menuName: "b2",
            }
          ]
        }
      ]
    };
  },
  components:{B}
};
</script>
```
```html
<!-- 组件B -->
<template>
  <ul>
    <li v-for="item in propTreeData" :key="item.menuCode">
      {{item.menuName}}
      // 要有一个结束条件
      <tree v-if="item.children&&item.children.length" :propTreeData="item.children"></tree>
    </li>
  </ul>
</template>
<script>
export default {
  name: "Tree",
  props:{
    propTreeData:Array,
    default:()=>([])
  },
};
</script>
```
## 动态组件
```html
<template>
  <div id="example">
    <button @click="change">切换页面</button>

    <component :is="currentView"></component>

    <!-- 动态组件缓存 -->
      <keep-alive>
          <component :is="currentView"></component>
      </keep-alive>

    <!-- 动态组件过滤缓存 -->
      <!-- 逗号分隔字符串 -->
      <keep-alive include="A,B">
        <component :is="currentView"></component>
      </keep-alive>
      <!-- 正则表达式 (使用 v-bind) -->
      <keep-alive :include="/A|B/">
        <component :is="currentView"></component>
      </keep-alive>
      <!-- Array (use v-bind) -->
      <keep-alive :include="['A', 'B']">
        <component :is="currentView"></component>
      </keep-alive>
  </div>
</template>

<script>
var A = { template: "<div>A</div>" };
var B = { template: "<div>B</div>" };
var C = { template: "<div>C</div>" };

export default {
  name: "App",
  components: {
    A,
    B,
    C
  },
  data() {
    return {
      index:0,
      arr:['A','B','C'],
    };
  },
  computed:{
    currentView(){
        return this.arr[this.index];
    }
  },
  methods:{
    change(){
      this.index = (++this.index)%3;
    }
  }
};
</script>
```
## 异步组件
```js
// router.js
{
  path: '/demo',
  name: 'demo',
  component: resolve => require(['../components/demo'], resolve)
}
```
## 内联模板 inline-template的使用
```html
<!-- 父组件 -->
<child-component inline-template>
     <div>
        <h2>在父组件中定义子组件的模板</h2>
        <p>{{msg}}</p>
     </div>
</child-component>

<script>
// 子组件
export default{
    name:'ChildComponent',
    data(){
        return{
            msg:'aaa'
        }
    }
}
</script>


<!-- 最终显示 -->
<div data-v-763db97b="">
    <h2 data-v-763db97b="">在父组件中定义子组件的模板</h2>
    <p data-v-763db97b="">张不怂</p>
</div>
```
## 全局组件批量自动注册
```html
<!-- 通常使用组件 -->
<template>
    <A  v-model="searchText"  @keydown.enter="search"/>
    <B @click="search">
        <C name="search"/>
    </B>
</template>
<script>
    import A from './A'
    import B from './B'
    import C from './C'
    export default {
      components: { A, B, C }
    }
</script>
```
```js
// 在main.js中引入
const requireComponent = require.context(
  './components',   // 其组件目录的相对路径
  false,   // 是否查询其子目录
  /base_[A-Z]\w+\.(vue|js)$/   // 匹配基础组件文件名的正则表达式
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})
```
## Vue 的构造器——extend
```js
var foo = Vue.extend({
 template: "<p><a :href='url'>{{foo}}</a></p>",
 data : function() {
  return {
   foo : 'vamous',
   url : 'https://juejin.im/editor/drafts/5cd2da7a5188253e8c23baf6'
  }
 }
});

// 对应的html
<foo></foo>

// 此时的页面必然是没有任何效果的，因为扩展实例构造器还需要挂载
new foo().$mount('#app');
```
```js
// 用propsData传递参数
var author = Vue.extend({
 template: "<p><a :href='url'>{{bar}} & {{name}}</a></p>",
 data : function() {
  return {
   bar : 'vamous',
   url : 'https://juejin.im/editor/drafts/5cd2da7a5188253e8c23baf6'
  }
 },
 props : ['name']
});

new author({propsData: {name : 'foo'}}).$mount('#author');
```
## vue 修饰符sync深入解析
```html
<!-- 父组件 -->
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"></text-document>

<!-- 子组件 -->
this.$emit("update:title".newTitle)
```

```html
<!-- 子组件this.$emit('update:value',"子组件的值") 改变 父组件中 :value.sync="text" -->
<!-- 父组件 -->
<template>
    <div>
        <child-com :value.sync="text" ></child-com>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                text:"父组件的值",
            }
        },
    }
</script>
//子组件中修改父组件的值
<template>
    <div @click="post"></div>
</template>

<script>
    export default{
        methods:{
            post(){
                this.$emit('update:value',"子组件的值")
            }
        }
    }
</script>
```