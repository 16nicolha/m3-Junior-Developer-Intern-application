import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { user } = useAuth();
    const [clicks, setClicks] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClicks = async () => {
            if (!user) return;
            const docRef = doc(db, "userClicks", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) setClicks(docSnap.data().clickCount);
            else {
                await setDoc(docRef, { clickCount: 0 });
                setClicks(0);
            }
        };
        fetchClicks();
    }, [user]);

    const handleClick = async () => {
        if (!user) return alert("Login first!");
        const docRef = doc(db, "userClicks", user.uid);
        try {
            await updateDoc(docRef, { clickCount: increment(1) });
        } catch {
            await setDoc(docRef, { clickCount: 1 });
        }
        setClicks((prev) => prev + 1);
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px", backgroundColor: "white", color: "black", minHeight: "100vh" }}>
            <h1>Welcome {user?.email || "Guest"}</h1>
            {user && (
                <>
                    <p>Total clicks: {clicks}</p>
                    <button onClick={handleClick} style={{ marginRight: "10px" }}>Click Me!</button>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
}
