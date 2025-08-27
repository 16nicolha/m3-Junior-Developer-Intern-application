import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/"); // go to Home after login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ backgroundColor: "white", color: "black", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>
                <h2>Login</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: "10px" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: "10px" }}
                />
                <button type="submit" style={{ padding: "10px", backgroundColor: "black", color: "white", border: "none" }}>
                    Login
                </button>
            </form>
        </div>
    );
}
