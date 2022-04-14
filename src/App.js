import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './comps/Coin';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM44G81Hdmt6NXyOtoTDQ_XvGQzAUZJP0",
  authDomain: "crypto-tracker-5a3c1.firebaseapp.com",
  projectId: "crypto-tracker-5a3c1",
  storageBucket: "crypto-tracker-5a3c1.appspot.com",
  messagingSenderId: "511670475099",
  appId: "1:511670475099:web:85987d3888d9c95ceda27e",
  measurementId: "G-2LLWNG5P49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    }).catch(error => console.log(error));
  },[]);


  const handelChange = e =>{
    setSearch(e.target.value);
    const filteredCoins = coins.filter(coin => 
      coin.name.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
  )
  setCoins(filteredCoins)
}


  return (
    <div className="coin-app">
    <div className="coin-search">
      <h1 className="coin-text">
          TEZ Crypto Tracker
      </h1>
      <form>
         <input className='coin-input' type="text" placeholder="search here..." onChange={ handelChange }/>
     </form>
  </div>
  <div className='coins-container'>
  
  {coins.map(coin => {
    return (
      <Coin
      key={coin.id}
      name={coin.name}
      image={coin.image}
      symbol={coin.symbol}
      price={coin.current_price}
      volume={coin.total_volume} 
      priceChange={coin.price_change_percentage_24h}
      market_cap={coin.market_cap}  />
    );
    })}
      
    </div>
    </div>
  );
}

export default App;