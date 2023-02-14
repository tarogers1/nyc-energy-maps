import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavLinkBtn.module.css";

interface NavLinkProps {
	value: string;
	linkTo: string;
}

const NavLinkBtn: React.FC<NavLinkProps> = ({ value, linkTo}) => {
	return (
		<>
			<Link to={linkTo}><div className="nav-link-btn">{value}</div></Link>
		</>
	);
};

export default NavLinkBtn;