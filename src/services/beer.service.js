// API URL
const API_URL = "https://api.punkapi.com/v2/beers";

// fetch data by iterating through all available pages until no results are returned

const getBeers = async (url, queryParams) => {
  try {
    let page = 0;
    let allBeerData = [];
    while (1) {
      page++;
      let response = await fetch(
        `${url}?${queryParams}page=${page}&per_page=80`,
      );
      if (!response.ok) {
        throw new Error(response.status + " error with request");
      }
      let newBeerData = await response.json();
      if (newBeerData.length) {
        allBeerData.push(newBeerData);
      } else {
        break;
      }
    }
    return allBeerData.flat();
  } catch (error) {
    return error.message;
  }
};

export { getBeers, API_URL };
