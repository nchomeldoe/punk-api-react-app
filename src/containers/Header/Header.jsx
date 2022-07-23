import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import FiltersList from "../../components/FiltersList/FiltersList.jsx";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <h1 className="header__heading">BrewDog Beer</h1>
      <h2 className="header__subheading">Back Catalogue</h2>
      <hr className="header__separator" />

      <div className="header__filters-container">
        <SearchBox />
        <FiltersList />
      </div>
    </div>
  );
};

export default Header;
