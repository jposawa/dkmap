import React from "react";
import { useRecoilState } from "recoil";
import { ratingsListState } from "../state";
import { getFbDataRef } from "@/services";
import { onValue, update } from "firebase/database";
import { cloneObj } from "../utils";
import { Rating } from "../types";

export const useRatings = () => {
	const [ratingsList, setRatingsList] = useRecoilState(ratingsListState);

	const getRatingsList = React.useCallback(() => {
		const fbRef = getFbDataRef("ratings");

		onValue(
			fbRef,
			(snapshot) => {
				const ratings = snapshot.val() || {};

				setRatingsList(ratings);
			},
			{
				onlyOnce: true,
			}
		);
	}, [setRatingsList]);

	const updateRatings = React.useCallback(
		(newData: Rating): boolean => {
			getRatingsList();
			const _ratingsList = cloneObj(ratingsList);
			const ratingKey = newData.location.key;
			const fbRef = getFbDataRef("ratings");
			let success = true;

			if (_ratingsList[ratingKey]) {
				const existingRating = _ratingsList[ratingKey];

				newData.dates = [...existingRating.dates, ...newData.dates];
			}

			_ratingsList[ratingKey] = newData;

			update(fbRef, _ratingsList)
				.then(() => {
					setRatingsList(_ratingsList);
				})
				.catch((error) => {
					console.error("Error during ratings update", error);
					success = false;
				});

			return success;
		},
		[getRatingsList, ratingsList, setRatingsList]
	);

	return {
		getRatingsList,
		updateRatings,
	};
};
