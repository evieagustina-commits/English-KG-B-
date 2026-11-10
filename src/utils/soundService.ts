/**
 * Phonics & Interactive Sound Service for Kindergarten B
 * Uses Web Audio API for harmonic chime cues & pops
 * Uses Web Speech Synthesis for clear phoneme & word pronunciation
 */

import { CVCWord } from '../types/phonics';

class SoundService {
  private audioCtx: AudioContext | null = null;
  public soundEffectsEnabled: boolean = true;
  public voiceEnabled: boolean = true;
  public speechRate: number = 0.82; // slightly slower, clear for 5-6 yr olds
  public speechPitch: number = 1.15; // friendly, warm kindergarten-friendly pitch

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // --- Web Audio Harmonic Effects ---

  /** Play a bubble pop when touching/dragging a tile */
  playPop() {
    if (!this.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio context might be restricted before first gesture
    }
  }

  /** Play a tactile snap when a letter lands in a slot */
  playSnap() {
    if (!this.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.12);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // ignore
    }
  }

  /** Play melodic ascending chime for letter slot progression (Onset: C5, Vowel: E5, Coda: G5) */
  playLetterPitch(slotIndex: number) {
    if (!this.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const pitches = [523.25, 659.25, 783.99]; // C5, E5, G5
      const freq = pitches[slotIndex % pitches.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // ignore
    }
  }

  /** Uplifting cheerful fanfare when word is blended & solved */
  playSuccessFanfare() {
    if (!this.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = ctx.currentTime + i * 0.1;
        const duration = i === notes.length - 1 ? 0.45 : 0.15;

        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + duration + 0.05);
      });
    } catch {
      // ignore
    }
  }

  /** Gentle friendly "try again" wobble */
  playGentleTryAgain() {
    if (!this.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;

      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(270, now + 0.15);
      osc.frequency.linearRampToValueAtTime(240, now + 0.3);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // ignore
    }
  }

  /** Sound when dragging or sliding the blend bar */
  playSwoop() {
    if (!this.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;

      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.22);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    } catch {
      // ignore
    }
  }

  // --- Phonics Spoken Speech ---

  /** Speak an isolated phoneme */
  speakPhoneme(phoneme: string, onEnd?: () => void) {
    if (!this.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();

    // Map phonemes to Kindergarten B pronunciation hints if needed
    const phonemeMap: Record<string, string> = {
      c: 'kuh',
      b: 'buh',
      d: 'duh',
      g: 'guh',
      h: 'huh',
      j: 'juh',
      k: 'kuh',
      m: 'mmm',
      n: 'nnn',
      p: 'puh',
      r: 'rrr',
      s: 'sss',
      t: 'tuh',
      w: 'wuh',
      x: 'ks',
      z: 'zzz',
      a: 'ah',
      e: 'eh',
      i: 'ih',
      o: 'aw',
      u: 'uh'
    };

    const textToSpeak = phonemeMap[phoneme.toLowerCase()] || phoneme;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = this.speechRate;
    utterance.pitch = this.speechPitch;
    utterance.lang = 'en-US';

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  }

  /** Speak full word */
  speakWord(word: string, onEnd?: () => void) {
    if (!this.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = this.speechRate;
    utterance.pitch = this.speechPitch;
    utterance.lang = 'en-US';

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  }

  /** Speak an encouraging phrase */
  speakPraise(phrase?: string) {
    if (!this.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const praises = [
      'Awesome job!',
      'You did it!',
      'Super reader!',
      'Great blending!',
      'Hooray! You got it!',
      'Star work!'
    ];
    const text = phrase || praises[Math.floor(Math.random() * praises.length)];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.2;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  /** Sequential Sound-Out: lights up letter 1 -> letter 2 -> letter 3 -> blended word */
  async soundOutSequence(
    wordObj: CVCWord,
    onStepChange: (stepIndex: number | null) => void,
    onComplete?: () => void
  ) {
    // Letter 1 (Onset)
    onStepChange(0);
    this.playLetterPitch(0);
    this.speakPhoneme(wordObj.spokenPhonemes[0]);
    await new Promise((res) => setTimeout(res, 850));

    // Letter 2 (Vowel)
    onStepChange(1);
    this.playLetterPitch(1);
    this.speakPhoneme(wordObj.spokenPhonemes[1]);
    await new Promise((res) => setTimeout(res, 850));

    // Letter 3 (Coda)
    onStepChange(2);
    this.playLetterPitch(2);
    this.speakPhoneme(wordObj.spokenPhonemes[2]);
    await new Promise((res) => setTimeout(res, 850));

    // Blend together!
    onStepChange(3); // 3 represents the whole blended word
    this.playSwoop();
    this.speakWord(wordObj.word);
    await new Promise((res) => setTimeout(res, 1000));

    onStepChange(null);
    if (onComplete) onComplete();
  }
}

export const sound = new SoundService();
