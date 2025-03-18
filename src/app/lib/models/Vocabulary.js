import mongoose from "mongoose";

const VocabularySchema = new mongoose.Schema({
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    example: { type: String },
    pronunciation: { type: String },
    audioUrl: { type: String },
    category: { type: String },
}, { timestamps: true });

export default mongoose.models.Vocabulary || mongoose.model("Vocabulary", VocabularySchema);
