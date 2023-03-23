import React from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";

interface LawsProps {}

const Laws: React.FC<LawsProps> = ({ }) => {
	return (
		<Flex width="full" justify="center" align="center">
			<Box>
				<Heading as="h1">Laws & Policy</Heading>
			</Box>
		</Flex>
	);
};

export default Laws;