import React, { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:5000/profile/api";

const Profile = () => {
    const [user, setUser] = useState({});
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/user_profile`, { credentials: "include" })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error("Error fetching profile:", error));
    }, []);

    const handleChangePassword = async () => {
        const response = await fetch(`${API_URL}/change_password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
        });
        const data = await response.json();
        alert(data.message || data.error);
    };

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Virtual Balance:</strong> ${user.virtual_balance}</p>

            <h3>Change Password</h3>
            <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default Profile;
