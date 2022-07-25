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
  const API_URL = "https://api.punkapi.com/v2/beers";

  const toggleAbvFilter = () => {
    setAbvFilter(!abvFilter);
  };

  const toggleClassicFilter = () => {
    setClassicFilter(!classicFilter);
  };

  const togglePhFilter = () => {
    setPhFilter(!phFilter);
  };

  const handleNameInput = (e) => {
    setNameSearch(e.target.value);
  };

  const handleFoodInput = (e) => {
    setFoodSearch(e.target.value);
  };

  const handleIncrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleDecrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      return;
    }
  };

  console.log("cp1", currentPage);

  useEffect(() => {
    let queryParams = "";
    const getData = async () => {
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

      if (currentPage > 1) {
        queryParams += `page=${currentPage}&`;
      } else {
        if (queryParams.includes("page=")) {
          queryParams = queryParams.replace("page=2&", "");
        }
      }

      console.log("cp", currentPage);
      console.log("qp", queryParams);

      let displayedBeers = await getBeers(API_URL, queryParams);

      if (phFilter) {
        displayedBeers = displayedBeers.filter(
          (beer) => beer.ph && beer.ph < 4,
        );
      }

      if (nameSearch) {
        displayedBeers = displayedBeers.filter((beer) => {
          const beerName = beer.name.toLowerCase();
          const searchTerm = nameSearch.toLowerCase();
          return beerName.includes(searchTerm);
        });
      }

      if (foodSearch) {
        displayedBeers = displayedBeers.filter((beer) => {
          const beerPairing = beer.food_pairing.join(" ").toLowerCase();
          const searchTerm = foodSearch.toLowerCase();
          return beerPairing.includes(searchTerm);
        });
      }
      setBeers(displayedBeers);
    };
    getData();
  }, [abvFilter, classicFilter, phFilter, nameSearch, foodSearch, currentPage]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              beers && (
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
                />
              )
            }
          />
          <Route path="/:beerId" element={<SingleBeer beers={beers} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
