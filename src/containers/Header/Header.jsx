import FilterContainer from "../FilterContainer/FilterContainer.jsx";

import "./Header.scss";

const Header = ({
  toggleAbvFilter,
  toggleClassicFilter,
  togglePhFilter,
  setSearch,
  abvFilter,
  classicFilter,
  phFilter,
  handleNameInput,
  nameSearch,
  handleFoodInput,
  foodSearch,
}) => {
  return (
    <div className="header">
      <h1 className="header__heading">BrewDog Beer</h1>
      <h2 className="header__subheading">Back Catalogue</h2>
      <hr className="header__separator" />
      <FilterContainer
        type="search"
        by={[
          { label: "Name", handleInput: handleNameInput, value: nameSearch },
          {
            label: "Food pairing",
            handleInput: handleFoodInput,
            value: foodSearch,
          },
        ]}
      />
      <FilterContainer
        type="filter"
        by={[
          { "ABV >": 6, handleChange: toggleAbvFilter, value: abvFilter },
          {
            "Brewed before": 2010,
            handleChange: toggleClassicFilter,
            value: classicFilter,
          },
          { "pH <": 4, handleChange: togglePhFilter, value: phFilter },
        ]}
      />
    </div>
  );
};

export default Header;
