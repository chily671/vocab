import mongoose from "mongoose";

const VocabularySchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    example: { type: String },
    pronunciation: { type: String },
    audioUrl: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Liên kết user
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    }, // ID của chủ đề
    topic: {
      type: String,
      required: true,
    }, // Tên chủ đề
    learned: { type: Boolean, default: false }, // Trạng thái đã học
  },
  { timestamps: true }
);

export default mongoose.models.Vocabulary ||
  mongoose.model("Vocabulary", VocabularySchema);
