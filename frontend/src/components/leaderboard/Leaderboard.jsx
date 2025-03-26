import React from 'react';
import { LeaderboardContext } from './store';
import './styles.css';

const Leaderboard = () => {
  const { data, loading, error } = React.useContext(LeaderboardContext);

  if (loading) {
    return <div className="loading">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <h1 className="heading">Trading Leaderboard</h1>
      <div className="leaderboard">
        <div className="leaderboard-header">
          <div>Rank</div>
          <div>Username</div>
          <div>Virtual Balance</div>
        </div>
        {data.map((entry) => (
          <div key={`${entry.rank}-${entry.username}`} className="leaderboard-row">
            <div>{entry.rank}</div>
            <div>{entry.username}</div>
            <div>${entry.virtual_balance.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;