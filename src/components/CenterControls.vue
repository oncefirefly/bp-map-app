<script setup lang="ts">
import type { Coordinates } from "@/types";

import CenterControlBtn from "./CenterControlBtn.vue";

const emits = defineEmits<{
  click: [coordinates: Coordinates];
}>();

const handleCenterBtnClick = (coordinates: Coordinates) => {
  emits("click", coordinates);
};
</script>

<template>
  <div class="center-controls">
    <CenterControlBtn
      text="to portland"
      :coordinates="[-122.676483, 45.523064]"
      @click="handleCenterBtnClick"
    />
    <CenterControlBtn
      text="to berlin"
      :coordinates="[13.404954, 52.520008]"
      @click="handleCenterBtnClick"
    />
  </div>
</template>

<style scoped>
.center-controls {
  position: absolute;
  bottom: 1%;
  left: 1%;
  z-index: 1;

  padding: 15px;
  max-width: 300px;
  min-width: 130px;

  border-radius: 3px;
  color: #111;
  background: none;

  display: flex;
  column-gap: 15px;
}
</style>
