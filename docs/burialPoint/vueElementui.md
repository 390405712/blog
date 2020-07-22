# 大数据项目前端为完美适配dom埋点监听编码规范
## UI框架
#### 1. 框架使用elementui
#### 2. 可监听到的表单控件：
 - `el-radio`
 - `el-checkbox`
 - `el-input`
 - `el-select`
 - `el-switch`
 - `el-time-select`(非范围类型)
 - `el-date-picker`(非范围类型)
#### 3. 以下标签添加  `point`  属性，值为控件描述例如:  `<el-input v-model="input" placeholder="请输入内容" point="姓名"></el-input>`
 - `el-input`
 - `el-select`
 - `el-switch`
 - `el-time-select`(非范围类型)
 - `el-date-picker`(非范围类型)

4. 触发点击事件的标签统一用`button` `div` `span` `i`命名，如果文本值为空时，添加`title`属性，值为按钮描述，例如:` <i title="收藏" class="iconfont icon-shoucang" @click="set()" />`