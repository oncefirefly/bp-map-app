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
import { useSensorMarksStore } from "@/stores/sensorMarks";

import { displayMarksOnMap } from "@/utils/displayLayerHandlers";

import type { Coordinates, LayerControls } from "@/types";

const map = shallowRef<Raw<Map>>();
const mapContainer = shallowRef<string | HTMLElement>("");

const isLoading = ref<boolean>(false);

const pinballMarksStore = usePinballMarksStore();
const sensorMarksStore = useSensorMarksStore();

const storedLayerControls = localStorage.getItem("layerControls") || null;
const parsedStoredLayerControls = storedLayerControls
  ? JSON.parse(storedLayerControls)
  : {};

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

  map.value!.on("load", async () => {
    isLoading.value = true;

    if (parsedStoredLayerControls.pinball) {
      await pinballMarksStore.getPinballsData();

      displayMarksOnMap(
        map.value!,
        "pinball-points",
        pinballMarksStore.pinballMarks
      );
    }

    if (parsedStoredLayerControls.sensors) {
      await sensorMarksStore.getSensorsData();

      displayMarksOnMap(
        map.value!,
        "sensors-points",
        sensorMarksStore.sensorMarks
      );
    }

    isLoading.value = false;
  });
});

onUnmounted(() => {
  map.value?.remove();
});

// handles LayerFilter emit('change')
const handleLayerControlChange = async (
  layerControls: LayerControls,
  controlName: keyof LayerControls
) => {
  localStorage.setItem("layerControls", JSON.stringify(layerControls));

  isLoading.value = true;

  if (controlName === "pinball") {
    if (layerControls.pinball) {
      await pinballMarksStore.getPinballsData();

      displayMarksOnMap(
        map.value!,
        "pinball-points",
        pinballMarksStore.pinballMarks
      );
    } else {
      map.value!.removeLayer("pinball-points");
    }
  }

  if (controlName === "sensors") {
    if (layerControls.sensors) {
      await sensorMarksStore.getSensorsData();

      displayMarksOnMap(
        map.value!,
        "sensors-points",
        sensorMarksStore.sensorMarks
      );
    } else {
      map.value!.removeLayer("sensors-points");
    }
  }

  isLoading.value = false;
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
