import { MAP_RELATION } from "../constants"
import { MapKey } from "../types";

export const getLocalMapUrl = (mapKey: MapKey) => {
  if (!MAP_RELATION[mapKey]?.fileName) {
    return undefined;
  }

  const baseUrl = `/mapa/${MAP_RELATION[mapKey].fileName}.${MAP_RELATION[mapKey].extension}`;

  return baseUrl;
}