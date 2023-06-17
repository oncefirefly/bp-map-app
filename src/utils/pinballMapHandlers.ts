import type { Raw } from "vue";
import type { Map } from "maplibre-gl";
import type { GeoJSON } from "@/types";

const addPinballMarkLayers = (map: Raw<Map>, pinballMarks: Array<GeoJSON>) => {
  pinballMarks.forEach((location, index) => {
    if (!map.getLayer(location.properties.name + index)) {
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
    }
  });
};

const addPinballMarkSource = (map: Raw<Map>, pinballMarks: Array<GeoJSON>) => {
  map.addSource("pinball-points", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: pinballMarks,
    },
  });
};

export const displayPinballMarkOnMap = (
  map: Raw<Map>,
  pinballMarks: Array<GeoJSON>
) => {
  if (!map.getSource("pinball-points")) {
    addPinballMarkSource(map, pinballMarks);
  }

  addPinballMarkLayers(map, pinballMarks);
};
