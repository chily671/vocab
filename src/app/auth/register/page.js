"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  console.log("🚀 ~ Register ~ email:", email);
  const [password, setPassword] = useState("");
  console.log("🚀 ~ Register ~ password:", password);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log("🚀 ~ handleSubmit ~ res:", res);
    if (res.ok) {
      const data = await res.json();
      console.log("🚀 ~ handleSubmit ~ data:", data);
      localStorage.setItem("token", data.token);
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-lg"
      >
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Đăng ký
        </button>
      </form>
    </div>
  );
}
