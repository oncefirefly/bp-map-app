import type { PinballLocations, GeoJSONFeature } from "./../types/index";

export const pinballsToGeoJSONFeature = (
  pinballLocations: PinballLocations
): GeoJSONFeature => {
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
