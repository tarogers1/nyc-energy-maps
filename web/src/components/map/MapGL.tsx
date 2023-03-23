import React, { useEffect, useState } from "react";
import Map, {
	Source,
	Layer,
	FullscreenControl,
	NavigationControl,
	ScaleControl
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box } from "@chakra-ui/react";
import { mb_config as config } from "../../mapbox/config";
import { IBuildingFeature, IBuildingsGJSON } from "../../types/IBuildingsGJSON";
import { IBuildingData } from "../../types/IBuildingData";
import cmath from "../../utils/cmath";

interface MapProps {
	data: IBuildingData[]; 
}

const MapGL: React.FC<MapProps> = ({ data }) => {
	const [viewState, setViewState] = useState({
		longitude: -73.9855,
		latitude: 40.7580,
		zoom: 10
	});

	const [geoB, setGeoB] = useState<IBuildingsGJSON | null>(null);
	const geoBLayerStyle = {
		"id": "buildings-layer",
		"type": "fill",
		"source": "buildings",
		"layout": {},
		"paint": {
			"fill-color": [
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
			]
		}
	};

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
			}
			obj.features.push(next);
		}

		setGeoB(obj);
	}, [data]);


	return (
		<Box height="100vh" zIndex={-1}>
			<Map
				{...viewState}
				onMove={evt => setViewState(evt.viewState)}
				mapStyle="mapbox://styles/mapbox/light-v11"
				mapboxAccessToken={config.token}
			>
				<FullscreenControl position="top-right" />
				<NavigationControl position="top-right" />
				<ScaleControl />

				{/* @ts-ignore */}
				<Source id="ee-ratings" type="geojson" data={geoB}>
					{/* @ts-ignore */}
					<Layer {...geoBLayerStyle} />
				</Source>
			</Map>
		</Box>
	);
};

export default MapGL;