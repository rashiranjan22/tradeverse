import React, { useState } from "react";
import "./Buy.css"; // Import the CSS file

const Trade = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [quantity, setQuantity] = useState("");
  const [action, setAction] = useState("Buy");
  const [orderType, setOrderType] = useState("Market");
  const [duration, setDuration] = useState("Day Only");

  const handleTradeSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed: ${action} ${quantity} shares of ${symbol}`);
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
        {/* <div className="market-status">
          ✅ Market is open. Closes in 3hr, 36min
        </div> */}
      </div>

      {/* Trading Form */}
      <div className="trade-form-container">
        <h2>Tradeverse - Buy & Sell Stocks</h2>
        <form onSubmit={handleTradeSubmit} className="trade-form">
          {/* Symbol Input */}
          <label>Stock Symbol</label>
          <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
            <option value="AAPL">AAPL (Apple)</option>
            <option value="TSLA">TSLA (Tesla)</option>
            <option value="GOOGL">GOOGL (Google)</option>
          </select>

          {/* Quantity */}
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          {/* Action (Buy/Sell) */}
          {/* <label>Action</label> */}
          {/* <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option> */}
          {/* </select> */}

          {/* Order Type */}
          {/* <label>Order Type</label>
          <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
            <option value="Market">Market</option>
            <option value="Limit">Limit</option>
          </select> */}

          {/* Duration */}
          {/* <label>Duration</label>
          <select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value="Day Only">Day Only</option>
            <option value="Good Till Canceled">Good Till Canceled</option>
          </select> */}

          {/* Buttons */}
          <button type="submit" className="trade-btn buy-btn">Buy</button>
          <button type="submit" className="trade-btn sell-btn">Sell</button>
        </form>
      </div>
    </div>
  );
};

export default Trade;
