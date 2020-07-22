# 表格搜索生成器

## 配置参数

参数 | 说明 | 类型 | 可选值 | 默认值
-|-|-|-|-|
type | 控件类型,不传参则使用自定义控件 | String | input,select,time-select,date-picker | 空字符串或者不传此参数
label | 控件描述 | String | — | —
key | 提交的字段 | String | — | —
value | 字段值 | — | — | —

## 使用
```html
<template>
  <SearchGenerator :searchFrom="searchFrom">
    <!-- 搜索框自定义表单控件 -->
    <template slot="form-item"
              scope="scope">
      <el-input-number v-model="scope.item.value"
                      :min="1"
                      :max="10"
                      label="自定义控件"></el-input-number>
    </template>
  </SearchGenerator>
</template>
<script>
import SearchGenerator from '@/components/Generator/SearchGenerator.vue';

export default {
  components:{ SearchGenerator },
  data(){
    return {
      searchFrom: [
        // 搜索框自定义表单控件
        {
          label: '自定义',
          key: 'slotKey',
          value: '',
        },
        {
          label: '租户名称',
          key: 'tenantName',
          type: 'input',
          value: '',
        },
        {
          label: '客户端id',
          key: 'clientId',
          type: 'input',
          value: '',
        },
      ],
    }
  }
}
</script>
```
