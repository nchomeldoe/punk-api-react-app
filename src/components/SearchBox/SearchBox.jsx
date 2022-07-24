import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.scss";

const SearchBox = ({ by }) => {
  return (
    <div className="search-box">
      <label className="search-box__label" htmlFor={by}>
        {by}
      </label>
      <input
        className="search-box__input"
        type="text"
        name={by}
        id={by}
        // onInput={(e) => setSearch(e.target.value)}
      />
      <FontAwesomeIcon className="search-box__icon" icon={faSearch} />
    </div>
  );
};

export default SearchBox;
