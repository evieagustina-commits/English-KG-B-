/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameMode, LetterCase } from './types/phonics';
import { Navbar } from './components/Navbar';
import { SpellAndBlend } from './components/SpellAndBlend';
import { MissingSoundGame } from './components/MissingSoundGame';
import { WordFamilyRoller } from './components/WordFamilyRoller';
import { PhonicsSoundboard } from './components/PhonicsSoundboard';
import { StickerBook } from './components/StickerBook';
import { TeacherSettingsModal } from './components/TeacherSettingsModal';
import { sound } from './utils/soundService';
import { Sparkles, BookOpen, Volume2, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('spell-blend');
  const [starCount, setStarCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cvc_star_count');
      return saved ? parseInt(saved, 10) : 3; // start with 3 starter stars for warm welcome!
    } catch {
      return 3;
    }
  });

  const [solvedWordIds, setSolvedWordIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('cvc_solved_words');
      return saved ? new Set(JSON.parse(saved)) : new Set(['cat']);
    } catch {
      return new Set(['cat']);
    }
  });

  const [letterCase, setLetterCase] = useState<LetterCase>('lower');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<'normal' | 'slow'>('normal');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Sync star count to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cvc_star_count', starCount.toString());
    } catch {
      // ignore
    }
  }, [starCount]);

  // Sync solved words to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cvc_solved_words', JSON.stringify(Array.from(solvedWordIds)));
    } catch {
      // ignore
    }
  }, [solvedWordIds]);

  const handleAwardStar = (wordId?: string) => {
    setStarCount((prev) => prev + 1);
    if (wordId) {
      setSolvedWordIds((prev) => new Set(prev).add(wordId));
    }
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sound.soundEffectsEnabled = nextVal;
    sound.voiceEnabled = nextVal;
  };

  const handleChangeSpeechRate = (rate: 'normal' | 'slow') => {
    setSpeechRate(rate);
    sound.speechRate = rate === 'slow' ? 0.68 : 0.82;
  };

  const handleResetProgress = () => {
    setStarCount(0);
    setSolvedWordIds(new Set());
    try {
      localStorage.removeItem('cvc_star_count');
      localStorage.removeItem('cvc_solved_words');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-800 font-fredoka antialiased selection:bg-amber-200">
      {/* Top Bar Header */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          sound.playPop();
          setCurrentMode(mode);
        }}
        starCount={starCount}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenSettings={() => {
          sound.playPop();
          setIsSettingsOpen(true);
        }}
      />

      {/* Mobile Mode Switcher Bar */}
      <div className="lg:hidden flex items-center justify-start gap-1 p-2 bg-amber-50/80 border-b border-amber-100 overflow-x-auto scrollbar-none">
        <button
          onClick={() => {
            sound.playPop();
            setCurrentMode('spell-blend');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
            currentMode === 'spell-blend'
              ? 'bg-amber-400 text-amber-950 shadow-xs'
              : 'text-slate-600 hover:bg-amber-100/60'
          }`}
        >
          Spell & Blend
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setCurrentMode('missing-sound');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
            currentMode === 'missing-sound'
              ? 'bg-amber-400 text-amber-950 shadow-xs'
              : 'text-slate-600 hover:bg-amber-100/60'
          }`}
        >
          Missing Sound
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setCurrentMode('word-family');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
            currentMode === 'word-family'
              ? 'bg-amber-400 text-amber-950 shadow-xs'
              : 'text-slate-600 hover:bg-amber-100/60'
          }`}
        >
          Rhyme Families
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setCurrentMode('soundboard');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
            currentMode === 'soundboard'
              ? 'bg-amber-400 text-amber-950 shadow-xs'
              : 'text-slate-600 hover:bg-amber-100/60'
          }`}
        >
          Phonics Letters
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setCurrentMode('sticker-book');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
            currentMode === 'sticker-book'
              ? 'bg-amber-400 text-amber-950 shadow-xs'
              : 'text-slate-600 hover:bg-amber-100/60'
          }`}
        >
          Star Jar ({starCount})
        </button>
      </div>

      {/* Main Dynamic Viewport Stage */}
      <main className="flex-1 flex flex-col justify-center py-4">
        {currentMode === 'spell-blend' && (
          <SpellAndBlend
            letterCase={letterCase}
            onAwardStar={() => handleAwardStar()}
            solvedWordIds={solvedWordIds}
          />
        )}

        {currentMode === 'missing-sound' && (
          <MissingSoundGame
            letterCase={letterCase}
            onAwardStar={() => handleAwardStar()}
          />
        )}

        {currentMode === 'word-family' && (
          <WordFamilyRoller
            letterCase={letterCase}
            onAwardStar={() => handleAwardStar()}
          />
        )}

        {currentMode === 'soundboard' && (
          <PhonicsSoundboard
            letterCase={letterCase}
            onAwardStar={() => handleAwardStar()}
          />
        )}

        {currentMode === 'sticker-book' && (
          <StickerBook
            starCount={starCount}
            solvedWordCount={solvedWordIds.size}
          />
        )}
      </main>

      {/* Quiet, supportive educational footer */}
      <footer className="py-4 px-6 border-t border-amber-100/80 bg-white/60 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          <span>Interactive Phonics for Kindergarten B (TK B)</span>
          <span aria-hidden="true">·</span>
          <span>CVC Word Decoding & Encoding</span>
        </div>

        <div className="flex items-center gap-4 font-semibold text-slate-600">
          <button
            onClick={() => {
              sound.playPop();
              setIsSettingsOpen(true);
            }}
            className="hover:text-amber-700 transition-colors cursor-pointer"
          >
            Teacher Guide & Settings
          </button>
          <span aria-hidden="true">·</span>
          <span className="text-amber-800 font-bold">⭐ {starCount} Stars Earned</span>
        </div>
      </footer>

      {/* Teacher / Parent Settings Modal */}
      <TeacherSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        letterCase={letterCase}
        onChangeLetterCase={setLetterCase}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        speechRate={speechRate}
        onChangeSpeechRate={handleChangeSpeechRate}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
