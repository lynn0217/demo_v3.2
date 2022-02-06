<template>
  <div class="hamburger-container" id="hamburger" @click="toggleClick">
    <el-icon class="hamburger-opened">
      <fold />
    </el-icon>
    <!-- <el-icon class="hamburger-closed">
      <expand />
    </el-icon>-->
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { Fold, Expand } from "@element-plus/icons-vue";
const store = useStore();
const toggleClick = () => {
  store.commit("app/changeSiderType");
};
const icon = computed(() => {
  return store.getters.siderType ? "hamburger-opened" : "";
});
</script>

<style lang='scss' scoped>
.hamburger-opened,
.hamburger-closed {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>