import React from "react";
import { Center, Box, Flex, Avatar } from "@chakra-ui/react";

const About: React.FC = () => {
  const ECFS_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/f/f3/ECFS_SunLogo.jpg";

	return (
    <Center width="100vw" height="100vh">
      <Flex direction="row" alignItems="center">
        <Box as="p" m="1px">This website was designed by the ECFS Comp Sci Club.</Box>
        <Avatar m="1px" size="sm" name="Ethical Culture Fielston School" src={ECFS_LOGO_URL} />
      </Flex>
    </Center>
	);
};

export default About;
