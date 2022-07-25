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
  handleNameInput,
  nameSearch,
  handleFoodInput,
  foodSearch,
  currentPage,
  handleIncrementPage,
  handleDecrementPage,
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
        handleNameInput={handleNameInput}
        nameSearch={nameSearch}
        handleFoodInput={handleFoodInput}
        foodSearch={foodSearch}
      />
      {beers && (
        <Main
          beers={beers}
          handleIncrementPage={handleIncrementPage}
          handleDecrementPage={handleDecrementPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Home;
