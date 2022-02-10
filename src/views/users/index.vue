<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="输入用户姓名" clearable v-model="queryForm.query"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUsersList">搜索</el-button>
      <el-button type="primary" @click="handleDialogValue()">添加用户</el-button>
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
          <el-switch v-model="row.mg_state" @change="changeState(row)" />
        </template>
        <template v-slot="{row}" v-if="item.prop === 'create_time'">
          <!-- <el-switch v-model="row.mg_state" /> -->
          {{$filters.filterTimes(row.create_time)}}
        </template>
        <template #default="{row}" v-else-if="item.prop === 'action'">
          <el-button size="small" type="success" @click="handleDialogValue(row)">编辑</el-button>
          <el-button size="small" type="info">设置</el-button>
          <el-button size="small" type="danger" @click="delUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="queryForm.pagesize"
      :small="small"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </el-card>
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    v-if="dialogVisible"
    @initUserList="initGetUsersList"
    :dialogTableValue="dialogTableValue"
  />
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getUser, changeUserState, deleteUser } from "@/api/users";
import { options } from "./options";
import Dialog from "./components/dialog.vue";
import { isNull } from "@/utils/filter.js";
const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 5
});
const dialogTableValue = ref({});
const dialogVisible = ref(false);
const dialogTitle = ref("");
const total = ref(0);
const tableData = ref([]);
const initGetUsersList = async () => {
  const res = await getUser(queryForm.value);
  // console.log(res);

  total.value = res.total;
  tableData.value = res.users;
};
initGetUsersList();

const handleSizeChange = pageSize => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  initGetUsersList();
};

const handleCurrentChange = pageNum => {
  queryForm.value.page = pageNum;
  initGetUsersList();
};
const changeState = async info => {
  await changeUserState(info.id, info.mg_state);
  ElMessage({
    message: "更新成功",
    type: "success"
  });
};
const handleDialogValue = row => {
  // alert("1");
  if (isNull(row)) {
    dialogTitle.value = "添加用户";
    dialogTableValue.value = {};
  } else {
    dialogTitle.value = "编辑用户";
    dialogTableValue.value = JSON.parse(JSON.stringify(row));
  }
  dialogVisible.value = true;
};
const delUser = row => {
  ElMessageBox.confirm("是否确认删除?", "提示消息", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      await deleteUser(row.id);
      ElMessage({
        type: "success",
        message: "删除成功!"
      });
      initGetUsersList();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除失败!"
      });
    });
};
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-input__suffix {
  align-items: center;
}
::v-deep .el-pagination {
  text-align: right;
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
