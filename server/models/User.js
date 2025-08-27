import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    clicks: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
