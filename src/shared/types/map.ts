import { LatLng } from "leaflet";

export type MapKey = "voador" | "continente" | "central" | "petia";

export type LocationTypeKey = "urban" | "landmark" | "interestPoint";

export type LocationTypeItem = {
	id: LocationTypeKey;
	displayText: string;
};

export type LocationType = Record<LocationTypeKey, LocationTypeItem>;

export type LocationStatusKey = "boom" | "neutral" | "fading";

export type LocationStatusItem = {
	id: LocationStatusKey;
	displayText: string;
};

export type LocationStatus = Record<LocationStatusKey, LocationStatusItem>;

export type Location = {
	key: string;
	name: string;
	mapKey: MapKey;
	position: LatLng;
	locationType: LocationTypeKey;
	description?: string;
	group?: string;
	status?: LocationStatusKey;
};

export type RelationItem = {
	id: string;
	fileName: string;
	extension: "png";
	displayName: string;
};

export type MapRelation = Record<MapKey, RelationItem>;
