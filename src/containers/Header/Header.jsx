import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import FilterContainer from "../FilterContainer/FilterContainer.jsx";

import "./Header.scss";

const Header = ({ handleFilters, filters }) => {
  //state
  const [arrowType, setArrowType] = useState(faArrowDown);
  const [displayStatus, setDisplayStatus] = useState("hidden");

  //toggle up/down arrows and display status to create dropdown filter container in mobile
  const handleDisplay = () => {
    arrowType === faArrowDown
      ? setArrowType(faArrowUp)
      : setArrowType(faArrowDown);
    displayStatus === "hidden"
      ? setDisplayStatus("visible")
      : setDisplayStatus("hidden");
  };

  return (
    <div className="header">
      <h1 className="header__heading">BrewDog</h1>
      <button className="header__button" onClick={handleDisplay}>
        Search/Filter
        <FontAwesomeIcon className="header__icon" icon={arrowType} />
      </button>
      <div className={`header__filters header__filters--${displayStatus}`}>
        <FilterContainer
          // type="search"
          handleFilters={handleFilters}
          filters={filters}
        />
        <FilterContainer
          // type="filter"
          handleFilters={handleFilters}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default Header;
