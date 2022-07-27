import BeerCard from "../../components/BeerCard/BeerCard";
import "./CardContainer.scss";

const CardContainer = ({ beers }) => {
  return (
    <div className="card-container">
      {beers?.map((beer) => (
        <BeerCard beer={beer} key={beer.id} />
      ))}
    </div>
  );
};

export default CardContainer;
