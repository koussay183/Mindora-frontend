/**
 * QuizNavigation Component
 * Navigation buttons for quiz flow
 */

'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface QuizNavigationProps {
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  isAnswered: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  canGoPrevious,
  canGoNext,
  isLastQuestion,
  isAnswered,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  return (
    <div className="flex justify-between items-center gap-4 mt-8">
      {/* Previous button */}
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoPrevious || isSubmitting}
        className="flex-1"
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </span>
      </Button>

      {/* Next or Submit button */}
      {isLastQuestion ? (
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!isAnswered || isSubmitting}
          loading={isSubmitting}
          className="flex-1"
          size="lg"
        >
          Submit Quiz
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!isAnswered || !canGoNext || isSubmitting}
          className="flex-1"
        >
          <span className="flex items-center gap-2">
            Next
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Button>
      )}
    </div>
  );
};
