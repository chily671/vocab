"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: "Đã nhớ", value: 40, color: "#4CAF50" },
    { name: "Chưa nhớ", value: 60, color: "#F44336" },
  ];

  if (!mounted) return null; // Đợi đến khi client render mới hiển thị

  return (
    <div className="flex justify-center">
      <PieChart width={250} height={250}>
        <Pie data={data} dataKey="value" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
 