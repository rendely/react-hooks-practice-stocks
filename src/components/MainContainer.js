import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [typeFilter, setTypeFilter] = useState('Tech');
  const [sortType, setSortType] = useState('None');

  const displayedStocks = stocks
    .filter(stock => stock.type.includes(typeFilter))
    .sort(chooseSortFunction())
    ;

  useEffect(getStocksData, []);

  function getStocksData(){
    fetch('http://localhost:3001/stocks')
      .then(r=>r.json())
      .then(stocks=>setStocks(stocks))
  }

  function handleClickStock(id){
    const stock = stocks.find(stock => stock.id === id);
    setPortfolio([stock, ...portfolio]);
  }

  function handleClickPortfolio(id){
    setPortfolio(portfolio.filter(stock => stock.id !== id));
  }

  function handleTypeFilter(typeFilter){
     setTypeFilter(typeFilter);
  }

  function handleSortType(sortType){
     setSortType(sortType);
  }

  function chooseSortFunction(){
    switch (sortType){
      case "Alphabetically":
        return ((a,b) => {
          if (a.name > b.name ) return 1
          else if (a.name < b.name) return -1
          else return 0
        })
      case "Price":
        return ((a,b) => a.price - b.price)
      default: return undefined;
    }
  }

  return (
    <div>
      <SearchBar 
        typeFilter={typeFilter}
        onChangeTypeFilter={handleTypeFilter}
        sortType={sortType}
        onChangeSortType={handleSortType}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={displayedStocks} onClickStock={handleClickStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onClickPortfolio={handleClickPortfolio}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
