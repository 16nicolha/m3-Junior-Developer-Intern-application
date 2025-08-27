import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
    const { user } = useAuth();
    const [clicks, setClicks] = useState(0);
    const db = getFirestore();

    useEffect(() => {
        const fetchClicks = async () => {
            if (user) {
                const docRef = doc(db, "userClicks", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setClicks(docSnap.data().clickCount);
                } else {
                    setClicks(0);
                }
            }
        };
        fetchClicks();
    }, [user, db]);

    if (!user) return <p style={{ textAlign: "center", marginTop: "50px" }}>Please log in to view your profile.</p>;

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>{user.email}'s Profile</h2>
            <p>Your personal dashboard:</p>
            <p><strong>Total button clicks:</strong> {clicks}</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}
