import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { mb_config as config } from "../mapbox/config";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/Map.css";
import { IBuildingFeature, IBuildingsGJSON } from "../types/IBuildingsGJSON";
import { IBuildingData } from "../types/IBuildingData";
import cmath from "../utils/cmath";

mapboxgl.accessToken = config.token;

interface MapProps {
	data: IBuildingData[]; 
}

const Map: React.FC<MapProps> = ({ data }) => {
	const mapContainer = useRef<any>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [lng, setLng] = useState<number>(-73.9855); // longitude of map center
	const [lat, setLat] = useState<number>(40.7580); // latitude of map center
	const [zoom, setZoom] = useState<number>(10);
	const [ready, setReady] = useState(false); // data loaded, map render, etc.

	const [geoB, setGeoB] = useState<IBuildingsGJSON | null>(null); // GeoJSON data for buildings

	const interpolateColors: Function = () => { // creates array 
		let arr = [
			"interpolate",
			["linear"],
			["get", "eescore"],
			10, "#090178",
			20, "#0428D9",
			30, "#0278B8",
			40, "#0293CC",
			50, "#03FCEC",
			60, "#05FACD",
			70, "#038F3B",
			80, "#04C97A",
			90, "#04C451",
			100, "#00F70C"
		];

		for (let x = 1; x <= 100; x++) {
		}

		return arr;
	};

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

		map.current.on("move", () => {
			// @ts-ignore
			setLng(map.current.getCenter().lng.toFixed(4));
			// @ts-ignore
			setLat(map.current.getCenter().lat.toFixed(4));
			// @ts-ignore
			setZoom(map.current.getZoom().toFixed(2));
		});
	}, []);

	useEffect(() => {	
		if (data.length === 0) return;

		let obj: IBuildingsGJSON = {
			type: "FeatureCollection",
			features: []
		};

		for (let i = 0; i < data.length; i++) {
			const cur = data[i]["GeoBuilding"];
			if (!cur) continue;	
			const next: IBuildingFeature = {
				"type": "Feature",
				"geometry": cur["geometry"],
				"properties": {
					...cur["properties"],
					eescore: data[i]["Energy_Star_1-100_Score"]
				} 
			};
			obj.features.push(next);
		}
		
		setGeoB(obj);
	}, [data]);

	useEffect(() => {
		if (!map.current || !geoB) return;

		map.current.on("load", () => {
			if (!map.current) return;

			map.current.addSource("buildings", {
				"type": "geojson",
				// @ts-ignore
				"data": geoB
			});

			map.current.addLayer({
				"id": "buildings-layer",
				"type": "fill",
				"source": "buildings",
				"layout": {},
				"paint": {
					"fill-color": interpolateColors() 
				}
			});

			map.current.on("click", "buildings-layer", (e) => {
				new mapboxgl.Popup()
					.setLngLat(e.lngLat)
					// @ts-ignore
					.setHTML(e.features[0].properties.eescore)
					// @ts-ignore
					.addTo(map.current);
			});
		});
	}, [geoB]);

	return (
		<div>
			<div ref={mapContainer} className="map-container"></div>
		</div>
	);
};

export default Map;