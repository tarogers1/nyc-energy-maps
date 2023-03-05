import React, { MouseEventHandler, useState } from "react";
import NavLinkBtn from "./NavLinkBtn";
import navStyles from "../styles/Nav.module.css";

interface NavBarProps {}

const Nav: React.FC<NavBarProps> = ({ }) => {
	const [show, setShow] = useState(false);

	const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
		setShow(prevState => !prevState);
	};

	return (
		<div className={navStyles.sidenav}>
			<div className={navStyles.dropdownBtn} onClick={handleClick}>
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
			</div>
			{ show &&
				<div className={navStyles.dropdownOptionsContainer}>
					<NavLinkBtn value="Main" linkTo="/" />
					<NavLinkBtn value="Laws" linkTo="/laws" />
					<NavLinkBtn value="About" linkTo="/about" />
				</div>
			}
		</div>
	);
};

export default Nav;