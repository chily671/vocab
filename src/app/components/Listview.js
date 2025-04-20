"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const vocabData = [
  {
    word: "Apple",
    meaning: "Quả táo",
    pronunciation: "/ˈæp.l̩/",
    example: "I eat an apple every day.",
  },
  {
    word: "Banana",
    meaning: "Quả chuối",
    pronunciation: "/bəˈnæn.ə/",
    example: "Bananas are rich in potassium.",
  },
  {
    word: "Car",
    meaning: "Xe hơi",
    pronunciation: "/kɑːr/",
    example: "He bought a new car.",
  },
  {
    word: "Dog",
    meaning: "Con chó",
    pronunciation: "/dɒɡ/",
    example: "My dog loves to run in the park.",
  },
];

export default function VocabularyList({ data }) {
  const [search, setSearch] = useState("");

  const filteredVocab = vocabData.filter((item) =>
    item.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Danh sách từ vựng</h1>
      <Input
        type="text"
        placeholder="Tìm kiếm từ vựng..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 rounded-md"
      />
      <Table className="border rounded-lg shadow-md overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>STT</TableHead>
            <TableHead>Từ vựng</TableHead>
            <TableHead>Nghĩa</TableHead>
            <TableHead>Phát âm</TableHead>
            <TableHead>Ví dụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-50 transition">
              <TableCell className="font-semibold">{index + 1}</TableCell>
              <TableCell className="font-semibold">{item.word}</TableCell>
              <TableCell>{item.meaning}</TableCell>
              <TableCell className="text-gray-500 italic">
                {item.pronunciation}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {item.example}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
