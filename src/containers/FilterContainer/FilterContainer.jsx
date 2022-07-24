import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import "./FilterContainer.scss";

const FilterContainer = ({ type, by }) => {
  return (
    <div className="filter-container">
      {(type === "search" && (
        <>
          <p className="filter-container__heading">Search by:</p>
          <div className="filter-container__filters">
            {by.map((category, i) => (
              <SearchBox by={category} key={i} />
            ))}
          </div>
        </>
      )) ||
        (type === "filter" && (
          <>
            <p className="filter-container__heading">Filter by:</p>
            <div className="filter-container__filters">
              <p>filter category</p>
            </div>
          </>
        ))}
    </div>
  );
};

export default FilterContainer;
