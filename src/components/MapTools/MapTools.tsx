import React from "react";

import styles from "./MapTools.module.scss";
import { LatLng, Map } from "leaflet";
import {
	EyeOutlined,
	EyeInvisibleOutlined,
	BorderlessTableOutlined,
	CompressOutlined,
} from "@ant-design/icons";

type MapToolsProps = {
	map: Map;
	className?: string;
	style?: React.CSSProperties;
};

export const MapTools: React.FC<MapToolsProps> = ({
	map,
	className = "",
	style = {},
}) => {
	const [mapPosition, setMapPosition] = React.useState<{
		zoom: number;
		center: LatLng;
	}>();
	const [isToolsOpen, setIsToolsOpen] = React.useState(false);
	const [isInfoVisible, setIsInfoVisible] = React.useState(true);

	const toggleMapTools = () => {
		setIsToolsOpen(!isToolsOpen);
	};

	React.useEffect(() => {
		if (map && !mapPosition?.zoom) {
			map.on("move", () => {
				const center = map.getCenter();
				const zoom = map.getZoom();

				setMapPosition({
					center: {
						lat: Number(center.lat.toFixed(4)),
						lng: Number(center.lng.toFixed(4)),
					} as LatLng,
					zoom,
				});
			});

			setMapPosition({
				center: map.getCenter(),
				zoom: map.getZoom(),
			});
		}
	}, [map, mapPosition]);

	return (
		<>
			<div
				className={`${styles.toolsContainer}  ${
					!isToolsOpen ? styles.closed : ""
				} ${className}`}
				style={style}
			>
				<button
					className={`${styles.toggleTools} ${styles.toolOption}`}
					onClick={toggleMapTools}
				>
					{isToolsOpen ? <CompressOutlined /> : <BorderlessTableOutlined />}

					<p>Itens</p>
				</button>

				<ul className={styles.tools}>
					{/* <li className={styles.closeTools} onClick={toggleMapTools}>
					&times;
				</li> */}

					<li
						className={styles.toolOption}
						onClick={() => {
							setIsInfoVisible(!isInfoVisible);
						}}
					>
						{isInfoVisible ? (
							<>
								<EyeOutlined />
								<p>Info</p>
							</>
						) : (
							<>
								<EyeInvisibleOutlined />
								<p>Sem info</p>
							</>
						)}
					</li>
				</ul>

				<div
					className={`${styles.info} ${!isInfoVisible ? styles.closed : ""}`}
				>
					<p>
						<b>Lat:</b> {mapPosition?.center.lat}
					</p>
					<p>
						<b>Lng:</b> {mapPosition?.center.lng}
					</p>
					<p>
						<b>Zoom:</b> {mapPosition?.zoom}
					</p>
				</div>
			</div>

			{isInfoVisible && <span className={styles.centerMark} />}
		</>
	);
};
