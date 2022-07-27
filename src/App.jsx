import { useState, useEffect } from "react";

import getBeers from "./services/beer.service.js";
import Main from "./containers/Main/Main";
import Header from "./containers/Header/Header";
import Message from "./components/Message/Message.jsx";
import "./App.scss";

const App = () => {
  // state
  const [beers, setBeers] = useState([]);
  const [filters, setFilters] = useState({
    abvFilter: { value: false, type: "backEnd" },
    classicFilter: { value: false, type: "backEnd" },
    phFilter: { value: false, type: "frontEnd" },
    nameSearch: { value: "", type: "frontEnd" },
    foodSearch: { value: "", type: "frontEnd" },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // API URL
  const API_URL = "https://api.punkapi.com/v2/beers";

  // Funcs for setting filters and resetting page to 1 each time
  const handleFilters = (e) => {
    setCurrentPage(1);
    console.log(e.target.type);
    switch (e.target.name) {
      case "ABV > 6":
        setFilters(
          { ...filters },
          (filters.abvFilter.value = !filters.abvFilter.value),
        );
        break;
      case "Brewed before 2010":
        setFilters(
          { ...filters },
          (filters.classicFilter.value = !filters.classicFilter.value),
        );
        break;
      case "pH < 4":
        setFilters(
          { ...filters },
          (filters.phFilter.value = !filters.phFilter.value),
        );
        break;
      case "Name":
        setFilters({ ...filters }, (filters.nameSearch.value = e.target.value));
        break;
      case "Food pairing":
        setFilters({ ...filters }, (filters.nameSearch.value = e.target.value));
        break;
    }
  };

  // Funcs for incrementing/decrementing page
  const handleIncrementPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDecrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      return;
    }
  };

  // Paginating results
  const paginateBeers = (beersArr) => {
    const numberOfPages = Math.ceil(beersArr.length / 24);
    setPageCount(numberOfPages);
    const paginatedBeers = [];
    for (let i = 0; i < numberOfPages; i++) {
      paginatedBeers.push(beersArr.splice(0, 24));
    }
    return paginatedBeers;
  };

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

  useEffect(() => {
    //func to get beers to display
    const getData = async (
      url,
      params,
      page,
      phFilter,
      nameSearch,
      foodSearch,
    ) => {
      let beerData = await getBeers(url, params);
      const filteredBeers = applyFrontEndFilters(
        beerData,
        phFilter,
        nameSearch,
        foodSearch,
      );
      const paginatedBeers = paginateBeers(filteredBeers)[page - 1];
      setBeers(paginatedBeers);
      setIsLoading(false);
    };

    //set isLoading to true
    setIsLoading(true);

    //deconstructing filters
    const { abvFilter, classicFilter, phFilter, nameSearch, foodSearch } =
      filters;

    //get beers
    getData(
      API_URL,
      generateQueryParams(abvFilter.value, classicFilter.value),
      currentPage,
      phFilter.value,
      nameSearch.value,
      foodSearch.value,
    );
  }, [filters, currentPage]);

  return (
    <div className="app">
      <Header handleFilters={handleFilters} filters={filters} />
      {isLoading ? (
        <Message displayedMessage="Loading..." />
      ) : beers ? (
        <Main
          beers={beers}
          handleIncrementPage={handleIncrementPage}
          handleDecrementPage={handleDecrementPage}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      ) : (
        <Message displayedMessage="No matching beers found" />
      )}
    </div>
  );
};

export default App;
