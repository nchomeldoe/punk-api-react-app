import CardContainer from "../CardContainer/CardContainer";
import PageSelector from "../../components/PageSelector/PageSelector";
import "./Main.scss";

const Main = ({
  beers,
  currentPage,
  handleIncrementPage,
  handleDecrementPage,
  pageCount,
}) => {
  return (
    <div className="main">
      <CardContainer beers={beers} />
      <PageSelector
        handleIncrementPage={handleIncrementPage}
        handleDecrementPage={handleDecrementPage}
        currentPage={currentPage}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Main;
