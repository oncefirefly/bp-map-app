<script setup lang="ts">
import { type Raw, markRaw, onMounted, shallowRef } from "vue";

import maplibregl from "maplibre-gl";

const map = shallowRef<Raw<unknown>>();
const mapContainer = shallowRef();

onMounted(() => {
  map.value = markRaw(
    new maplibregl.Map({
      container: mapContainer.value,
      style:
        "https://gist.githubusercontent.com/smellman/d3cbc19d134d5283df73/raw/a4bb13b44c36e9225f95c545cdedbe7513200d70/osm_mapbox_gl_example.json",
      center: [-74.5, 40],
      zoom: 9,
    })
  );
});
</script>

<template>
  <div class="map" ref="mapContainer"></div>
</template>

<style scoped>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
