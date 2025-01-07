import { EnvironmentOutlined } from "@ant-design/icons";
import { Button } from "antd";
import L from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const LocationButton = () => {
  const map = useMap();
  const [position, setPosition] = useState(null);

  const handleClick = () => {
    map.locate();
  };

  useEffect(() => {
    const locationFound = (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      map.flyTo([lat, lng], 14);
    };

    map.on("locationfound", locationFound);
    return () => map.off("locationfound", locationFound);
  }, [map]);

  const customIcon = L.divIcon({
    className:
      "rounded-full bg-primary shadow-lg ring-4 ring-primary/30 animate-pulse",
    iconSize: [16, 16],
    iconAnchor: [8, 32],
    popupAnchor: [0, -32],
  });

  return (
    <>
      <div className="leaflet-control-container">
        <div className="leaflet-top leaflet-left top-20">
          <div className="leaflet-control">
            <Button
              type="default"
              onClick={handleClick}
              size="small"
              className="border-2 border-gray-300 text-base text-black hover:bg-gray-100"
              title="Show my location"
            >
              <EnvironmentOutlined />
            </Button>
          </div>
        </div>
      </div>
      {position && (
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="text-center">
              <p className="font-medium">Your Location</p>
              <p className="text-sm text-gray-600">
                {position[0].toFixed(4)}, {position[1].toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default LocationButton;
