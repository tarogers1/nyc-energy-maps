import React, { useEffect, useState } from "react";
import Map, { ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from "@deck.gl/react/typed";
import { GeoJsonLayer, PolygonLayer } from "@deck.gl/layers/typed";
import { Box } from "@chakra-ui/react";
import { mb_config as config } from "../../mapbox/config";
import { supabase_client as supabase } from "../../supabase/client";
import colorScale from "../../utils/colorScale";
import getTooltip from "./getTooltip";
import Pair from "../../utils/Pair";
import { IBuildingFeature, IBuildingsGJSON } from "../../types/IBuildingsGJSON";
import { IBuildingData } from "../../types/IBuildingData";
import calculateAverage from "../../supabase/calculateAverage";

interface MapGLProps {
	buildingSelected: number | null;
  inSelectAreaMode: boolean;
}

const MapGL: React.FC<MapGLProps> = ({ buildingSelected, inSelectAreaMode }) => {
	const zoomBounds = {
		maxZoom: 16,
		minZoom: 9.5  
	};

	const [data, setData] = useState<IBuildingData[]>([]);
	const [geoB, setGeoB] = useState<IBuildingsGJSON | null>(null);
	const [gjsonLayers, setGjsonLayers] = useState<(GeoJsonLayer)[]>([]);
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

		setGjsonLayers([
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

  type boundCoord = Pair<number, number> | null;
  const [c1, setC1] = useState<boundCoord>(null);  
  const [c2, setC2] = useState<boundCoord>(null); 
  const [pgLayers, setPgLayers] = useState<PolygonLayer[]>([]);

  useEffect(() => {
    if (!inSelectAreaMode) {
      setC1(null);
      setC2(null);
      return;
    }
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setC1(null);
        setC2(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [inSelectAreaMode]);

  useEffect(() => {
    if (!c1 || !c2) {
      setPgLayers([]);
      return;
    }

    const tl = [Math.min(c1.first, c2.first), Math.max(c1.second, c2.second)];
    const tr = [Math.max(c1.first, c2.first), Math.max(c1.second, c2.second)];
    const bl = [Math.min(c1.first, c2.first), Math.min(c1.second, c2.second)];
    const br = [Math.max(c1.first, c2.first), Math.min(c1.second, c2.second)];

    setPgLayers([
      new PolygonLayer({
        id: "select-area-rect",
        data: [{
          polygon: [tl, tr, br, bl]
        }],
        filled: true,
        getFillColor: [80, 80, 80, 100],
        stroked: true,
        wireframe: true,
        getPolygon: d => d.polygon,
        getLineColor: [80, 80, 80],
        getLineWidth: 15 
      })
    ]);
  }, [c1, c2]);

  const handleMapDragStart = (event: any) => {
    if (!inSelectAreaMode) return;
    const [lat, lng] = event.coordinate;
    setC1(new Pair(lat, lng))
  };

  const handleMapDrag = (event: any) => {
    if (!inSelectAreaMode) return;
    const [lat, lng] = event.coordinate;
    setC2(new Pair(lat, lng));
  };

  const handleMapDragEnd = async (event: any) => {
    if (!inSelectAreaMode) return;
    const [lat, lng] = event.coordinate;
    setC2(new Pair(lat, lng));

    if (!c1 || !c2) return;

    const avg = await calculateAverage(Math.min(c1.first, c2.first), Math.max(c1.first, c2.first), Math.min(c1.second, c2.second), Math.max(c1.second, c2.second));

    console.log(avg);
  };

  const [allLayers, setAllLayers] = useState<(GeoJsonLayer | PolygonLayer)[]>([]);
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < gjsonLayers.length; i++) arr.push(gjsonLayers[i]);
    for (let i = 0; i < pgLayers.length; i++) arr.push(pgLayers[i]);
    setAllLayers(arr);
  }, [gjsonLayers, pgLayers]);

	return (
		<Box height="100vh" zIndex={1}>
			<DeckGL
        onDragStart={handleMapDragStart}
        onDrag={handleMapDrag}
        onDragEnd={handleMapDragEnd}
				layers={allLayers}
				viewState={viewState}
				onViewStateChange={e => {
          if (inSelectAreaMode) return;
				// @ts-ignore
          setViewState(e.viewState);
        }}
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
