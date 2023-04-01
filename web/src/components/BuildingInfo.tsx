// Building Info Popup
import React, { useState, useEffect } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { IBuildingData } from "../types/IBuildingData";
import { supabase_client as supabase } from "../supabase/client";
import formatAdress from "../utils/formatAddress";

interface BuildingInfoProps {
  bbl: number;
}

const BuildingInfo: React.FC<BuildingInfoProps> = ({ bbl }) => {
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

  return (
    <Box zIndex={2} position="absolute" top="50%" left="50%" backgroundColor="white" height="25vh" width="25vw">
      { info ? (
        <VStack justifyContent="center" alignItems="center">
          <Box>{formatAdress(info.Street_Number + " " + info.Street_Name)}</Box>
          <Box>{info["Energy_Efficiency_Grade"]} : {info["Energy_Star_1-100_Score"]}</Box>
        </VStack>
      ) : (
        <Box>
          Loading...
        </Box>
      )}
    </Box>
  );
};

export default BuildingInfo;