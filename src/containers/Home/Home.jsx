import Header from "../Header/Header";
import Main from "../Main/Main";
import "./Home.scss";

const Home = ({
  beers,
  toggleAbvFilter,
  toggleClassicFilter,
  togglePhFilter,
  setSearch,
}) => {
  return (
    <>
      <Header
        // beers={beers}
        toggleAbvFilter={toggleAbvFilter}
        toggleClassicFilter={toggleClassicFilter}
        togglePhFilter={togglePhFilter}
        setSearch={setSearch}
      />

      <Main beers={beers} />
    </>
  );
};

export default Home;
