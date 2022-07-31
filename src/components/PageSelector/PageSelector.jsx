import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Button from "../Button/Button.jsx";
import "./PageSelector.scss";

const PageSelector = ({
  currentPage,
  handleIncrementPage,
  handleDecrementPage,
  pageCount,
}) => {
  return (
    <div className="page-selector">
      <Button
        disabledConditions={currentPage === 1}
        handleClick={handleDecrementPage}
        ariaLabel="go to previous page"
        icon={<FontAwesomeIcon icon={faArrowLeft} />}
      />
      <div className="page-selector__current-page-box">
        <p className="page-selector__current-page" data-testid="current-page">
          {currentPage}
        </p>
      </div>
      <Button
        disabledConditions={currentPage === pageCount}
        handleClick={handleIncrementPage}
        ariaLabel="go to next page"
        icon={<FontAwesomeIcon icon={faArrowRight} />}
      />
    </div>
  );
};

export default PageSelector;
