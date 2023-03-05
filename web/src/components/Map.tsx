import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { mb_config as config } from "../mapbox/config";
import mapStyles from "../styles/Map.module.css";

mapboxgl.accessToken = config.token;

interface MapProps {
	buildings_gjson: any;
}

const Map: React.FC<MapProps> = ({ buildings_gjson }) => {
	const mapContainer = useRef<any>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [lng, setLng] = useState<number>(-73.9855); // longitude of map center
	const [lat, setLat] = useState<number>(40.7580); // latitude of map center
	const [zoom, setZoom] = useState<number>(10);

	useEffect(() => {
		if (map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/light-v11",
			center: [lng, lat],
			zoom: zoom
		});
	}, []);

	useEffect(() => {
		if (!map.current || !buildings_gjson) return;

		map.current.on("load", () => {
			if (!map.current) return;

			map.current.addSource("buildings",  {
				"type": "geojson",
				"data": buildings_gjson
			});

			map.current.addLayer({
				"id": "building-fills",
				"type": "fill",
				"source": "buildings",
				"layout": {},
				"paint": {
					"fill-color": "#627BC1",
					"fill-opacity": [
						"case",
						["boolean", ["feature-state", "hover"], false],
						1,
						0.5
					]
				}
			});

			map.current.addLayer({
				"id": "building-borders",
				"type": "line",
				"source": "buildings",
				"layout": {},
				"paint": {
					"line-color": "#627BC1",
					"line-width": 2
				}
			});
		});

	}, [buildings_gjson]);

	return (
		<div>
			<div ref={mapContainer} id="map-container"></div>
		</div>
	);
};

export default Map;