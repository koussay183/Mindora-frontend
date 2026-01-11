/**
 * My Results Page
 * Displays user's quiz result (auth protected)
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/animations/PageTransition';
import { PersonalityCard } from '@/components/result/PersonalityCard';
import { ScoreBreakdown } from '@/components/result/ScoreBreakdown';
import { ShareResult } from '@/components/result/ShareResult';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { getMyResult, getPersonalities } from '@/lib/api';
import type { QuizResult, Personality } from '@/lib/types';
import { AlertCircle } from 'lucide-react';

export default function MyResultsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMyResult = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [resultData, personalitiesData] = await Promise.all([
          getMyResult(),
          getPersonalities(),
        ]);

        setResult(resultData);
        setPersonalities(personalitiesData.personalities);
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadMyResult();
  }, []);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <PageTransition>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-bold font-space text-[#1A202C] mb-6">
                MINDORA
              </h2>
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-[#718096] uppercase tracking-wider">Loading Your Results</p>
            </div>
          </div>
        </PageTransition>
      </ProtectedRoute>
    );
  }

  if (error || !result) {
    return (
      <ProtectedRoute>
        <PageTransition>
          <div className="min-h-screen py-12 px-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A202C] mb-3">No Results Yet</h2>
              <p className="text-sm text-[#718096] mb-6">
                {error || "You haven't completed the quiz yet. Take the quiz to discover your personality!"}
              </p>
              <button
                onClick={() => router.push('/')}
                className="w-full px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all uppercase text-sm tracking-wider"
              >
                Take Quiz
              </button>
            </div>
          </div>
        </PageTransition>
      </ProtectedRoute>
    );
  }

  const topPersonality = personalities.find(p => p.id === result.topPersonality.id);

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen py-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A202C] mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-sm text-[#718096]">
                Here are your personality quiz results
              </p>
            </div>

            {/* Main Result Card */}
            {topPersonality && (
              <div className="mb-6">
                <PersonalityCard personality={topPersonality} />
              </div>
            )}

            {/* Score Breakdown */}
            <div className="mb-6">
              <ScoreBreakdown
                scores={result.scores}
                personalities={personalities}
                topPersonalityId={result.topPersonality.id}
              />
            </div>

            {/* Share Options */}
            {result.token && (
              <div className="mb-6">
                <ShareResult token={result.token} />
              </div>
            )}

            {/* Completion Info */}
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-xs text-[#718096]">
                Completed on {new Date(result.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
