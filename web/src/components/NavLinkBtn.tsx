import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";

interface NavLinkProps {
	value: string;
	linkTo: string;
  icon: JSX.Element 
}

const NavLinkBtn: React.FC<NavLinkProps> = ({ value, linkTo, icon }) => {
	return (
    <Link to={linkTo}>
      <Flex direction="row" role="group" borderRadius="lg" cursor="pointer" mx="4" align="center" p="4" _hover={{ bg: "cyan.400", color: "white" }}>
        {icon}
        <Text mx="10px">{value}</Text>
      </Flex>
    </Link>
	);
};

export default NavLinkBtn;
