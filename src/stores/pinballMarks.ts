import { defineStore } from "pinia";
import { ref } from "vue";
import type { GeoJSON, PinballLocations } from "@/types";
import { getPinballPortland } from "@/api/getPinballPortland";
import { pinballsToGeoJSON } from "@/utils/pinballsToGeoJSON";

export const usePinballMarksStore = defineStore("PinballMarksStore", () => {
  const storedPinballMarks: string = localStorage.getItem("pinballMarks") || "";
  const pinballMarks = ref<Array<GeoJSON>>(
    storedPinballMarks ? JSON.parse(storedPinballMarks) : []
  );

  const getPinballLocations = async () => {
    const marks: Array<PinballLocations> | undefined =
      await getPinballPortland();

    if (marks !== undefined) {
      pinballMarks.value = marks.map((mark) => pinballsToGeoJSON(mark));
      localStorage.setItem("pinballMarks", JSON.stringify(pinballMarks.value));
      return pinballMarks.value;
    }

    return pinballMarks.value;
  };

  return { pinballMarks, getPinballLocations };
});
