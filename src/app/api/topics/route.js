import Vocabulary from "@/lib/models/Vocabulary";
import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

async function authenticate(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return { error: "Unauthorized", status: 401 };
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { userId: decoded.userId };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

export async function GET(req) {
  try {
    const auth = await authenticate(req);
    console.log("🚀 ~ GET ~ auth:", auth);
    if (auth.error)
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status }
      );

    connectDB();

    // const searchParams = new URL(req.url).searchParams;
    // const slug = searchParams.get("slug");

    const query = { userId: auth.userId };
    const words = await Vocabulary.find(query);

    return NextResponse.json({ success: true, data: words });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
