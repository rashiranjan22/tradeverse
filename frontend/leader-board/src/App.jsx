import React from 'react';
import { LeaderboardProvider } from './store/leaderboard-data-store';
import Board from './components/Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
function App() {
  return (
    <LeaderboardProvider>
      <Board />
    </LeaderboardProvider>
  );
}

export default App;

