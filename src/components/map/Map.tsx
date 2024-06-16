import type { FC } from "react";
import { Box, Paper } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/images/icons/marker.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const center = {
  lat: 35.6607,
  lng: 139.70553,
};

const Map: FC = () => {
  return (
    <Paper sx={{ padding: "1rem", backgroundColor: "#FFFFFF" }}>
      <Box sx={{ width: "100%", height: { xs: "400px", sm: "500px" } }}>
        <MapContainer
          center={center}
          zoom={20}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center} icon={customIcon} alt="SakuraCafe Marker">
            <Popup>SakuraCafe</Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Paper>
  );
};

export default Map;
