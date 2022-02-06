<template>
  <div id="guide" @click.prevent.stop="handleGuide">
    <el-icon>
      <position />
    </el-icon>
  </div>
</template>

<script setup>
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { Position } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { steps } from "./steps";
let driver;
onMounted(() => {
  driver = new Driver({
    className: "scoped-class", // className to wrap driver.js popover
    animate: false, // Whether to animate or not
    opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
    padding: 10, // Distance of element from around the edges
    allowClose: true, // Whether the click on overlay should close or not
    overlayClickNext: false, // Whether the click on overlay should move next
    doneBtnText: "完成", // Text on the final button
    closeBtnText: "关闭", // Text on the close button for this step
    stageBackground: "#ffffff", // Background color for the staged behind highlighted element
    nextBtnText: "下一步", // Next button text for this step
    prevBtnText: "上一步" // Previous button text for this step
  });
});
const handleGuide = () => {
  driver.defineSteps(steps);
  driver.start();
};
</script>

<style lang = 'scss' scoped>
</style>