import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.scss";

const SearchBox = ({ by }) => {
  const { label, handleInput, value } = by;

  return (
    <div className="search-box">
      <input
        className="search-box__input"
        type="text"
        name={label}
        id={label}
        onInput={handleInput}
        value={value}
        placeholder={label}
        aria-label="search by"
      />
      <label className="search-box__label" htmlFor={label}>
        <FontAwesomeIcon className="search-box__icon" icon={faSearch} />
      </label>
    </div>
  );
};

export default SearchBox;
