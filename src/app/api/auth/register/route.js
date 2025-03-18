import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("English");

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Thiếu email hoặc mật khẩu" },
        { status: 400 }
      );
    }

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email đã tồn tại" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);
    return NextResponse.json({
      success: true,
      message: "Đăng ký thành công!",
      data: newUser, // Không có `result.ops[0]` vì MongoDB driver mới không trả về `ops`
      token: jwt.sign({ userId: newUser._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      }),
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
