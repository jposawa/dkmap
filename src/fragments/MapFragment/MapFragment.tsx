import React from "react";
import { Location, MapSettings } from "@/shared/types";
import { CircleMarker, ImageOverlay, MapContainer, Popup } from "react-leaflet";
// import { useSetRecoilState } from "recoil";
// import { mapCenterState } from "@/shared/state";
import { CRS, Map } from "leaflet";
import { DEBUG_MODE } from "@/shared/constants/general";
import { LocationModal, MapEvents, MapTools } from "@/components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	currentMapState,
	editModeState,
	locationsListState,
	mapSettingsAtom,
} from "@/shared/state";
import { useDkMap, useLocations } from "@/shared/hooks";

import styles from "./MapFragment.module.scss";
import {
	DEFAULT_BOUNDS,
	LOCATION_STATUS,
	LOCATION_TYPE,
} from "@/shared/constants";
import { getLocalMapUrl } from "@/shared/utils";

type MapFragmentProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const MapFragment: React.FC<MapFragmentProps> = ({
	className = "",
	style = {},
}) => {
	const isEditMode = useRecoilValue(editModeState);
	const [map, setMap] = React.useState<Map | null>(null);
	const [locations, setLocations] = React.useState<Location[]>([]);
	const { isLoading, getLocationsList, setIsLoading } = useLocations();
	const [locationsList, setLocationsList] = useRecoilState(locationsListState);
	// const bounds: LatLngBoundsExpression = [
	// 	[-120, -250],
	// 	[120, 250],
	// ];
	const mapSettings = useRecoilValue(mapSettingsAtom);
	const currentMapKey = useRecoilValue(currentMapState);
	const { getMapSettings } = useDkMap();

	React.useEffect(() => {
		const _locations = Object.values(locationsList);

		if (!_locations.length) {
			if (!isLoading) {
				getLocationsList(currentMapKey);
			}
		} else {
			setIsLoading(false);
			setLocations(_locations);
		}
	}, [isLoading, locationsList, currentMapKey, getLocationsList, setIsLoading]);

	React.useEffect(() => {
		getMapSettings(currentMapKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentMapKey]);

	React.useEffect(() => {
		setIsLoading(false);
		setLocationsList(() => {
			setLocations([]);
			return {};
		});
	}, [currentMapKey, setIsLoading, setLocationsList]);

	const { mapActiveBounds, mapActiveUrl } = React.useMemo(() => {
		const { bounds = DEFAULT_BOUNDS, mapUrl = getLocalMapUrl(currentMapKey) } =
			mapSettings as MapSettings;

		return {
			mapActiveBounds: bounds,
			mapActiveUrl: mapUrl ?? "",
		};
	}, [currentMapKey, mapSettings]);

	React.useEffect(() => {
		if (map) {
			map.fitBounds(mapActiveBounds);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map, mapActiveBounds]);

	return React.useMemo(
		() => (
			<section className={styles.mapFragment}>
				<MapContainer
					className={`${styles.mapContainer} ${className}}`}
					center={[0, 0]}
					zoom={1}
					minZoom={1.4}
					maxZoom={4.5}
					style={style}
					ref={setMap}
					bounds={mapActiveBounds}
					maxBounds={mapActiveBounds}
					crs={CRS.Simple}
					zoomSnap={0.01}
					zoomDelta={0.01}
				>
					<MapEvents className={isEditMode ? styles.editMode : ""} />
					<ImageOverlay url={mapActiveUrl} bounds={mapActiveBounds} />

					{locations.map((location: Location) => {
						return (
							<CircleMarker
								key={location.key}
								radius={7}
								center={[location.position.lat * 1, location.position.lng * 1]}
							>
								<Popup>
									<h3>{location?.name}</h3>
									<p>{LOCATION_TYPE[location.locationType]?.displayText}</p>

									<span className={styles.locationSummary}>
										<p>{location.group}</p>
										{location.status && (
											<p>{LOCATION_STATUS[location.status].displayText}</p>
										)}
									</span>

									<span className={styles.locationDescription}>
										<p>{location.description}</p>
									</span>
								</Popup>
							</CircleMarker>
						);
					})}
				</MapContainer>

				{DEBUG_MODE && map && <MapTools map={map} />}

				<LocationModal />
			</section>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[className, currentMapKey, locations, map, style, isEditMode]
	);
};
