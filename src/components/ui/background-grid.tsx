"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ParticleProps {
  index: number;
}

function Particle({ index }: ParticleProps) {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 2;
  const randomDuration = 3 + Math.random() * 4;

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/30"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3],
        y: [0, -20, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "easeInOut",
      }}
    />
  );
}

interface GridLineProps {
  orientation: "horizontal" | "vertical";
  position: number;
}

function GridLine({ orientation, position }: GridLineProps) {
  const isHorizontal = orientation === "horizontal";
  
  return (
    <motion.div
      className={`absolute ${
        isHorizontal ? "w-full h-px left-0" : "h-full w-px top-0"
      } bg-gradient-to-${isHorizontal ? "r" : "b"} from-transparent via-primary/20 to-transparent`}
      style={isHorizontal ? { top: `${position}%` } : { left: `${position}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random(),
      }}
    />
  );
}

interface FloatingShapeProps {
  index: number;
}

function FloatingShape({ index }: FloatingShapeProps) {
  const shapes = ["circle", "square", "triangle"];
  const shape = shapes[index % shapes.length];
  const size = 20 + Math.random() * 40;
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;

  return (
    <motion.div
      className={`absolute opacity-10`}
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: size,
        height: size,
      }}
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {shape === "circle" && (
        <div className="w-full h-full rounded-full border-2 border-primary/30" />
      )}
      {shape === "square" && (
        <div className="w-full h-full rotate-45 border-2 border-accent-purple/30" />
      )}
      {shape === "triangle" && (
        <div className="w-full h-full">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,10 90,90 10,90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent-cyan/30"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

export function BackgroundGrid({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-purple/5 blur-[150px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[100px]" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal Lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <GridLine key={`h-${i}`} orientation="horizontal" position={(i + 1) * 12.5} />
        ))}
        
        {/* Vertical Lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <GridLine key={`v-${i}`} orientation="vertical" position={(i + 1) * 12.5} />
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <Particle key={`particle-${i}`} index={i} />
        ))}
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingShape key={`shape-${i}`} index={i} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
