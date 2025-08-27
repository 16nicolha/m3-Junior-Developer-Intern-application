const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json"); // download from Firebase console
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Public route
app.get("/public", (req, res) => {
    res.json({ message: "Hello, world! Anyone can see this." });
});

// Protected route
app.get("/whoami", async (req, res) => {
    const authHeader = req.headers.authorization || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return res.status(401).json({ error: "Missing token" });

    const idToken = match[1];
    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        res.json({ uid: decoded.uid, email: decoded.email });
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

