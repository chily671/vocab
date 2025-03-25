"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card"; // Import từ shadcn

export default function WordCard({ word, meaning }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-40 cursor-pointer perspective-1000"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`w-full h-full transition-transform duration-700 transform-style-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {!flipped ? (
          <>
            {/* Mặt trước */}
            <Card className="absolute w-full h-full flex items-center justify-center bg-blue-500 text-white font-bold rounded-lg">
              {word}
            </Card>
          </>
        ) : (
          <>
            {/* Mặt sau */}
            <Card className="absolute w-full h-full flex items-center justify-center bg-green-500 text-white font-bold rounded-lg transform rotate-y-180">
              {meaning}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
