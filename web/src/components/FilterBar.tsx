import React, { useState } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

interface FilterBarProps {}

const FilterBar: React.FC<FilterBarProps> = ({}) => {
	const { getDisclosureProps, isOpen, onToggle } = useDisclosure();
	const [hidden, setHidden] = useState(!isOpen);

	const WIDTH: number = document.body.offsetWidth * 0.25; // 25vw
	const BTN_WIDTH = document.getElementById("show_btn")?.offsetWidth || 36;

	return (
		<Flex zIndex={1}>
			<Box id="show-btn" position="absolute" left="100%" ml="-28px" zIndex={2} top="50%">
				<motion.div {...getDisclosureProps()} hidden={false} inital={true} animate={{ x: isOpen ? -(WIDTH + 4) : 0 }}>
					<Box border="2px" p="2px" roundedLeft="lg" roundedTop="lg" roundedBottom="lg">
						{isOpen ? (
							<ArrowRightIcon w={6} h={6} onClick={onToggle} />
						) : (
							<ArrowLeftIcon w={6} h={6} onClick={onToggle} />
						)}
					</Box>
				</motion.div>
			</Box>
			<motion.div {...getDisclosureProps()} hidden={hidden} initial={false} 
				onAnimationStart={() => setHidden(false)}
				onAnimationComplete={() => setHidden(!isOpen)}
				animate={{ width: isOpen ? WIDTH : 0 }}
				style={{
					background: "rgba(100, 100, 100)",
					overflow: "hidden",
					whiteSpace: "nowrap",
					position: "absolute",
					right: "0",
					height: "100vh",
					top: "0"
				}}
			>
				<Flex direction="column">
					Hello World!
				</Flex>
			</motion.div>
		</Flex>
	);
};

export default FilterBar;