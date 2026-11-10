export type VowelType = 'a' | 'e' | 'i' | 'o' | 'u';

export interface CVCWord {
  id: string;
  word: string;
  onset: string;      // First consonant: e.g. "c"
  vowel: VowelType;   // Middle vowel: e.g. "a"
  coda: string;       // Ending consonant: e.g. "t"
  phonemes: [string, string, string]; // e.g. ["k", "æ", "t"] or ["c", "a", "t"]
  spokenPhonemes: [string, string, string]; // speech synthesis cue, e.g. ["kuh", "ah", "tuh"]
  wordFamily: string; // e.g. "-at", "-og", "-un"
  label: string;      // display label
  hint: string;       // kindergarten-friendly clue
  colorTheme: {
    bg: string;
    border: string;
    accent: string;
  };
}

export type GameMode = 'spell-blend' | 'missing-sound' | 'word-family' | 'soundboard' | 'sticker-book';

export type LetterCase = 'lower' | 'upper';

export interface StickerReward {
  id: string;
  title: string;
  emoji: string;
  description: string;
  unlockedAtWordCount: number;
}
