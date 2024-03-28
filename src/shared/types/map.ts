import { LatLng } from "leaflet";

export type MapKey = "voador" | "continente" | "central"

export type Location = {
	key: string;
	name: string;
  mapKey: MapKey;
	position: LatLng;
	description?: string;
	group?: string;
  status?: string;
};
