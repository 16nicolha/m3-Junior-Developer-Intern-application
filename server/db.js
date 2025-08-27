import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI || "your_connection_string_here";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
