import React from "react";

import styles from "./MapFragment.module.scss";
import { ImageOverlay, MapContainer } from "react-leaflet";
// import { useSetRecoilState } from "recoil";
// import { mapCenterState } from "@/shared/state";
import { CRS, LatLngBoundsExpression, Map } from "leaflet";
import { DEBUG_MODE } from "@/shared/constants/general";
import { MapTools } from "@/components";

type MapFragmentProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const MapFragment: React.FC<MapFragmentProps> = ({
	className = "",
	style = {},
}) => {
	const [map, setMap] = React.useState<Map | null>(null);
	const bounds: LatLngBoundsExpression = [
		[0, 0],
		[250, 400],
	];

	// const maxBound

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
					className={`${styles.mapContainer} ${className}`}
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
					<ImageOverlay
						url="/mapa/mapaIlhaFlutuante.png"
						bounds={bounds}
					/>

					{/* {ratingsList.map((rating: Rating, index: number) => (
						<CircleMarker
							key={index}
							fillOpacity={0.8}
							stroke={false}
							fillColor={resultColor[rating.result]}
							center={[
								LOCATIONS_POINTS[rating.location.key].position.lat,
								LOCATIONS_POINTS[rating.location.key].position.lng,
							]}
						>
							<Popup>
								<h3>{rating.location.name}</h3>
								<p>
									<b>Resultado:</b> {RATING_RESULT[rating.result]}
								</p>
								<p>
									Atualizado em: {getLastestDate(rating).toLocaleDateString()}
								</p>
							</Popup>
						</CircleMarker>
					))} */}
				</MapContainer>

				{DEBUG_MODE && map && <MapTools map={map} />}
			</section>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[className, map, style]
	);
};
