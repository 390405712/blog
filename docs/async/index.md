# 总结
## 什么是单线程，和异步有什么关系
- 单线程 - 只有一个线程，只能做一件事
- 原因 - 避免 DOM 渲染的冲突
- 解决方案 - 异步

## 什么是 event-loop
-  event-loop（事件轮询）是js实现异步的具体解决方案
-  同步代码，直接执行
-  异步函数先放在异步队列中
-  待同步函数执行完毕，轮询执行异步队列的函数
## 是否用过 jquery 的 Deferred(延迟)
-  dtd 的 API 可分成两类，用意不同
-  第一类： dtd.resolve  dtd.reject
-  第二类： dtd.then  dtd.done  dtd.fail
-  这两类应该分开，否则后果很严重！
-  dtd 返回 deferred 对象
-  dtd.promise() 返回promise对象
## Promise 的基本使用和原理
- 基本语法
- 如何异常捕获:resolve\reject
- 多个串联 - 链式执行的好处:不用写callback,直接return下个promise实例
- Promise.all ：待全部完成之后，统一执行success
- Promise.race ：只要有一个完成，就执行success
- Promise 标准 - 状态变化：pending fulfilled rejected 
- then 函数：前提是创建Pormise实例，接收必须是Promise实例
## 介绍一下 async/await（和 Promise 的区别、联系）
- 基本语法
- 使用了 Promise ，并没有和 Promise 冲突
- 完全是同步的写法，再也没有回调函数
- 但是：改变不了 JS 单线程、异步的本质
## 总结一下当前 JS 解决异步的方案
- jQuery Deferred
- Promise
- Async/Await
- Generator
## 关于 Generator
- 原理比较复杂
- 不是异步的直接替代方式
- 有更好更简洁的解决方案 async/await
- koa 也早已“弃暗投明”
