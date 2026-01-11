/**
 * QuestionCard Component
 * Clean, modern question display
 */

'use client';

import React from 'react';
import type { Question } from '@/lib/types';
import { HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="space-y-3">
      {/* Question Icon & Number */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4C51BF] via-[#9F7AEA] to-[#F56565] flex items-center justify-center flex-shrink-0 shadow-md">
          <HelpCircle className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <div>
          <div className="text-[#718096] text-xs sm:text-sm font-medium">
            Question {questionNumber} of {totalQuestions}
          </div>
          {question.weight > 1 && (
            <div className="flex items-center gap-1 mt-0.5">
              {Array.from({ length: Math.min(question.weight, 3) }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-gradient-to-r from-accent to-accent-dark"></div>
              ))}
              <span className="text-[10px] text-[#718096] ml-1">High impact</span>
            </div>
          )}
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-space text-[#1A202C] leading-tight font-bold">
        {question.text}
      </h2>
    </div>
  );
};
