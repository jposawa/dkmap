import React from "react";

import styles from "./CursorCoordinates.module.scss";
import { useRecoilValue } from "recoil";
import { editModeState, selectedLocationState } from "@/shared/state";
import { getSideNumber } from "@/shared/utils";
import { LatLng } from "leaflet";

export type CursorCoordinatesProps = {
	mapCoordinates: LatLng;
	className?: string;
	style?: React.CSSProperties;
};

const BASE_OFFSET = {
	x: 20,
	y: 35,
};

export const CursorCoordinates: React.FC<CursorCoordinatesProps> = ({
	mapCoordinates,
	className = "",
	style = {},
}) => {
	const selectedLocation = useRecoilValue(selectedLocationState);
	const isEditMode = useRecoilValue(editModeState);
	const [cursorInfo, setCursorInfo] = React.useState({
		posX: 0,
		posY: 0,
		rawPosX: 0,
		rawPosY: 0,
	});

	const updateCursor = (event: MouseEvent) => {
		const { innerWidth, innerHeight } = window;
		const { clientX, clientY } = event;
		const rawOffsetX = getSideNumber(clientX, innerWidth) * BASE_OFFSET.x * -1;
		const rawOffsetY = getSideNumber(clientY, innerHeight) * BASE_OFFSET.y * -1;
		let offsetX = rawOffsetX ? rawOffsetX : BASE_OFFSET.x;
		const offsetY = rawOffsetY ? rawOffsetY : BASE_OFFSET.y;

		if (offsetX < 0) {
			offsetX *= 8;
		}
		setCursorInfo({
			rawPosX: clientX,
			rawPosY: clientY,
			posX: clientX + offsetX,
			posY: clientY + offsetY,
		});
	};

	React.useEffect(() => {
		window.addEventListener("mousemove", updateCursor);

		return () => {
			window.removeEventListener("mousemove", updateCursor);
		};
	}, []);

	if (!isEditMode || !mapCoordinates.lat || !!selectedLocation) {
		return null;
	}

	return (
		<div
			className={`${styles.coordinatesContainer} ${className}`}
			style={
				{
					...style,
					left: cursorInfo.posX,
					top: cursorInfo.posY,
				} as React.CSSProperties
			}
		>
			<span title={`posX: ${cursorInfo.rawPosX}`}>
				{mapCoordinates.lng.toFixed(4)}
			</span>
			<span title={`posY: ${cursorInfo.rawPosY}`}>
				{mapCoordinates.lat.toFixed(4)}
			</span>
		</div>
	);
};
