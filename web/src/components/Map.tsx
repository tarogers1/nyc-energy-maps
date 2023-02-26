import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";

interface MapProps {}

const Map: React.FC<MapProps> = ({ }) => {
	return (
		<MapContainer center={[40.505, -100.09]} zoom={13} >
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		</MapContainer>
	);
};

export default Map;