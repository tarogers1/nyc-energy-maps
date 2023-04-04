// Building Info Popup
import React, { useState, useEffect } from "react";
import { Center, Box, VStack, Flex } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { IBuildingData } from "../types/IBuildingData";
import { supabase_client as supabase } from "../supabase/client";
import formatAdress from "../utils/formatAddress";
import ISA from "../types/ISA";

interface BuildingInfoProps {
  bbl: number;
  setBuildingSelected: Function;
}

const BuildingInfo: React.FC<BuildingInfoProps> = ({ bbl, setBuildingSelected }) => {
  const [info, setInfo] = useState<IBuildingData | null>(null);

  useEffect(() => {
    const fetchInfo = async () => { 
      const res = await supabase.from("full_table").select("*").eq("10_Digit_BBL", bbl);
      if (res.error) throw(res.error);
      //@ts-ignore
      setInfo(res.data[0]);
    };  

    fetchInfo();
  }, [bbl]);

  const buildingType: ISA = {
    "2100": "Building",
    "5100": "Building Under Construction",
    "5110": "Garage",
    "2110": "Skybridge",
    "1001": "Gas Station Canopy",
    "1002": "Storage Tank",
    "1003": "Placeholder",
    "1004": "Auxiliary Structure",
    "1005": "Temporary Structure"
  };

  return (
    <Center position="absolute" ml="50vw" width="50vw" height="100vh">
      <Box zIndex={2} backgroundColor="white" border="2px" rounded="lg" height="25vmax" width="25vmax">
        <CloseIcon top="0" left="0" h={4} w={4} m={1} onClick={() => setBuildingSelected(null)} _hover={{ cursor: "pointer" }}/>
        <Box p="1.5vmax">
          { info ? (
            <Flex justifyContent="center" alignItems="center">
              <VStack textAlign="center">
                <Box as="p">{formatAdress(info.Street_Number + " " + info.Street_Name)}</Box>
                <Box as="p">Score: {info["Energy_Star_1-100_Score"]}</Box>
                <Box as="p">Grade: {info["Energy_Efficiency_Grade"]}</Box>
                <Box as="p">Type: {buildingType[info["GeoBuilding"].properties.feat_code]}</Box>
                <Box as="p">Year Built: {info["GeoBuilding"].properties.cnstrct_yr}</Box>
                <Box as="p">Building Height: {info["GeoBuilding"].properties.heightroof} ft</Box>
                <Box as="p">Lat, Lng: {info["Latitude"].toPrecision(4)}, {info["Longitude"].toPrecision(4)}</Box>
             </VStack>
           </Flex>
          ) : (
            <Box textAlign="center">
              Loading...
            </Box>
          )}
        </Box>
      </Box>
    </Center>
  );
};

export default BuildingInfo;