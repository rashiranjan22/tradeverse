import React, { useContext } from 'react';
import Profiles from './Profiles';
import { LeaderboardContext } from '../store/leaderboard-data-store';
import Heading from './heading';

export default function Board() {
  const leaderboardData = useContext(LeaderboardContext); // Get data from context

  return (
    <div className="board">
      <Heading/>

      <Profiles leaderboard={sortByNetWorth(leaderboardData)} />
    </div>
  );
}

function sortByNetWorth(data) {
  if (!data || data.length === 0) return [];
  
  // Sort by net worth in descending order
  return data.sort((a, b) => b.net_worth - a.net_worth);
}