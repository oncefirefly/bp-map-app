<script setup lang="ts">
import { type Raw, markRaw, onMounted, shallowRef } from "vue";

import maplibregl from "maplibre-gl";

const map = shallowRef<Raw<unknown>>();
const mapContainer = shallowRef();

onMounted(() => {
  map.value = markRaw(
    new maplibregl.Map({
      container: mapContainer.value,
      style: "https://demotiles.maplibre.org/style.json",
      center: [-74.5, 40],
      zoom: 9,
    })
  );
});
</script>

<template>
  <div class="map" ref="mapContainer"></div>
</template>

<style>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
