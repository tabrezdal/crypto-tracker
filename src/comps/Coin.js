import React from 'react'
import '../styles/Coin.css'

const coin = ({ image, name, symbol, price, volume, priceChange, market_cap }) => {
  return (
    <div className="coin-container">
        <div className="coin-row">
            <div class="coin">
                <img src={image} alt='cypto currency' />
                <h1> {name} </h1>
                <p className='coin-symbol'> {symbol} </p>
            </div>
            <div className='coin-data'>
                <p className='coin-price'>₹{price} </p>
                <p className='coin-volume'>₹{volume.toLocaleString()} </p>
                {priceChange < 0 ? (
                    <p className='coin-percent red'> { priceChange.toFixed(2) }%</p>
                ) : (
                    <p className='coin-percent green'> { priceChange.toFixed(2) }%</p>
                )}
                 <p className='coin-market_cap'>₹{market_cap} </p>
            </div>
        </div>
    </div>
  )
}

export default coin