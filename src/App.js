import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './comps/Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [coinsData, setCoinsData] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
      setCoinsData(res.data);
      console.log(res.data);
    }).catch(error => alert(error));
  },[]);


  const handelChange = e =>{
    setSearch(e.target.value);
    let textSearch  = e.target.value
    const filteredCoins = coinsData.filter(coin => 
      coin.name.toString().toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
  )
  setCoins(filteredCoins)
}


  


  return (
    <div className="coin-app">
    <div className="coin-search">
      <h1 className="coin-text">
          Search a Cyrpto Currency
      </h1>
      <form>
         <input className='coin-input' type="text" placeholder="search here..." onChange={ handelChange }/>
     </form>
  </div>
  
  {coins.map(coin => {
    return (

      <Coin
      key={coin.id}
      name={coin.name}
      image={coin.image}
      symbol={coin.symbol}
      price={coin.current_price}
      volume={coin.market_cap} />
    );
    })}
      
    </div>
  );
}

export default App;