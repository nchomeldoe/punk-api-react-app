import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./PageSelector.scss";

const PageSelector = ({
  currentPage,
  handleIncrementPage,
  handleDecrementPage,
}) => {
  return (
    <div className="page-selector">
      <button
        className="page-selector__button"
        disabled={currentPage === 1}
        onClick={handleDecrementPage}
      >
        <FontAwesomeIcon className="page-selector__icon" icon={faArrowLeft} />
      </button>
      <div className="page-selector__current-page-box">
        <p className="page-selector__current-page">{currentPage}</p>
      </div>
      <button className="page-selector__button" onClick={handleIncrementPage}>
        <FontAwesomeIcon className="search-box__icon" icon={faArrowRight} />
      </button>
    </div>
  );
};

export default PageSelector;
