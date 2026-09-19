/**
 * TagTune - Online MP3 Tag Editor
 * Designed & Architected by Farghar
 * Namespace: Farghar
 */

import React from 'react';

interface FargharHeaderProps {
  fileCount: number;
}

export const FargharHeader: React.FC<FargharHeaderProps> = ({ fileCount }) => {
  return (
    <header className="sticky top-0 z-50 farghar-glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 farghar-gradient rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-xl sm:text-2xl">🎵</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold farghar-gradient-text">TagTune</h1>
              <p className="text-xs text-gray-400 hidden sm:block">تگ بزن، تنظیم کن، تمام.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            {fileCount > 0 && (
              <div className="farghar-badge bg-purple-500/20 text-purple-300">
                <span className="mr-1">📁</span>
                {fileCount} فایل
              </div>
            )}
            <div className="farghar-badge bg-green-500/20 text-green-300">
              <span className="mr-1">🔒</span>
              <span className="hidden sm:inline">امن و محلی</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
