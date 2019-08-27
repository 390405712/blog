# 总结
## ES6 模块化如何使用，开发环境如何打包？
- 模块化的基本语法：import export (注意有无default)
- 开发环境配置：babel编译ES6语法，模块化可用webpack和rollup

## Class 和普通构造函数有何区别？
- Class 在语法上更加贴合面向对象的写法
- Class 实现继承更加易读、易理解
- 更易于写 java 等后端语言的使用
- 本质还是语法糖，使用 prototype

## Promise 的基本使用和原理？
- new Promise 实例，而且要 return
- new Promise 时要传入函数，函数有 resolve reject 两个参数 
- 成功时执行 resolve() 失败时执行 reject()
- then 监听结果

## 总结一下 ES6 其他常用功能？
- let : 定义变量; const:定义常量
- 多行字符串/模板变量(反引号包围) : `string ${name} string`
- 解构赋值 : 用一行代码拆解对象并分别赋值
- 块级作用域 : 解决了变量在函数中定义外漏的问题
- 函数默认参数 : 简化接收参数默认值的写法
- 箭头函数 : 简化写法以及控制this指向
