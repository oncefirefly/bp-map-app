<script setup lang="ts">
import { ref } from "vue";

import { setAllLayerControlsTo } from "@/utils/setAllLayerControlsTo";

import type { LayerControls } from "@/types";

const layerControls = ref<LayerControls>({
  pinball: false,
  sensors: false,
});

const handleControlBtn = () => {
  const layerControlsValues: LayerControls = layerControls.value;
  const anyControlIsChecked: boolean = Boolean(
    Object.keys(layerControlsValues).filter(
      (key) => layerControlsValues[key as keyof LayerControls] === true
    ).length
  );

  if (anyControlIsChecked) {
    setAllLayerControlsTo(layerControlsValues, false);
    return;
  }

  setAllLayerControlsTo(layerControlsValues, true);
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
      />
      {{ controlName }}
    </label>
    <button class="layer-control-btn" type="button" @click="handleControlBtn">
      {{
        layerControls.pinball || layerControls.sensors
          ? "clear all"
          : "select all"
      }}
    </button>
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

.layer-control-btn {
  padding: 5px;
  background: #add8e6;
  border: none;
  border-radius: 5px;

  font-weight: 800;
  text-transform: uppercase;
}
</style>
