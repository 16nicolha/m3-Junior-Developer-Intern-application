import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// --------------------
// Sign up
// --------------------
router.post("/Signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, passwordHash });
        res.status(201).json({ message: "User created", userId: newUser._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --------------------
// Login
// --------------------
router.post("/Login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) return res.status(400).json({ error: "Invalid password" });

        res.json({ message: "Login successful", userId: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --------------------
// Get click count (optional)
// --------------------
router.get("/:id/clicks", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ clicks: user.clicks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
