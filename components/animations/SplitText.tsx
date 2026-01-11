"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: Record<string, any>;
  to?: Record<string, any>;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  onLetterAnimationComplete?: () => void;
}

const SplitText = ({
  text,
  className = '',
  delay = 60,
  duration = 1,
  ease = 'power2.out',
  splitType = 'chars',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  tag: Tag = 'p',
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const chars = container.querySelectorAll('.split-char');

    if (chars.length === 0) return;

    // Set initial state
    gsap.set(chars, from);

    // Animate each character
    const tl = gsap.timeline({
      onComplete: () => {
        if (onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      },
    });

    chars.forEach((char, index) => {
      tl.to(
        char,
        {
          ...to,
          duration,
          ease,
        },
        index * (delay / 1000)
      );
    });

    return () => {
      tl.kill();
    };
  }, [text, delay, duration, ease, from, to, onLetterAnimationComplete]);

  // Split text into characters with initial hidden state
  const splitChars = text.split('').map((char, index) => (
    <span
      key={index}
      className="split-char inline-block"
      style={{ 
        whiteSpace: char === ' ' ? 'pre' : 'normal',
        opacity: 0,
        transform: `translateY(${from.y || 0}px) rotateX(${from.rotationX || 0}deg)`,
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <Tag ref={containerRef as any} className={className}>
      {splitChars}
    </Tag>
  );
};

export default SplitText;
