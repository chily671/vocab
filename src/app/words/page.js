"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState, useCallback } from "react";
import AddWordPopup from "./AddWordPopup";
import EditWordModal from "./EditWordModal";
import ListView from "../components/Listview";
import UploadForm from "@/components/UploadForm";
import GroupManagement from "@/components/GroupManager";

export default function WordsPage() {
  const [words, setWords] = useState([]);
  const [editWord, setEditWord] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/words", { method: "GET" });
      if (!res.ok)
        throw new Error(`Lỗi API: ${res.status} - ${res.statusText}`);

      const json = await res.json();
      const wordsData = json.data || [];

      if (!Array.isArray(wordsData)) {
        console.error("Dữ liệu không hợp lệ:", wordsData);
        setWords([]);
      } else {
        setWords(wordsData);
      }
    } catch (error) {
      console.error("Lỗi fetch dữ liệu:", error);
      setWords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function speakWord(word) {
    if (typeof window !== "undefined" && speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis không được hỗ trợ.");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch("/api/words", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteId }),
    });
    setDeleteId(null);
    fetchWords();
  }

  return (
    <div className="p-4 w-[100%] h-[">
      <AddWordPopup onWordAdded={fetchWords} />

      {/* <button onClick={() => speakWord(word.word)}>🔊</button>
                <button
                  onClick={() => {
                    setEditWord(word);
                    setIsOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => setDeleteId(word._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  🗑️ Xóa
                </button> */}
      {loading ? (
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      ) : (
        <ListView data={words} />
      )}
      <UploadForm />

      {/* Popup Xác nhận Xóa */}
      {deleteId && (
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <p>Bạn có chắc chắn muốn xóa từ này?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Xóa
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Popup Chỉnh sửa */}
      {isOpen && (
        <EditWordModal
          wordData={editWord}
          setWordData={setEditWord}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onSave={fetchWords}
        />
      )}
    </div>
  );
}
