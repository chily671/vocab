import { NextResponse } from "next/server";
import mongoose from "mongoose";
import formidable from "formidable";
import * as XLSX from "xlsx";
import Vocabulary from "@/lib/models/Vocabulary";
import { connectDB } from "@/lib/mongodb"; // Kết nối MongoDB

export const config = {
  api: {
    bodyParser: false, // Bắt buộc để dùng formidable
  },
};

export async function POST(req) {
  await connectDB(); // Kết nối MongoDB

  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return resolve(
          NextResponse.json({ success: false, message: "Lỗi tải file" })
        );
      }

      // Lấy file đầu tiên từ danh sách files
      const file = files.file[0]; 
      if (!file) {
        return resolve(
          NextResponse.json({ success: false, message: "Không có file được upload" })
        );
      }

      try {
        // Đọc file Excel
        const workbook = XLSX.readFile(file.filepath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Chuyển sheet thành JSON
        const data = XLSX.utils.sheet_to_json(sheet);

        // Chuyển đổi dữ liệu thành format MongoDB
        const vocabList = data.map((row) => ({
          word: row.word || row["Từ vựng"], // Cột "word" hoặc "Từ vựng" trong Excel
          meaning: row.meaning || row["Nghĩa"],
          example: row.example || row["Ví dụ"],
          pronunciation: row.pronunciation || row["Phát âm"],
          audioUrl: row.audioUrl || row["Audio"],
          userId: new mongoose.Types.ObjectId(row.userId),
          topicId: row.topicId ? new mongoose.Types.ObjectId(row.topicId) : null,
          topic: row.topic || "Chưa có chủ đề",
        }));

        // Lưu vào MongoDB
        await Vocabulary.insertMany(vocabList);

        return resolve(
          NextResponse.json({ success: true, message: "Nhập từ vựng thành công!" })
        );
      } catch (error) {
        return resolve(
          NextResponse.json({ success: false, message: "Lỗi xử lý file", error })
        );
      }
    });
  });
}
