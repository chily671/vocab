import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const Intro = () => {
  const { user } = useAuth();

  const features = [
    {
      title: "📚 Quản lý từ vựng",
      description: "Lưu trữ và tổ chức từ vựng theo chủ đề.",
    },
    {
      title: "🎯 Mini-game luyện tập",
      description: "Củng cố từ vựng qua các trò chơi hấp dẫn.",
    },
    {
      title: "📊 Theo dõi tiến trình",
      description: "Xem thống kê học tập của bạn mỗi ngày.",
    },
  ];
  console.log("🚀 ~ Intro ~ user:", user);
  return (
    <main className="flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome <span className="text-amber-500"> {user?.username} </span> to
        Vocabulary App
      </h1>
      <p className="mt-4 text-lg">Lưu trữ từ vựng và làm bài kiểm tra!</p>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <h2 className="text-4xl font-bold mb-4">
          Học từ vựng dễ dàng & hiệu quả
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Quản lý từ vựng, luyện tập với mini-game và theo dõi tiến trình học
          tập của bạn.
        </p>
        <Button size="lg" asChild>
          <Link href="/register">Bắt đầu ngay</Link>
        </Button>
      </motion.section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center shadow-lg">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default Intro;
