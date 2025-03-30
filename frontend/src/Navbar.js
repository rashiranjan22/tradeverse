import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
