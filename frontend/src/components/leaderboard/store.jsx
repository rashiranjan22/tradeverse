import { createContext, useEffect, useState } from 'react';
import { fetchLeaderboard } from '../../api';

export const LeaderboardContext = createContext();

export function LeaderboardProvider({ children }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboardData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error loading leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <LeaderboardContext.Provider value={{ data: leaderboardData, loading, error }}>
      {children}
    </LeaderboardContext.Provider>
  );
}