<script setup lang="ts">
import { type Raw, markRaw, onMounted, shallowRef } from "vue";

import maplibregl, { Map } from "maplibre-gl";

import LayerFilter from "./LayerFilter.vue";
import CenterControls from "./CenterControls.vue";
import type { Coordinates } from "@/types";

const map = shallowRef<Raw<Map>>();
const mapContainer = shallowRef<string | HTMLElement>("");

onMounted(() => {
  map.value = markRaw(
    new maplibregl.Map({
      container: mapContainer.value,
      style:
        "https://gist.githubusercontent.com/smellman/d3cbc19d134d5283df73/raw/a4bb13b44c36e9225f95c545cdedbe7513200d70/osm_mapbox_gl_example.json",
      center: [37.618423, 55.751244],
      zoom: 9,
    })
  );
});

// sets map center to Portland or Berlin
const handleCenterControlsClick = (coordinates: Coordinates) => {
  map.value?.flyTo({
    center: coordinates,
  });
};
</script>

<template>
  <div class="map" ref="mapContainer"></div>
  <template v-if="map">
    <LayerFilter />
    <CenterControls @click="handleCenterControlsClick" />
  </template>
</template>

<style scoped>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
