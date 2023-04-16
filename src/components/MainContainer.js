import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [typeFilter, setTypeFilter] = useState('Tech');

  const displayedStocks = stocks.filter(stock => stock.type.includes(typeFilter));

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

  return (
    <div>
      <SearchBar 
        typeFilter={typeFilter}
        onChangeTypeFilter={handleTypeFilter}
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
