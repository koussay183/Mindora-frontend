/**
 * PersonalityCard Component
 * Clean personality result display
 */

'use client';

import React from 'react';
import { Trophy } from 'lucide-react';
import type { Personality } from '@/lib/types';

interface PersonalityCardProps {
  personality: Personality;
}

export const PersonalityCard: React.FC<PersonalityCardProps> = ({ personality }) => {
  return (
    <div className="bg-[#F8F9FA] rounded-2xl p-6 md:p-10 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center">
          <Trophy className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[10px] md:text-xs text-[#718096] uppercase tracking-widest font-semibold mb-1">Your Personality Type</p>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1A202C] font-space">
            {personality.name.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs md:text-base text-[#4A5568] leading-relaxed mb-8">
        {personality.description}
      </p>

      {/* Traits */}
      <div>
        <h3 className="text-sm md:text-lg font-bold text-[#1A202C] mb-4 uppercase tracking-wide">Key Traits</h3>
        <div className="flex flex-wrap gap-2">
          {personality.traits.map((trait, index) => (
            <span
              key={index}
              className="px-3 md:px-4 py-1.5 md:py-2 bg-white text-[#1A202C] rounded-lg text-xs md:text-sm font-medium border border-gray-200"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
