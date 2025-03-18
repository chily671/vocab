import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Thiếu email hoặc mật khẩu" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("English");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { success: false, error: "Sai email hoặc mật khẩu" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const response = NextResponse.json({
      success: true,
      message: "Đăng nhập thành công!",
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
