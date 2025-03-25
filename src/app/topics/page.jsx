"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  console.log("🚀 ~ TopicsPage ~ topics:", topics)

  useEffect(() => {
    async function fetchTopics() {
      const res = await fetch("/api/topics");
      const data = await res.json();
      setTopics(data.data);
    }
    fetchTopics();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chọn chủ đề học</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {topics?.map((topic) => (
          <Link
            key={topic._id}
            href={`/topics/${topic?.topic}`}
            className="p-4 border rounded-lg hover:bg-gray-100"
          >
            {topic?.topic}
          </Link>
        ))}
      </div>
    </div>
  );
}
