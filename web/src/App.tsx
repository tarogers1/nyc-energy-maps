import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Laws from "./pages/Laws";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import { supabase_client as supabase } from "./supabase/client";
import { IBuildingData } from "./types/IBuildingData";
import Contact from "./pages/Contact";

const App: React.FC = () => {
	const [data, setData] = useState<IBuildingData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await supabase.from("full_table").select("*");	
			if (res.error) throw(res.error);
			setData(res.data);
		};

		fetchData();
	}, []);

	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route index element={ <Main data={data} /> } />
				<Route path="/laws" element={ <Laws /> } />
				<Route path="/about" element={ <About /> } />
				<Route path="/contact" element={ <Contact /> } />
				<Route path="*" element={ <NotFound /> } />
			</Routes>
		</BrowserRouter>
	);
};

export default App;