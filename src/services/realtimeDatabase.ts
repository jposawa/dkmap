import { getDbPath } from "@/shared/utils";
import { DatabaseReference, getDatabase, ref, update } from "firebase/database";

export const getFbDataRef = (tablePath?: string): DatabaseReference => {
	const path = getDbPath(tablePath);
	const database = getDatabase();

	const responseRef = ref(database, path);

	return responseRef;
};

export const updateFbData = (newData: unknown, tablePath?: string) => {
	const path = getDbPath(tablePath);
	const updates: Record<string, unknown> = {};
	const fbRef = getFbDataRef(tablePath);

	updates[path] = newData;

	update(fbRef, updates)
		.then(() => {
			console.log("Update success");
		})
		.catch((error) => {
			console.error("Error on data update", error);
		});
};
