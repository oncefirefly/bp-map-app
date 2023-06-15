<script setup lang="ts">
import type { Coordinates } from "@/types";

const props = defineProps<{
  text: string;
  coordinates: Coordinates;
}>();

const emits = defineEmits<{
  click: [coordinates: Coordinates];
}>();

const handleBtnClick = () => {
  emits("click", props.coordinates);
};
</script>

<template>
  <button class="center-btn" type="button" @click="handleBtnClick">
    {{ props.text }}
  </button>
</template>

<style scoped>
.center-btn {
  padding: 10px;

  text-transform: capitalize;
  font-weight: 600;

  border: none;
  border-radius: 5px;

  color: #fff;
  background: #0096ff;
}
</style>
