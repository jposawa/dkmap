import React from "react";

import styles from "./LocationModal.module.scss";
import { LatLng } from "leaflet";
import { Location } from "@/shared/types";
import { useLocations } from "@/shared/hooks/useLocations";

export type LocationModalProps = {
	coordinates: LatLng | null | undefined;
	updateCoordinates: (param1?: LatLng) => void;
	className?: string;
	style?: React.CSSProperties;
};

export const LocationModal: React.FC<LocationModalProps> = ({
	coordinates,
	updateCoordinates,
	className = "",
	style = {},
}) => {
	const formRef = React.useRef<HTMLFormElement>(null);
  const { updateLocations } = useLocations();
	const handleClose = React.useCallback(() => {
		formRef?.current?.reset();
		updateCoordinates();
	}, [updateCoordinates]);

  const currentCoordinates = React.useMemo(() => coordinates || {} as LatLng, [coordinates]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { currentTarget: form } = event;
    const newPlace: Location = {
      key: "",
      name: form.placeName.value,
      description: form.description.value,
      group: form.group.value,
      status: form.status.value,
      position: currentCoordinates,
    };

    const code = Math.floor(newPlace.position.lat + newPlace.position.lng);
    newPlace.key = `${newPlace.name}(${code})`
    
    if (updateLocations(newPlace)) {
      handleClose();
    }
	};

	if (!currentCoordinates.lat) {
		return null;
	}

	return (
		<div className={styles.modalContainer}>
			<span className={styles.background} onClick={handleClose} />

			<div className={`${styles.modalBody} ${className}`} style={style}>
				<form onSubmit={handleSubmit} ref={formRef}>
					<p>
						<label htmlFor="placeName">Nome*</label>
						<input id="placeName" name="placeName" placeholder="Nome local" required />
					</p>

					<p>
						<label htmlFor="group">Grupo</label>
						<input id="group" name="group" placeholder="Grupo pertencente" />
					</p>

					<p>
						<label htmlFor="status">Status</label>
						<input id="status" name="status" placeholder="Estado atual" />
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
