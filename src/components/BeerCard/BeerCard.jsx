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
  } = beer;

  let trimmedDescription = description?.split(". ")[0] || "";

  if (trimmedDescription.charAt(trimmedDescription.length - 1) !== ".") {
    trimmedDescription += ".";
  }

  return (
    <div className="beer-card">
      <div className="beer-card__content-container">
        <img className="beer-card__image" src={image_url} alt={name} />
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
      </div>
    </div>
  );
};

export default BeerCard;
