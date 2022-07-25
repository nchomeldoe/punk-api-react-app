import { useState, useEffect } from "react";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import getBeers from "./services/beer.service.js";
import Home from "./containers/Home/Home.jsx";
import SingleBeer from "./components/SingleBeer/SingleBeer.jsx";
import "./App.scss";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [abvFilter, setAbvFilter] = useState(false);
  console.log(abvFilter);
  const [classicFilter, setClassicFilter] = useState(false);
  const [phFilter, setPhFilter] = useState(false);
  const [search, setSearch] = useState("");
  const API_URL = "https://api.punkapi.com/v2/beers";
  let queryParams = "";

  const toggleAbvFilter = () => {
    setAbvFilter(!abvFilter);
  };

  const toggleClassicFilter = () => {
    setClassicFilter(!classicFilter);
  };

  const togglePhFilter = () => {
    setPhFilter(!phFilter);
  };

  useEffect(() => {
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

      let displayedBeers = await getBeers(API_URL, queryParams);

      if (phFilter) {
        displayedBeers = displayedBeers.filter(
          (beer) => beer.ph && beer.ph < 4,
        );
      }

      // let displayedBeers = apiBeers;

      // if (abvFilter) {
      //   displayedBeers = displayedBeers.filter(
      //     (beer) => beer.abv && beer.abv > 6,
      //   );
      // }
      // if (phFilter) {
      //   displayedBeers = displayedBeers.filter(
      //     (beer) => beer.ph && beer.ph < 4,
      //   );
      // }
      // if (classicFilter) {
      //   displayedBeers = displayedBeers.filter((beer) => {
      //     const year = beer.first_brewed.slice(3);
      //     return year < 2010;
      //   });
      // }
      // if (search) {
      //   displayedBeers = displayedBeers.filter((beer) => {
      //     const beerName = beer.name.toLowerCase();
      //     const beerPairing = beer.food_pairing.join(" ").toLowerCase();
      //     const beerAbv = beer.abv.toString();
      //     const searchTerm = search.toLowerCase();
      //     return (
      //       beerName.includes(searchTerm) ||
      //       beerPairing.includes(searchTerm) ||
      //       beerAbv.includes(searchTerm)
      //     );
      //   });
      // }
      setBeers(displayedBeers);
    };
    getData();
  }, [abvFilter, classicFilter, phFilter, search]);

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
                  setSearch={setSearch}
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
