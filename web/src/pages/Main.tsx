import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import MapGL from "../components/map/MapGL";
import { IBuildingData } from "../types/IBuildingData";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pair from "../utils/Pair";

interface MainProps {
	data: IBuildingData[]; 
}

const Main: React.FC<MainProps> = ({ data }) => {
	const [names, setNames] = useState<Pair<string, number>[]>([]);
	const [buildingSelected, setBuildingSelected] = useState<number | null>(null);

	useEffect(() => {
		let arr = [];
		for (let i = 0; i < data.length; i++) {
			arr.push(new Pair(data[i]["Street_Number"] + " " + data[i]["Street_Name"], data[i]["10_Digit_BBL"]));
		}
		setNames(arr);
	}, [data]);


	return (
		<Box>
			<Flex position="absolute" w="100%"justify="center" align="center" pt="1vh" pb="1vh" mt="0%" mb="1vh" zIndex={1}>
				<SearchBar
					placeholder="Search for a building by address..."
					names={names}
					fselected={(bbl: number) => setBuildingSelected(bbl)}
				/>
			</Flex>
			<MapGL data={data} />
			{/*<FilterBar />*/}
		</Box>
	);
};

export default Main;