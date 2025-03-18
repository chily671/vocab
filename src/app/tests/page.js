"use client";

import { useState, useEffect } from "react";

export default function TestPage() {
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  async function fetchQuestion() {
    setShowAnswer(false);
    const res = await fetch("/api/random-word");
    const data = await res.json();
    if (data.success) {
      setQuestion(data.data);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Bài Test Từ Vựng</h2>
        {question ? (
          <>
            <p className="text-lg mb-4">💡 Nghĩa: <strong>{question.meaning}</strong></p>
            {!showAnswer ? (
              <button onClick={() => setShowAnswer(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Hiển thị đáp án
              </button>
            ) : (
              <p className="mt-4 text-lg font-bold text-green-500">Đáp án: {question.answer}</p>
            )}
            <button onClick={fetchQuestion} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
              Từ khác
            </button>
          </>
        ) : (
          <p>Đang tải câu hỏi...</p>
        )}
      </div>
    </div>
  );
}
