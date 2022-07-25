import FilterContainer from "../FilterContainer/FilterContainer.jsx";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <h1 className="header__heading">BrewDog Beer</h1>
      <h2 className="header__subheading">Back Catalogue</h2>
      <hr className="header__separator" />
      <FilterContainer type="search" by={["Name", "Food pairing"]} />
      <FilterContainer
        type="filter"
        by={[{ "ABV >": 6 }, { "Brewed before": 2010 }, { "pH <": 4 }]}
      />
    </div>
  );
};

export default Header;
