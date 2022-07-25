import "./FilterOption.scss";

const FilterOption = ({ by }) => {
  const filterCategory = Object.keys(by)[0];
  const filterBy = `${Object.keys(by)[0]} ${by[filterCategory]}`;

  return (
    <div className="filter-option">
      <label className="filter-option__label" htmlFor={filterBy}>
        {filterBy}
      </label>
      <input
        className="filter-option__input"
        type="checkbox"
        id={filterBy}
        name={filterBy}
        // onChange={toggleFilter}
      />
    </div>
  );
};

export default FilterOption;
