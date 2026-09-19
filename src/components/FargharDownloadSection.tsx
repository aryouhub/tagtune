/**
 * TagTune - Online MP3 Tag Editor
 * Designed & Architected by Farghar
 * Namespace: Farghar
 */

import React, { useState } from 'react';
import { Farghar } from '../types';
import { FargharTagProcessor } from '../utils/tagProcessor';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface FargharDownloadSectionProps {
  files: Farghar.AudioFile[];
}

export const FargharDownloadSection: React.FC<FargharDownloadSectionProps> = ({ files }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const modifiedFiles = files.filter(f => f.modified);

  const handleDownloadSingle = async (file: Farghar.AudioFile) => {
    try {
      const blob = await FargharTagProcessor.writeTags(file.file, file.tags, file.cover);
      const fileName = file.name.endsWith('.mp3') ? file.name : file.name.replace(/\.[^.]+$/, '.mp3');
      saveAs(blob, fileName);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleDownloadAll = async () => {
    if (modifiedFiles.length === 0) return;
    setIsDownloading(true);
    setProgress(0);

    try {
      const zip = new JSZip();

      for (let i = 0; i < modifiedFiles.length; i++) {
        const file = modifiedFiles[i];
        const blob = await FargharTagProcessor.writeTags(file.file, file.tags, file.cover);
        const fileName = file.name.endsWith('.mp3') ? file.name : file.name.replace(/\.[^.]+$/, '.mp3');
        zip.file(fileName, blob);
        setProgress(Math.round(((i + 1) / modifiedFiles.length) * 100));
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'TagTune-Export.zip');
    } catch (error) {
      console.error('ZIP download error:', error);
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  };

  if (files.length === 0) return null;

  return (
    <div className="farghar-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>💾</span>
            دانلود خروجی
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {modifiedFiles.length > 0
              ? `${modifiedFiles.length} فایل تغییر یافته آماده دانلود`
              : 'هیچ فایلی تغییر نکرده است'
            }
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {modifiedFiles.length > 1 && (
            <button
              onClick={handleDownloadAll}
              disabled={isDownloading || modifiedFiles.length === 0}
              className="farghar-btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <span className="animate-spin">⚙️</span>
                  {progress}%
                </>
              ) : (
                <>
                  <span>📦</span>
                  دانلود ZIP
                </>
              )}
            </button>
          )}

          {modifiedFiles.map(file => (
            <button
              key={file.id}
              onClick={() => handleDownloadSingle(file)}
              className="farghar-btn-secondary text-sm flex items-center gap-2"
            >
              <span>⬇️</span>
              <span className="truncate max-w-[100px]">{file.tags.title || file.name}</span>
            </button>
          ))}
        </div>
      </div>

      {isDownloading && (
        <div className="mt-4">
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full farghar-gradient rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            در حال پردازش {progress}% ...
          </p>
        </div>
      )}
    </div>
  );
};
