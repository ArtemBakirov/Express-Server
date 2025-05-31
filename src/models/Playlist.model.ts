// models/Playlist.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Playlist extends Document {
    title: string;
    owner: string; // user public key from Bastyon SDK
    songs: {
        videoId: string;
        title: string;
        thumbnail: string;
    }[];
    createdAt: Date;
}

const PlaylistSchema: Schema = new Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
    songs: [
        {
            videoId: String,
            title: String,
            thumbnail: String,
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Playlist>("Playlist", PlaylistSchema);
