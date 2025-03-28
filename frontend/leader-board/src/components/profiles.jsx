import React from 'react';

export default function Profiles({ leaderboard }) {
  if (!leaderboard || leaderboard.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Profit/Loss %</th>
          <th>Net Worth</th>
          <th>Total Trades</th>
          <th>Winning Trades</th>
          <th>Losing Trades</th>
          <th>Last Trade Time</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td style={{ color: user.profit_loss >= 0 ? 'green' : 'red' }}>
              {user.profit_loss.toFixed(2)}%
            </td>
            <td>{user.net_worth.toFixed(2)}</td>
            <td>{user.total_trades}</td>
            <td>{user.winning_trades}</td>
            <td>{user.losing_trades}</td>
            <td>{new Date(user.last_trade_time).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}