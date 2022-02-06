<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="输入用户姓名" clearable v-model="queryForm.query"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search">搜索</el-button>
      <el-button type="primary">添加用户</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
        v-for="(item,index) in options"
        :key="index"
      >
        <template v-slot="{row}" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" />
        </template>
        <template v-slot="{row}" v-if="item.prop === 'create_time'">
          <!-- <el-switch v-model="row.mg_state" /> -->
          {{$filters.filterTimes(row.create_time)}}
        </template>
        <template #default v-else-if="item.prop === 'action'">
          <el-button size="small" type="success">编辑</el-button>
          <el-button size="small" type="info">设置</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getUser } from "@/api/users";
import { options } from "./options";
const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 2
});
const tableData = ref([]);
const initGetUsersList = async () => {
  const res = await getUser(queryForm.value);
  console.log(res);
  tableData.value = res.users;
};
initGetUsersList();
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style>
