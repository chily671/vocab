"use client";
import { useState } from "react";

export default function WordCard({ word, meaning }) {
  const [flipped, setFlipped] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="w-full h-[200px] [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white text-black flex items-center justify-center text-2xl rounded-[10px] border-[10px] border-black">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Checkbox nằm bên trong mặt trước */}
            {/* <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                e.stopPropagation(); // tránh flip
                setChecked(e.target.checked);
              }}
              className="absolute top-2 right-2 w-5 h-5 accent-green-500 z-10"
              onClick={(e) => e.stopPropagation()}
            /> */}
            {word}
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rotate-y-180 bg-black text-white flex items-center justify-center text-2xl rounded-[10px] border-[10px]">
          {meaning}
        </div>
      </div>
    </div>
  );
}
