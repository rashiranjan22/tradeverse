import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link if using React Router
import { signupUser } from "../api"; // Import from api.js

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const data = await signupUser(formData);
            setSuccess(data.message); // Show success message
        } catch (err) {
            setError(err.message); // Show error message
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>

            {/* Add "Go to Login" option */}
            <p>
                Already have an account?{" "}
                <Link to="/login">Log in here</Link>
            </p>
        </div>
    );
};

export default Signup;
