/**
 * Result Page  
 * Displays personality quiz results with animations
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageTransition } from '@/components/animations/PageTransition';
import { PersonalityCard } from '@/components/result/PersonalityCard';
import { ScoreBreakdown } from '@/components/result/ScoreBreakdown';
import { ShareResult } from '@/components/result/ShareResult';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { getResult, getPersonalities } from '@/lib/api';
import type { QuizResult, Personality } from '@/lib/types';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const token = params.token as string;

  const [result, setResult] = useState<QuizResult | null>(null);
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const loadResult = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [resultData, personalitiesData] = await Promise.all([
          getResult(token),
          getPersonalities(),
        ]);

        setResult(resultData);
        setPersonalities(personalitiesData.personalities);
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
        
        // Handle specific auth errors
        if (errorMessage.includes('Authentication required')) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      loadResult();
    }
  }, [token, isAuthenticated, router]);

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-3 border-3 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            <p className="text-xs text-[#718096] uppercase tracking-wider">Loading Results</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !result) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="max-w-md w-full bg-[#F8F9FA] rounded-2xl p-6 md:p-8 text-center border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">✕</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-space text-[#1A202C] mb-2">NOT FOUND</h2>
            <p className="text-xs md:text-sm text-[#4A5568] mb-6">
              {error || 'This result does not exist or has expired.'}
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-[#1A202C] text-white rounded-xl font-bold hover:bg-[#2D3748] transition-colors uppercase text-xs tracking-wider"
            >
              Take Quiz
            </a>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-16 pb-8 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1A202C] mb-2 font-space">
              YOUR RESULT
            </h1>
            <p className="text-[10px] md:text-xs text-[#718096] uppercase tracking-widest">
              Completed on {new Date(result.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Main Result */}
          <div className="mb-6">
            <PersonalityCard personality={result.topPersonality} />
          </div>

          {/* Score Breakdown */}
          <div className="mb-6">
            <ScoreBreakdown
              scores={result.scores}
              personalities={personalities}
              topPersonalityId={result.topPersonality.id}
            />
          </div>

          {/* Actions */}
          <div>
            <ShareResult token={token} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
