"use client";
import { useState, useEffect } from "react";
import TopicCard from "@/components/TopicCard";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchTopics() {
      const res = await fetch("/api/topics");
      const data = await res.json();
      setTopics(data.data);
    }
    fetchTopics();
  }, []);

  const filteredTopics = topics.filter((topic) =>
    topic?.topic?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Chọn chủ đề học</h1>

      {/* 🔍 Thanh tìm kiếm với nút X xoá */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Tìm chủ đề..."
          className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-xl"
          >
            ×
          </button>
        )}
      </div>

      {/* 🧩 Danh sách chủ đề căn giữa đẹp hơn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full justify-items-center">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, index) => (
            <TopicCard key={topic?._id} index={index} topic={topic?.topic} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy chủ đề nào.
          </p>
        )}
      </div>
    </div>
  );
}
