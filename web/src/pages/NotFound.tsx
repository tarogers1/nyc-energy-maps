import React from "react";
import { Center, Box } from "@chakra-ui/react";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = ({ }) => {
  return (
    <Center width="100vw" height="100vh">
      <Box as="p">Page not found.</Box>
    </Center>
  );
};

export default NotFound;
