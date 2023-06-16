import type { PinballLocations } from "@/types";

export const getPinballPortland = async (): Promise<
  PinballLocations[] | undefined
> => {
  let resJSON;

  try {
    const res = await fetch(
      "https://pinballmap.com/api/v1/locations.json?region=Portland&no_details=1"
    );

    resJSON = await res.json();
  } catch (err) {
    console.log("Error occured:", err);
  }

  if (resJSON.locations !== undefined) {
    return resJSON.locations;
  }

  console.error(resJSON.errors);
};
