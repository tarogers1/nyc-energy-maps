import React from "react";
import Map from "../components/Map";
import { IBuildingsGJSON } from "../types/IBuildingsGJSON";

interface MainProps {
	buildings_gjson: IBuildingsGJSON;
}

const Main: React.FC<MainProps> = ({ buildings_gjson }) => {
	return (
		<div id="container">
			<Map buildings_gjson={buildings_gjson} />
		</div>
	);
};

export default Main;