import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Buy.css";

const API_URL = "http://127.0.0.1:5000"; // Update with your backend URL

const Trade = () => {
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState([]); // List of available stocks
  const [quantity, setQuantity] = useState("");
  const [virtualBalance, setVirtualBalance] = useState(null); // Virtual balance state

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch stock symbols from backend using Fetch API
    const fetchSymbols = async () => {
      try {
        const response = await fetch(`${API_URL}/buysell/api/get-latest-symbols`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSymbols(data);
        setSymbol(data[0] || ""); // Set default symbol
      } catch (error) {
        console.error("Error fetching stock symbols:", error);
      }
    };

    const fetchVirtualBalance = async () => {
      try {
        const response = await fetch(`${API_URL}/profile/api/user_profile`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVirtualBalance(data.virtual_balance);
      } catch (error) {
        console.error("Error fetching virtual balance:", error);
      }
    };

    fetchSymbols();
    fetchVirtualBalance();

  }, []);

  const handleTradeSubmit = async (action) => {
    if (!symbol || !quantity) {
      alert("Please select a stock and enter quantity.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/buysell/${action}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ symbol, quantity }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert(error.message || "Trade failed.");
    }
  };

  // Redirect to stock chart page
  const handleViewStockChart = () => {
    if (!symbol) {
      alert("Please select a stock.");
      return;
    }
    navigate(`/stock-chart/${symbol}`); // Navigate to Stock Chart page
  };

  return (
    <div className="trade-container">
      <div className="top-bar">
        <div className="account-info">
        <span><strong>Virtual Balance:</strong> ${virtualBalance !== null ? virtualBalance.toFixed(2) : "Loading..."}</span>

        </div>
      </div>

      <div className="trade-form-container">
        <h2>Tradeverse - Buy & Sell Stocks</h2>
        <form className="trade-form">
          <label>Stock Symbol</label>
          <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
            {symbols.map((sym) => (
              <option key={sym} value={sym}>{sym}</option>
            ))}
          </select>

          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          {/* Buy & Sell Buttons */}
          <button type="button" className="trade-btn buy-btn" onClick={() => handleTradeSubmit("buy")}>
            Buy
          </button>
          <button type="button" className="trade-btn sell-btn" onClick={() => handleTradeSubmit("sell")}>
            Sell
          </button>

          {/* View Stock Chart Button */}
          <button type="button" className="trade-btn chart-btn" onClick={handleViewStockChart}>
            View Stock Chart
          </button>
        </form>
      </div>
    </div>
  );
};

export default Trade;
