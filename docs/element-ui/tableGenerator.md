# 表格生成器

## 配置参数

| 参数        | 说明         | 类型    | 可选值     | 默认值 |
| ----------- | ------------ | ------- | ---------- | ------ |
| label       | 列名         | String  | —          | —      |
| prop        | 字段名       | String  | —          | —      |
| tableColumn | 自定义列内容 | Boolean | true,false | false  |

## 使用

```html
<template>
  <div>
    <TableGenerator
      :tableData="tableData"
      :tableColumn="tableColumn"
      :pagination="pagination"
    >
      <!-- 自定义列 -->
      <template slot="table-column" scope="scope">
        <el-table-column :prop="scope.item.prop" :label="scope.item.label">
        </el-table-column>
      </template>
      <!-- 自定义操作列菜单 -->
      <template slot="btnCustom" slot-scope="scope">
        <el-button
          slot="btnCustom"
          type="success"
          plain
          @click="getMore(scope.row.id,'menu')"
          >绑定菜单</el-button
        >
      </template>
    </TableGenerator>
    <dialog ref="Dialog" />
  </div>
</template>
<script>
  import TableGenerator from '@/components/Generator/TableGenerator.vue';
  import Dialog from './components/TenantDialog.vue';

  export default {
    components:{ Dialog,TableGenerator },
    data(){
      return {
        tableData: [],
        tableColumn: [
          {
            label: '自定义',
            prop: 'tenantName',
            tableColumn: true, // 自定义列
          },
          {
            prop: 'loginAccount',
            label: '登录账号',
          },
          {
            prop: 'loginPassword',
            label: '登录密码',
          },
        ],
        pagination: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        },
    },
    mounted() {
      this.searchData();
    },
    methods: {
      searchData() {
        const searchObj = {};
        this.searchFrom.forEach((item) => {
          searchObj[item.key] = item.value;
        });
        const params = Object.assign(searchObj, this.pagination);
        delete params.total;
        this.$api.tenant.sysTenantPage(params).then((res) => {
          this.tableData = res.data.list;
          this.pagination.total = res.data.totalCount;
        });
      },
      add() {
        this.$refs.Dialog.showDialog('add');
      },
      getMore(id, type) {
        this.$api.tenant.sysTenantById(id).then((res) => {
          this.$refs.Dialog.showDialog(type, res.data);
        });
      },
      del(id) {
        this.$confirm('确认删除？').then(() => {
          this.$api.tenant.sysTenantRemove([id]).then(() => {
            this.searchData();
          });
        });
      },
    },
  }
</script>
```
