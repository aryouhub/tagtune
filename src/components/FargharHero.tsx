/**
 * TagTune - Online MP3 Tag Editor
 * Designed & Architected by Farghar
 * Namespace: Farghar
 */

import React from 'react';

interface FargharHeroProps {
  hasFiles: boolean;
}

export const FargharHero: React.FC<FargharHeroProps> = ({ hasFiles }) => {
  if (hasFiles) return null;

  return (
    <div className="text-center py-8 sm:py-12 farghar-fade-in">
      {/* Animated logo */}
      <div className="relative inline-block mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 farghar-gradient rounded-3xl flex items-center justify-center farghar-pulse-glow">
          <span className="text-4xl sm:text-5xl">🎵</span>
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-xs animate-bounce">
          ✓
        </div>
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
        ویرایشگر آنلاین تگ موسیقی
      </h2>
      <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-xl mx-auto">
        تگ‌ها و کاور فایل‌های موسیقی‌تان را مستقیماً در مرورگر ویرایش کنید.
        <br className="hidden sm:block" />
        رایگان، امن و بدون نیاز به نصب نرم‌افزار.
      </p>

      {/* Features */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
        {[
          { icon: '🏷️', label: 'ویرایش تگ ID3' },
          { icon: '🖼️', label: 'مدیریت کاور' },
          { icon: '📦', label: 'ویرایش گروهی' },
          { icon: '🔒', label: 'پردازش محلی' },
        ].map((feature, i) => (
          <div
            key={i}
            className="farghar-glass farghar-glass-hover rounded-xl p-3 text-center"
          >
            <span className="text-xl sm:text-2xl block mb-1">{feature.icon}</span>
            <span className="text-xs sm:text-sm text-gray-300">{feature.label}</span>
          </div>
        ))}
      </div>

      {/* Supported formats */}
      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-xs text-gray-500">پشتیبانی از:</span>
        {['MP3', 'MP4', 'M4A', 'WAV', 'FLAC', 'OGG', 'MKV', 'MOV', 'FLV'].map(format => (
          <span key={format} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
            {format}
          </span>
        ))}
      </div>
    </div>
  );
};
