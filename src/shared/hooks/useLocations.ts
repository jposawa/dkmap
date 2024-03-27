import React from "react";
import { useSetRecoilState } from "recoil";
import { locationsListState } from "../state";
import { getFbDataRef } from "@/services";
import { onValue } from "firebase/database";

export const useLocations = () => {
	const setLocationsList = useSetRecoilState(locationsListState);

	const getLocationsList = React.useCallback(() => {
		const fbRef = getFbDataRef("locations");

		onValue(
			fbRef,
			(snapshot) => {
				const locations = snapshot.val() || {};

				setLocationsList(Object.values(locations));
			},
			{
				onlyOnce: true,
			}
		);
	}, [setLocationsList]);

	return {
		getLocationsList,
	};
};
