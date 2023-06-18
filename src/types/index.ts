export interface LayerControls {
  pinball: boolean;
  sensors: boolean;
}

export type Coordinates = [number, number];
export type SensorsCoordinates = [number, number, number?];

export interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: Coordinates | SensorsCoordinates;
  };
  properties: {
    name: string;
  };
}

export interface SensorsGeoJSONFeature extends GeoJSONFeature {
  properties: {
    name: string;
    createdAt?: string;
    description?: string;
    exposure?: string;
    grouptag?: Array<unknown>;
    lastMeasurementAt?: string;
    model?: string;
    sensors?: Array<unknown>;
    updatedAt?: string;
    _id?: string;
  };
}

export interface GeoJSON {
  type: "FeatureCollection";
  features: Array<GeoJSONFeature | SensorsGeoJSONFeature>;
}

export interface PinballLocations {
  city: string;
  country: string;
  ic_active: unknown;
  id: number;
  is_stern_army: unknown;
  last_updated_by_username: string;
  lat: string;
  location_type_id: number;
  lon: string;
  name: string;
  num_machines: number;
  operator_id: unknown;
  state: string;
  street: string;
  zip: string;
  zone_id: number;
}
