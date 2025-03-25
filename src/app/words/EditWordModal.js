import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

const EditWordModal = ({
  wordData,
  isOpen,
  onOpenChange,
  onSave,
  setWordData,
}) => {
  const [topic, settopic] = useState(wordData.topic || "");

  const handleUpdate = async () => {
    const response = await fetch("/api/words", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: wordData._id, // Truyền đúng ID của từ đang chỉnh sửa
        word: wordData?.word,
        meaning: wordData?.meaning,
        topic: wordData?.topic || "",
        example: wordData?.example,
        pronunciation: wordData?.pronunciation,
      }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Cập nhật thành công!");
      onSave(); // Cập nhật danh sách
      onClose(); // Đóng modal
    } else {
      alert("Lỗi: " + result.message);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogTitle>Chỉnh sửa từ vựng</DialogTitle>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="word" className="font-bold">
              Từ vựng
            </label>
            <input
              type="text"
              value={wordData.word}
              onChange={(e) =>
                setWordData({ ...wordData, word: e.target.value })
              }
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
              value={wordData.meaning}
              onChange={(e) =>
                setWordData({ ...wordData, meaning: e.target.value })
              }
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
              value={wordData.example}
              onChange={(e) =>
                setWordData({ ...wordData, example: e.target.value })
              }
              className="border p-2 w-full"
              required
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
              value={wordData.pronunciation}
              onChange={(e) =>
                setWordData({ ...wordData, pronunciation: e.target.value })
              }
              className="border p-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="topic" className="font-bold">
              Chủ đề
            </label>
            <input
              type="text"
              id="topic"
              placeholder="Chủ đề"
              value={topic}
              onChange={(e) => settopic(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setWordData(null)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditWordModal;
