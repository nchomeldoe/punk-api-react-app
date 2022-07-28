import "./FilterOption.scss";

const FilterOption = ({ name, handleInput, value, label }) => {
  return (
    <div className="filter-option">
      <label className="filter-option__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="filter-option__input"
        type="checkbox"
        id={name}
        name={name}
        onChange={handleInput}
        checked={value}
      />
    </div>
  );
};

export default FilterOption;
