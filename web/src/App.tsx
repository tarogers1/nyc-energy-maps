import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Laws from "./pages/Laws";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import { supabase_client as supabase } from "./supabase/client";
import { IBuildingsGJSON } from "./types/IBuildingsGJSON";

const App: React.FC = () => {
	const [buildingsGJSON, setBuildingsGJSON] = useState<any>(null);
	const [buildingsGJSONLoaded, setBuildingsGJSONLoaded] = useState(false);
	const [data, setData] = useState<[] | null>(null);
	const [dataLoaded, setDataLoaded] = useState<boolean>(false);

	const columns = ["10_Digit_BBL", "Street_Number", "Street_Name", "Energy_Efficiency_Grade", "Energy_Star_1-100_Score"];

	useEffect(() => {
		const getSupabase = async () => {
			const res = await supabase
				.from("energy_disclosure_2020")
				.select(columns.join(","));
			if (res.error) throw(res.error);

			// @ts-ignore
			setData(res);
		};

		getSupabase().then(() => setDataLoaded(true));

		const getGJSON = async () => {
			const res = await supabase
				.from("geojson_lookup") 
				.select("GeoJSON");
			if (res.error) throw(res.error);

			let obj: IBuildingsGJSON = {
				type: "FeatureCollection",
				features: [] 
			};

			for (let i = 0; i < res.data.length; i++) {
				const curr = res.data[i]["GeoJSON"];
				if (!curr["features"] || curr["features"].length === 0) {
					continue;
				}
				obj.features.push(curr["features"][0]);
			}

			setBuildingsGJSON(obj);
		};

		getGJSON().then(() => setBuildingsGJSONLoaded(true));
	}, []);


	return (
		<Router>
			<Nav />
			<Routes>
				<Route index element={ <Main buildings_gjson={buildingsGJSON} /> } />
				<Route path="/laws" element={ <Laws /> } />
				<Route path="/about" element={ <About /> } />
				<Route path="*" element={ <NotFound /> } />
			</Routes>
		</Router>
	)
};

export default App;