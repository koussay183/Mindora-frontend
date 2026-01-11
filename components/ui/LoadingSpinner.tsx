/**
 * LoadingSpinner Component
 * Premium animated loading spinner with GSAP
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  color?: 'blue' | 'purple' | 'green' | 'orange';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  color = 'blue',
}) => {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const orbitRef1 = useRef<HTMLDivElement>(null);
  const orbitRef2 = useRef<HTMLDivElement>(null);
  const orbitRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spinnerRef.current) return;

    // Main spinner rotation
    const spinnerAnimation = gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 2,
      ease: 'linear',
      repeat: -1,
    });

    // Orbit animations
    if (orbitRef1.current) {
      gsap.to(orbitRef1.current, {
        rotation: 360,
        duration: 1.5,
        ease: 'linear',
        repeat: -1,
      });
    }

    if (orbitRef2.current) {
      gsap.to(orbitRef2.current, {
        rotation: 360,
        duration: 2,
        ease: 'linear',
        repeat: -1,
      });
    }

    if (orbitRef3.current) {
      gsap.to(orbitRef3.current, {
        rotation: 360,
        duration: 2.5,
        ease: 'linear',
        repeat: -1,
      });
    }

    return () => {
      spinnerAnimation.kill();
    };
  }, []);

  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const colorStyles = {
    blue: 'border-brand-primary',
    purple: 'border-brand-primary',
    green: 'border-accent-green',
    orange: 'border-accent-orange',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner Container */}
      <div className="relative" ref={spinnerRef}>
        {/* Outer circle */}
        <div className={`${sizeStyles[size]} rounded-full border-4 ${colorStyles[color]} border-t-transparent`} />

        {/* Orbiting dots */}
        <div
          ref={orbitRef1}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className={`w-2 h-2 rounded-full bg-${color} absolute top-0 left-1/2 -translate-x-1/2`} />
        </div>

        <div
          ref={orbitRef2}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className={`w-2 h-2 rounded-full bg-${color} absolute top-1/2 right-0 -translate-y-1/2`} />
        </div>

        <div
          ref={orbitRef3}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className={`w-2 h-2 rounded-full bg-${color} absolute bottom-0 left-1/2 -translate-x-1/2`} />
        </div>

        {/* Center glow */}
        <div className={`absolute inset-0 rounded-full bg-${color} opacity-20 blur-xl animate-pulse`} />
      </div>

      {/* Loading message */}
      {message && (
        <p className="text-neutral-gray-600 text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};
