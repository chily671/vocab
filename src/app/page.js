"use client";
import { useState } from "react";
import Intro from "./components/Intro";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [isIntroDone, setIsIntroDone] = useState(false);

  return (
    <main className="min-h-screen">
      {!isIntroDone ? (
        <Intro onFinish={() => setIsIntroDone(true)} />
      ) : (
        <Dashboard />
      )}
    </main>
  );
}
