import type { GeoJSON } from "@/types";

export const getSensorsBerlin = async (): Promise<GeoJSON | undefined> => {
  let resJSON;

  try {
    const res = await fetch(
      "https://api.opensensemap.org/boxes?near=13.424900,52.507076&maxDistance=20000&format=geojson"
    );
    resJSON = await res.json();
  } catch (err) {
    console.log("Error occured:", err);
  }

  if (resJSON !== undefined) {
    return resJSON;
  }

  console.error(resJSON);
};
