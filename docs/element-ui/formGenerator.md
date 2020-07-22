# 表单生成器

## 配置参数

参数 | 说明 | 类型 | 可选值 | 默认值
-|-|-|-|-|
type | 控件类型,不传参则使用自定义控件 | String | input,select,time-select,date-picker | 空字符串或者不传此参数
label | 控件描述 | String | — | —
key | 提交的字段 | String | — | —
value | 字段值 | — | — | —
col | 栅格大小 | Number | 1~24 | 24
rule | 验证 | Array | — | —

## 使用
```html
<template>
  <FormGenerator ref="FormGenerator"
                 :formData="formData"
                 :type="type">
    <!-- 自定义表单组件 -->
    <template slot="form-item"
              scope="scope">
      <el-input placeholder="自定义组件"
                v-model="scope.item.value">
      </el-input>
    </template>
  </FormGenerator>
</template>
<script>
import FormGenerator from '@/components/Generator/FormGenerator.vue';

export default {
  components: { FormGenerator },
  data(){
    return {
      type: 'add',
      formData: [
        // 保留id，渲染时会过滤
        {
          key: 'id',
          value: '',
        },
        //  自定义表单控件
        {
          label: '自定义',
          key: 'slotKey',
          value: '',
          col: 12,
          rule: this.$rules.require,  //  require: [{ required: true, message: "不能为空", trigger: "change" }],
        },
        {
          label: '登录账号',
          key: 'loginAccount',
          value: '',
          type: 'input',
          col: 12,
          rule: this.$rules.require,
        },
        {
          label: '登录密码',
          key: 'loginPassword',
          value: '',
          type: 'input',
          col: 12,
          rule: this.$rules.require,
        },
      ],
    }
  },
  methods: {
    showDialog(type = this.type, formData) {
      this.formData.forEach((item) => {
        if (type !== 'add') {
          item.value = formData[item.key];
        }
      });
      this.type = type;
      this.$refs.FormGenerator.visible = true;
    },
    save() {
      const params = {};
      this.formData.forEach((item) => {
        params[item.key] = item.value;
      });
      this.$api.tenant.sysTenantSubmit(params).then(() => {
        this.$refs.FormGenerator.close();
        this.$parent.searchData();
      });
    },
  },
}
</script>
```
