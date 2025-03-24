import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/auth/login", user);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div class='trade-page'>
    <div className="container">
        <h1>Login</h1>
        <form method="POST" action="{{ url_for('auth.login') }}">
            {/* <label for="username">Username:</label> */}
            <input name="username" placeholder="Username" onChange={handleChange} required/> 
            {/* <input type="text" id="username" name="username" required/> */}
            
            {/* <label for="password">Password:</label> */}
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required/>
            {/* <input type="password" id="password" name="password" required/> */}
            
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/Signup">Sign Up</a></p>

    </div>
    </div>
    

  );
};

export default Login;