const leaderboardData = [
  { name: "Andrew", networth: 12000, totalTrades: 50, winningTrades: 30, losingTrades: 20 },
  { name: "Sam", networth: 15000, totalTrades: 60, winningTrades: 35, losingTrades: 25 },
  { name: "Nick", networth: 11000, totalTrades: 40, winningTrades: 25, losingTrades: 15 },
  { name: "Catherine", networth: 18000, totalTrades: 70, winningTrades: 45, losingTrades: 25 },
  { name: "Layla", networth: 10000, totalTrades: 30, winningTrades: 20, losingTrades: 10 }
];

function loadLeaderboard() {
  const profilesContainer = document.getElementById("profiles");
  profilesContainer.innerHTML = "";

  leaderboardData
    .sort((a, b) => b.networth - a.networth) // Sort by Networth (highest to lowest)
    .forEach((player, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.networth}</td>
        <td>${player.totalTrades}</td>
        <td>${player.winningTrades}</td>
        <td>${player.losingTrades}</td>
      `;
      profilesContainer.appendChild(row);
    });
}

loadLeaderboard(); // Load leaderboard on page load
