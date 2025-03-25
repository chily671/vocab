"use client";
import WordCard from "@/components/WordCard";
import TopicCard from "@/components/TopicCard";
import { useState, useEffect, use } from "react";

export default function TopicDetail({ params }) {
  const { slug } = use(params);
  const [topic, setTopic] = useState(null);
  const [learnedWords, setLearnedWords] = useState([]);

  useEffect(() => {
    async function fetchTopic() {
      const res = await fetch(`/api/topics/${slug}`);
      const data = await res.json();
      setTopic(data?.data);
    }
    fetchTopic();
  }, [slug]);

  if (!topic) return <p className="text-center text-gray-500">Đang tải...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-600">
        {topic.name}
      </h1>

      {/* Các nút thao tác */}
      <div className="flex justify-center gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
          Cài đặt
        </button>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
          Đã học
        </button>
      </div>

      {/* Bảng từ vựng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topic.map((word) => (
          <div key={word?._id} className="p-4 bg-white shadow-lg rounded-lg">
            <WordCard word={word?.word} meaning={word?.meaning} />
          </div>
        ))}
      </div>

      {/* Các topic khác */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-center">
        Các topic khác
      </h2>
      {topic.map((word) => (
          <div key={word?._id} className="p-4 bg-white shadow-lg rounded-lg">
            <TopicCard topic={word?.topic}  />
          </div>
        ))}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* API fetch các topic khác sẽ đặt ở đây */}
      </div>
    </div>
  );
}
