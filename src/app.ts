import express from "express";
import * as process from "node:process";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import QuotesRouter from "./routes/quotes.router";
import YoutubeRouter from "./routes/youtube.router";
import PlaylistRouter from "./routes/playlist.router";
// Create Express server
export const app = express();

app.use(cors({
    origin: "http://localhost:3333",
}));
app.use(express.json());


// connect dataBase
console.log("mongo URI", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ Mongo error:", err));

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use("/api/quotes", QuotesRouter);
app.use("/api/music", YoutubeRouter);
app.use("/api/playlists", PlaylistRouter);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});
