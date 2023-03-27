import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

interface FilterBarProps {}

const FilterBar: React.FC<FilterBarProps> = ({}) => {
	const [show, setShow] = useState(false);

	const handleOpenClick = () => setShow(true);
	const handleCloseClick = () => setShow(false);

	return (
		<Box zIndex={1}>
			{show ? (
				<Flex>
					<ArrowRightIcon onClick={handleCloseClick} />
				</Flex>
			) : (
				<Box>
					Hello
					<ArrowLeftIcon w={6} h={6} onClick={handleOpenClick} />
				</Box>
			)}
		</Box>
	);
};

export default FilterBar;
