import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Laws from "./pages/Laws";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";

const App = () => {
	return (
		<Router>
			<Nav />
			<Routes>
				<Route index element={<Main />} />
				<Route path="/laws" element={<Laws />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	)
};

export default App;