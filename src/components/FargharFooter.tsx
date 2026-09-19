/**
 * TagTune - Online MP3 Tag Editor
 * Designed & Architected by Farghar
 * Namespace: Farghar
 */

import React from 'react';

export const FargharFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/5 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 farghar-gradient rounded-lg flex items-center justify-center">
                <span className="text-sm">🎵</span>
              </div>
              <span className="font-bold farghar-gradient-text">TagTune</span>
            </div>
            <p className="text-sm text-gray-400">
              ویرایشگر آنلاین تگ و کاور موسیقی.
              <br />
              تگ بزن، تنظیم کن، تمام.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">قابلیت‌ها</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✏️ ویرایش تگ‌های ID3v1 و ID3v2</li>
              <li>🖼️ مدیریت کاور آلبوم</li>
              <li>📦 ویرایش گروهی چند فایل</li>
              <li>📥 دانلود تکی یا ZIP</li>
              <li>🔒 پردازش کاملاً محلی</li>
            </ul>
          </div>

          {/* Security */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">امنیت و حریم خصوصی</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>🔐 تمام پردازش‌ها در مرورگر شما</li>
              <li>🚫 هیچ فایلی به سرور ارسال نمی‌شود</li>
              <li>🗑️ فایل‌ها پس از دانلود حذف می‌شوند</li>
              <li>🌐 بدون نیاز به ثبت‌نام</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            طراحی و معماری توسط <span className="text-purple-400 font-medium">Farghar</span>
          </p>
          <p className="text-xs text-gray-500">
            TagTune — Online MP3 Tag Editor © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
