"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

export default function AddWordPopup({ onWordAdded }) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fake API: Gọi API lấy danh sách topic
    async function fetchTopics() {
      const res = await fetch("/api/topics", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log("🚀 ~ fetchTopics ~ data:", data);
      setTopics(data?.data); // ví dụ [{ name: "Business" }, ...]
    }

    if (open) fetchTopics();
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (topics.includes(topic.trim())) {
      // nếu topic đã tồn tại thì không thêm mới
      alert("Chủ đề này đã tồn tại rồi. Vui lòng chọn hoặc đặt tên khác.");
      return;
    }

    const res = await fetch("/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ word, meaning, example, pronunciation, topic }),
    });

    if (res.ok) {
      onWordAdded();
      setOpen(false);
      setWord("");
      setMeaning("");
      setExample("");
      setPronunciation("");
      setTopic("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Thêm từ mới</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Thêm từ vựng</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-bold">Từ vựng</label>
            <Input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Từ vựng"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold">Nghĩa</label>
            <Input
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="Nghĩa"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold">Ví dụ</label>
            <Input
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Ví dụ"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold">Phát âm</label>
            <Input
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              placeholder="Phát âm"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="topic" className="font-bold">
                Chủ đề
              </label>
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="text-sm w-60">
                  Hãy chọn một chủ đề có sẵn hoặc nhập tên mới nếu muốn thêm.
                  Chủ đề không được trùng với cái cũ.
                </PopoverContent>
              </Popover> */}
            </div>

            <Input
              list="topics"
              placeholder="Nhập hoặc chọn chủ đề"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
            <datalist id="topics">
              {topics.map((t, i) => (
                <option key={i} value={t?.topic} />
              ))}
            </datalist>
          </div>

          <Button type="submit" className="w-full">
            Lưu
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
