import React, { useState } from "react";
import "./Buy.css"; // Import the CSS file

const Trade = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState("Buy");

  // Define stock prices
  const stockPrices = {
    AAPL: 175.23,
    TSLA: 265.42,
    GOOGL: 135.76,
  };

  // Calculate total price
  const totalPrice = (quantity * stockPrices[symbol]).toFixed(2);

  const handleTradeSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed: ${action} ${quantity} shares of ${symbol} for $${totalPrice}`);
  };

  return (
    <div className="trade-container">
      {/* Top Bar with Account Info */}
      <div className="top-bar">
        <div className="account-info">
          <span><strong>Account Value:</strong> $100,000.00</span>
          <span><strong>Buying Power:</strong> $100,000.00</span>
          <span><strong>Cash:</strong> $100,000.00</span>
        </div>
      </div>

      {/* Trading Form */}
      <div className="trade-form-container">
        <h2>Tradeverse - Buy & Sell Stocks</h2>
        <form onSubmit={handleTradeSubmit} className="trade-form">
          {/* Stock Symbol */}
          <label>Stock Symbol</label>
          <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
            <option value="AAPL">AAPL (Apple) - ${stockPrices.AAPL}</option>
            <option value="TSLA">TSLA (Tesla) - ${stockPrices.TSLA}</option>
            <option value="GOOGL">GOOGL (Google) - ${stockPrices.GOOGL}</option>
          </select>

          {/* Quantity */}
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            required
          />

          {/* Total Price */}
          <p className="total-price"><strong>Total Price:</strong> ${totalPrice}</p>

          {/* Buttons */}
          <button 
            type="submit" 
            className="trade-btn buy-btn"
            onClick={() => setAction("Buy")}
          >
            Buy
          </button>

          <button 
            type="submit" 
            className="trade-btn sell-btn"
            onClick={() => setAction("Sell")}
          >
            Sell
          </button>
        </form>
      </div>
    </div>
  );
};

export default Trade;
