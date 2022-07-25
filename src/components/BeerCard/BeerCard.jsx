import { Link } from "react-router-dom";

import "./BeerCard.scss";

const BeerCard = ({ beer }) => {
  const {
    name,
    tagline,
    first_brewed,
    description,
    image_url,
    abv,
    ph,
    food_pairing,
    id,
  } = beer;

  let trimmedDescription = description?.split(". ")[0] || "";

  if (trimmedDescription.charAt(trimmedDescription.length - 1) !== ".") {
    trimmedDescription += ".";
  }

  return (
    <div className="beer-card">
      <div className="beer-card__content-container">
        {image_url && (
          <Link
            to={`/${id}`}
            className="beer-card__link beer-card__link--image"
          >
            <img className="beer-card__image" src={image_url} alt={name} />
          </Link>
        )}
        <h3 className="beer-card__name">{name}</h3>
        <h4 className="beer-card__tagline">{tagline}</h4>
        <p className="beer-card__abv-ph">
          ABV: {abv} | pH: {ph}
        </p>
        <p className="beer-card__first-brewed">Since: {first_brewed}</p>
        <p className="beer-card__description">{trimmedDescription}</p>
        <h5 className="beer-card__pairings-header">Pair with:</h5>
        <ul className="beer-card__pairings">
          {food_pairing?.map((dish, index) => (
            <li key={index} className="beer-card__pairing">
              {dish}
            </li>
          ))}
        </ul>
        <Link
          to={`/${id}`}
          className="beer-card__link beer-card__link--more-info"
        >
          <h5 className="beer-card__more-info">Find out more...</h5>
        </Link>{" "}
      </div>
    </div>
  );
};

export default BeerCard;
