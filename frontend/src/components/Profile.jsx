import React, { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:5000";

const Profile = () => {
    const [user, setUser] = useState({});
    const [portfolio, setPortfolio] = useState([]); // State to store holdings
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        // Fetch user profile
        fetch(`${API_URL}/profile/api/user_profile`, { credentials: "include" })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error("Error fetching profile:", error));

        // Fetch portfolio holdings
        fetch(`${API_URL}/buysell/portfolio`, { credentials: "include" })
            .then(response => response.json())
            .then(data => setPortfolio(data)) 
            .catch(error => console.error("Error fetching portfolio:", error));
    }, []);

    const handleChangePassword = async () => {
        const response = await fetch(`${API_URL}/profile/api/change_password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
        });
        const data = await response.json();
        alert(data.message || data.error);
    };

    return (
        <div className="container">
            <h2>User Profile</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Virtual Balance:</strong> ${user.virtual_balance}</p>

            <h3>Portfolio Holdings</h3>
            {portfolio.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Quantity</th>
                            <th>Average Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map((holding, index) => (
                            <tr key={index}>
                                <td>{holding.symbol}</td>
                                <td>{holding.quantity}</td>
                                <td>${holding.average_price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No holdings available.</p>
            )}

            <h3>Change Password</h3>
            <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default Profile;
