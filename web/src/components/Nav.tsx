import React, { MouseEventHandler, useState, useEffect } from "react";
import { Box, Stack, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import type Pair from "../utils/Pair";
import NavLinkBtn from "./NavLinkBtn";

interface NavProps {
  routes: Pair<string, string>[];
}

const Nav: React.FC<NavProps> = ({ routes }) => {
	const [isOpen, setIsOpen] = useState(false);

	const location = useLocation();
	useEffect(() => {
		setIsOpen(false)
	}, [location]);

	const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		setIsOpen(prevState => !prevState);
	};

  const iconVariants = {
    opened: {
      rotate: 135,
    },
    closed: {
      rotate: 0,
    }
  };

  // @ts-ignore
  const nameTitleWidth = document.getElementById("open-btn-name-title-container")?.offsetWidth - document.getElementById("open-btn")?.offsetWidth;
  const topBarVariants = {
    opened: {
      x : 0    
    },
    closed: {
      x: -264 // nameTitleWidth
    }
  };

	return (
		<Box position="absolute" zIndex={2} h="100vh">
      <motion.div variants={topBarVariants} animate={isOpen ? "opened" : "closed"}>
        <Flex id="open-btn-name-title-container" direction="row" justifyContent="space-between" width="20vw">
          <Box id="name-title" as="h3">NYC Energy Maps</Box>
  			  <Box id="open-btn" _hover={{ cursor: "pointer" }} p="0.5max">
            <motion.div variants={iconVariants} animate={isOpen ? "opened" : "closed"} whileHover={{ scale: 1.4 }} onClick={handleClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                  fill="#000000"
                />
              </svg>
            </motion.div>
			    </Box>
        </Flex>
      </motion.div>
      <Box position="absolute" w="20vw">
        { isOpen &&
				  <Stack border="2px" height="100vh" borderColor="black" pt="5vh">
            { routes.map((route: Pair<string, string>, key: number) => {
              return <NavLinkBtn key={key} value={route.first} linkTo={route.second} />;
            })}
				  </Stack>
			  }
      </Box>
		</Box>
	);
};

export default Nav;
