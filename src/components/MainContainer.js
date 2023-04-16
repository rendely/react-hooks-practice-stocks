import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(getStocksData, []);

  function getStocksData(){
    fetch('http://localhost:3001/stocks')
      .then(r=>r.json())
      .then(stocks=>setStocks(stocks))
  }

  function handleClickStock(id){
    const stock = stocks.find(stock => stock.id === id);
    setPortfolio([stock, ...portfolio]);
    setStocks(stocks.filter(stock => stock.id !== id));
  }

  function handleClickPortfolio(id){
    const stock = portfolio.find(stock => stock.id === id);
    setPortfolio(portfolio.filter(stock => stock.id !== id));
    setStocks([stock, ...stocks]);
  }

  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} onClickStock={handleClickStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onClickPortfolio={handleClickPortfolio}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
