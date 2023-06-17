<script setup lang="ts">
import {
  type Raw,
  markRaw,
  onMounted,
  shallowRef,
  onUnmounted,
  ref,
} from "vue";

import maplibregl, { Map } from "maplibre-gl";

import LayerFilter from "./LayerFilter.vue";
import CenterControls from "./CenterControls.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

import { usePinballMarksStore } from "@/stores/pinballMarks";

import { displayPinballMarkOnMap } from "@/utils/pinballMapHandlers";

import type { Coordinates, LayerControls } from "@/types";

const map = shallowRef<Raw<Map>>();
const mapContainer = shallowRef<string | HTMLElement>("");

const isLoading = ref<boolean>(false);

const pinballMarksStore = usePinballMarksStore();

const storedLayerControls = localStorage.getItem("layerControls") || null;
const parsedStoredLayerControls = storedLayerControls
  ? JSON.parse(storedLayerControls)
  : null;

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

  if (
    pinballMarksStore.pinballMarks.length &&
    parsedStoredLayerControls.pinball
  ) {
    console.log("stored");
    map.value!.on("load", () => {
      displayPinballMarkOnMap(map.value!, pinballMarksStore.pinballMarks);
      // pinballMarksStore.pinballMarks.forEach((location, index) => {
      //   map.value!.addLayer({
      //     id: location.properties.name + index,
      //     type: "circle",
      //     source: "pinball-points",
      //     paint: {
      //       "circle-color": "#11b4da",
      //       "circle-radius": 4,
      //       "circle-stroke-width": 1,
      //       "circle-stroke-color": "#fff",
      //     },
      //   });
      //   // new Marker({ color: "#111" })
      //   //   .setLngLat(location.geometry.coordinates)
      //   //   .addTo(map.value!);
      // });
    });
  }
});

onUnmounted(() => {
  map.value?.remove();
});

const handleLayerControlChange = async (layerControls: LayerControls) => {
  localStorage.setItem("layerControls", JSON.stringify(layerControls));

  if (layerControls.pinball && !pinballMarksStore.pinballMarks.length) {
    isLoading.value = true;

    await pinballMarksStore.getPinballLocations();

    isLoading.value = false;

    displayPinballMarkOnMap(map.value!, pinballMarksStore.pinballMarks);
  }

  if (layerControls.pinball && pinballMarksStore.pinballMarks.length) {
    displayPinballMarkOnMap(map.value!, pinballMarksStore.pinballMarks);
  }

  if (!layerControls.pinball) {
    pinballMarksStore.pinballMarks.forEach((location, index) =>
      map.value!.removeLayer(location.properties.name + index)
    );
  }
};

// sets map center to Portland or Berlin
const handleCenterControlsClick = (coordinates: Coordinates) => {
  map.value?.flyTo({
    center: coordinates,
  });
};
</script>

<template>
  <LoadingSpinner :isLoading="isLoading" />
  <div class="map" ref="mapContainer"></div>
  <template v-if="map">
    <LayerFilter @change="handleLayerControlChange" />
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
