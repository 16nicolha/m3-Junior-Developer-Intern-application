import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>Ghastly</h2>
            <div>
                <Link to="/login" style={styles.link}>Login</Link>
                <Link to="/signup" style={styles.link}>Signup</Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        backgroundColor: "#111",
        color: "#fff",
    },
    logo: {
        margin: 0,
    },
    link: {
        marginLeft: "1rem",
        color: "#fff",
        textDecoration: "none",
    },
};

export default Navbar;
