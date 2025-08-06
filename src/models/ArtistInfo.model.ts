import mongoose, { Schema, Document } from "mongoose";

export interface ArtistInfo extends Document {
    mame: string;
    info: object;
    lastFetched: Date;
}

const ArtistInfoSchema: Schema = new Schema({
    name: { type: String, required: true },
    info: { type: Object, required: true },
    lastFetched: { type: Date, default: Date.now },
});


export default mongoose.model<ArtistInfo>("ArtistInfo", ArtistInfoSchema);
