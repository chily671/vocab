import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Vocabulary from "@/lib/models/Vocabulary";

export async function GET() {
  try {
    connectDB();

    // Lấy ngẫu nhiên 1 từ vựng
    const randomWord = await Vocabulary.aggregate([{ $sample: { size: 1 } }]);

    if (!randomWord.length) {
      return NextResponse.json({
        success: false,
        message: "Không có từ vựng nào",
      });
    }

    // Chỉ gửi nghĩa của từ vựng
    return NextResponse.json({
      success: true,
      data: { meaning: randomWord[0].meaning, answer: randomWord[0].word },
    });
  } catch (error) {
    console.error("❌ Lỗi lấy dữ liệu từ MongoDB:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
