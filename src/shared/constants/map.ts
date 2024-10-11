import { LocationType, MapRelation, LocationStatus } from "../types";

export const MAP_RELATION: MapRelation = {
	voador: {
		id: "voador",
		fileName: "mapaIlhaFlutuante",
		extension: "png",
		displayName: "Ilha central",
	},
	central: {
		id: "central",
		fileName: "mapaCentral",
		extension: "png",
		displayName: "Central",
	},
	continente: {
		id: "continente",
		fileName: "mapaContinente",
		extension: "png",
		displayName: "Continente",
	},
	petia: {
		id: "petia",
		fileName: "mapaPetia",
		extension: "png",
		displayName: "DraenaK Ancestral",
	},
};

export const LOCATION_TYPE: LocationType = {
	urban: {
		id: "urban",
		displayText: "Settlement",
	},
	landmark: {
		id: "landmark",
		displayText: "Landmark",
	},
	interestPoint: {
		id: "interestPoint",
		displayText: "Point of Interest",
	},
};

export const LOCATION_STATUS: LocationStatus = {
	boom: {
		id: "boom",
		displayText: "Boom",
	},
	neutral: {
		id: "neutral",
		displayText: "Stable",
	},
	fading: {
		id: "fading",
		displayText: "Fading",
	},
};
