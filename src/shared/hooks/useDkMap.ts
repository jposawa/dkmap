import React from "react";
import { useSetRecoilState } from "recoil";
import { mapSettingsAtom } from "../state";
import { getFbDataRef } from "@/services";
import { onValue } from "firebase/database";
import { MapKey, MapSettings } from "../types";
import { DEFAULT_BOUNDS } from "../constants";
import { getLocalMapUrl } from "../utils";

export const useDkMap = () => {
	const setMapSettings = useSetRecoilState(mapSettingsAtom);
	const [isLoading, setIsLoading] = React.useState(false);

	const getMapSettings = React.useCallback(
		(mapKey: MapKey) => {
			if (!isLoading) {
				setIsLoading(true);
				const fbRef = getFbDataRef(`settings/${mapKey}`);

				onValue(fbRef, (snapshot) => {
					const settings: MapSettings = snapshot.val() ?? {};

					settings.bounds = settings?.bounds ?? DEFAULT_BOUNDS;
					settings.mapUrl = settings?.mapUrl ?? getLocalMapUrl(mapKey);

					setMapSettings(settings);
				});
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isLoading]
	);

	return {
		isLoading,
		getMapSettings,
	};
};
