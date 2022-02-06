<template>
  <div @click="handleFullScreen" id="sf">
    <el-icon>
      <full-screen />
    </el-icon>
  </div>
</template>

<script setup>
import { FullScreen, Crop } from "@element-plus/icons-vue";
import screenfull from "screenfull";
import { ref, onMounted, onBeforeMount } from "vue";
const icon = ref(screenfull.isFullscreen);

const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
};

// onMounted(() => {
//   screenfull.on("change", changeIcon);
// });
// onBeforeMount(() => {
//   screenfull.off("change");
// });
</script>

<style lang = 'scss' scoped>
</style>