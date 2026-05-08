"use client";

import { useEffect, useState } from "react";

export default function DynamicBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Moves the background slightly based on mouse position
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center bg-no-repeat opacity-100 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url('/bg3.jpg')`,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      />
    </div>
  );
}
