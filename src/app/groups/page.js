// src/app/groups/page.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function GroupPage() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateGroup = () => {
    // Call API ở đây sau
    console.log("Creating group:", groupName, description);
    setGroupName("");
    setDescription("");
  };

  return (
    <div className="p-6">
      {/* Thông báo các chức năng đang được phát triển, dưới đây chỉ là mẫu tham khảo */}
      <p className="text-2xl text-muted-foreground mb-2">
        Tính năng đang được phát triển. Sẽ sớm khả dụng!
        <br />
        <span className="text-sm text-muted-foreground">
          Dưới đây là bản mẫu tham khảo dùng thử.
        </span>
      </p>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Các Nhóm Từ Vựng</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              <Plus size={18} />
              Tạo Nhóm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo nhóm mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Tên nhóm"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Textarea
                placeholder="Mô tả nhóm (không bắt buộc)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button onClick={handleCreateGroup}>Tạo nhóm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card nhóm hiển thị ở đây */}
        <Card>
          <CardHeader>
            <CardTitle>📘 Nhóm TOEIC</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">10 thành viên</p>
            <Link href="/groups/group123">
              <Button variant="outline" className="w-full">
                Xem chi tiết
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
