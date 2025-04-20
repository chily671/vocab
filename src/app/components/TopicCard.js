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

const TopicCard = ({ index, topic }) => {
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
    // <Card className="p-4 border rounded-lg hover:bg-gray-100">
    //   <Link href={`/topics/${topic?.topic}`} className="text-lg font-semibold">
    //     {topic}
    //   </Link>
    //   <div className="flex justify-between mt-2">
    //     <Button variant="outline" onClick={() => setOpen(true)}>
    //       Sửa
    //     </Button>
    //     <Button variant="destructive" onClick={handleDelete}>
    //       Xóa
    //     </Button>
    //   </div>
    //   <Dialog open={open} onOpenChange={setOpen}>
    //     <DialogTrigger asChild></DialogTrigger>
    //     <DialogContent>
    //       <DialogTitle>Chỉnh sửa chủ đề</DialogTitle>
    //       <input
    //         type="text"
    //         value={topicName}
    //         onChange={(e) => setTopicName(e.target.value)}
    //         className="border p-2 w-full"
    //         required
    //       />
    //       <Button onClick={handleUpdate}>Lưu</Button>
    //     </DialogContent>
    //   </Dialog>
    // </Card>

    <Link href={`/topics/${topic}`} className="text-lg font-semibold">
      <div className="relative w-80 bg-white border border-gray-200 shadow-md text-black rounded-[2.5em] p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 group">
        <div className="flex flex-col justify-between gap-20 h-full">
          <div className="flex justify-between">
            <span className="font-bold">{index + 1}.</span>
          </div>
        </div>
        {/*Chỉnh sửa chủ đề */}
        {/* <div className="flex ml-auto ">
            <svg
              width="32"
              height="32"
              viewBox="0 -960 960 960"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z" />
            </svg>
          </div> */}

        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <p className="text-md font-bold text-center text-black">{topic}</p>
        </div>
      </div>
    </Link>
  );
};
export default TopicCard;
