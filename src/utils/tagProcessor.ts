/**
 * TagTune - Online MP3 Tag Editor
 * Designed & Architected by Farghar
 * Namespace: Farghar
 */

import { Farghar } from '../types';
import * as mm from 'music-metadata-browser';

// Dynamic import for browser-id3-writer to avoid type issues
let ID3WriterClass: any = null;

async function getID3Writer(): Promise<any> {
  if (!ID3WriterClass) {
    const mod = await import('browser-id3-writer');
    ID3WriterClass = mod.ID3Writer;
  }
  return ID3WriterClass;
}

export namespace FargharTagProcessor {
  export async function readTags(file: File): Promise<{ tags: Farghar.AudioTag; cover: Farghar.CoverArt | null; duration: number }> {
    try {
      const metadata = await mm.parseBlob(file);
      const common = metadata.common;
      const format = metadata.format;

      const tags: Farghar.AudioTag = {
        title: common.title || '',
        artist: common.artist || '',
        album: common.album || '',
        year: common.year ? String(common.year) : '',
        genre: common.genre ? (Array.isArray(common.genre) ? common.genre[0] : common.genre) : '',
        track: common.track && common.track.no ? String(common.track.no) : '',
        composer: common.composer ? (Array.isArray(common.composer) ? common.composer[0] : common.composer) : '',
        comment: common.comment ? (Array.isArray(common.comment) ? common.comment[0] : common.comment) : '',
        bpm: common.bpm ? String(common.bpm) : '',
      };

      let cover: Farghar.CoverArt | null = null;
      if (common.picture && common.picture.length > 0) {
        const pic = common.picture[0];
        cover = {
          data: pic.data,
          mimeType: pic.format || 'image/jpeg',
          description: 'Cover',
          type: 3, // Front Cover
        };
      }

      return {
        tags,
        cover,
        duration: format.duration || 0,
      };
    } catch (error) {
      console.error('Error reading tags:', error);
      return {
        tags: {
          title: '', artist: '', album: '', year: '',
          genre: '', track: '', composer: '', comment: '', bpm: ''
        },
        cover: null,
        duration: 0,
      };
    }
  }

  export async function writeTags(file: File, tags: Farghar.AudioTag, cover: Farghar.CoverArt | null): Promise<Blob> {
    const arrayBuffer = await file.arrayBuffer();
    const WriterClass = await getID3Writer();
    const writer = new WriterClass(arrayBuffer);

    // Set tags
    if (tags.title) writer.setFrame('TIT2', tags.title);
    if (tags.artist) writer.setFrame('TPE1', [tags.artist]);
    if (tags.album) writer.setFrame('TALB', tags.album);
    if (tags.year) writer.setFrame('TYER', tags.year);
    if (tags.genre) writer.setFrame('TCON', [tags.genre]);
    if (tags.track) writer.setFrame('TRCK', tags.track);
    if (tags.composer) writer.setFrame('TCOM', [tags.composer]);
    if (tags.comment) writer.setFrame('COMM', { description: '', text: tags.comment });
    if (tags.bpm) writer.setFrame('TBPM', tags.bpm);

    // Set cover art
    if (cover && cover.data) {
      writer.setFrame('APIC', {
        type: cover.type || 3,
        data: cover.data,
        description: cover.description || 'Cover',
      });
    }

    writer.addTag();
    const taggedBuffer = writer.arrayBuffer;
    return new Blob([taggedBuffer], { type: 'audio/mpeg' });
  }

  export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  export function getFormat(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    return ext;
  }

  export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  export function formatDuration(seconds: number): string {
    if (!seconds || seconds === 0) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  export function isSupportedFormat(fileName: string): boolean {
    const ext = getFormat(fileName);
    return Farghar.SUPPORTED_FORMATS.includes(ext as Farghar.SupportedFormat);
  }

  export function coverToDataUrl(cover: Farghar.CoverArt | null): string {
    if (!cover || !cover.data) return '';
    const blob = new Blob([cover.data as any], { type: cover.mimeType });
    return URL.createObjectURL(blob);
  }
}
