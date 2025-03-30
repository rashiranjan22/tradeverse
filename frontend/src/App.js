import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LeaderboardProvider } from './components/leaderboard/store';
import { TransactionsProvider } from './components/transactions/store';
import Leaderboard from './components/leaderboard/Leaderboard';
import TransactionsPage from './components/transactions/TransactionsPage.jsx';
import PortfolioProgress from "./components/PortfolioProgress";


import Profile from './components/Profile';
import './App.css';
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import Landing from "./components/Landing.js";
// import Dashboard from "./components/Dashboard.js";
import Buy from "./components/Buy.js"; 
import StockChart from "./components/StockChart.js";

function App() {
  return (
    <LeaderboardProvider>
      <TransactionsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/progress" element={<PortfolioProgress />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/buy" element={<Buy />} /> {/* Add Buy Page */}
          <Route path="/stock-chart/:symbol" element={<StockChart />} />

          </Routes>
        </Router>
      </TransactionsProvider>
    </LeaderboardProvider>

  );
}

export default App;