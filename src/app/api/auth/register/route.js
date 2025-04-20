import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    connectDB(); // Kết nối MongoDB

    const { email, password, username } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Thiếu email hoặc mật khẩu" },
        { status: 400 }
      );
    }
    console.log("🚀 ~ POST ~ password:", password)
    console.log("🚀 ~ POST ~ email:", email)

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email đã tồn tại" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username: username || email.split("@")[0], // Nếu không có username, dùng email trước dấu @
      email,
      password: hashedPassword,
    };

    const result = await User.insertOne(newUser);
    return NextResponse.json({
      success: true,
      message: "Đăng ký thành công!",
      data: newUser, // Không có `result.ops[0]` vì MongoDB driver mới không trả về `ops`
      token: jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      ),
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
