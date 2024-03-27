import { editModeState } from "@/shared/state"
import { LatLng } from "leaflet";
import { useMapEvents } from "react-leaflet";
import { useRecoilValue } from "recoil"

export type MapEventsProps = {
  selectedLocation: LatLng | null | undefined;
  setSelectedLocation: (param?: LatLng) => void;
};

export const MapEvents: React.FC<MapEventsProps> = ({
  // selectedLocation,
  setSelectedLocation,
}) => {
  const isEditMode = useRecoilValue(editModeState);

  useMapEvents({
    click(event) {
      if (isEditMode) {
        setSelectedLocation(event.latlng);
      }
    }
  })

  return <></>
}