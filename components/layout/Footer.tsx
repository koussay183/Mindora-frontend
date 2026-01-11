/**
 * Footer Component
 * Ultra minimal footer
 */

'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
        <div className="flex justify-between items-center text-[8px] sm:text-[10px] md:text-xs text-[#718096] uppercase tracking-wider">
          <span className="font-bold">MINDORA</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
