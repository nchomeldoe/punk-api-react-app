import "./FilterOption.scss";

const FilterOption = ({ handleInput, value, label }) => {
  // const { label, handleInput, value } = by;

  return (
    <div className="filter-option">
      <label className="filter-option__label" htmlFor={label}>
        {label}
      </label>
      <input
        className="filter-option__input"
        type="checkbox"
        id={label}
        name={label}
        onChange={handleInput}
        checked={value}
      />
    </div>
  );
};

export default FilterOption;
