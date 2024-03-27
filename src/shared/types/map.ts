import { LatLng } from "leaflet";

export type Location = {
	key: string;
	name: string;
	position: LatLng;
	description?: string;
	faction?: string;
};
