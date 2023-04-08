import React, { useState, useEffect } from "react";
import { Box, Flex, Center, Button } from "@chakra-ui/react";
import MapGL from "../components/map/MapGL";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pair from "../utils/Pair";
import { supabase_client as supabase } from "../supabase/client";
import TBuildingName from "../types/TBuildingName";
import BuildingInfo from "../components/BuildingInfo";

const Main: React.FC = () => {
	const [names, setNames] = useState<TBuildingName[]>([]);
	const [buildingSelected, setBuildingSelected] = useState<number | null>(null);
  const [inSelectAreaMode, setInSelectAreaMode] = useState(false);

	useEffect(() => {
		const fetchNames = async () => { // fetch names for search bar; store bbl and lat, lng for when building is selected
			const res = await supabase
				.from("full_table")
				.select("10_Digit_BBL,Street_Number,Street_Name,Latitude,Longitude");
			if (res.error) throw res.error;

			const v: {
				"10_Digit_BBL": number;
				"Street_Number": string;
				"Street_Name": string;
				"Longitude": number;
				"Latitude": number;
			}[] = res.data;

      let arr = [];
			for (let i = 0; i < v.length; i++) {
				arr.push(
					new Pair(
						v[i]["Street_Number"] + " " + v[i]["Street_Name"],
						new Pair(v[i]["10_Digit_BBL"], new Pair(v[i]["Latitude"], v[i]["Longitude"]))
					)
				);
			}

      setNames(arr);
		};

		fetchNames();
	}, []);

  // everything here is absolutely positioned
	return (
		<Box>
			<Flex position="absolute" w="100%" justify="center" align="center" pt="1vh" pb="1vh" mt="0%" mb="1vh" zIndex={1}>
				<SearchBar
					placeholder="Search for a building by address..."
					names={names}
					setBuildingSelected={setBuildingSelected}
				/>
			</Flex>
      <Center position="absolute" zIndex={1} bottom="0" width="100vw" height="5vh">
        <Button onClick={() => setInSelectAreaMode(prevState => !prevState)} border="2px" borderColor="gray.500" roundedBottom="none">
          { inSelectAreaMode ? 
            <Box as="p">Exit select area mode</Box>
          :
            <Box as="p">Enter select area mode</Box>
          }
        </Button>
      </Center>
			{ buildingSelected !== null && <BuildingInfo bbl={buildingSelected} setBuildingSelected={setBuildingSelected} /> }
			<MapGL buildingSelected={buildingSelected} inSelectAreaMode={inSelectAreaMode} />
			<FilterBar /> 
		</Box>
	);
};

export default Main;
