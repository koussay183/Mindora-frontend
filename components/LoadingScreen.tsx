"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitText from "@/components/animations/SplitText";

interface LoadingScreenProps {
  onLoadComplete?: () => void;
  duration?: number;
}

export default function LoadingScreen({
  onLoadComplete,
  duration = 4000,
}: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAnimationComplete = () => {
    // Hold for 2 seconds after animation completes
    setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setIsComplete(true);
            onLoadComplete?.();
          },
        });
      }
    }, 2000);
  };

  if (isComplete) return null;

  return (
    <>
      {/* Hide scrollbar during loading */}
      <style jsx global>{`
        body {
          overflow: hidden !important;
        }
      `}</style>
      
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
      >
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-transparent to-accent-orange/5" />

        {/* Animated Text */}
        <SplitText
          text="Mindora"
          tag="h1"
          className="text-7xl md:text-8xl font-bold text-midnight font-space text-center"
          delay={100}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 60, rotationX: -90 }}
          to={{ opacity: 1, y: 0, rotationX: 0 }}
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
    </>
  );
}
