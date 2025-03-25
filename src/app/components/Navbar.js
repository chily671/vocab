"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login"); // "login" hoặc "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { login, isLogin, logout, register, loading } = useAuth();

  function handleOpen(mode) {
    setMode(mode);
    setOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "login") {
      const result = await login(email, password);
      if (result.success) {
        toast.success("Đăng nhập thành công!");
        setOpen(false);
        router.push("/");
      }
    } else {
      const res = await register(email, password, username);
      if (res.success) {
        setOpen(false);
        toast.success("Đăng ký thành công!");
      } else {
        toast.error("Lỗi: " + res.error);
      }
    }
  };
  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-md mb-10">
      {isLogin && (
        <div className="flex space-x-4">
          <Link href="/" className="mr-4">
            Trang Chủ
          </Link>
          <Link href="/words" className="mr-4">
            Từ Vựng
          </Link>
          <Link href="/tests" className="mr-4">
            Bài Test
          </Link>
          <Link href="/check" className="mr-4">
            Tiến độ
          </Link>
          <Link href="/vocal-calendar" className="mr-4">
            Lịch Học
          </Link>
          <Link href="/topics" className="mr-4">
            Chủ Đề Học
          </Link>
        </div>
      )}

      {loading ? (
        <p>Đang tải...</p> // ✅ Có thể thay bằng Skeleton hoặc dấu `...`
      ) : !isLogin ? (
        <div className="flex space-x-4 p-4 justify-center">
          <h1 className="text-2xl font-bold">Vocab App</h1>
          <Button
            variant="outline"
            onClick={() => handleOpen("login")}
            className="mr-3"
          >
            Đăng nhập
          </Button>
          <Button onClick={() => handleOpen("register")} className="mr-3">
            Đăng ký
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogTitle>
                {mode === "login" ? "Đăng nhập" : "Đăng ký"}
              </DialogTitle>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="border p-2 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {mode === "register" && (
                  <input
                    type="text"
                    placeholder="Tên người dùng"
                    className="border p-2 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                )}
                <Button className="bg-blue-500 text-white w-full">
                  {mode === "login" ? "Đăng nhập" : "Đăng ký"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="bg-red-500"
        >
          Đăng xuất
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
