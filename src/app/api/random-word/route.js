import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("English"); // Đổi tên DB nếu cần
    const collection = db.collection("vocabularies"); // Đổi collection nếu cần

    // Lấy ngẫu nhiên 1 từ vựng
    const randomWord = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();

    if (!randomWord.length) {
      return NextResponse.json({ success: false, message: "Không có từ vựng nào" });
    }

    // Chỉ gửi nghĩa của từ vựng
    return NextResponse.json({
      success: true,
      data: { meaning: randomWord[0].meaning, answer: randomWord[0].word },
    });
  } catch (error) {
    console.error("❌ Lỗi lấy dữ liệu từ MongoDB:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
