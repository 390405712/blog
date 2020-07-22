# MVVM框架
## MVC
用户 -> View -> Controller -> Model
- M - Model 数据
- V - View 视图、界面
- C - Controller 控制器、逻辑处理

## MVVM
用户 -> ViewModel -> Model & View
<img :src="$withBase('/assets/mvvm.png')"/>

- M - Model - 模型、数据
- V - View - 视图、模板（视图和模型是分离的）
- VM - ViewModel - 连接 Model 和 View 
- `View - ViewModel - Model`
- `View 指向 dom`
- `Model 指向 js objects`
- `ViewModel 指向vue, 包含了 dom listeners（dom监听） 、data bindings（数据绑定）`
- `View 通过 dom listeners 控制 Model`
- `Model 通过 data bindings 控制 View`
