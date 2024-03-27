import { atom } from "recoil";
import { withNamespace } from "../utils";
import { Location } from "../types";

export const themeState = atom<string>({
	key: withNamespace("theme"),
	default: "light",
});

export const mapCenterState = atom<unknown>({
	key: withNamespace("mapCenter"),
	default: null,
});

export const locationsListState = atom<Location[]>({
	key: withNamespace("locationsList"),
	default: [],
});

