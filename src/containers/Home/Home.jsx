import Header from "../Header/Header";
import Main from "../Main/Main";
import "./Home.scss";

const Home = ({
  beers,
  toggleAbvFilter,
  toggleClassicFilter,
  togglePhFilter,
  setSearch,
  abvFilter,
  classicFilter,
  phFilter,
}) => {
  return (
    <>
      <Header
        toggleAbvFilter={toggleAbvFilter}
        abvFilter={abvFilter}
        toggleClassicFilter={toggleClassicFilter}
        classicFilter={classicFilter}
        togglePhFilter={togglePhFilter}
        phFilter={phFilter}
        setSearch={setSearch}
      />
      {beers && <Main beers={beers} />}
    </>
  );
};

export default Home;
