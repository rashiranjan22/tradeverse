import { createContext } from 'react';
import React from "react";

export const LeaderboardContext = createContext();

export const leaderboardData = [
  {
    id: 1,
    username: 'Player1',
    profit_loss: 12.45, // Profit or Loss in %
    net_worth: 15000, // Portfolio balance
    total_trades: 45,
    winning_trades: 30,
    losing_trades: 15,
    last_trade_time: '2025-03-15T14:30:00Z',
  },
  {
    id: 2,
    username: 'Player2',
    profit_loss: -5.32,
    net_worth: 12000,
    total_trades: 30,
    winning_trades: 18,
    losing_trades: 12,
    last_trade_time: '2025-03-14T12:45:00Z',
  },
  {
    id: 3,
    username: 'Player3',
    profit_loss: 8.20,
    net_worth: 17000,
    total_trades: 50,
    winning_trades: 35,
    losing_trades: 15,
    last_trade_time: '2025-03-16T09:20:00Z',
  },
  {
    id: 1,
    username: 'Player1',
    profit_loss: 12.45, // Profit or Loss in %
    net_worth: 15000, // Portfolio balance
    total_trades: 45,
    winning_trades: 30,
    losing_trades: 15,
    last_trade_time: '2025-03-15T14:30:00Z',
  },
  {
    id: 1,
    username: 'Player1',
    profit_loss: 12.45, // Profit or Loss in %
    net_worth: 15000, // Portfolio balance
    total_trades: 45,
    winning_trades: 30,
    losing_trades: 15,
    last_trade_time: '2025-03-15T14:30:00Z',
  },
  {
    id: 1,
    username: 'Player1',
    profit_loss: 12.45, // Profit or Loss in %
    net_worth: 15000, // Portfolio balance
    total_trades: 45,
    winning_trades: 30,
    losing_trades: 15,
    last_trade_time: '2025-03-15T14:30:00Z',
  },
  {
    id: 1,
    username: 'Player1',
    profit_loss: 12.45, // Profit or Loss in %
    net_worth: 15000, // Portfolio balance
    total_trades: 45,
    winning_trades: 30,
    losing_trades: 15,
    last_trade_time: '2025-03-15T14:30:00Z',
  },
  {
    id: 1,
    username: 'Player1',
    profit_loss: 12.45, // Profit or Loss in %
    net_worth: 15000, // Portfolio balance
    total_trades: 45,
    winning_trades: 30,
    losing_trades: 15,
    last_trade_time: '2025-03-15T14:30:00Z',
  },
  {
    id: 1,
    username: 'Player1',
    profit_loss: 12.45, // Profit or Loss in %
    net_worth: 15000, // Portfolio balance
    total_trades: 45,
    winning_trades: 30,
    losing_trades: 15,
    last_trade_time: '2025-03-15T14:30:00Z',
  },
  {
    id: 2,
    username: 'Player2',
    profit_loss: -5.32,
    net_worth: 12000,
    total_trades: 30,
    winning_trades: 18,
    losing_trades: 12,
    last_trade_time: '2025-03-14T12:45:00Z',
  },
  {
    id: 2,
    username: 'Player2',
    profit_loss: -5.32,
    net_worth: 12000,
    total_trades: 30,
    winning_trades: 18,
    losing_trades: 12,
    last_trade_time: '2025-03-14T12:45:00Z',
  },
  {
    id: 2,
    username: 'Player2',
    profit_loss: -5.32,
    net_worth: 111000,
    total_trades: 30,
    winning_trades: 18,
    losing_trades: 12,
    last_trade_time: '2025-03-14T12:45:00Z',
  },
  {
    id: 2,
    username: 'Player2',
    profit_loss: -5.32,
    net_worth: 21000,
    total_trades: 30,
    winning_trades: 18,
    losing_trades: 12,
    last_trade_time: '2025-03-14T12:45:00Z',
  },
  {
    id: 1,
    username: 'Player1',
    profit_loss: 12.45, // Profit or Loss in %
    net_worth: 15000, // Portfolio balance
    total_trades: 45,
    winning_trades: 30,
    losing_trades: 15,
    last_trade_time: '2025-03-15T14:30:00Z',
  },
];

export function LeaderboardProvider({ children }) {
  return (
    <LeaderboardContext.Provider value={leaderboardData}>
      {children}
    </LeaderboardContext.Provider>
  );
}


/*import { createContext, useEffect, useState } from "react";
import axios from "axios";

const LeaderboardContext = createContext({});

const LeaderboardContextProvider = ({ children }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Fetch data from Flask backend
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/leaderboard");
        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []); // Empty dependency to run only once on component mount

  return (
    <LeaderboardContext.Provider value={leaderboardData}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export default LeaderboardContextProvider;
export { LeaderboardContext };

*/



// In your leaderboard-data-store.js (or equivalent)
import { fetchLeaderboard } from 'frontend\\src\\api';  // Adjust path as needed


const LeaderboardProvider = ({ children }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLeaderboard = async () => {
            try {
                const data = await fetchLeaderboard();
                setLeaderboardData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        loadLeaderboard();
    }, []);

    return (
        <LeaderboardContext.Provider value={{ leaderboardData, loading, error }}>
            {children}
        </LeaderboardContext.Provider>
    );
};