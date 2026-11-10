import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, RefreshCw, ChevronLeft, ChevronRight, Play, CheckCircle2 } from 'lucide-react';
import { CVCWord, VowelType, LetterCase } from '../types/phonics';
import { CVC_WORDS, VOWEL_INFO } from '../data/cvcWords';
import { WordIllustration } from './WordIllustration';
import { sound } from '../utils/soundService';

interface SpellAndBlendProps {
  letterCase: LetterCase;
  onAwardStar: () => void;
  solvedWordIds: Set<string>;
}

export const SpellAndBlend: React.FC<SpellAndBlendProps> = ({
  letterCase,
  onAwardStar,
  solvedWordIds
}) => {
  const [selectedVowelFilter, setSelectedVowelFilter] = useState<'all' | VowelType>('all');
  const [wordIndex, setWordIndex] = useState(0);

  // Current active word list based on filter
  const filteredWords = useMemo(() => {
    if (selectedVowelFilter === 'all') return CVC_WORDS;
    return CVC_WORDS.filter((w) => w.vowel === selectedVowelFilter);
  }, [selectedVowelFilter]);

  const currentWord: CVCWord = filteredWords[wordIndex % filteredWords.length] || CVC_WORDS[0];

  // Current user placed letters: array of 3 strings or nulls [slot0, slot1, slot2]
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>([null, null, null]);

  // Active step during "Sound Out" animation: 0, 1, 2, or 3 (blended), or null
  const [highlightStep, setHighlightStep] = useState<number | null>(null);

  // Interactive slider position (0 to 100) for tactile finger blending
  const [blendProgress, setBlendProgress] = useState(0);

  // Distractor letters available in letter tray
  const [availableTrayLetters, setAvailableTrayLetters] = useState<{ id: string; letter: string; used: boolean }[]>([]);

  // Track if current puzzle is completed
  const isCorrect = useMemo(() => {
    return (
      placedLetters[0]?.toLowerCase() === currentWord.onset &&
      placedLetters[1]?.toLowerCase() === currentWord.vowel &&
      placedLetters[2]?.toLowerCase() === currentWord.coda
    );
  }, [placedLetters, currentWord]);

  // Helper to format letter according to case setting
  const formatLetter = (char: string) => {
    return letterCase === 'upper' ? char.toUpperCase() : char.toLowerCase();
  };

  // Reset or setup letters when word changes
  useEffect(() => {
    setPlacedLetters([null, null, null]);
    setHighlightStep(null);
    setBlendProgress(0);

    // Pick 3 correct letters + 3 random alphabet distractors
    const allAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const targetLetters = [currentWord.onset, currentWord.vowel, currentWord.coda];
    const distractors = allAlphabet
      .filter((c) => !targetLetters.includes(c))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const pool = [...targetLetters, ...distractors]
      .sort(() => 0.5 - Math.random())
      .map((letter, idx) => ({
        id: `${letter}-${idx}-${Date.now()}`,
        letter,
        used: false
      }));

    setAvailableTrayLetters(pool);

    // Pronounce the target word and hint gently
    const timer = setTimeout(() => {
      sound.speakWord(currentWord.word);
    }, 350);

    return () => clearTimeout(timer);
  }, [currentWord]);

  // Handle when word is correctly completed
  useEffect(() => {
    if (isCorrect) {
      sound.playSuccessFanfare();
      sound.speakPraise(`Super! You spelled ${currentWord.word}!`);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }

      onAwardStar();
    }
  }, [isCorrect]);

  // Tap a letter from the tray
  const handleTapTrayLetter = (item: { id: string; letter: string; used: boolean }, itemIndex: number) => {
    if (item.used) return;

    // Find first empty slot
    const emptyIndex = placedLetters.findIndex((l) => l === null);
    if (emptyIndex === -1) return; // all slots full

    sound.playPop();
    sound.playLetterPitch(emptyIndex);
    sound.speakPhoneme(item.letter);

    // Place in slot
    const newPlaced = [...placedLetters];
    newPlaced[emptyIndex] = item.letter;
    setPlacedLetters(newPlaced);

    // Mark tray item as used
    const newTray = [...availableTrayLetters];
    newTray[itemIndex].used = true;
    setAvailableTrayLetters(newTray);
  };

  // Tap a slot to remove letter back to tray
  const handleRemoveFromSlot = (slotIndex: number) => {
    const letter = placedLetters[slotIndex];
    if (!letter) return;

    sound.playPop();

    // Free the letter back in the tray
    const newPlaced = [...placedLetters];
    newPlaced[slotIndex] = null;
    setPlacedLetters(newPlaced);

    // Unmark first matching used tray letter
    const trayIdx = availableTrayLetters.findIndex((item) => item.letter === letter && item.used);
    if (trayIdx !== -1) {
      const newTray = [...availableTrayLetters];
      newTray[trayIdx].used = false;
      setAvailableTrayLetters(newTray);
    }
  };

  // Trigger Sound-Out Sequence
  const handleSoundOut = () => {
    sound.soundOutSequence(currentWord, (step) => {
      setHighlightStep(step);
    });
  };

  // Next Word
  const handleNextWord = () => {
    sound.playPop();
    setWordIndex((prev) => (prev + 1) % filteredWords.length);
  };

  // Prev Word
  const handlePrevWord = () => {
    sound.playPop();
    setWordIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  // Touch/Drag blend slider
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBlendProgress(val);
    if (val < 33) {
      setHighlightStep(0);
      sound.playLetterPitch(0);
    } else if (val < 66) {
      setHighlightStep(1);
      sound.playLetterPitch(1);
    } else if (val < 95) {
      setHighlightStep(2);
      sound.playLetterPitch(2);
    } else {
      setHighlightStep(3);
      sound.playSwoop();
      sound.speakWord(currentWord.word);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Short Vowel Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
          Vowel Sound:
        </span>
        <button
          onClick={() => {
            sound.playPop();
            setSelectedVowelFilter('all');
            setWordIndex(0);
          }}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            selectedVowelFilter === 'all'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Vowels
        </button>
        {(['a', 'e', 'i', 'o', 'u'] as VowelType[]).map((v) => {
          const info = VOWEL_INFO[v];
          const isSelected = selectedVowelFilter === v;
          return (
            <button
              key={v}
              onClick={() => {
                sound.playPop();
                sound.speakPhoneme(v);
                setSelectedVowelFilter(v);
                setWordIndex(0);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-xs scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current opacity-80" />
              <span>Short {info.letter}</span>
            </button>
          );
        })}
      </div>

      {/* Main Game Stage Card */}
      <div className="bg-white rounded-3xl border border-amber-100 shadow-md p-6 sm:p-8 relative overflow-hidden">
        {/* Navigation & Word info header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={handlePrevWord}
            className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1 text-sm font-semibold cursor-pointer"
            aria-label="Previous Word"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2 text-center">
            <span className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-800">
              Family {currentWord.wordFamily}
            </span>
            {solvedWordIds.has(currentWord.id) && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solved
              </span>
            )}
          </div>

          <button
            onClick={handleNextWord}
            className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1 text-sm font-semibold cursor-pointer"
            aria-label="Next Word"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Center Stage: Interactive Illustration & Voice Clue */}
        <div className="flex flex-col items-center justify-center mb-6">
          <WordIllustration
            wordId={currentWord.id}
            isSolved={isCorrect}
            size="lg"
            onClick={() => sound.speakWord(currentWord.word)}
          />

          <p className="text-slate-500 text-sm font-medium mt-2 text-center max-w-sm">
            {currentWord.hint}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => {
                sound.playPop();
                sound.speakWord(currentWord.word);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm rounded-2xl transition-transform active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>Hear Word</span>
            </button>

            <button
              onClick={handleSoundOut}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-sm rounded-2xl transition-transform active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 text-indigo-700 fill-indigo-700" />
              <span>Sound Out</span>
            </button>
          </div>
        </div>

        {/* The 3 CVC Letter Slots (Consonant - Vowel - Consonant) */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 my-6">
          {/* Slot 0: Onset Consonant */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-sky-700 mb-1">First Sound</span>
            <motion.button
              type="button"
              onClick={() => handleRemoveFromSlot(0)}
              animate={highlightStep === 0 || highlightStep === 3 ? { scale: [1, 1.15, 1] } : {}}
              className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-4 flex items-center justify-center text-4xl sm:text-5xl font-fredoka font-bold cursor-pointer transition-all shadow-inner ${
                highlightStep === 0 || highlightStep === 3
                  ? 'border-indigo-500 bg-indigo-50 ring-4 ring-indigo-200'
                  : placedLetters[0]
                  ? 'border-sky-400 bg-sky-50 text-sky-950'
                  : 'border-dashed border-sky-300 bg-sky-50/40 text-slate-300'
              }`}
            >
              {placedLetters[0] ? formatLetter(placedLetters[0]) : '?'}
            </motion.button>
          </div>

          {/* Plus / Blend indicator */}
          <span className="text-2xl font-bold text-slate-300 mt-5">+</span>

          {/* Slot 1: Middle Short Vowel */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-amber-700 mb-1">Middle Vowel</span>
            <motion.button
              type="button"
              onClick={() => handleRemoveFromSlot(1)}
              animate={highlightStep === 1 || highlightStep === 3 ? { scale: [1, 1.15, 1] } : {}}
              className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-4 flex items-center justify-center text-4xl sm:text-5xl font-fredoka font-bold cursor-pointer transition-all shadow-inner ${
                highlightStep === 1 || highlightStep === 3
                  ? 'border-amber-500 bg-amber-50 ring-4 ring-amber-200'
                  : placedLetters[1]
                  ? 'border-amber-400 bg-amber-50 text-amber-950'
                  : 'border-dashed border-amber-300 bg-amber-50/40 text-slate-300'
              }`}
            >
              {placedLetters[1] ? formatLetter(placedLetters[1]) : '?'}
            </motion.button>
          </div>

          {/* Plus / Blend indicator */}
          <span className="text-2xl font-bold text-slate-300 mt-5">+</span>

          {/* Slot 2: Coda Consonant */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-sky-700 mb-1">End Sound</span>
            <motion.button
              type="button"
              onClick={() => handleRemoveFromSlot(2)}
              animate={highlightStep === 2 || highlightStep === 3 ? { scale: [1, 1.15, 1] } : {}}
              className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-4 flex items-center justify-center text-4xl sm:text-5xl font-fredoka font-bold cursor-pointer transition-all shadow-inner ${
                highlightStep === 2 || highlightStep === 3
                  ? 'border-indigo-500 bg-indigo-50 ring-4 ring-indigo-200'
                  : placedLetters[2]
                  ? 'border-sky-400 bg-sky-50 text-sky-950'
                  : 'border-dashed border-sky-300 bg-sky-50/40 text-slate-300'
              }`}
            >
              {placedLetters[2] ? formatLetter(placedLetters[2]) : '?'}
            </motion.button>
          </div>
        </div>

        {/* Tactile Blending Finger Slider */}
        <div className="max-w-md mx-auto my-6 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>👈 Blend Sound</span>
            <span className="text-indigo-600 font-bold">Slide to Blend! 👉</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={blendProgress}
            onChange={handleSliderChange}
            onMouseUp={() => setBlendProgress(0)}
            onTouchEnd={() => setBlendProgress(0)}
            className="w-full h-3 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Letter Bank / Tray */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-center text-sm font-bold text-slate-600 mb-4">
            Tap the letters to build the word:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <AnimatePresence>
              {availableTrayLetters.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleTapTrayLetter(item, idx)}
                  disabled={item.used}
                  whileHover={!item.used ? { scale: 1.1, y: -4 } : {}}
                  whileTap={!item.used ? { scale: 0.9 } : {}}
                  className={`w-16 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-fredoka font-bold transition-all shadow-sm cursor-pointer ${
                    item.used
                      ? 'bg-slate-100 text-slate-300 border border-slate-200 opacity-40 cursor-not-allowed'
                      : ['a', 'e', 'i', 'o', 'u'].includes(item.letter)
                      ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1'
                      : 'bg-sky-400 hover:bg-sky-300 text-sky-950 border-b-4 border-sky-600 active:border-b-0 active:translate-y-1'
                  }`}
                >
                  {formatLetter(item.letter)}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Solved celebration banner */}
        {isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
                ⭐
              </div>
              <div>
                <h4 className="font-fredoka text-lg font-bold text-emerald-900">
                  Hooray! You blended {currentWord.word.toUpperCase()}!
                </h4>
                <p className="text-xs text-emerald-700">
                  Great job hearing and spelling the {currentWord.wordFamily} sound family!
                </p>
              </div>
            </div>

            <button
              onClick={handleNextWord}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Next Word →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
