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
		displayText: "Assentamento",
	},
	landmark: {
		id: "landmark",
		displayText: "Referência",
	},
	interestPoint: {
		id: "interestPoint",
		displayText: "Ponto de Interesse",
	},
};

export const LOCATION_STATUS: LocationStatus = {
	boom: {
		id: "boom",
		displayText: "Destaque",
	},
	neutral: {
		id: "neutral",
		displayText: "Estável",
	},
	fading: {
		id: "fading",
		displayText: "Decaindo",
	},
};
