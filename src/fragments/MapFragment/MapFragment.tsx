import React from "react";
import { Location } from "@/shared/types";
import {
	CircleMarker,
	ImageOverlay,
	MapContainer,
	Popup,
} from "react-leaflet";
// import { useSetRecoilState } from "recoil";
// import { mapCenterState } from "@/shared/state";
import { CRS, LatLng, LatLngBoundsExpression, Map } from "leaflet";
import { DEBUG_MODE } from "@/shared/constants/general";
import { LocationModal, MapEvents, MapTools } from "@/components";
import { useRecoilValue } from "recoil";
import { editModeState, locationsListState } from "@/shared/state";
import { useLocations } from "@/shared/hooks/useLocations";

import styles from "./MapFragment.module.scss";

type MapFragmentProps = {
	className?: string;
	style?: React.CSSProperties;
};

// const offset = [125/125, 250];

export const MapFragment: React.FC<MapFragmentProps> = ({
	className = "",
	style = {},
}) => {
  const isEditMode = useRecoilValue(editModeState);
	const [map, setMap] = React.useState<Map | null>(null);
	const [selectedLocation, setSelectedLocation] =
		React.useState<LatLng | null>();
	const [locations, setLocations] = React.useState<Location[]>([]);
	const { isLoading, getLocationsList, setIsLoading } = useLocations();
	const locationsList = useRecoilValue(locationsListState);
	const bounds: LatLngBoundsExpression = [
		[-125, -250],
		[125, 250],
	];

	React.useEffect(() => {
		const _locations = Object.values(locationsList);

		if (!_locations.length) {
			if (!isLoading) {
				getLocationsList();
			}
		} else {
			setLocations(() => {
				setIsLoading(false);
				return _locations;
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, locationsList]);

	React.useEffect(() => {
		if (map) {
			map.fitBounds(bounds);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);

	return React.useMemo(
		() => (
			<section className={styles.mapFragment}>
				<MapContainer
					className={`${styles.mapContainer} ${className} ${isEditMode ? styles.editMode : ""}`}
					center={[0, 0]}
					zoom={1}
					minZoom={1.57}
					maxZoom={3}
					style={style}
					ref={setMap}
					bounds={bounds}
					maxBounds={bounds}
					crs={CRS.Simple}
					zoomSnap={0.01}
					zoomDelta={0.01}
				>
					<MapEvents
						selectedLocation={selectedLocation}
						setSelectedLocation={setSelectedLocation}
					/>
					<ImageOverlay url="/mapa/mapaIlhaFlutuante.png" bounds={bounds} />

					{locations.map((location: Location) => {
						return (
							<CircleMarker
								key={location.key}
                radius={7}
								center={[
									location.position.lat * 1,
									location.position.lng * 1,
								]}
							>
								<Popup>
									<h3>{location.name}</h3>
									<span className={styles.locationSummary}>
										<p>{location.group}</p>
										<p>{location.status}</p>
									</span>

									<span className={styles.locationDescription}>
										{location.description}
									</span>
								</Popup>
							</CircleMarker>
						);
						// return (
						// 	<CircleMarker
						// 		key={index}
						// 		fillOpacity={1}
						// 		stroke={false}
						// 		fillColor={"#369"}
						// 		center={[location.position.lat, location.position.lng]}
						// 	>
						// 		<Popup>
						// 			<h3>{location.name}</h3>
						// 			<span className={styles.locationSummary}>
						// 				<p>{location.group}</p>
						// 				<p>{location.status}</p>
						// 			</span>

						// 			<span className={styles.locationDescription}>
						// 				{location.description}
						// 			</span>
						// 		</Popup>
						// 	</CircleMarker>
						// );
					})}
				</MapContainer>

				{DEBUG_MODE && map && <MapTools map={map} />}

				<LocationModal
					coordinates={selectedLocation}
					updateCoordinates={setSelectedLocation}
				/>
			</section>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[className, map, style]
	);
};
