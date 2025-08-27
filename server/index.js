import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();
const app = express();
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

// Firebase Admin initialization
if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.applicationDefault() });
}

// Middleware to verify token
async function verifyFirebaseToken(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return res.status(401).json({ error: "Missing token" });
    try {
        req.user = await admin.auth().verifyIdToken(match[1]);
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
}

// Public route
app.get("/public", (req, res) => {
    res.json({ message: "Hello from backend" });
});

// Protected route
app.get("/whoami", verifyFirebaseToken, (req, res) => {
    const { uid, email } = req.user;
    res.json({ uid, email });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
