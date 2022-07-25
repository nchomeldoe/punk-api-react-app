import BeerCard from "../../components/BeerCard/BeerCard";
import PageSelector from "../../components/PageSelector/PageSelector";
import "./Main.scss";

const Main = ({
  beers,
  currentPage,
  handleIncrementPage,
  handleDecrementPage,
}) => {
  return (
    <div className="main">
      <div className="main__beer-cards">
        {beers?.map((beer) => (
          <BeerCard beer={beer} key={beer.id} />
        ))}
      </div>
      <PageSelector
        handleIncrementPage={handleIncrementPage}
        handleDecrementPage={handleDecrementPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Main;
