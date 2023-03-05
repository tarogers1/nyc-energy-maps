import React from "react";
import Map from "../components/Map";

interface MainProps {
	buildings_gjson: any;
}

const Main: React.FC<MainProps> = ({ buildings_gjson }) => {
	return (
		<div id="container">
			<Map buildings_gjson={buildings_gjson} />
		</div>
	);
};

export default Main;