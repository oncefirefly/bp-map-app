import type { LayerControls } from "@/types";

export const setAllLayerControlsTo = (
  layerControls: LayerControls,
  setTo: boolean
) => {
  for (const key in layerControls) {
    layerControls[key as keyof LayerControls] = setTo as boolean;
  }
};
