/**
 * Header Component
 * Modern navigation with icons and auth
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Brain, FileText, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="relative">
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: '1250px' }}>
        <nav className="bg-white rounded-xl shadow-lg px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl sm:text-2xl font-bold text-[#1A202C] tracking-tight">
              MINDORA
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Authenticated User */}
                {!user?.hasCompletedQuiz && (
                  <Link
                    href="/"
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm sm:text-sm font-semibold transition-all bg-white hover:bg-gray-50 border border-gray-200 text-[#1A202C]"
                  >
                    <Brain className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Quiz</span>
                  </Link>
                )}
                {user?.hasCompletedQuiz && (
                  <Link
                    href="/my-results"
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm sm:text-sm font-semibold transition-all bg-white hover:bg-gray-50 border border-gray-200 text-[#1A202C]"
                  >
                    <FileText className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Results</span>
                  </Link>
                )}
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
                  <span className="hidden md:inline text-xs text-[#718096]">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm sm:text-sm font-semibold transition-all bg-gray-100 hover:bg-gray-200 text-[#1A202C]"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Not Authenticated */}
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm sm:text-sm font-semibold transition-all bg-white hover:bg-gray-50 border border-gray-200 text-[#1A202C]"
                >
                  <User className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm sm:text-sm font-semibold transition-all bg-primary hover:bg-primary-dark text-white shadow-md"
                >
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
