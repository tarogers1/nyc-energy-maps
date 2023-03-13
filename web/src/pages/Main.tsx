import React from "react";
import Map from "../components/Map";
import { IBuildingData } from "../types/IBuildingData";
import mainStyles from "../styles/Main.module.css";
import SearchBar from "../components/SearchBar";

interface MainProps {
	data: IBuildingData[]; 
}

const Main: React.FC<MainProps> = ({ data }) => {
	return (
		<div className={mainStyles.container}>
			<div className={mainStyles.topBar}>
				<SearchBar placeholder="Search for a building by address..." />
			</div>
			<Map data={data} />
		</div>
	);
};

export default Main;