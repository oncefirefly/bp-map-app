import type { Raw } from "vue";
import type { Map } from "maplibre-gl";
import type { GeoJSON } from "@/types";

export const addPinballMarkLayers = (
  map: Raw<Map>,
  pinballMarks: Array<GeoJSON>
) => {
  pinballMarks.forEach((location, index) => {
    map.addLayer({
      id: location.properties.name + index,
      type: "circle",
      source: "pinball-points",
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });
  });
};
