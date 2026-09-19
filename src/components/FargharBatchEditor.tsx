/**
 * TagTune - Online MP3 Tag Editor
 * Designed & Architected by Farghar
 * Namespace: Farghar
 */

import React, { useState } from 'react';
import { Farghar } from '../types';

interface FargharBatchEditorProps {
  files: Farghar.AudioFile[];
  onBatchUpdate: (updates: Partial<Farghar.AudioTag>) => void;
}

export const FargharBatchEditor: React.FC<FargharBatchEditorProps> = ({ files, onBatchUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [batchTags, setBatchTags] = useState<Partial<Farghar.AudioTag>>({
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
  });
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set());

  const toggleField = (field: string) => {
    setSelectedFields(prev => {
      const next = new Set(prev);
      if (next.has(field)) next.delete(field);
      else next.add(field);
      return next;
    });
  };

  const handleApply = () => {
    const updates: Partial<Farghar.AudioTag> = {};
    selectedFields.forEach(field => {
      const key = field as keyof Farghar.AudioTag;
      if (batchTags[key]) {
        updates[key] = batchTags[key];
      }
    });
    if (Object.keys(updates).length > 0) {
      onBatchUpdate(updates);
      setBatchTags({ title: '', artist: '', album: '', year: '', genre: '' });
      setSelectedFields(new Set());
    }
  };

  if (files.length < 2) return null;

  return (
    <div className="farghar-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-right"
      >
        <div className="flex items-center gap-2">
          <span>📝</span>
          <span className="text-sm font-medium text-white">ویرایش گروهی</span>
          <span className="farghar-badge bg-purple-500/20 text-purple-300 text-[10px]">
            {files.length} فایل
          </span>
        </div>
        <span className="text-gray-400">{isOpen ? '▼' : '◀'}</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 farghar-fade-in">
          <p className="text-xs text-gray-400">
            فیلدهایی که می‌خواهید تغییر دهید را انتخاب کنید و مقدار جدید را وارد کنید:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['title', 'artist', 'album', 'year', 'genre'] as const).map(field => {
              const labels: Record<string, string> = {
                title: 'عنوان',
                artist: 'هنرمند',
                album: 'آلبوم',
                year: 'سال',
                genre: 'ژانر',
              };

              return (
                <div key={field} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFields.has(field)}
                    onChange={() => toggleField(field)}
                    className="mt-3 w-4 h-4 rounded accent-purple-500"
                  />
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1.5">{labels[field]}</label>
                    {field === 'genre' ? (
                      <select
                        value={batchTags[field] || ''}
                        onChange={(e) => setBatchTags(prev => ({ ...prev, [field]: e.target.value }))}
                        disabled={!selectedFields.has(field)}
                        className="farghar-input text-sm disabled:opacity-50"
                      >
                        <option value="">انتخاب...</option>
                        {Farghar.GENRES.map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={batchTags[field] || ''}
                        onChange={(e) => setBatchTags(prev => ({ ...prev, [field]: e.target.value }))}
                        disabled={!selectedFields.has(field)}
                        className="farghar-input text-sm disabled:opacity-50"
                        placeholder={`مقدار جدید برای ${labels[field]}...`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleApply}
            disabled={selectedFields.size === 0}
            className="farghar-btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            اعمال تغییرات روی {files.length} فایل
          </button>
        </div>
      )}
    </div>
  );
};
