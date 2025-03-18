import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth"; // ✅ Import hàm verifyToken

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ Await cookies() trước khi dùng
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi xác thực" }, { status: 500 });
  }
}
