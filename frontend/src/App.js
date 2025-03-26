import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LeaderboardProvider } from './components/leaderboard/store';
import Leaderboard from './components/leaderboard/Leaderboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <LeaderboardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </LeaderboardProvider>
  );
}

export default App;