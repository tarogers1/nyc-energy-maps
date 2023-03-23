import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

interface NavLinkProps {
	value: string;
	linkTo: string;
}

const NavLinkBtn: React.FC<NavLinkProps> = ({ value, linkTo}) => {
	return (
		<>
			<Link to={linkTo}><Text>{value}</Text></Link>
		</>
	);
};

export default NavLinkBtn;