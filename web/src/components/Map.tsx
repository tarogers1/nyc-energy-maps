import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { mb_config as config } from "../mapbox/config";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/Map.css";
import { IBuildingsGJSON } from "../types/IBuildingsGJSON";

mapboxgl.accessToken = config.token;

interface MapProps {
	buildings_gjson: IBuildingsGJSON;
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
			zoom: zoom,
			minZoom: 10,
			maxZoom: 16
		});
	}, []);

	useEffect(() => {
		if (!map.current || !buildings_gjson) return;
		console.log(buildings_gjson);

		map.current.on("load", () => {
			if (!map.current) return;

			map.current.addSource("buildings",  {
				"type": "geojson",
				// @ts-ignore
				"data": buildings_gjson
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

		map.current.on("move", () => {
			// @ts-ignore
			setLng(map.current.getCenter().lng.toFixed(4));
			// @ts-ignore
			setLat(map.current.getCenter().lat.toFixed(4));
			// @ts-ignore
			setZoom(map.current.getZoom().toFixed(2));
		});
	}, [buildings_gjson]);

	return (
		<div>
			<div className="sidebar">
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className="map-container"></div>
		</div>
	);
};

export default Map;