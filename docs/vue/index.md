# 总结
## 使用 jQuery 和使用框架的区别
- 数据和视图的分离，解耦（开放封闭原则）
- 以数据驱动视图，只关心数据变化，DOM 操作被封装
- 前端组件化

## 对 MVVM 的理解
- MVVM - Model View ViewModel
- `View - ViewModel - Model`
- `ViewModel 指向vue, 包含了 dom listeners（dom监听） 、data bindings（数据绑定）`
- `View 通过 dom listeners 控制 Model`
- `Model 通过 data bindings 控制 View`

## 三要素
- 响应式：vue 如何监听到 data 的每个属性变化？
- 模板引擎：vue 的模板如何被解析，指令如何处理？
- 渲染：vue 的模板如何被渲染成 html ？以及渲染过程

##  vue 中如何实现响应式
- `Object.defineProperty`
- 将`data`的属性代理到`vm`上

##  vue 中如何解析模板
- 模板：字符串，有逻辑，嵌入 JS 变量……
- 模板必须转换为 JS 代码（有逻辑、渲染 html、JS 变量）
- `render`函数渲染用
- `render`函数执行返回`vnode`
- 拿到`vnode`调用`updateComponent`函数
##  vue 的整个实现流程（重点） demo：todo-list
### 1. 第一步：解析模板成 render 函数
- `with` 的用法
- 模板中的所有信息都被 `render` 函数包含
- 模板中用到的 `data` 中的属性，都变成了 JS 变量
- 模板中的 `v-model`  `v-for`  `v-on` 都变成了 JS 逻辑
- `render` 函数返回 `vnode`

### 2. 第二步：响应式开始监听
- `Object.defineProperty`
- 将 `data` 的属性代理到 `vm` 上

### 3. 第三步：首次渲染，显示页面，且绑定依赖
- 初次渲染，执行 `updateComponent`，执行 `vm._render()`
- 执行 `render` 函数，会访问到 vm.list vm.title
- 会被响应式的 `get` 方法监听到
- 执行 `updateComponent` ，会走到 `vdom` 的 `patch` 方法
- `patch` 将 `vnode` 渲染成 `DOM` ，初次渲染完成
- `data` 中有很多属性，有些被模板用到，有些可能不被模板用到
- 被用到的会走到 `get` ，不被用到的不会走到 `get`
- 未走到 get 中的属性，`set` 的时候我们也无需关心
- 避免不必要的重复渲染

### 4. 第四步：data 属性变化，触发 rerender
- 修改属性，被响应式的 `set` 监听到
- `set` 中执行 `updateComponent`
- `updateComponent` 重新执行 `vm._render()`
- 生成的 `vnode` 和 `prevVnode` ，通过 `patch` 进行对比
- 渲染到 `html` 中

