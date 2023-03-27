import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Laws from "./pages/Laws";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import Contact from "./pages/Contact";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route index element={<Main />} />
				<Route path="/laws" element={<Laws />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
