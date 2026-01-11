/**
 * ProgressBar Component
 * Animated progress bar with percentage display
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { ProgressBarProps, PersonalityColor } from '@/lib/types';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showLabel = true,
  animated = true,
  color = 'blue',
  className = '',
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentage = total > 0 ? (current / total) * 100 : 0;

  useEffect(() => {
    if (!progressRef.current || !animated) return;

    gsap.to(progressRef.current, {
      width: `${percentage}%`,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [percentage, animated]);

  const colorStyles: Record<PersonalityColor, string> = {
    blue: 'bg-brand-primary',
    purple: 'bg-brand-primary',
    green: 'bg-accent-green',
    orange: 'bg-accent-orange',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2 text-sm text-midnight">
          <span>Progress</span>
          <span className="font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}

      <div className="w-full h-3 bg-neutral-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          ref={progressRef}
          className={`h-full rounded-full transition-all ${colorStyles[color]}`}
          style={!animated ? { width: `${percentage}%` } : undefined}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {showLabel && (
        <div className="mt-2 text-xs text-neutral-gray-600 text-center">
          {current} of {total} completed
        </div>
      )}
    </div>
  );
};
