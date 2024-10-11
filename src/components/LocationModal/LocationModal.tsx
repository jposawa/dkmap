import React from "react";

import styles from "./LocationModal.module.scss";
import { LatLng } from "leaflet";
import { Location, LocationStatusKey, LocationTypeKey } from "@/shared/types";
import { useLocations } from "@/shared/hooks";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	currentMapState,
	editModeState,
	selectedLocationState,
} from "@/shared/state";
import { LOCATION_STATUS, LOCATION_TYPE } from "@/shared/constants";

export type LocationModalProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const LocationModal: React.FC<LocationModalProps> = ({
	className = "",
	style = {},
}) => {
	const [coordinates, updateCoordinates] = useRecoilState(
		selectedLocationState
	);
	const currentMap = useRecoilValue(currentMapState);
	const formRef = React.useRef<HTMLFormElement>(null);
	const setIsEditMode = useSetRecoilState(editModeState);
	const { updateLocations } = useLocations();

	const handleClose = React.useCallback(
		(shouldExitEditMode = false) => {
			formRef?.current?.reset();
			setIsEditMode(!shouldExitEditMode);

			updateCoordinates(null);
		},
		[setIsEditMode, updateCoordinates]
	);

	const currentCoordinates = React.useMemo(
		() => coordinates || ({} as LatLng),
		[coordinates]
	);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { currentTarget: form } = event;
		const locationTypeKey = form.locationTypeKey.value as LocationTypeKey;
		const newPlace: Location = {
			key: "",
			name: form.placeName.value,
			mapKey: currentMap,
			locationType: locationTypeKey,
			description: form.description.value,
			group: form.group.value,
			status: form.status.value,
			position: currentCoordinates,
		};

		const code = Math.floor(newPlace.position.lat + newPlace.position.lng);
		newPlace.key = `${newPlace.name}(${code})`;

		if (updateLocations(newPlace)) {
			handleClose(true);
		}
	};

	if (!coordinates) {
		return null;
	}

	return (
		<div className={styles.modalContainer}>
			<span className={styles.background} onClick={() => handleClose()} />

			<div className={`${styles.modalBody} ${className}`} style={style}>
				<form onSubmit={handleSubmit} ref={formRef}>
					<p>
						<label htmlFor="placeName">Name*</label>
						<input
							id="placeName"
							name="placeName"
							placeholder="Local name"
							required
						/>
					</p>

					<p>
						<label htmlFor="locationTypeKey">Type</label>
						<select id="locationTypeKey" name="locationTypeKey">
							{Object.keys(LOCATION_TYPE).map((type) => (
								<option key={type} value={type}>
									{LOCATION_TYPE[type as LocationTypeKey].displayText}
								</option>
							))}
						</select>
					</p>

					<p>
						<label htmlFor="group">Faction</label>
						<input id="group" name="group" placeholder="Faction or group" />
					</p>

					<p>
						<label htmlFor="status">Status</label>
						<select id="status" name="status" defaultValue="neutral">
							{Object.keys(LOCATION_STATUS).map((status) => (
								<option key={status} value={status}>
									{LOCATION_STATUS[status as LocationStatusKey].displayText}
								</option>
							))}
						</select>
					</p>

					<p>
						<label htmlFor="description">Descrição</label>
						<textarea
							id="description"
							name="description"
							placeholder="Breve descrição"
						/>
					</p>

					<div className={styles.buttonContainers}>
						<button>Salvar</button>
					</div>
				</form>
			</div>
		</div>
	);
};
