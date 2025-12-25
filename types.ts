
export enum SongLanguage {
  PERSIAN = 'Persian',
  ENGLISH = 'English',
  KURDISH = 'Kurdish',
  ARABIC = 'Arabic',
  TURKISH = 'Turkish',
  OTHER = 'Other'
}

export interface SongResult {
  songTitle: string;
  artistName: string;
  language: string;
  confidence: number;
  downloadUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  summary?: string;
  sources?: string[];
}

export interface SearchFormData {
  artist: string;
  lyrics: string;
  language: SongLanguage;
}
