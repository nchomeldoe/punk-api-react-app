import { useParams } from "react-router-dom";
import "./SingleBeer.scss";

const SingleBeer = ({ beers }) => {
  const { beerId } = useParams();
  const {
    abv,
    attenuation_level,
    boil_volume,
    brewers_tips,
    contributed_by,
    description,
    ebc,
    first_brewed,
    food_pairing,
    ibu,
    image_url,
    ingredients,
    method,
    name,
    ph,
    srm,
    tagline,
    target_fg,
    target_og,
    volume,
  } = beers.find((beer) => beer.id == beerId);

  return (
    <div className="single-beer">
      <p>{name}</p>
      <p>{tagline}</p>
      <p>{description}</p>
    </div>
  );
};

export default SingleBeer;
