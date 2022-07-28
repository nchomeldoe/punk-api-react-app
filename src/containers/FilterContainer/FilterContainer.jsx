import FilterOption from "../../components/FilterOption/FilterOption.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import "./FilterContainer.scss";

const FilterContainer = ({ type, handleFilters, filters }) => {
  const filtersArr = Object.entries(filters);

  return (
    <div className="filter-container">
      {(type === "search" &&
        filtersArr.map((filter, i) => {
          if (filter[1].inputType === "text") {
            return (
              <SearchBox
                name={filter[0]}
                handleInput={handleFilters}
                value={filter[1].value}
                label={filter[1].label}
                key={`${i}-${filter[0]}`}
              />
            );
          } else {
            return null;
          }
        })) ||
        (type === "filter" &&
          filtersArr.map((filter, i) => {
            if (filter[1].inputType === "checkbox") {
              return (
                <FilterOption
                  name={filter[0]}
                  handleInput={handleFilters}
                  value={filter[1].value}
                  label={filter[1].label}
                  key={`${i}-${filter[0]}`}
                />
              );
            } else {
              return null;
            }
          }))}
    </div>
  );
};

export default FilterContainer;
