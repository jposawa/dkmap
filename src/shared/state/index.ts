import { atom } from "recoil";
import { withNamespace } from "../utils";
import { Location, MapKey } from "../types";
import { FirebaseApp } from "firebase/app";

export const themeState = atom<string>({
	key: withNamespace("theme"),
	default: "light",
});

export const mapCenterState = atom<unknown>({
	key: withNamespace("mapCenter"),
	default: null,
});

export const locationsListState = atom<Record<string, Location>>({
	key: withNamespace("locationsList"),
	default: {},
});

export const firebaseAppState = atom<FirebaseApp | null>({
	key: withNamespace("firebaseApp"),
	default: null,
});

export const editModeState = atom<boolean>({
	key: withNamespace("editMode"),
	default: false,
});

export const currentMapState = atom<MapKey>({
	key: withNamespace("currentMap"),
	default: "voador",
});
