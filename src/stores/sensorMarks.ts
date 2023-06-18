import { defineStore } from "pinia";
import { ref } from "vue";
import { getSensorsBerlin } from "@/api/getSensorsBerlin";
import type { GeoJSON } from "@/types";

export const useSensorMarksStore = defineStore("SensorMarksStore", () => {
  const sensorMarks = ref<GeoJSON>({
    type: "FeatureCollection",
    features: [],
  });

  const getSensorsData = async () => {
    const marks: GeoJSON | undefined = await getSensorsBerlin();

    if (marks !== undefined) {
      sensorMarks.value = marks;

      return sensorMarks.value;
    }

    return sensorMarks.value;
  };

  return { sensorMarks, getSensorsData };
});
