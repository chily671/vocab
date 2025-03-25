// topic card component
"use client";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card"; // Import từ shadcn
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

const TopicCard = ({ topic }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [topicName, setTopicName] = useState(topic?.topic || "");

  const handleDelete = async () => {
    const res = await fetch(`/api/topics/${topic._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      alert("Xóa chủ đề thành công!");
      router.refresh(); // Cập nhật danh sách
    } else {
      alert("Lỗi: " + res.message);
    }
  };
  const handleUpdate = async () => {
    const res = await fetch(`/api/topics/${topic._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: topicName }),
    });
    if (res.ok) {
      alert("Cập nhật chủ đề thành công!");
      router.refresh(); // Cập nhật danh sách
      setOpen(false); // Đóng modal
    } else {
      alert("Lỗi: " + res.message);
    }
  };
  return (
    <Card className="p-4 border rounded-lg hover:bg-gray-100">
      <Link href={`/topics/${topic?.topic}`} className="text-lg font-semibold">
        {topic}
      </Link>
      <div className="flex justify-between mt-2">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Sửa
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Xóa
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogTitle>Chỉnh sửa chủ đề</DialogTitle>
          <input
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <Button onClick={handleUpdate}>Lưu</Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
export default TopicCard;
