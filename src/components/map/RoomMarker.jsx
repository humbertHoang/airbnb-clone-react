import L from "leaflet";
import { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { formatCurrency } from "../../utils/format";
import CardComponent from "../CardComponent";

const RoomMarker = ({ room }) => {
  const coordinates = useMemo(() => {
    const baseLatitude = 10.7769;
    const baseLongitude = 106.7009;
    const latOffset = Math.random() - 0.5;
    const longOffset = Math.random() - 0.5;

    return {
      latitude: baseLatitude + latOffset,
      longitude: baseLongitude + longOffset,
    };
  }, []);

  const customIcon = useMemo(() => {
    return L.divIcon({
      className: "custom-icon",
      html: `<div class="text-center px-3 py-1 font-semibold shadow-lg text-sm whitespace-nowrap rounded-full" tabindex="0">
              <span>${formatCurrency(room.giaTien * 24000)}</span>
            </div>`,
      iconSize: [120, 30],
      iconAnchor: [60, 15],
      popupAnchor: [0, -15],
    });
  }, [room.giaTien]);

  return (
    <Marker
      position={[coordinates.latitude, coordinates.longitude]}
      icon={customIcon}
    >
      <Popup>
        <CardComponent phong={room} roomId={room.id} />
      </Popup>
    </Marker>
  );
};

export default RoomMarker;
