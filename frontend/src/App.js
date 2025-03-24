import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import Landing from "./components/Landing.js";
import Buy from "./components/Buy.js"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/buy" element={<Buy />} /> 
      </Routes>
    </Router>
  );
}

export default App;
