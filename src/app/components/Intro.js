import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaRocket } from "react-icons/fa";
import { loadSlim } from "tsparticles-slim"; // ✅ Load phiên bản nhẹ

export default function Intro({ onFinish }) {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // ✅ Sử dụng loadSlim thay vì loadFull
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#111827" },
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { enable: true, speed: 2 },
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff" },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold"
      >
        Welcome to the Dashboard
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9, rotate: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={onFinish}
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <FaRocket className="text-lg" /> Launch
        </Button>
      </motion.div>
    </div>
  );
}
