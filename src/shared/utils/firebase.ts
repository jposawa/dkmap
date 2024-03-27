import { BASE_FB_DIR } from "../constants";

export const getDbPath = (tablePath?: string) =>
	tablePath ? `${BASE_FB_DIR}/${tablePath}` : BASE_FB_DIR;
