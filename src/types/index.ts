export interface LayerControls {
  pinball: boolean;
  sensors: boolean;
}

export type Coordinates = [number, number];

export interface GeoJSON {
  type: string;
  geometry: {
    type: string;
    coordinates: Coordinates;
  };
  properties: {
    name: string;
  };
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
