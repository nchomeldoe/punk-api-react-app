const API_URL = "https://api.punkapi.com/v2/beers";

const getBeers = async () => {
  try {
    let page = 0;
    let allBeerData = [];
    while (1) {
      page++;
      let response = await fetch(`${API_URL}?page=${page}&per_page=80`);
      if (!response.ok) {
        throw new Error(response.status + " error with request");
      }
      let newBeerData = await response.json();
      if (newBeerData.length) {
        allBeerData.push(newBeerData);
      } else {
        break;
      }
      console.log("all", allBeerData);
    }
    return allBeerData.flat();
  } catch (error) {
    return error.message;
  }
};

export default getBeers;
