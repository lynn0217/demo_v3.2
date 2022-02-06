<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const squareUrl = ref("https://ps.ssl.qhimg.com/t01349dcc95e8fa6c37.jpg");

const logout = () => {
  store.dispatch("app/logout");
};
</script>

<style lang = 'scss' scoped>
::v-deep .el-dropdown-menu__item {
  white-space: nowrap;
}
</style>