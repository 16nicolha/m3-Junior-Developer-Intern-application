import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const linkStyle = {
    color: "white",
    textDecoration: "none", // removes underline
};

function App() {
    return (
        <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
            <nav style={{ padding: "10px", display: "flex", gap: "10px" }}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/login" style={linkStyle}>Login</Link>
                <Link to="/signup" style={linkStyle}>Sign Up</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
