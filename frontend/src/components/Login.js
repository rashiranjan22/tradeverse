import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
const API_URL = "http://127.0.0.1:5000";  // Remove `/auth/api`


export const checkSession = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/api/check_session`, {
            method: "GET",
            credentials: 'include',  // REQUIRED for cookies
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Session check failed");
        }
        return data;
    } catch (error) {
        console.error("Session check error:", error);
        throw error;
    }
};

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            const response = await loginUser(formData);
            alert(`Welcome, ${response.user.username}!`);
            
            // After login, verify the session immediately
            const session = await checkSession();
            console.log("Session verified:", session);
            
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;