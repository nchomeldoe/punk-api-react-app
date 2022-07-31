import FilterOption from "../../components/FilterOption/FilterOption.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import "./FilterContainer.scss";

const FilterContainer = ({ type, handleFilters, filters }) => {
  //converting filters obj to array for mapping to JSX
  const filtersArr = Object.entries(filters);

  return (
    <div className="filter-container">
      {(type === "search" &&
        filtersArr.map((filter, i) => {
          const [filterName, { inputType, value, label }] = filter;
          if (inputType === "text") {
            return (
              <SearchBox
                name={filterName}
                handleInput={handleFilters}
                value={value}
                label={label}
                key={`${i}-${filterName}`}
              />
            );
          }
          return null;
        })) ||
        (type === "filter" &&
          filtersArr.map((filter, i) => {
            const [filterName, { inputType, value, label }] = filter;
            if (inputType === "checkbox") {
              return (
                <FilterOption
                  name={filterName}
                  handleInput={handleFilters}
                  value={value}
                  label={label}
                  key={`${i}-${filterName}`}
                />
              );
            }
            return null;
          }))}
    </div>
  );
};

export default FilterContainer;
