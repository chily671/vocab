"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AddWordPopup({ onWordAdded }) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ word, meaning, example, pronunciation, category }),
    });

    if (res.ok) {
      onWordAdded(); // Cập nhật danh sách
      setOpen(false); // Tắt popup
      setWord("");
      setMeaning("");
      setExample("");
      setPronunciation("");
      setCategory("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          + Thêm từ mới
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Thêm từ vựng</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="word" className="font-bold">
              Từ vựng
            </label>
            <input
              type="text"
              id="word"
              placeholder="Từ vựng"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="meaning" className="font-bold">
              Nghĩa
            </label>
            <input
              type="text"
              id="meaning"
              placeholder="Nghĩa"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="example" className="font-bold">
              Ví dụ
            </label>
            <input
              type="text"
              id="example"
              placeholder="Ví dụ"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pronunciation" className="font-bold">
              Phát âm
            </label>
            <input
              type="text"
              id="pronunciation"
              placeholder="Phát âm"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="font-bold">
              Danh mục
            </label>
            <input
              type="text"
              id="category"
              placeholder="Danh mục"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Lưu
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
