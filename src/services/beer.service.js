const API_URL = "https://api.punkapi.com/v2/beers";

const getBeers = async () => {
  try {
    const response = await fetch(`${API_URL}?per_page=80`);
    if (!response.ok) {
      throw new Error(response.status + " error with request");
    }
    const beerData = await response.json();
    return beerData;
  } catch (error) {
    return error.message;
  }
};

export default getBeers;
