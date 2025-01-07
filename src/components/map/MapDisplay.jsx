import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { filteredPhongSelector } from "../../redux/selectors";
import "../map/MapDisplay.css";
import LocationButton from "./LocationButton";
import RoomMarker from "./RoomMarker";

const DEFAULT_CENTER = [10.7769, 106.7009];
const DEFAULT_ZOOM = 8;
const MAX_DISPLAY_ROOMS = 5;

const MapDisplay = () => {
  const allRooms = useSelector(filteredPhongSelector);
  const displayRooms = allRooms.slice(0, MAX_DISPLAY_ROOMS);

  useEffect(() => {
    const map = document.querySelector(".leaflet-container")?._leaflet_map;
    if (map) {
      map.invalidateSize();
    }
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <div className="fixed end-0 z-10 h-[calc(100vh-56px)] w-full">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationButton />
        {displayRooms.map((room) => (
          <RoomMarker key={room.id} room={room} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapDisplay;
