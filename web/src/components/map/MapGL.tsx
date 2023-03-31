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

interface MapGLProps {}

const MapGL: React.FC<MapGLProps> = ({}) => {
	const [data, setData] = useState<IBuildingData[]>([]);
	const [geoB, setGeoB] = useState<IBuildingsGJSON | null>(null);
	const [layers, setLayers] = useState<(GeoJsonLayer)[]>([]);

	const initialViewState = {
		longitude: -73.9855,
		latitude: 40.758,
		zoom: 10,
		maxZoom: 16,
		minZoom: 9 
	};

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

	return (
		<Box height="100vh" zIndex={-1}>
			<DeckGL
				layers={layers}
				initialViewState={initialViewState}
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