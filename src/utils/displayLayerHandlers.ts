import type { Raw } from "vue";
import type { Map } from "maplibre-gl";
import type { GeoJSON } from "@/types";
import maplibregl from "maplibre-gl";

const addMapSource = (map: Raw<Map>, sourceId: string, data: GeoJSON) => {
  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: "geojson",
      data,
    });
  }
};

const addMarkLayer = (map: Raw<Map>, sourceId: string, color: string) => {
  if (!map.getLayer(sourceId)) {
    map.addLayer({
      id: sourceId,
      type: "circle",
      source: sourceId,
      paint: {
        "circle-color": color,
        "circle-radius": 7,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });
  }
};

const addPopups = (map: Raw<Map>, sourceId: string) => {
  const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mouseenter", sourceId, (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "pointer";

    if (e.features![0].geometry.type === "Point") {
      const coordinates = e.features![0].geometry.coordinates;
      const description =
        sourceId === "pinball-points"
          ? e.features![0].properties.name
          : `${e.features![0].properties.name}: ${
              JSON.parse(e.features![0].properties.sensors).length
            }`;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup
        .setLngLat(coordinates as [number, number])
        .setHTML(description)
        .addTo(map);
    }
  });

  map.on("mouseleave", sourceId, () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
};

export const displayMarksOnMap = (
  map: Raw<Map>,
  sourceId: string,
  data: GeoJSON
) => {
  const color = sourceId === "pinball-points" ? "#E7CF62" : "#CA2222";

  addMapSource(map, sourceId, data);
  addMarkLayer(map, sourceId, color);
  addPopups(map, sourceId);
};
