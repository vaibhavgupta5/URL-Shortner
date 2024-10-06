import mongoose, { Schema } from "mongoose";

export interface Url extends Document {
    originalUrl: string;
    shortId: string;
    createdAt: Date;
}

const UrlSchema: Schema<Url> = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const UrlModel = mongoose.models.Url || mongoose.model("Url", UrlSchema);
export default UrlModel;