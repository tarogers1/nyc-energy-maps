import React, { useEffect, useState } from "react";
import Map, { ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from "@deck.gl/react/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Box } from "@chakra-ui/react";
import { mb_config as config } from "../../mapbox/config";
import { supabase_client as supabase } from "../../supabase/client";
import colorScale from "../../utils/colorScale";
import getTooltip from "./getTooltip";
import { IBuildingFeature, IBuildingsGJSON } from "../../types/IBuildingsGJSON";
import { IBuildingData } from "../../types/IBuildingData";

interface MapGLProps {
	buildingSelected: number | null;
}

const MapGL: React.FC<MapGLProps> = ({ buildingSelected }) => {
	const zoomBounds = {
		maxZoom: 16,
		minZoom: 9 
	};

	const [data, setData] = useState<IBuildingData[]>([]);
	const [geoB, setGeoB] = useState<IBuildingsGJSON | null>(null);
	const [layers, setLayers] = useState<(GeoJsonLayer)[]>([]);
	const [viewState, setViewState] = useState({
		longitude: -73.9855,
		latitude: 40.758,
		zoom: 10,
		...zoomBounds,
		pitch: 0,
		bearing: 0,
		transitionDuration: 1000 // set the duration of the transition (in milliseconds)	
	});

	useEffect(() => {
		const fetchData = async () => {
			const res = await supabase.from("full_table").select("*");
			if (res.error) throw res.error;
			// @ts-ignore
			setData(res.data);
		};

		fetchData();
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
				type: "Feature",
				geometry: cur["geometry"],
				properties: {
					...cur["properties"],
					eescore: data[i]["Energy_Star_1-100_Score"]
				}
			};
			obj.features.push(next);
		}

		setGeoB(obj);
	}, [data]);


	useEffect(() => {
		if (!geoB || geoB.features.length === 0) return;

		setLayers([
			new GeoJsonLayer({
				id: "geojson-layer", 
				data: geoB,
				stroked: false,
				filled: true,
				extruded: false, // turns off 3D
				wireframe: true,
				// @ts-ignore
				getFillColor: f => colorScale(f.properties["eescore"]),
				getLineColor: [255, 255, 255],
				pickable: true
			})
		]);

	}, [geoB]);

	useEffect(() => {
		if (!buildingSelected) return;

		const fetchLocation = async () => {
			const res = await supabase
				.from("full_table")
				.select("Latitude,Longitude")
				.eq("10_Digit_BBL", buildingSelected);
			
			if (res.error) throw(res.error);

			const loc: { Latitude: number; Longitude: number; } = res.data[0];

			/*
			 * move the map to the location of the building
			 */ 
			// setViewState({
			// 	...viewState,
			// 	latitude: loc.Latitude,
			// 	longitude: loc.Longitude,
			// 	zoom: 16, // set to the desired zoom level
			// });
		};

		fetchLocation();
	}, [buildingSelected]);

	return (
		<Box height="100vh" zIndex={-1}>
			<DeckGL
				layers={layers}
				viewState={viewState}
				// @ts-ignore
				onViewStateChange={e => setViewState(e.viewState)}
				controller={true}
				// @ts-ignore
				getTooltip={getTooltip}
			>	
				<Map
					mapStyle="mapbox://styles/mapbox/light-v11"
					mapboxAccessToken={config.token}
				>
					<ScaleControl />
				</Map>
			</DeckGL>
		</Box>
	);
};

export default MapGL;