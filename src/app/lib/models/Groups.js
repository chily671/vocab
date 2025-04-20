import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên nhóm
    description: { type: String }, // Mô tả nhóm (nếu có)
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Người tạo nhóm
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        }, // Vai trò trong nhóm
        joinedAt: { type: Date, default: Date.now },
      },
    ], // Danh sách thành viên
    vocabularyList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vocabulary",
      },
    ], // Từ vựng của nhóm
    requests: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ], // Lời mời tham gia nhóm
  },
  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
