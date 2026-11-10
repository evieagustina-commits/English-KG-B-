import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';
import { LetterCase } from '../types/phonics';
import { ALPHABET_PHONICS, CVC_WORDS } from '../data/cvcWords';
import { sound } from '../utils/soundService';

interface PhonicsSoundboardProps {
  letterCase: LetterCase;
  onAwardStar: () => void;
}

export const PhonicsSoundboard: React.FC<PhonicsSoundboardProps> = ({
  letterCase,
  onAwardStar
}) => {
  const [filter, setFilter] = useState<'all' | 'vowels' | 'consonants'>('all');
  const [activeLetter, setActiveLetter] = useState<string>('a');

  const formatLetter = (char: string) => {
    return letterCase === 'upper' ? char.toUpperCase() : char.toLowerCase();
  };

  const filteredAlphabet = ALPHABET_PHONICS.filter((item) => {
    if (filter === 'vowels') return item.isVowel;
    if (filter === 'consonants') return !item.isVowel;
    return true;
  });

  const activePhonicsItem =
    ALPHABET_PHONICS.find((i) => i.letter === activeLetter) || ALPHABET_PHONICS[0];

  // Find a matching CVC word in our database for this letter
  const matchingWord = CVC_WORDS.find(
    (w) => w.onset === activeLetter || w.vowel === activeLetter || w.coda === activeLetter
  );

  const handleLetterTap = (letter: string) => {
    setActiveLetter(letter);
    sound.playPop();

    const item = ALPHABET_PHONICS.find((i) => i.letter === letter);
    if (item) {
      sound.speakPhoneme(letter, () => {
        setTimeout(() => {
          sound.speakWord(item.example);
        }, 300);
      });
      onAwardStar();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Category filter tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => {
            sound.playPop();
            setFilter('all');
          }}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Alphabet (A-Z)
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setFilter('vowels');
          }}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            filter === 'vowels'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Short Vowels Only (A, E, I, O, U)
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setFilter('consonants');
          }}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            filter === 'consonants'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Consonants Only
        </button>
      </div>

      {/* Featured Active Letter Spotlight Card */}
      <div className="bg-white rounded-3xl border border-amber-100 shadow-md p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center text-6xl sm:text-7xl font-fredoka font-bold shadow-md ${
              activePhonicsItem.isVowel
                ? 'bg-amber-400 text-amber-950 border-b-6 border-amber-600'
                : 'bg-sky-400 text-sky-950 border-b-6 border-sky-600'
            }`}
          >
            {formatLetter(activePhonicsItem.letter)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  activePhonicsItem.isVowel
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {activePhonicsItem.isVowel ? 'Vowel Sound' : 'Consonant Sound'}
              </span>
            </div>

            <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
              Letter {formatLetter(activePhonicsItem.letter)} says "{activePhonicsItem.sound}"
            </h3>

            <p className="text-sm text-slate-500 font-medium mt-1">
              Example word:{' '}
              <span className="font-bold text-indigo-600 capitalize">
                {activePhonicsItem.example}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => handleLetterTap(activePhonicsItem.letter)}
          className="flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-2xl shadow-sm transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <Volume2 className="w-5 h-5" />
          <span>Play Sound Cue</span>
        </button>
      </div>

      {/* 26-Letter Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-3">
        {filteredAlphabet.map((item) => {
          const isActive = item.letter === activeLetter;
          return (
            <motion.button
              key={item.letter}
              type="button"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleLetterTap(item.letter)}
              className={`h-22 rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer shadow-xs ${
                isActive
                  ? 'ring-4 ring-indigo-400 scale-105 z-10'
                  : ''
              } ${
                item.isVowel
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-950 border border-sky-200'
              }`}
            >
              <span className="font-fredoka text-3xl sm:text-4xl font-bold">
                {formatLetter(item.letter)}
              </span>
              <span className="text-xs font-semibold text-slate-500 mt-1 truncate max-w-full">
                /{item.sound}/
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
