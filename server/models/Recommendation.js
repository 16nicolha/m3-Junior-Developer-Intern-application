import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
    tier: { type: String, required: true },       // e.g., cozy, uneasy, terrifying
    type: { type: String, required: true },       // movie, book, podcast, game
    title: { type: String, required: true },
    blurb: String,
    links: { type: Map, of: String },             // optional URLs to content
});

export default mongoose.model("Recommendation", recommendationSchema);
