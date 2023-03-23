import React, { useState } from "react";
import fbStyles from "../styles/FilterBar.module.css";

interface FilterBarProps {}

const FilterBar: React.FC<FilterBarProps> = ({ }) => {
  const [show, setShow] = useState(false);

  const handleOpenClick = () => setShow(true);
  const handleCloseClick = () => setShow(false);

  return (
    <div className={fbStyles.container}>
      { show ? 
        <div>
          Filters
        </div>
        :
        <div className={fbStyles.openBtnContainer} onClick={handleOpenClick}>
          <svg xmlns="http://www.w3.org/2000/svg"
             width="24" height="24"
             viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
             strokeLinejoin="round" className="feather feather-corner-left-up"
          >
            <polyline points="14 9 9 4 4 9"></polyline><path d="M20 20h-7a4 4 0 0 1-4-4V4"></path>
          </svg>
        </div>
      }
    </div>
  );
};

export default FilterBar;