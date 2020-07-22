# 总结
## vdom 是什么？为何会存在 vdom？
- `virtual dom` , 虚拟 dom , 是 vue 和 React 的核心
- 用js模拟dom结构
- DOM 变化的对比，放在 JS 层来做（图灵完备语言）
- 提高重绘性能
## vdom 的如何应用，核心 API 是什么
- h函数 : `h(‘<标签名>’, {…属性…}, […子元素…])` 、 `h(‘<标签名>’, {…属性…}, ‘….’)`
- patch函数：`patch(container, vnode)` 、 `patch(vnode, newVnode) `
## 介绍一下 diff 算法
- vdom 中应用 diff 算法是为了找出需要更新的节点
- `patch(container, vnode)` 和 `patch(vnode, newVnode)`
- `createElment`
- `updateChildren`

