import { useState, useEffect } from "react";

import { getBeers, API_URL } from "./services/beer.service.js";
import {
  applyFrontEndFilters,
  generateQueryParams,
} from "./helpers/helpers.js";
import Main from "./containers/Main/Main";
import Header from "./containers/Header/Header";
import Message from "./components/Message/Message.jsx";
import "./App.scss";

const App = () => {
  // state
  const [beers, setBeers] = useState([]);
  const [filters, setFilters] = useState({
    nameSearch: {
      value: "",
      type: "frontEnd",
      inputType: "text",
      label: "Name",
    },
    foodSearch: {
      value: "",
      type: "frontEnd",
      inputType: "text",
      label: "Food pairing",
    },
    abvFilter: {
      value: false,
      type: "backEnd",
      inputType: "checkbox",
      label: "ABV > 6",
    },
    classicFilter: {
      value: false,
      type: "backEnd",
      inputType: "checkbox",
      label: "Brewed before 2010",
    },
    phFilter: {
      value: false,
      type: "frontEnd",
      inputType: "checkbox",
      label: "pH < 4",
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // setting filters on input and resetting page to 1 each time
  const handleFilters = (e) => {
    setCurrentPage(1);
    const filterName = e.target.name;
    if (e.target.type === "checkbox") {
      setFilters(
        { ...filters },
        (filters[filterName].value = !filters[filterName].value),
      );
    } else if (e.target.type === "text") {
      setFilters({ ...filters }, (filters[filterName].value = e.target.value));
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

  useEffect(() => {
    //get beers to display
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
