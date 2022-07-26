import { useState, useEffect } from "react";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import getBeers from "./services/beer.service.js";
import Home from "./containers/Home/Home.jsx";
import SingleBeer from "./components/SingleBeer/SingleBeer.jsx";
import "./App.scss";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [abvFilter, setAbvFilter] = useState(false);
  const [classicFilter, setClassicFilter] = useState(false);
  const [phFilter, setPhFilter] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [foodSearch, setFoodSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const API_URL = "https://api.punkapi.com/v2/beers";

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

  const handleNameInput = (e) => {
    setCurrentPage(1);
    setNameSearch(e.target.value);
  };

  const handleFoodInput = (e) => {
    setCurrentPage(1);
    setFoodSearch(e.target.value);
  };

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

  const paginateBeers = (beersArr) => {
    if (!beersArr.length) {
      return;
    }
    const numberOfPages = Math.ceil(beersArr.length / 24);
    setPageCount(numberOfPages);
    const paginatedBeers = [];
    for (let i = 0; i < numberOfPages; i++) {
      paginatedBeers.push(beersArr.splice(0, 24));
    }
    return paginatedBeers;
  };

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

  useEffect(() => {
    const generateQueryParams = () => {
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
    };
    getData(
      API_URL,
      generateQueryParams(),
      currentPage,
      phFilter,
      nameSearch,
      foodSearch,
    );
  }, [abvFilter, classicFilter, phFilter, nameSearch, foodSearch, currentPage]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                beers={beers}
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
                handleIncrementPage={handleIncrementPage}
                handleDecrementPage={handleDecrementPage}
                currentPage={currentPage}
                pageCount={pageCount}
              />
            }
          />
          <Route path="/:beerId" element={<SingleBeer beers={beers} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
