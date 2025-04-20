import { NextResponse } from "next/server";
import Groups from "@/lib/models/Groups";
import { connectDB } from "@/lib/mongodb"; // Nhớ tạo hàm kết nối MongoDB nếu chưa có

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, description, isPublic } = body;

    // Giả sử userId có sẵn (từ middleware xác thực, session, hoặc hardcoded tạm)
    const userId = "6622b354f490b82d9cf3a8d1"; // TODO: thay bằng auth thực tế

    const newGroup = await Groups.create({
      name,
      description,
      isPublic,
      owner: userId,
      members: [userId]
    });

    return NextResponse.json({ success: true, group: newGroup });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();

    const groups = await Groups.find().populate("owner", "name").populate("members", "name");

    return NextResponse.json({ success: true, groups });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch groups" }, { status: 500 });
  }
}
