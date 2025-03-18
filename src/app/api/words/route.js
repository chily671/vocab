import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const client = await clientPromise;
    const db = client.db("English");

    const searchParams = new URL(req.url).searchParams;
    const date = searchParams.get("date");
    let words;
    // Chuyển đổi ngày thành khoảng thời gian bắt đầu và kết thúc
    const startOfDay = dayjs(date).startOf("day").toDate();
    const endOfDay = dayjs(date).endOf("day").toDate();

    if (date) {
      words = await db
        .collection("vocabularies")
        .find({ userId, createdAt: { $gte: startOfDay, $lt: endOfDay } })
        .toArray();
    } else {
      words = await db.collection("vocabularies").find({ userId }).toArray();
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
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const client = await clientPromise;
    const db = client.db("English");

    const body = await req.json();
    console.log("🚀 ~ POST ~ body:", body);
    if (!body.word || !body.meaning) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin từ vựng!" },
        { status: 400 }
      );
    }

    const newWord = {
      userId: userId,
      word: body.word,
      meaning: body.meaning,
      example: body.example || "",
      pronunciation: body.pronunciation || "",
      audioUrl: body.audioUrl || "",
      category: body.category || "uncategorized",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("vocabularies").insertOne(newWord);

    return NextResponse.json({ success: true, data: result });
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
    const client = await clientPromise;
    const db = client.db("English");

    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, message: "Thiếu ID" });

    const result = await db
      .collection("vocabularies")
      .deleteOne({ _id: new ObjectId(id) });

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
    const client = await clientPromise;
    const db = client.db("English");

    const { id, word, meaning, category, example, pronunciation } =
      await req.json();
    console.log({ id, word, meaning, category });
    if (!id || !word || !meaning || !category || !example || !pronunciation) {
      return NextResponse.json({
        success: false,
        message: "Thiếu thông tin bắt buộc",
      });
    }

    const result = await db.collection("vocabularies").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          word,
          meaning,
          category,
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
