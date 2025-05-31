import mongoose from "mongoose";

export type Quote = {
    q: string;
    a: string;
    h: string;
};

const quoteSchema = new mongoose.Schema({
    q: { type: String, required: true },
    a: { type: String, required: true },
    h: { type: String, required: true },
});

export default mongoose.model("Quote", quoteSchema);
