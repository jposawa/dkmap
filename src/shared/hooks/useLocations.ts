import React from "react";
import { useRecoilState } from "recoil";
import { locationsListState } from "../state";
import { getFbDataRef } from "@/services";
import { onValue, update } from "firebase/database";
import { Location } from "../types";
import { cloneObj } from "../utils";

export const useLocations = () => {
	const [locationsList, setLocationsList] = useRecoilState(locationsListState);
	const [isLoading, setIsLoading] = React.useState(false);

	const getLocationsList = React.useCallback(() => {
		if (!isLoading) {
			setIsLoading(true);
			const fbRef = getFbDataRef("locations");

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
	}, [setLocationsList, isLoading]);

	const updateLocations = React.useCallback(
		(newData: Location): boolean => {
			const _locationsList = cloneObj(locationsList);
			const locationKey = newData.key;
			const fbRef = getFbDataRef("locations");
			let success = true;

			_locationsList[locationKey] = newData;

			update(fbRef, _locationsList)
				.then((response) => {
          console.log("debug response", response);
					setLocationsList(_locationsList);
				})
				.catch((error) => {
					console.error("Error on updating Locations", error);
					success = false;
				});

			return success;
		},
		[locationsList, setLocationsList]
	);

	return {
		updateLocations,
		isLoading,
		setIsLoading,
		getLocationsList,
	};
};
