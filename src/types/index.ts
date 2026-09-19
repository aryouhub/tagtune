/**
 * TagTune - Online MP3 Tag Editor
 * Designed & Architected by Farghar
 * Namespace: Farghar
 */

export namespace Farghar {
  export interface AudioTag {
    title: string;
    artist: string;
    album: string;
    year: string;
    genre: string;
    track: string;
    composer: string;
    comment: string;
    bpm: string;
  }

  export interface CoverArt {
    data: Uint8Array | null;
    mimeType: string;
    description: string;
    type: number;
  }

  export interface AudioFile {
    id: string;
    file: File;
    name: string;
    size: number;
    format: string;
    tags: AudioTag;
    cover: CoverArt | null;
    duration: number;
    status: 'loading' | 'ready' | 'editing' | 'done' | 'error';
    modified: boolean;
  }

  export interface ProcessingState {
    isProcessing: boolean;
    progress: number;
    currentFile: string;
    totalFiles: number;
    processedFiles: number;
  }

  export type SupportedFormat = 'mp3' | 'mp4' | 'm4a' | 'wav' | 'flac' | 'ogg' | 'mkv' | 'mov' | 'flv';

  export const SUPPORTED_FORMATS: SupportedFormat[] = [
    'mp3', 'mp4', 'm4a', 'wav', 'flac', 'ogg', 'mkv', 'mov', 'flv'
  ];

  export const ACCEPTED_MIME_TYPES = [
    'audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/m4a', 'audio/x-m4a',
    'audio/wav', 'audio/wave', 'audio/x-wav', 'audio/flac', 'audio/x-flac',
    'audio/ogg', 'video/mp4', 'video/x-matroska', 'video/quicktime',
    'video/x-flv', 'video/webm'
  ];

  export const GENRES = [
    'Blues', 'Classic Rock', 'Country', 'Dance', 'Disco', 'Funk', 'Grunge',
    'Hip-Hop', 'Jazz', 'Metal', 'New Age', 'Oldies', 'Other', 'Pop', 'R&B',
    'Rap', 'Reggae', 'Rock', 'Techno', 'Industrial', 'Alternative', 'Ska',
    'Death Metal', 'Pranks', 'Soundtrack', 'Euro-Techno', 'Ambient',
    'Trip-Hop', 'Vocal', 'Jazz+Funk', 'Fusion', 'Trance', 'Classical',
    'Instrumental', 'Acid', 'House', 'Game', 'Sound Clip', 'Gospel',
    'Noise', 'AlternRock', 'Bass', 'Soul', 'Punk', 'Space', 'Meditative',
    'Instrumental Pop', 'Instrumental Rock', 'Ethnic', 'Gothic',
    'Darkwave', 'Techno-Industrial', 'Electronic', 'Pop-Folk', 'Eurodance',
    'Dream', 'Southern Rock', 'Comedy', 'Cult', 'Gangsta', 'Top 40',
    'Christian Rap', 'Pop/Funk', 'Jungle', 'Native American', 'Cabaret',
    'New Wave', 'Psychedelic', 'Rave', 'Showtunes', 'Trailer', 'Lo-Fi',
    'Tribal', 'Acid Punk', 'Acid Jazz', 'Polka', 'Retro', 'Musical',
    'Rock & Roll', 'Hard Rock'
  ];
}
