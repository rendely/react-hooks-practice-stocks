import React from "react";

function SearchBar({typeFilter, onChangeTypeFilter, sortType, onChangeSortType}) {
  function handleChangeTypeFilter(e){
    onChangeTypeFilter(e.target.value)
  }
  function handleChangeSortType(e){
    onChangeSortType(e.target.value);
  }
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          name="sort"
          checked={sortType === "Alphabetically" ? true : false}
          onChange={handleChangeSortType}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          name="sort"
          checked={sortType === "Price" ? true : false}
          onChange={handleChangeSortType}
        />
        Price
      </label>
      <br />
      <label>
        <strong>Filter:</strong>
        <select onChange={handleChangeTypeFilter} value={typeFilter}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
