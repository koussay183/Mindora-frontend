/**
 * OptionButton Component  
 * Modern, tactile option selection
 */

'use client';

import React from 'react';
import type { QuestionOption } from '@/lib/types';
import { Check, Circle } from 'lucide-react';

interface OptionButtonProps {
  option: QuestionOption;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isSelected,
  onSelect,
  index,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200
        border-2 flex items-center gap-3 group relative overflow-hidden
        ${isSelected 
          ? 'bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/5 border-primary shadow-md scale-[1.02]' 
          : 'bg-white border-gray-200 hover:border-primary/40 hover:shadow-md hover:scale-[1.01]'
        }
      `}
      style={{ animationDelay: `${index * 50}ms` }}
      aria-pressed={isSelected}
    >
      {/* Selection Indicator */}
      <div className={`
        flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
        ${isSelected 
          ? 'bg-gradient-to-br from-primary to-secondary border-primary shadow-sm' 
          : 'border-gray-300 group-hover:border-primary/40 group-hover:bg-primary/5'
        }
      `}>
        {isSelected ? (
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        ) : (
          <Circle className="w-2.5 h-2.5 text-transparent" />
        )}
      </div>

      {/* Option Text */}
      <div className="flex-1">
        <p className={`
          text-sm sm:text-base font-medium transition-colors leading-snug
          ${isSelected ? 'text-primary' : 'text-[#1A202C] group-hover:text-primary'}
        `}>
          {option.text}
        </p>
      </div>
    </button>
  );
};
