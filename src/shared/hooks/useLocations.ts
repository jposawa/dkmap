import React from "react";
import { useRecoilState } from "recoil";
import { locationsListState } from "../state";
import { getFbDataRef } from "@/services";
import { onValue, update } from "firebase/database";
import { Location, MapKey } from "../types";
import { cloneObj } from "../utils";

export const useLocations = () => {
	const [locationsList, setLocationsList] = useRecoilState(locationsListState);
	const [isLoading, setIsLoading] = React.useState(false);

	const getLocationsList = React.useCallback(
		(mapKey: MapKey) => {
			if (!isLoading) {
				setIsLoading(true);
				const fbRef = getFbDataRef(`locations/${mapKey}`);

				onValue(
					fbRef,
					(snapshot) => {
						const locations = snapshot.val() || {};

						setLocationsList(locations);
					},
					{
						onlyOnce: true,
					}
				);
			}
		},
		[setLocationsList, isLoading]
	);

	const updateLocations = React.useCallback(
		(newData: Location): boolean => {
			let success = true;

			if (!isLoading) {
				setIsLoading(true);
				const { key: locationKey, mapKey } = newData;
				const _locationsList = cloneObj(locationsList) || {};
				const fbRef = getFbDataRef(`locations/${mapKey}`);

				_locationsList[locationKey] = newData;

				update(fbRef, _locationsList)
					.then(() => {
						setLocationsList(_locationsList);
					})
					.catch((error) => {
						console.error("Error on updating Locations", error);
						success = false;
					})
					.finally(() => {
						setIsLoading(false);
					});
			}

			return success;
		},
		[isLoading, locationsList, setLocationsList]
	);

	return {
		updateLocations,
		isLoading,
		setIsLoading,
		getLocationsList,
	};
};
