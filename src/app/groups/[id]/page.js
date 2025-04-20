"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const fakeGroup = {
  id: "group123",
  name: "TOEIC Warriors",
  description: "Nhóm học từ vựng TOEIC mỗi ngày.",
  creator: "Hà Zaki",
  members: ["Hà Zaki", "Linh Mai", "Khánh Vũ"],
  vocabulary: [
    {
      word: "determine",
      meaning: "xác định",
      addedBy: "Linh Mai",
      topic: "Verb"
    },
    {
      word: "efficient",
      meaning: "hiệu quả",
      addedBy: "Khánh Vũ",
      topic: "Adjective"
    },
    {
      word: "invoice",
      meaning: "hóa đơn",
      addedBy: "Hà Zaki",
      topic: "Noun"
    }
  ]
};

export default function GroupDetailPage() {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    // fake API call
    setTimeout(() => {
      setGroup(fakeGroup);
    }, 500);
  }, []);

  if (!group) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
      <p className="text-gray-600 mb-4">{group.description}</p>
      <p className="text-sm text-muted-foreground mb-2">
        Người tạo: <strong>{group.creator}</strong> — {group.members.length} thành viên
      </p>

      <Tabs defaultValue="words" className="mt-6">
        <TabsList>
          <TabsTrigger value="words">Từ vựng</TabsTrigger>
          <TabsTrigger value="members">Thành viên</TabsTrigger>
        </TabsList>

        <TabsContent value="words">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {group.vocabulary.map((word, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{word.word}</h2>
                  <p className="text-gray-600">{word.meaning}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chủ đề: {word.topic} — Thêm bởi: {word.addedBy}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="mt-4">+ Thêm từ mới</Button>
        </TabsContent>

        <TabsContent value="members">
          <ul className="mt-4 list-disc pl-6 text-gray-700">
            {group.members.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
          <Button variant="outline" className="mt-4">
            Mời thành viên
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
