"use client";

import { useState } from "react";

export default function AddWordPage() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("🚀 ~ handleSubmit ~ token:", token)
    const res = await fetch("/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        word,
        meaning,
        example,
        pronunciation,
        audioUrl,
        category,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("✅ Thêm từ vựng thành công!");
      setWord("");
      setMeaning("");
      setExample("");
      setPronunciation("");
      setAudioUrl("");
      setCategory("");
    } else {
      setMessage("❌ Lỗi: " + data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-amber-600 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Thêm Từ Vựng</h2>
      {message && <p className="mb-3 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Từ vựng"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Nghĩa"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Ví dụ"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Phát âm"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Audio URL"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Danh mục"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Thêm
        </button>
      </form>
    </div>
  );
}
