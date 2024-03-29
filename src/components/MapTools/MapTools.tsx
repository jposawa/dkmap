import React from "react";

import styles from "./MapTools.module.scss";
import { LatLng, Map } from "leaflet";
import {
	BorderlessTableOutlined,
	CompressOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { currentMapState, editModeState } from "@/shared/state";
import { MapKey } from "@/shared/types";
import { MAP_RELATION } from "@/shared/constants";
import { CursorCoordinates } from "..";

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
	const [isEditMode, setIsEditMode] = useRecoilState(editModeState);
	const [currentMap, setCurrentMap] = useRecoilState(currentMapState);
	const [cursorPosition, setCursorPosition] = React.useState<LatLng>();

	const toggleMapTools = () => {
		setIsToolsOpen(!isToolsOpen);
	};

	const handleChange = React.useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setCurrentMap(event.target.value as MapKey);
		},
		[setCurrentMap]
	);

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

			map.on("mousemove", (event) => {
				// console.log(event.target);
				setCursorPosition(event.latlng);
			});

			setMapPosition({
				center: map.getCenter(),
				zoom: map.getZoom(),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					<li
						className={styles.toolOption}
						onClick={() => {
							setIsEditMode(!isEditMode);
						}}
					>
						<PlusCircleOutlined
							className={isEditMode ? styles.cancelMode : ""}
						/>
						<p>{isEditMode ? "Cancelar" : "Novo"}</p>
					</li>

					<li>
						<select
							defaultValue={currentMap}
							title="Current map"
							onChange={handleChange}
						>
							{Object.keys(MAP_RELATION).map((mapName) => (
								<option key={mapName} value={mapName}>
									{mapName}
								</option>
							))}
						</select>
					</li>
				</ul>
			</div>

			{!!cursorPosition && (
				<CursorCoordinates mapCoordinates={cursorPosition} />
			)}
		</>
	);
};
