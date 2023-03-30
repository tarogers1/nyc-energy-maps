import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import MapGL from "../components/map/MapGL";
import { IBuildingData } from "../types/IBuildingData";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pair from "../utils/Pair";
import { supabase_client as supabase } from "../supabase/client";

const Main: React.FC = () => {
	const [names, setNames] = useState<Pair<string, number>[]>([]);
	const [buildingSelected, setBuildingSelected] = useState<number | null>(null);

	useEffect(() => {
		const fetchNames = async () => {
			const res = await supabase
				.from("full_table")
				.select("10_Digit_BBL,Street_Number,Street_Name");
			if (res.error) throw res.error;

			const v: {
				"10_Digit_BBL": number;
				Street_Number: string;
				Street_Name: string;
			}[] = res.data;
			for (let i = 0; i < v.length; i++) {
				names.push(
					new Pair(
						v[i]["Street_Number"] + " " + v[i]["Street_Name"],
						v[i]["10_Digit_BBL"]
					)
				);
			}
		};

		fetchNames();
	}, []);

	return (
		<Box>
			<Flex
				position="absolute"
				w="100%"
				justify="center"
				align="center"
				pt="1vh"
				pb="1vh"
				mt="0%"
				mb="1vh"
				zIndex={1}
			>
				<SearchBar
					placeholder="Search for a building by address..."
					names={names}
					fselected={(bbl: number) => setBuildingSelected(bbl)}
				/>
			</Flex>
			<MapGL />
			<FilterBar /> {/* position: absolute */}
		</Box>
	);
};

export default Main;
