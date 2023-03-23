import React, { MouseEventHandler, useState, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import NavLinkBtn from "./NavLinkBtn";

interface NavProps {}

const Nav: React.FC<NavProps> = ({ }) => {
	const [show, setShow] = useState(false);

	const location = useLocation();
	useEffect(() => {
		setShow(false)
	}, [location]);

	const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		setShow(prevState => !prevState);
	};

	return (
		<Box position="absolute" zIndex={2} h="100vh">
			<Box position="absolute" onClick={handleClick}>
				{ show ?
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
					     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
					     className="feather feather-x">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
					:
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
					     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
					     className="feather feather-menu">
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				}
			</Box>
			{ show &&
				<Stack w="20vw" h="100%" border="2px" borderColor="black" pt="5vh">
					<NavLinkBtn value="Main" linkTo="/" />
					<NavLinkBtn value="Laws" linkTo="/laws" />
					<NavLinkBtn value="About" linkTo="/about" />
					<NavLinkBtn value="Contact" linkTo="/contact" />
				</Stack>
			}
		</Box>
	);
};

export default Nav;