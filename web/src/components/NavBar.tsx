import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({ }) => {
	return (
		<div className="sidenav">
			<div className="dropdown-btn">
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
					     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
					     className="feather feather-menu">
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				</div>
			</div>
			<div className="dropdown-container">
				<Link to="/"><div>Main</div></Link>
				<Link to="/laws"><div>Laws</div></Link>
				<Link to="/about"><div>About</div></Link>
			</div>
		</div>
	);
};

export default NavBar;