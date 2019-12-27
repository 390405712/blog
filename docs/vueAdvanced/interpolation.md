# 插值
## 属性插值
```html
<p v-bind:title="info">{{info}}</p>

<p v-bind:data-cusData="info">{{info}}</p>

<p data-cusdata="Hello vue!">Hello vue!</p>

<p v-bind='{id: elemId, class: elemClass, "data-cusData": cusData}'>{{info}}</p>
data () {
  return {
    info: 'Hello vue!',
    elemId: 'pId',
    elemClass: 'pClass',
    cusData: 'hello world'
  }
}
```

## :class绑定对象语法
```html
<p class=‘static’ :class='{red: redFlag, font: fontFlag }'>{{info}}</p>
{
  redFlag: true,
  fontFlag: false
}
<!-- 渲染结果 -->
<p class="static red">Hello vue!</p>


<p class='static' :class='classObj'>{{info}}</p>
或者这样
<p :class='[classObj, "static"]'>{{info}}</p>
computed: {
  classObj () {
    let classStr = '';
    if (this.redFlag) {
        classStr += 'red';
    }
    if (this.fontFlag) {
        classStr += 'font';
    }
    return classStr;
  }
}
```

## :class绑定数组语法
```html
<p :class="[basicClass, redClass]">{{info}}</p>
{
  basicClass: 'f20 mb20',
  redClass: 'red'
}
<!-- 渲染结果 -->
<p class="f20 mb20 red">Hello vue!</p>
```

## :class绑定数组语法使用三元运算符
```html
<p :class="[showInfo ? basicClass : '', redClass]">{{info}}</p>
{
  basicClass: 'f20 mb20',
  redClass: 'red'
  showInfo: true,
}
<!-- 渲染结果 -->
<p class="f20 mb20 red">Hello vue!</p>
```

## :style绑定对象语法
```html
<p :style='{color: redColor, "font-size": fontSize, backgroundColor: bgColor }'>{{info}}</p>
{
  redColor: 'red',
  fontSize: '16px',
  bgColor: '#FF0'
}

<p :style='styleObj'>{{info}}</p>
computed: {
    styleObj () {
        return `color: ${this.redColor}; fontSize: ${this.fontSize}; backgroundColor: ${this.bgColor}`;
    }
}
<!-- 渲染结果 -->
<p style="color: red; font-size: 16px; background-color: rgb(255, 255, 0);">Hello vue!</p>
```

## :style绑定数组语法
```html
<p :style='[colorStyle, fontStyle, backgroundColor]'>{{info}}</p>
{
  colorStyle: {
    color: 'red'
  }
}
computed: {
    fontStyle () {
       return {fontSize: this.fontSize}
    },
    backgroundColor () {
        return {backgroundColor: this.bgColor}
    }
}
```

# 指令
## v-text
```html
<p v-text="info"></p>
<p>{{info}}</p>
<!-- 也可以是计算属性 -->
computed: {
    info() {
        return 'Hello vue by computed!'
    }
}
<!-- 通过修饰符.prop绑定DOM属性 -->
<p class="testProp" v-bind:text-content.prop="info" v-bind:className.prop="elemId">测试数据</p>
<!-- 渲染结果 -->
<p class="pId">Hello vue!</p>
<!-- 如果删掉一个prop值 -->
<p class="testProp" v-bind:text-content="info" v-bind:className.prop="elemId">测试数据</p>
<!-- 渲染结果 -->
<p class="pId" text-content="Hello vue!">测试数据</p>
```
## v-html
## v-show
## v-if
## v-else
## v-else-if
```html
<p v-if="type === 'A'">A</p>
<p v-else-if="type === 'B'">B</p>
<p v-else-if="type === 'C'">C</p>
<p v-else>D</p>

<!-- 点击button，会发现input元素的内容会发生改变，但如果你向input输入一个值，这时你再点击button，虽然input元素会变，但是已经输入的内容却不会改变，类似的还有textarea标签。
如果认为这是一个问题，可以使用Vue提供的防重的方式，使用key添加一个唯一的关键值。做以下改造 -->
<template v-if="type === 'A'"><input key="A" placeholder="A"/></template>
<template v-else-if="type === 'B'"><input key="B" placeholder="B"/></template>
<template v-else-if="type === 'C'"><input key="C" placeholder="C"/></template>
<template v-else><input key="D" placeholder="D"/></template>
<button @click="changeType">切换Type的值</button>
```
## v-for
## v-on / @
  ### 事件修饰符
  - click、touchmove、
  1. .stop    // 类似使用stopPropagation阻止冒泡
  2. .prevent // 类似使用preventDefault阻止默认行为
  3. .self    // 事件只在目标元素上触发才会执行，忽略冒泡的事件
  4. .once    // 事件执行一次后自动移除
  5. .capture // 监听事件切换成捕获模式
  6. .left    // 鼠标左键触发事件
  7. .right   // 鼠标右键触发事件
  8. .middle  // 鼠标中键触发事件
  9. .passive // 用于移动版网页，解决触发事件再执行方法导致页面卡顿的情况
  ```html
  <ul @click="testModel">
    <!-- 点击改元素阻止ul click事件冒泡以及该方法只执行一次 -->
    <li @click.stop.once="printInfo" v-for="item in clickInfo">{{item.msg}}</li>
  </ul>

  <!-- .prevent修饰符会阻止a标签的跳转行为 -->
  <a href="http://www.baidu.com" @click.prevent>百度</a>

  <!-- .passive解决等待scrollEvt事件执行完成后才会继续进行滚动的问题 -->
  <p @touchmove.passive="scrollEvt" style="height: 3000px">{{info}}</p>

  <!-- @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止对元素自身的点击 -->
  <ul @click.self.prevent="testModel">
    <!-- 这种情况下，并不会阻止a标签的跳转行为 -->
    <li v-for="item in clickInfo"><a href="http://www.baidu.com">{{item.msg}}</a></li>
  </ul>
  <!-- 如果修改成这样，则会阻止所有a标签的跳转行为 -->
  <ul @click.prevent.self="testModel">
  ```

  ### 按键修饰符
  - keyup、keydown、
  1. .enter  // 捕获回车键
  2. .tab    // 捕获tab键
  3. .delete // 捕获“删除”和“退格”键
  4. .esc    // 捕获esc键
  5. .space  // 捕获空格
  6. .up     // 捕获键盘向上按钮
  7. .down   // 捕获键盘向下按钮
  8. .left   // 捕获键盘向左按钮
  9. .right  // 捕获键盘向右按钮
  ```html
  <!-- shift键 + 鼠标左击 -->
  <p @click.shift="printMsg">{{info}}</p>
  <!-- 类型按键还有 .ctrl .alt .shift .meta -->
  ```
  ### 精确控制修饰符的组合事件
  1. .exact
  ```html
  <!-- 只允许同时按住shift 和 鼠标左击 才会触发 -->
  <p @click.shift.exact="printMsg">{{info}}</p>
  ```
## v-bind / :
## v-model
  ### v-model修饰符
  1. .lazy   // 取代 input 监听 change 事件
  2. .number // 输入字符串转为数字
  3. .trim   // 输入首尾空格过滤
## v-pre
该指令是用来跳过这个元素和它的子元素的编译过程，跳过大量没有指令的节点会加快编译。按指令设定的意义来看，是想当模版元素是纯静态内容时，使用这个指令，指定某个区域不行编译，提升Vue的编译速度。不过可能就只有纯背景的DOM区域会需求这个指令吧

## v-cloak
很少用，按现在构建代码的形式，只要在进入页面加上一个全局loading，load完再展示页面

## v-once

## 自定义指令 directives属性
- 自定义指令可以放在组件内部使用directives属性，也可以把公用的指令，放到外部文件然后引用扩展到内部属性directives上
```html
<input placeholder="edit name" v-focus/>
directives: {
    focus: {
        inserted: function (el) {
            el.focus()
        }
    }
}
```
- 在src根目录下，建立directives文件夹，然后建立directives.js，在其内部输入
```js
const focus = {
    inserted: function (el) {
        el.focus()
    }
};

export { focus }
```
- 在组件的目录下引入该文件
```js
import * as directives from './../../directives/directives'; // 引入公共指令
directives: {
    ...directives
},
```
### 自定义指令的相关钩子函数
- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- unbind：只调用一次，指令与元素解绑时调用。
```js
const focus = {
    /**
      el：指令所绑定的元素，可以用来直接操作 DOM
      binding：一个对象，包含以下属性：
        - arg：指令的参数(可选值)，修饰符和参数的顺序会影响这个值的取值，比如:v-focus:gool.foo.rel:bar，arg的取值为gool，如果为v-focus.foo.rel:bar:gool，arg的取值就为空不展示，此时指令会把gool当作修饰符rel的值
        - def：指令的方法，显示的是添加的钩子函数(添加了几个钩子函数就显示几个)
        - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
        - modifiers：一个包含修饰符的对象。比如:v-focus:gool.foo.rel:bar中，修饰符对象为 {foo: true, rel:bar: true}
        - name：指令名，不包括 v- 前缀，不包括修饰符和参数。
        - rawName：指令名全称，包括v-前缀，包括修饰符和参数
        - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
        - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
      vnode：Vue 编译生成的虚拟节点
      oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用
    */
    bind () {
      console.log('bind focus');
    },
    inserted (el, binding, vnode, oldVnode) {
      console.log('update focus');
      console.log(binding);
      console.log(vnode);
      console.log(oldVnode);
    },
    update (el, binding, vnode, oldVnode) {
      console.log('update focus');
      console.log(binding);
      console.log(vnode);
      console.log(oldVnode);
      el.focus();
    },
    componentUpdated () {
      console.log('componentUpdated focus');
    },
    unbind () {
      console.log('unbind focus');
    }
};

export { focus }
```
```html
<input placeholder="edit name" v-focus="focusValue" v-model="focusValue"/>
<script>
import * as directives from './../../directives/directives'; // 引入公共指令
export default {
  data(){
    return {
      {
        focusValue: ''
      }
    }
  },
  directives: {
      ...directives
  },
  // 刷新页面，在未进行任何操作前控制台输出
  console.log('bind focus');
  console.log('inserted focus');
  // 在输入框输入任意字符触发focus指令更新，控制台输出
  console.log('update focus');
  console.log('componentUpdated focus');
}
</script>


```