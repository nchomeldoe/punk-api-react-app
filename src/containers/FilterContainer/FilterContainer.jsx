// import FilterOption from "../../components/FilterOption/FilterOption.jsx";
// import SearchBox from "../../components/SearchBox/SearchBox.jsx";
// import "./FilterContainer.scss";

// const FilterContainer = ({ type, functionality }) => {
//   return (
//     <div className="filter-container">
//       {(type === "search" && (
//         <>
//           <p className="filter-container__heading">Search by:</p>
//           <div className="filter-container__filters">
//             {functionality.map((filterDetails, i) => (
//               <SearchBox filterDetails={filterDetails} key={i} />
//             ))}
//           </div>
//         </>
//       )) ||
//         (type === "filter" && (
//           <>
//             <p className="filter-container__heading">Filter filterDetails:</p>
//             <div className="filter-container__filters">
//               {functionality.map((filterDetails, i) => (
//                 <FilterOption filterDetails={filterDetails} key={i} />
//               ))}
//             </div>
//           </>
//         ))}
//     </div>
//   );
// };

// export default FilterContainer;

import FilterOption from "../../components/FilterOption/FilterOption.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import "./FilterContainer.scss";

const FilterContainer = ({ type, handleFilters, filters }) => {
  const filtersArr = Object.entries(filters);

  return (
    <div className="filter-container">
      {type === "search"
        ? filtersArr.map((filter) => {
            if (filter[1].inputType === "text") {
              return (
                <SearchBox
                  name={filter[0]}
                  handleInput={handleFilters}
                  value={filter[1].value}
                  label={filter[1].label}
                  key={filter[1].label}
                />
              );
            }
          })
        : filtersArr.map((filter) => {
            if (filter[1].inputType === "checkbox") {
              return (
                <FilterOption
                  name={filter[0]}
                  handleInput={handleFilters}
                  value={filter[1].value}
                  label={filter[1].label}
                  key={filter[1].label}
                />
              );
            }
          })}
    </div>
  );
};

export default FilterContainer;
