/**
 * useQuiz Hook
 * Manages quiz state, navigation, and submission logic
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { getQuestions, submitQuiz } from '@/lib/api';
import type { Question, Answer, QuizSubmission, QuizProgress } from '@/lib/types';

interface UseQuizReturn {
  questions: Question[];
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  answers: Answer[];
  progress: QuizProgress;
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  selectAnswer: (questionId: string, optionId: string) => void;
  submit: () => Promise<{ token: string; topPersonality: string; scores: Record<string, number> } | null>;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  isQuestionAnswered: (questionId: string) => boolean;
}

/**
 * Custom hook for managing quiz state and logic
 */
export const useQuiz = (): UseQuizReturn => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>(() => {
    // Only restore answers if there's a pending submission (user is coming back from auth)
    if (typeof window !== 'undefined') {
      const hasPendingSubmission = localStorage.getItem('pendingQuizSubmission') === 'true';
      
      if (hasPendingSubmission) {
        // User is coming back from auth - restore their answers
        const saved = localStorage.getItem('quiz_answers');
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch {
            return [];
          }
        }
      } else {
        // Fresh visit or normal refresh - clear old answers
        localStorage.removeItem('quiz_answers');
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (answers.length > 0) {
      localStorage.setItem('quiz_answers', JSON.stringify(answers));
    }
  }, [answers]);

  // Load questions on mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await getQuestions();
        // Sort by order
        const sortedQuestions = [...response.questions].sort((a, b) => a.order - b.order);
        setQuestions(sortedQuestions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Save state to sessionStorage on changes (removed - state no longer persists)
  // This ensures quiz always starts fresh on page load/refresh

  // Current question
  const currentQuestion = questions[currentQuestionIndex] || null;

  // Check if a question is answered
  const isQuestionAnswered = useCallback(
    (questionId: string): boolean => {
      return answers.some(a => a.questionId === questionId);
    },
    [answers]
  );

  // Calculate progress
  const progress: QuizProgress = {
    current: currentQuestionIndex + 1,
    total: questions.length,
    percentage: questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0,
    answeredCount: answers.length,
  };

  // Navigation flags
  const canGoNext = currentQuestionIndex < questions.length - 1;
  const canGoPrevious = currentQuestionIndex > 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Select an answer
  const selectAnswer = useCallback((questionId: string, optionId: string) => {
    setAnswers(prev => {
      // Remove existing answer for this question
      const filtered = prev.filter(a => a.questionId !== questionId);
      // Add new answer
      return [...filtered, { questionId, optionId }];
    });
  }, []);

  // Navigate to next question
  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [canGoNext]);

  // Navigate to previous question
  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [canGoPrevious]);

  // Submit quiz
  const submit = useCallback(async () => {
    if (answers.length === 0) {
      setError('Please answer at least one question');
      return null;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const submission: QuizSubmission = { answers };
      const result = await submitQuiz(submission);

      // Clear localStorage after successful submission
      localStorage.removeItem('quiz_answers');
      localStorage.removeItem('pendingQuizSubmission');

      return result;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [answers]);

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    answers,
    progress,
    isLoading,
    error,
    isSubmitting,
    goToNext,
    goToPrevious,
    selectAnswer,
    submit,
    canGoNext,
    canGoPrevious,
    isLastQuestion,
    isQuestionAnswered,
  };
};
