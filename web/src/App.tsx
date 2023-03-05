import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Main from "./pages/Main";
import Laws from "./pages/Laws";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import { IBGJAPIDATA, IBuildingsGJSON } from "./types/IBuildingsGJSON";

const buildingsGSJONURL: string = "https://data.cityofnewyork.us/resource/qb5r-6dgf.json";

const App = () => {
	const [buildingsGJSON, setBuildingsJSON] = useState<any>(null);
	const [loadedData, setLoadedData] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get(buildingsGSJONURL);
			let obj: IBuildingsGJSON = {
				"type": "FeatureCollection",
				"features": []
			};

			const data: IBGJAPIDATA[] = res.data;
			data.forEach((entry: IBGJAPIDATA) => {
				obj.features.push({
					type: "Feature",
					properties: {
						bin: entry.bin,
						cnstrct_yr: entry.cnstrct_yr,
						lstmoddate: entry.lstmoddate,
						lststatype: entry.lststatype,
						doitt_id: entry.doitt_id,
						heightroof: entry.heightroof,
						feat_code: entry.feat_code,
						groundelev: entry.groundelev,
						shape_area: entry.shape_area,
						shape_len: entry.shape_len,
						base_bbl: entry.base_bbl,
						mpluto_bbl: entry.mpluto_bbl,
						geomsource: entry.geomsource
					},
					geometry: entry.the_geom
				});
			});

			console.log(obj.features.length);

			setBuildingsJSON(obj);
		};

		fetchData().then(() => setLoadedData(true));
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