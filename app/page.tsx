/**
 * Quiz Page
 * Modern, clean personality quiz interface
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/animations/PageTransition';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { OptionButton } from '@/components/quiz/OptionButtonNew';
import { QuizNavigation } from '@/components/quiz/QuizNavigation';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useQuiz } from '@/hooks/useQuiz';
import { useAuth } from '@/contexts/AuthContext';
import type { StoredResult } from '@/lib/types';
import { ArrowLeft, ArrowRight, Send, Sparkles, AlertCircle } from 'lucide-react';

export default function QuizPage() {
  const router = useRouter();
  const { isAuthenticated, user, updateUser } = useAuth();
  const navigationRef = useRef<HTMLDivElement>(null);

  // Check if user already completed quiz - redirect immediately
  const shouldRedirect = isAuthenticated && user?.hasCompletedQuiz;

  const {
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
  } = useQuiz();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState(() => {
    // Check localStorage for pending submission on mount
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pendingQuizSubmission') === 'true';
    }
    return false;
  });

  // Redirect if user already completed quiz
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/my-results');
    }
  }, [shouldRedirect, router]);

  // Auto-submit after authentication if there was a pending submission
  useEffect(() => {
    const handleAutoSubmit = async () => {
      if (pendingSubmission && isAuthenticated && answers.length > 0) {
        // Show loading state
        setIsAutoSubmitting(true);
        
        // Clear the pending submission flag from localStorage
        localStorage.removeItem('pendingQuizSubmission');
        setPendingSubmission(false);
        setShowAuthModal(false);
        
        try {
          // Submit the quiz
          const result = await submit();
          if (result) {
            // Update user state
            updateUser({ hasCompletedQuiz: true, quizToken: result.token });
            // Redirect to my-results page
            router.push('/my-results');
          } else {
            setIsAutoSubmitting(false);
          }
        } catch (err) {
          setIsAutoSubmitting(false);
          // Clear pending submission flag on error
          localStorage.removeItem('pendingQuizSubmission');
        }
      }
    };

    handleAutoSubmit();
  }, [pendingSubmission, isAuthenticated, answers, submit, router, updateUser]);

  // Update selected option when question changes
  useEffect(() => {
    if (currentQuestion) {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
      setSelectedOptionId(existingAnswer?.optionId || null);
    }
  }, [currentQuestion, answers]);

  const handleOptionSelect = (optionId: string) => {
    if (currentQuestion) {
      setSelectedOptionId(optionId);
      selectAnswer(currentQuestion.id, optionId);
      // Auto-scroll to navigation on mobile after selection
      setTimeout(() => {
        if (navigationRef.current && window.innerWidth < 768) {
          navigationRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest'
          });
        }
      }, 300);
    }
  };

  const handleNext = () => {
    goToNext();
  };

  const handlePrevious = () => {
    goToPrevious();
  };

  const handleSubmit = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Save pending submission flag to localStorage
      localStorage.setItem('pendingQuizSubmission', 'true');
      // Show auth modal and set pending submission flag
      setPendingSubmission(true);
      setShowAuthModal(true);
      return;
    }

    // User is authenticated, submit directly
    try {
      const result = await submit();

      if (result) {
        // Update user state
        updateUser({ hasCompletedQuiz: true, quizToken: result.token });
        
        // Redirect to my-results page
        router.push('/my-results');
      }
    } catch (err) {
      // Error is already handled and shown to user through state
    }
  };

  // Show loading state for various conditions
  if (isLoading || isAutoSubmitting || shouldRedirect) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-[#718096] font-medium">
            {isAutoSubmitting ? 'Submitting Your Results...' : shouldRedirect ? 'Redirecting...' : 'Loading Quiz...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center px-4 bg-white z-50">
        <div className="max-w-md w-full bg-[#F8F9FA] rounded-2xl p-6 md:p-8 text-center border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">⚠</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-space text-[#1A202C] mb-2">ERROR</h2>
          <p className="text-xs md:text-sm text-[#4A5568] mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-[#1A202C] text-white rounded-xl font-semibold hover:bg-[#2D3748] transition-colors uppercase text-xs md:text-sm tracking-wider"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen py-6 sm:py-8 px-2 sm:px-4 md:px-6">
        <div className="mx-auto" style={{ maxWidth: '800px' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 md:p-10">
            {/* Progress Bar */}
            <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between text-xs sm:text-sm md:text-sm mb-2">
              <span className="text-[#4A5568] font-semibold uppercase tracking-wide">Question {progress.current}/{progress.total}</span>
              <span className="text-primary font-bold text-sm sm:text-base">{Math.round((Math.min(answers.length, currentQuestionIndex + 1) / progress.total) * 100)}%</span>
            </div>
            <div className="h-3 md:h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(Math.min(answers.length, currentQuestionIndex + 1) / progress.total) * 100}%` }}
              />
            </div>
          </div>

          {/* Question & Options Card */}
          <div className="bg-[#F8F9FA] rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-8 border border-gray-100 mb-3 sm:mb-4 relative">
            {/* Question */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-space text-[#1A202C] leading-snug">
                {currentQuestion.text}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-2 sm:space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-3 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-left transition-all duration-200 border-2 flex items-center gap-2 sm:gap-3 ${
                    selectedOptionId === option.id 
                      ? 'bg-[#1A202C] border-[#1A202C] text-white' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`flex-shrink-0 w-5 h-5 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedOptionId === option.id ? 'bg-white border-white' : 'border-gray-300'
                  }`}>
                    {selectedOptionId === option.id && <div className="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#1A202C]"></div>}
                  </div>
                  <span className={`text-sm sm:text-sm md:text-base font-medium leading-snug ${
                    selectedOptionId === option.id ? 'text-white' : 'text-[#1A202C]'
                  }`}>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div ref={navigationRef} className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold transition-all bg-gray-200 hover:bg-gray-300 text-[#1A202C] disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm sm:text-sm md:text-sm tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 sm:w-4 sm:h-4" />
              <span>Back</span>
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOptionId || isSubmitting}
                className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-3 md:py-4 bg-primary text-white rounded-lg sm:rounded-xl font-bold hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm sm:text-sm md:text-sm tracking-wider"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting</span>
                  </>
                ) : (
                  <>
                    <span>Get Results</span>
                    <Sparkles className="w-4 h-4 sm:w-4 sm:h-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-3 md:py-4 bg-primary text-white rounded-lg sm:rounded-xl font-bold hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase text-sm sm:text-sm md:text-sm tracking-wider"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1A202C] mb-2">
                  Authentication Required
                </h3>
                <p className="text-sm text-[#718096]">
                  Please login or create an account to submit the quiz and view your results.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/login?returnTo=/')}
                className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all text-sm"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register?returnTo=/')}
                className="flex-1 px-4 py-3 bg-white text-[#1A202C] border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all text-sm"
              >
                Sign Up
              </button>
            </div>
            <button
              onClick={() => setShowAuthModal(false)}
              className="w-full mt-3 text-sm text-[#718096] hover:text-[#1A202C] transition-colors"
            >
              Continue Quiz
            </button>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
