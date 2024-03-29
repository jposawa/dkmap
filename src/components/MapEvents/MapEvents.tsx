import { editModeState, selectedLocationState } from "@/shared/state";
import { useMapEvents } from "react-leaflet";
import { useRecoilValue, useSetRecoilState } from "recoil";

export type MapEventsProps = {
	className?: string;
};

export const MapEvents: React.FC<MapEventsProps> = ({ className = "" }) => {
	const isEditMode = useRecoilValue(editModeState);
	const setSelectedLocation = useSetRecoilState(selectedLocationState);

	useMapEvents({
		click(event) {
			if (isEditMode) {
				setSelectedLocation(event.latlng);
			}
		},
	});

	return <span className={className} />;
};
