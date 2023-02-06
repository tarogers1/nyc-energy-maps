import { Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Laws from "./pages/Laws";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const Router = () => {
	return (
		<Routes>
			<Route index element={<Main />} />
			<Route path="/laws" element={<Laws />} />
			<Route path="/about" element={<About />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Router;