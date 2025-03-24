import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";



const Signup = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/auth/signup", user);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div class='trade-page'>
    <div className="container">
      <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <a href="/Login">Login</a></p>
    </div>
    </div>
  );
};

export default Signup;