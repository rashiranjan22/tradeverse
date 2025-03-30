import React from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000"; // Update with your backend URL

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      const data = await response.json();
      alert(data.message);
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      alert("Error logging out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Tradeverse</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/transactions">My Transactions</Link></li>
        <li><Link to="/buy">Buy/Sell</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
