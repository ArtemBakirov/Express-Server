import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url: String,
    authorName: String,
    authorProfile: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Image", imageSchema);
