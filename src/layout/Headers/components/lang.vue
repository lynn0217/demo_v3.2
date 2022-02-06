<template>
  <div id="laang">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        中/英
        <el-icon>
          <sort />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">中文</el-dropdown-item>
          <el-dropdown-item command="en" :disabled="currentLanguage === 'en'">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script  setup>
import { Sort } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useStore } from "vuex";
const i18n = useI18n();
const store = useStore();
const currentLanguage = computed(() => {
  return i18n.locale.value;
});
const handleCommand = val => {
  // console.log(val);
  i18n.locale.value = val;
  store.commit("app/changeLang", val);
  localStorage.setItem("lang", val);
};
</script>

<style lang = 'scss' scoped>
</style>