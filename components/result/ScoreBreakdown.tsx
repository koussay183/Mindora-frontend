/**
 * ScoreBreakdown Component
 * Clean score breakdown display
 */

'use client';

import React from 'react';
import type { Personality } from '@/lib/types';

interface ScoreBreakdownProps {
  scores: Record<string, number>;
  personalities: Personality[];
  topPersonalityId: string;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({
  scores,
  personalities,
  topPersonalityId,
}) => {
  const maxScore = Math.max(...Object.values(scores));

  return (
    <div className="bg-[#F8F9FA] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#1A202C] mb-4 sm:mb-6 uppercase tracking-wide">Score Breakdown</h3>

      <div className="space-y-3 sm:space-y-4">
        {personalities.map((personality) => {
          const score = scores[personality.id] || 0;
          const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
          const isTop = personality.id === topPersonalityId;

          return (
            <div key={personality.id}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide ${
                  isTop ? 'text-[#1A202C]' : 'text-[#718096]'
                }`}>
                  {personality.name}
                  {isTop && (
                    <span className="ml-1.5 sm:ml-2 text-[8px] sm:text-[10px] bg-primary text-white px-1.5 sm:px-2 py-0.5 rounded-full">
                      TOP
                    </span>
                  )}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-[#1A202C]">
                  {score} pts
                </span>
              </div>
              <div className="relative h-2.5 sm:h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isTop ? 'bg-primary' : 'bg-gray-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
