import type { PinballLocations, GeoJSON } from "./../types/index";

export const pinballsToGeoJSON = (
  pinballLocations: PinballLocations
): GeoJSON => {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(pinballLocations.lon),
        parseFloat(pinballLocations.lat),
      ],
    },
    properties: {
      name: pinballLocations.name,
    },
  };
};
