// Applying front-end filters to results
const applyFrontEndFilters = (data, phFilter, nameSearch, foodSearch) => {
  if (phFilter) {
    data = data.filter((beer) => beer.ph && beer.ph < 4);
  }
  if (nameSearch) {
    data = data.filter((beer) => {
      const beerName = beer.name.toLowerCase();
      const searchTerm = nameSearch.toLowerCase();
      return beerName.includes(searchTerm);
    });
  }
  if (foodSearch) {
    data = data.filter((beer) => {
      const beerPairing = beer.food_pairing.join(" ").toLowerCase();
      const searchTerm = foodSearch.toLowerCase();
      return beerPairing.includes(searchTerm);
    });
  }
  return data;
};

//Generating query params for backend filtering
const generateQueryParams = (abvFilter, classicFilter) => {
  let queryParams = "";
  if (abvFilter) {
    queryParams += "abv_gt=6&";
  } else {
    queryParams = queryParams ? queryParams.replace("abv_gt=6&", "") : "";
  }
  if (classicFilter) {
    queryParams += "brewed_before=01-2010&";
  } else {
    queryParams = queryParams
      ? queryParams.replace("brewed_before=01-2010&", "")
      : "";
  }
  return queryParams;
};

export { applyFrontEndFilters, generateQueryParams };
