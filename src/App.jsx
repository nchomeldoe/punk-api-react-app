import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import getBeers from "./services/beer.service.js";
import Home from "./containers/Home/Home.jsx";
import SingleBeer from "./components/SingleBeer/SingleBeer.jsx";
import "./App.scss";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [abvFilter, setAbvFilter] = useState(false);
  const [classicFilter, setClassicFilter] = useState(false);
  const [phFilter, setPhFilter] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      const apiBeers = await getBeers();
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
      setBeers(apiBeers);
    };
    getData();
  }, [abvFilter, classicFilter, phFilter, search]);

  console.log("my beers", beers[0]);

  const toggleAbvFilter = () => {
    setAbvFilter(!abvFilter);
  };

  const toggleClassicFilter = () => {
    setClassicFilter(!classicFilter);
  };

  const togglePhFilter = () => {
    setPhFilter(!phFilter);
  };

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
                toggleClassicFilter={toggleClassicFilter}
                togglePhFilter={togglePhFilter}
                setSearch={setSearch}
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
