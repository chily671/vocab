"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import tiếng Việt
import WordCard from "@/components/WordCard";

dayjs.locale("vi"); // Đặt ngôn ngữ mặc định là tiếng Việt

export default function VocabCalendar() {
  const [date, setDate] = useState(new Date());
  const [words, setWords] = useState([]);
  const formattedDate = dayjs(date).format("YYYY-MM-DD");

  useEffect(() => {
    async function fetchWords() {
      const res = await fetch(`/api/words?date=${formattedDate}`);
      const result = await res.json();
      if (res.ok) {
        setWords(result.data);
      } else {
        setWords([]);
      }
    }
    fetchWords();
  }, [formattedDate]);

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Lịch học từ vựng</h1>
      <Calendar
        onChange={setDate}
        value={date}
        className="border rounded-lg p-2"
        locale="vi"
      />

      {/* Hiển thị từ vựng đã học */}
      <div className="mt-4 w-full max-w-md bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold">
          Từ vựng ngày {dayjs(date).format("DD/MM/YYYY")}
        </h2>
        {words?.length > 0 ? (
          <ul className="mt-2 list-disc list-inside">
            {words.map((word) => (
              <WordCard
                key={word._id}
                word={word.word}
                meaning={word.meaning}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">Chưa có từ vựng nào.</p>
        )}
      </div>
    </div>
  );
}
