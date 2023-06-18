import { defineStore } from "pinia";
import { ref } from "vue";
import type { GeoJSON, PinballLocations } from "@/types";
import { getPinballPortland } from "@/api/getPinballPortland";
import { pinballsToGeoJSONFeature } from "@/utils/pinballsToGeoJSON";

export const usePinballMarksStore = defineStore("PinballMarksStore", () => {
  const pinballMarks = ref<GeoJSON>({
    type: "FeatureCollection",
    features: [],
  });

  const getPinballsData = async () => {
    const marks: Array<PinballLocations> | undefined =
      await getPinballPortland();

    if (marks !== undefined) {
      pinballMarks.value = {
        type: "FeatureCollection",
        features: marks.map((mark) => pinballsToGeoJSONFeature(mark)),
      };

      return pinballMarks.value;
    }

    return pinballMarks.value;
  };

  return { pinballMarks, getPinballsData };
});
