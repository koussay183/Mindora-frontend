/**
 * ShareResult Component
 * Clean action buttons
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Share2, RefreshCw, FileText, Check } from 'lucide-react';

interface ShareResultProps {
  token: string;
}

export const ShareResult: React.FC<ShareResultProps> = ({ token }) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const resultUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/result/${token}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(resultUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Silently fail - user will see the button didn't work
    }
  };

  return (
    <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-[#1A202C] rounded-xl font-semibold hover:border-gray-300 transition-colors uppercase text-xs tracking-wider"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </>
          )}
        </button>

        <button
          onClick={() => router.push('/')}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1A202C] text-white rounded-xl font-bold hover:bg-[#2D3748] transition-colors uppercase text-xs tracking-wider"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retake</span>
        </button>

        <button
          onClick={() => router.push('/my-results')}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-[#1A202C] rounded-xl font-semibold hover:border-[#1A202C] transition-colors uppercase text-xs tracking-wider"
        >
          <FileText className="w-4 h-4" />
          <span>Results</span>
        </button>
      </div>
    </div>
  );
};
