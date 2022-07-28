import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.scss";

const SearchBox = ({ name, handleInput, value, label }) => {
  return (
    <div className="search-box">
      <input
        className="search-box__input"
        type="text"
        name={name}
        id={name}
        onInput={handleInput}
        value={value}
        placeholder={label}
        aria-label="search by"
      />
      <label className="search-box__label" htmlFor={name}>
        <FontAwesomeIcon className="search-box__icon" icon={faSearch} />
      </label>
    </div>
  );
};

export default SearchBox;
