"use client";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Vui lòng chọn file Excel");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
  };

  // Hàm tạo và tải xuống file Excel mẫu
  const handleDownloadTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      { word: "apple", meaning: "táo", example: "I eat an apple", pronunciation: "ˈæpl", audioUrl: "", userId: "", topicId: "", topic: "Fruits" },
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vocabulary Template");

    XLSX.writeFile(workbook, "vocabulary_template.xlsx");
  };

  return (
    <div className="p-5 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-3">Nhập từ vựng từ Excel</h2>

      <button
        onClick={handleDownloadTemplate}
        className="mb-3 px-4 py-2 bg-green-500 text-white rounded"
      >
        📥 Download Template
      </button>

      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
      >
        📤 Tải lên
      </button>

      {message && <p className="mt-2 text-gray-700">{message}</p>}
    </div>
  );
}
