import { cloneObj } from './../shared/utils/general';
import { getDbPath } from "@/shared/utils";
import { DatabaseReference, getDatabase, ref, update } from "firebase/database";

export const getFbDataRef = (tablePath?: string): DatabaseReference => {
	const path = getDbPath(tablePath);
	const database = getDatabase();

	const responseRef = ref(database, path);

	return responseRef;
};


// TODO Improve it to become a more generic update method
export const updateFbData = (
	newData: unknown,
	tablePath?: string,
	currentData?: Record<string, unknown>
) => {
	const updates = cloneObj(currentData || {});
	const fbRef = getFbDataRef(tablePath);
	let response = true;

	// updates[path] = newData;

  console.table({
    updates,
    newData,
  })

	update(fbRef, updates)
		.then((response) => {
			console.log("Update success", response);
		})
		.catch((error) => {
			console.error("Error on data update", error);

			response = false;
		});

	return response;
};
