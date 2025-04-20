"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const GroupManagement = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "English Learners", members: 12 },
    { id: 2, name: "TOEIC Warriors", members: 8 },
  ]);
  const [groupsData, setGroupsData] = useState([]);

  const fetchGroups = async () => {
    try {
      const response = await fetch("/api/groups", { method: "GET" });
      if (!response.ok) throw new Error("Failed to fetch groups");
      const data = await response.json();
      setGroupsData(data.groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  


  const [newGroupName, setNewGroupName] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = { id: groups.length + 1, name: newGroupName, members: 1 };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setOpen(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý nhóm từ vựng</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">+ Tạo nhóm mới</Button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="text-xl font-bold mb-2">Tạo nhóm mới</h2>
          <Input
            placeholder="Tên nhóm"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <Button className="mt-2" onClick={handleCreateGroup}>
            Tạo nhóm
          </Button>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 gap-4">
        {groups.map((group) => (
          <Card key={group.id} className="p-4 flex justify-between">
            <CardContent>
              <h3 className="text-lg font-semibold">{group.name}</h3>
              <p>{group.members} thành viên</p>
            </CardContent>
            <Button>Vào nhóm</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupManagement;
