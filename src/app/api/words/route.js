import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
// import from "@/lib/model/...";
import Vocabulary from "@/lib/models/Vocabulary";
import Users from "@/lib/models/users";
import Topics from "@/lib/models/Topics";

export async function GET(req) {
  try {
    await connectDB(); // Kết nối MongoDB
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const searchParams = new URL(req.url).searchParams;
    const date = searchParams.get("date");
    let words;
    // Chuyển đổi ngày thành khoảng thời gian bắt đầu và kết thúc
    const startOfDay = dayjs(date).startOf("day").toDate();
    const endOfDay = dayjs(date).endOf("day").toDate();

    if (date) {
      words = await Vocabulary.find({
        userId,
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      });
    } else {
      words = await Vocabulary.find({ userId });
    }

    return NextResponse.json({ success: true, data: words });
  } catch (error) {
    console.error("❌ Lỗi lấy dữ liệu từ MongoDB:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB(); // Kết nối MongoDB
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const body = await req.json();
    if (!body.word || !body.meaning) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin từ vựng!" },
        { status: 400 }
      );
    }

    let topicId = null;

    // Kiểm tra hoặc thêm topic theo userId
    if (body.topic) {
      const existingTopic = await Topics.findOne({ topic: body.topic, userId });
      if (!existingTopic) {
        const newTopic = await Topics.create({ topic: body.topic, userId });
        topicId = newTopic._id;
      } else {
        topicId = existingTopic._id;
      }
    }

    // Tạo từ vựng mới
    const newWord = await Vocabulary.create({
      userId,
      word: body.word,
      meaning: body.meaning,
      example: body.example || "",
      pronunciation: body.pronunciation || "",
      audioUrl: body.audioUrl || "",
      topicId: topicId, // Lưu topic ID nếu có
      topic: body.topic || null,
    });

    return NextResponse.json({
      success: true,
      data: newWord,
      message: "Thêm từ thành công!",
    });
  } catch (error) {
    console.error("❌ Lỗi khi thêm từ:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    connectDB(); // Kết nối MongoDB

    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, message: "Thiếu ID" });

    const result = await Vocabulary.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "Không tìm thấy từ vựng",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    connectDB(); // Kết nối MongoDB
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { id, word, meaning, topic, example, pronunciation } =
      await req.json();
    console.log({ id, word, meaning, topic });
    if (!id || !word || !meaning || !topic || !example || !pronunciation) {
      return NextResponse.json({
        success: false,
        message: "Thiếu thông tin bắt buộc",
      });
    }

    const result = await Vocabulary.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          word,
          meaning,
          topic,
          meaning,
          example,
          pronunciation,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "Không tìm thấy từ vựng",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật từ vựng:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
