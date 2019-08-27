# 总结
## 说一个原型的实际应用
入口函数？构造函数？原型？

- 描述jquery如何使用原型
- 描述zepto如何使用原型
- 结合自己的项目经验，在自己经历的jQuery项目中使用的例子
## 原型如何体现它的扩展性
- jQuery插件机制:
1. 声明`$(selector)`
2. 实例化jQuery.fn.init函数并传入selector
3. `init`函数将`selector`处理出一个`dom数组`，并给`dom`添加属性
4. 创建对象，对象中添加了各种处理dom的方法
5. 将对象赋予给`jQuery`的原型以及`jQuery.fn`函数
6. 最后将`jQuery.fn`函数赋予给`init`的原型

- zepto插件机制:
1. 声明`$(selector)`
2. `$`去取`init`函数并传入`selector`
3. `init`函数将`selector`处理出一个`dom数组`，然后去调用`zepto.Z`函数并传入`dom数组`以及`selector`
4. `zepto.Z`实例化一个构造函数`Z`并传入`dom`以及`selector`
5. 构造函数`Z`中处理`dom`及`selector`,给`dom`添加属性
6. 创建`$.fn`对象，对象中添加了各种处理dom的方法
7. 最后将`$.fn`赋予`Z`的原型
8. 最后将`Z`的原型赋予`zepto.Z`的原型
- 结合自己的项目经验，自己做过的基础原型的插件
## 为何要把原型方法放在$.fn?
因为要扩展插件，只有$暴露在window全局变量，将插件扩展统一到$.fn.xxx，方便使用。
```js
$.fn.getNodeName = function (){
  return this[0].nodeName
}
//使用
$(selector).getNodeName()
```
