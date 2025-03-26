import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LeaderboardProvider } from './components/leaderboard/store';
import { TransactionsProvider } from './components/transactions/store';
import Leaderboard from './components/leaderboard/Leaderboard';
import TransactionsPage from './components/transactions/TransactionsPage.jsx';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (

    <LeaderboardProvider>
      <TransactionsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </TransactionsProvider>
    </LeaderboardProvider>

  );
}

export default App;