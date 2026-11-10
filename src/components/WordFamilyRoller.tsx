import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, ArrowRight, RotateCw } from 'lucide-react';
import { LetterCase, CVCWord } from '../types/phonics';
import { CVC_WORDS, WORD_FAMILIES } from '../data/cvcWords';
import { WordIllustration } from './WordIllustration';
import { sound } from '../utils/soundService';

interface WordFamilyRollerProps {
  letterCase: LetterCase;
  onAwardStar: () => void;
}

export const WordFamilyRoller: React.FC<WordFamilyRollerProps> = ({
  letterCase,
  onAwardStar
}) => {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('-at');
  const [activeOnsetIndex, setActiveOnsetIndex] = useState<number>(0);

  const selectedFamily = useMemo(() => {
    return WORD_FAMILIES.find((f) => f.id === selectedFamilyId) || WORD_FAMILIES[0];
  }, [selectedFamilyId]);

  // Words that belong to this family in our database
  const familyWords: CVCWord[] = useMemo(() => {
    return CVC_WORDS.filter((w) => w.wordFamily === selectedFamily.id);
  }, [selectedFamily]);

  const currentWord: CVCWord = familyWords[activeOnsetIndex % familyWords.length] || familyWords[0];

  const formatLetter = (char: string) => {
    return letterCase === 'upper' ? char.toUpperCase() : char.toLowerCase();
  };

  // Blend audio and highlight
  const handleBlendFamilyWord = (wordObj: CVCWord) => {
    sound.playPop();
    sound.speakPhoneme(wordObj.onset, () => {
      setTimeout(() => {
        sound.speakWord(wordObj.wordFamily.replace('-', ''), () => {
          setTimeout(() => {
            sound.playSwoop();
            sound.speakWord(wordObj.word);
          }, 200);
        });
      }, 250);
    });
  };

  const handleSelectWord = (idx: number) => {
    setActiveOnsetIndex(idx);
    const target = familyWords[idx];
    if (target) {
      handleBlendFamilyWord(target);
      onAwardStar();
    }
  };

  const handleNextOnset = () => {
    const nextIdx = (activeOnsetIndex + 1) % familyWords.length;
    handleSelectWord(nextIdx);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Word Family Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
          Pick Family:
        </span>
        {WORD_FAMILIES.map((fam) => {
          const isSelected = fam.id === selectedFamilyId;
          return (
            <button
              key={fam.id}
              onClick={() => {
                sound.playPop();
                setSelectedFamilyId(fam.id);
                setActiveOnsetIndex(0);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {fam.label}
            </button>
          );
        })}
      </div>

      {/* Main Rhyme Blending Stage */}
      <div className="bg-white rounded-3xl border border-indigo-100 shadow-md p-6 sm:p-8">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
            Rhyme Maker
          </span>
          <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-slate-800 mt-2">
            The "{selectedFamily.id}" Rhyme Family!
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto mt-1">
            Change the first sound to make rhyming friends that share the same ending sound!
          </p>
        </div>

        {/* Center: Dynamic Illustration */}
        <div className="flex flex-col items-center justify-center mb-6">
          <WordIllustration
            wordId={currentWord.id}
            isSolved={true}
            size="lg"
            onClick={() => handleBlendFamilyWord(currentWord)}
          />

          <p className="text-slate-600 text-sm font-semibold mt-2">{currentWord.hint}</p>
        </div>

        {/* Interactive Equation: [Onset] + [Rime] = [Blended Word] */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-6">
          {/* Onset tile */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-sky-700 mb-1">First Sound</span>
            <motion.button
              type="button"
              onClick={handleNextOnset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-sky-400 hover:bg-sky-300 text-sky-950 border-b-4 border-sky-600 flex items-center justify-center text-4xl sm:text-5xl font-fredoka font-bold shadow-md cursor-pointer"
            >
              {formatLetter(currentWord.onset)}
            </motion.button>
          </div>

          <span className="text-3xl font-bold text-slate-400 mt-5">+</span>

          {/* Rime family chunk */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-indigo-700 mb-1">Rhyme Chunk</span>
            <div className="w-28 h-24 sm:w-32 sm:h-28 rounded-2xl bg-indigo-100 border-4 border-indigo-300 text-indigo-950 flex items-center justify-center text-4xl sm:text-5xl font-fredoka font-bold shadow-inner">
              {formatLetter(selectedFamily.id.replace('-', ''))}
            </div>
          </div>

          <span className="text-3xl font-bold text-slate-400 mt-5">=</span>

          {/* Blended result */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-emerald-700 mb-1">Blended Word!</span>
            <motion.button
              type="button"
              onClick={() => handleBlendFamilyWord(currentWord)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-36 h-24 sm:w-44 sm:h-28 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white border-b-4 border-emerald-700 flex items-center justify-center text-4xl sm:text-5xl font-fredoka font-bold shadow-md cursor-pointer"
            >
              {formatLetter(currentWord.word)}
            </motion.button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 my-6">
          <button
            onClick={() => handleBlendFamilyWord(currentWord)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-sm transition-transform active:scale-95 cursor-pointer text-sm"
          >
            <Volume2 className="w-4 h-4" />
            <span>Blend "{currentWord.word.toUpperCase()}"!</span>
          </button>

          <button
            onClick={handleNextOnset}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl border border-slate-300 transition-transform active:scale-95 cursor-pointer text-sm"
          >
            <RotateCw className="w-4 h-4 text-slate-600" />
            <span>Spin Next Rhyme</span>
          </button>
        </div>

        {/* Rhyming Family Chain */}
        <div className="pt-6 border-t border-slate-100">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Words in this family (Tap to hear & see):
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {familyWords.map((fw, idx) => {
              const isActive = idx === activeOnsetIndex;
              return (
                <button
                  key={fw.id}
                  onClick={() => handleSelectWord(idx)}
                  className={`px-4 py-2 rounded-2xl font-fredoka text-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md scale-105'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{formatLetter(fw.word)}</span>
                  <span className="text-xs opacity-75">
                    ({formatLetter(fw.onset)}-{formatLetter(fw.wordFamily.replace('-', ''))})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
