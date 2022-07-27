import { useState, useEffect } from "react";

import getBeers from "./services/beer.service.js";
import Main from "./containers/Main/Main";
import Header from "./containers/Header/Header";
import Message from "./components/Message/Message.jsx";
import "./App.scss";

const App = () => {
  // state
  const [beers, setBeers] = useState([]);
  // const [frontEndFilters, setFrontEndFilters] = useState({});
  // const [backEndFilters, setBackEndFilters] = useState({});
  const [abvFilter, setAbvFilter] = useState(false);
  const [classicFilter, setClassicFilter] = useState(false);
  const [phFilter, setPhFilter] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [foodSearch, setFoodSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // API URL
  const API_URL = "https://api.punkapi.com/v2/beers";

  // Funcs for toggling filters and resetting page to 1 each time
  const toggleAbvFilter = () => {
    setCurrentPage(1);
    setAbvFilter(!abvFilter);
  };

  const toggleClassicFilter = () => {
    setCurrentPage(1);
    setClassicFilter(!classicFilter);
  };

  const togglePhFilter = () => {
    setCurrentPage(1);
    setPhFilter(!phFilter);
  };

  // handleSearchInputn (e) => {
  // setCuerrent
  // setseatrchobj{...searcjObj, obj[e.target.name]=}
  // }

  // Funcs for handling imputs and resetting page to 1 each time
  const handleNameInput = (e) => {
    setCurrentPage(1);
    setNameSearch(e.target.value);
  };

  const handleFoodInput = (e) => {
    setCurrentPage(1);
    setFoodSearch(e.target.value);
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

    //get beers
    getData(
      API_URL,
      generateQueryParams(abvFilter, classicFilter),
      currentPage,
      phFilter,
      nameSearch,
      foodSearch,
    );
  }, [abvFilter, classicFilter, phFilter, nameSearch, foodSearch, currentPage]);

  return (
    <div className="app">
      <Header
        toggleAbvFilter={toggleAbvFilter}
        abvFilter={abvFilter}
        toggleClassicFilter={toggleClassicFilter}
        classicFilter={classicFilter}
        togglePhFilter={togglePhFilter}
        phFilter={phFilter}
        handleNameInput={handleNameInput}
        nameSearch={nameSearch}
        handleFoodInput={handleFoodInput}
        foodSearch={foodSearch}
      />
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
