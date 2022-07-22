import { useState, useEffect } from "react";
import "./App.scss";
import getBeers from "./services/beer.service.js";
import Header from "./containers/Header/Header";
import Main from "./containers/Main/Main";

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

  console.log("my beers", beers[0]?.name);

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
    <>
      <div className="app">
        {/* <div className={nav}> */}
        <Header
          // beers={beers}
          toggleAbvFilter={toggleAbvFilter}
          toggleClassicFilter={toggleClassicFilter}
          togglePhFilter={togglePhFilter}
          setSearch={setSearch}
        />
        {/* </div> */}
        {/* <div className={main}> */}
        <Main beers={beers} />
        {/* </div> */}
      </div>
    </>
  );
};

export default App;
