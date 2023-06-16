<script setup lang="ts">
import { ref } from "vue";

import type { LayerControls } from "@/types";

const emits = defineEmits<{
  click: [layerControls: LayerControls];
  change: [layerControls: LayerControls];
}>();

const storedLayerControls: string = localStorage.getItem("layerControls") || "";
const layerControls = ref<LayerControls>(
  storedLayerControls
    ? JSON.parse(storedLayerControls)
    : {
        pinball: false,
        sensors: false,
      }
);

const handleControlsChange = () => {
  emits("change", layerControls.value);
};
</script>

<template>
  <nav class="layer-filter">
    <label
      v-for="(control, controlName) in layerControls"
      :key="controlName"
      :for="controlName"
      class="layer-label"
    >
      <input
        v-model="layerControls[controlName as keyof LayerControls]"
        :id="controlName"
        class="layer-input"
        type="checkbox"
        @change="handleControlsChange"
      />
      {{ controlName }}
    </label>
  </nav>
</template>

<style scoped>
.layer-filter {
  position: absolute;
  top: 1%;
  left: 1%;
  z-index: 1;

  padding: 15px;
  max-width: 300px;
  min-width: 130px;

  border-radius: 3px;
  color: #111;
  background: #fff;

  display: flex;
  flex-direction: column;
}

.layer-label {
  cursor: pointer;

  display: flex;
  align-items: center;

  font-weight: 600;
  text-transform: capitalize;
}

.layer-label:not(:last-child) {
  margin-bottom: 7px;
}

.layer-input {
  cursor: pointer;
  margin-right: 5px;
}
</style>
