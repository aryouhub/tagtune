/**
 * TagTune - Online MP3 Tag Editor
 * Designed & Architected by Farghar
 * Namespace: Farghar
 */

import React, { useState, useRef, useCallback } from 'react';
import { Farghar } from '../types';
import { FargharTagProcessor } from '../utils/tagProcessor';

interface FargharTagEditorProps {
  file: Farghar.AudioFile;
  onUpdate: (file: Farghar.AudioFile) => void;
  onRemove: (id: string) => void;
  isBatchMode?: boolean;
}

export const FargharTagEditor: React.FC<FargharTagEditorProps> = ({ file, onUpdate, onRemove, isBatchMode }) => {
  const [tags, setTags] = useState<Farghar.AudioTag>({ ...file.tags });
  const [cover, setCover] = useState<Farghar.CoverArt | null>(file.cover);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const coverUrl = FargharTagProcessor.coverToDataUrl(cover);

  const handleTagChange = useCallback((field: keyof Farghar.AudioTag, value: string) => {
    setTags(prev => ({ ...prev, [field]: value }));
    const updatedFile = {
      ...file,
      tags: { ...file.tags, [field]: value },
      modified: true,
      status: 'editing' as const,
    };
    onUpdate(updatedFile);
  }, [file, onUpdate]);

  const handleCoverUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const coverFile = e.target.files?.[0];
    if (!coverFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      const newCover: Farghar.CoverArt = {
        data: uint8Array,
        mimeType: coverFile.type || 'image/jpeg',
        description: 'Cover',
        type: 3,
      };
      setCover(newCover);
      onUpdate({ ...file, cover: newCover, modified: true, status: 'editing' });
    };
    reader.readAsArrayBuffer(coverFile);
    e.target.value = '';
  }, [file, onUpdate]);

  const handleCoverRemove = useCallback(() => {
    setCover(null);
    onUpdate({ ...file, cover: null, modified: true, status: 'editing' });
  }, [file, onUpdate]);

  return (
    <div className="farghar-card farghar-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Cover */}
          <div
            onClick={() => coverInputRef.current?.click()}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden cursor-pointer group flex-shrink-0"
          >
            {coverUrl ? (
              <>
                <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs">تغییر</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center border-2 border-dashed border-white/20 group-hover:border-purple-400/50 transition-colors">
                <span className="text-2xl">🖼️</span>
              </div>
            )}
          </div>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="hidden"
          />

          {/* File info */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white truncate max-w-[200px] sm:max-w-[300px]">
              {file.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="farghar-badge bg-blue-500/20 text-blue-300 text-[10px]">
                {file.format.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">
                {FargharTagProcessor.formatFileSize(file.size)}
              </span>
              <span className="text-xs text-gray-500">
                {FargharTagProcessor.formatDuration(file.duration)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onRemove(file.id)}
          className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
          title="حذف فایل"
        >
          ✕
        </button>
      </div>

      {/* Cover actions */}
      {coverUrl && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => coverInputRef.current?.click()}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
          >
            🔄 جایگزینی
          </button>
          <button
            onClick={handleCoverRemove}
            className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors"
          >
            🗑️ حذف کاور
          </button>
        </div>
      )}

      {/* Tag fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">عنوان (Title)</label>
          <input
            type="text"
            value={tags.title}
            onChange={(e) => handleTagChange('title', e.target.value)}
            className="farghar-input text-sm"
            placeholder="نام آهنگ..."
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">هنرمند (Artist)</label>
          <input
            type="text"
            value={tags.artist}
            onChange={(e) => handleTagChange('artist', e.target.value)}
            className="farghar-input text-sm"
            placeholder="نام هنرمند..."
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">آلبوم (Album)</label>
          <input
            type="text"
            value={tags.album}
            onChange={(e) => handleTagChange('album', e.target.value)}
            className="farghar-input text-sm"
            placeholder="نام آلبوم..."
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">سال (Year)</label>
          <input
            type="text"
            value={tags.year}
            onChange={(e) => handleTagChange('year', e.target.value)}
            className="farghar-input text-sm"
            placeholder="1403"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">ژانر (Genre)</label>
          <select
            value={tags.genre}
            onChange={(e) => handleTagChange('genre', e.target.value)}
            className="farghar-input text-sm"
          >
            <option value="">انتخاب ژانر...</option>
            {Farghar.GENRES.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">شماره ترک (Track)</label>
          <input
            type="text"
            value={tags.track}
            onChange={(e) => handleTagChange('track', e.target.value)}
            className="farghar-input text-sm"
            placeholder="1"
          />
        </div>
      </div>

      {/* Advanced fields */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
      >
        <span>{showAdvanced ? '▼' : '▶'}</span>
        فیلدهای پیشرفته
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 farghar-fade-in">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">آهنگساز (Composer)</label>
            <input
              type="text"
              value={tags.composer}
              onChange={(e) => handleTagChange('composer', e.target.value)}
              className="farghar-input text-sm"
              placeholder="نام آهنگساز..."
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">BPM</label>
            <input
              type="text"
              value={tags.bpm}
              onChange={(e) => handleTagChange('bpm', e.target.value)}
              className="farghar-input text-sm"
              placeholder="120"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-400 mb-1.5">توضیحات (Comment)</label>
            <textarea
              value={tags.comment}
              onChange={(e) => handleTagChange('comment', e.target.value)}
              className="farghar-input text-sm resize-none h-20"
              placeholder="توضیحات..."
            />
          </div>
        </div>
      )}

      {/* Status */}
      {file.modified && (
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-xs text-yellow-400">تغییرات ذخیره نشده</span>
        </div>
      )}
    </div>
  );
};
