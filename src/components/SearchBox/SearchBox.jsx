import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.scss";

const SearchBox = ({ by }) => {
  return (
    <div className="search-box">
      <input
        className="search-box__input"
        type="text"
        name={by.label}
        id={by.label}
        onInput={by.handleInput}
        value={by.value}
        placeholder={by.label}
        aria-label="search by"
      />
      <label className="search-box__label" htmlFor={by.label}>
        <FontAwesomeIcon className="search-box__icon" icon={faSearch} />
      </label>
    </div>
  );
};

export default SearchBox;
