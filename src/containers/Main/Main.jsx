import BeerCard from "../../components/BeerCard/BeerCard";
import "./Main.scss";

const Main = ({ beers }) => {
  return (
    <div className="main">
      <div className="main__beer-cards">
        {beers?.map((beer) => (
          <BeerCard beer={beer} key={beer.id} />
        ))}
      </div>
    </div>
  );
};

export default Main;
