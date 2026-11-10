import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, HelpCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { CVCWord, LetterCase } from '../types/phonics';
import { CVC_WORDS } from '../data/cvcWords';
import { WordIllustration } from './WordIllustration';
import { sound } from '../utils/soundService';

type MissingPosition = 'onset' | 'vowel' | 'coda';

interface MissingSoundGameProps {
  letterCase: LetterCase;
  onAwardStar: () => void;
}

export const MissingSoundGame: React.FC<MissingSoundGameProps> = ({
  letterCase,
  onAwardStar
}) => {
  const [positionFilter, setPositionFilter] = useState<'random' | MissingPosition>('random');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeMissingPosition, setActiveMissingPosition] = useState<MissingPosition>('vowel');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  const currentWord: CVCWord = CVC_WORDS[currentIndex % CVC_WORDS.length];

  const formatLetter = (char: string) => {
    return letterCase === 'upper' ? char.toUpperCase() : char.toLowerCase();
  };

  // Setup round
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);

    // Determine missing position
    let pos: MissingPosition = 'vowel';
    if (positionFilter === 'random') {
      const positions: MissingPosition[] = ['onset', 'vowel', 'coda'];
      pos = positions[Math.floor(Math.random() * positions.length)];
    } else {
      pos = positionFilter;
    }
    setActiveMissingPosition(pos);

    // Determine correct target letter
    const correctLetter =
      pos === 'onset' ? currentWord.onset : pos === 'vowel' ? currentWord.vowel : currentWord.coda;

    // Pick 3 plausible distractors
    let distractors: string[] = [];
    if (pos === 'vowel') {
      const allVowels = ['a', 'e', 'i', 'o', 'u'];
      distractors = allVowels.filter((v) => v !== correctLetter).slice(0, 3);
    } else {
      const consonants = 'bcdfghjklmnpqrstvwxz'.split('');
      distractors = consonants
        .filter((c) => c !== correctLetter)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    }

    const pool = [correctLetter, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(pool);

    // Prompt child verbally
    const timer = setTimeout(() => {
      sound.speakWord(currentWord.word);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex, positionFilter]);

  const correctLetter = useMemo(() => {
    if (activeMissingPosition === 'onset') return currentWord.onset;
    if (activeMissingPosition === 'vowel') return currentWord.vowel;
    return currentWord.coda;
  }, [activeMissingPosition, currentWord]);

  // Handle child tapping an option
  const handleSelectOption = (letter: string) => {
    sound.playPop();
    sound.speakPhoneme(letter);
    setSelectedAnswer(letter);

    if (letter.toLowerCase() === correctLetter.toLowerCase()) {
      setIsAnswerCorrect(true);
      sound.playSuccessFanfare();
      sound.speakPraise(`Yes! ${currentWord.word.toUpperCase()}!`);
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch {
        // ignore
      }
      onAwardStar();
    } else {
      setIsAnswerCorrect(false);
      sound.playGentleTryAgain();
    }
  };

  const handleNextWord = () => {
    sound.playPop();
    setCurrentIndex((prev) => (prev + 1) % CVC_WORDS.length);
  };

  const questionPrompt = useMemo(() => {
    if (activeMissingPosition === 'onset') {
      return `Which letter makes the FIRST sound of "${currentWord.word}"?`;
    }
    if (activeMissingPosition === 'vowel') {
      return `Which VOWEL makes the MIDDLE sound of "${currentWord.word}"?`;
    }
    return `Which letter makes the ENDING sound of "${currentWord.word}"?`;
  }, [activeMissingPosition, currentWord]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Sound Position Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
          Missing:
        </span>
        <button
          onClick={() => {
            sound.playPop();
            setPositionFilter('random');
            setCurrentIndex((p) => p + 1);
          }}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            positionFilter === 'random'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Mix Detective
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setPositionFilter('onset');
            setCurrentIndex((p) => p + 1);
          }}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            positionFilter === 'onset'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          First Sound
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setPositionFilter('vowel');
            setCurrentIndex((p) => p + 1);
          }}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            positionFilter === 'vowel'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Middle Vowel
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setPositionFilter('coda');
            setCurrentIndex((p) => p + 1);
          }}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            positionFilter === 'coda'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Ending Sound
        </button>
      </div>

      {/* Detective Stage */}
      <div className="bg-white rounded-3xl border border-amber-100 shadow-md p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3">
            Detective Mission
          </span>

          <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            {questionPrompt}
          </h3>

          <WordIllustration
            wordId={currentWord.id}
            isSolved={isAnswerCorrect === true}
            size="lg"
            onClick={() => sound.speakWord(currentWord.word)}
          />

          <button
            onClick={() => sound.speakWord(currentWord.word)}
            className="flex items-center gap-2 mt-2 px-4 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-200 transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>Hear "{currentWord.word}"</span>
          </button>
        </div>

        {/* Word Display with the Mystery Slot */}
        <div className="flex items-center justify-center gap-4 my-8">
          {/* Onset */}
          <div
            className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-fredoka font-bold border-4 ${
              activeMissingPosition === 'onset'
                ? selectedAnswer && isAnswerCorrect
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 animate-pop'
                  : 'border-dashed border-amber-400 bg-amber-50/50 text-amber-700 animate-pulse'
                : 'border-sky-300 bg-sky-50 text-sky-950'
            }`}
          >
            {activeMissingPosition === 'onset'
              ? selectedAnswer && isAnswerCorrect
                ? formatLetter(selectedAnswer)
                : '?'
              : formatLetter(currentWord.onset)}
          </div>

          {/* Vowel */}
          <div
            className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-fredoka font-bold border-4 ${
              activeMissingPosition === 'vowel'
                ? selectedAnswer && isAnswerCorrect
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 animate-pop'
                  : 'border-dashed border-amber-400 bg-amber-50/50 text-amber-700 animate-pulse'
                : 'border-amber-300 bg-amber-50 text-amber-950'
            }`}
          >
            {activeMissingPosition === 'vowel'
              ? selectedAnswer && isAnswerCorrect
                ? formatLetter(selectedAnswer)
                : '?'
              : formatLetter(currentWord.vowel)}
          </div>

          {/* Coda */}
          <div
            className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-fredoka font-bold border-4 ${
              activeMissingPosition === 'coda'
                ? selectedAnswer && isAnswerCorrect
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 animate-pop'
                  : 'border-dashed border-amber-400 bg-amber-50/50 text-amber-700 animate-pulse'
                : 'border-sky-300 bg-sky-50 text-sky-950'
            }`}
          >
            {activeMissingPosition === 'coda'
              ? selectedAnswer && isAnswerCorrect
                ? formatLetter(selectedAnswer)
                : '?'
              : formatLetter(currentWord.coda)}
          </div>
        </div>

        {/* 4 Choices */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-center text-sm font-bold text-slate-500 mb-4">
            Tap the correct sound:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isWrong = isSelected && isAnswerCorrect === false;
              const isRight = isSelected && isAnswerCorrect === true;

              return (
                <motion.button
                  key={opt}
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-18 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-fredoka font-bold border-b-4 transition-all shadow-sm cursor-pointer ${
                    isRight
                      ? 'bg-emerald-500 text-white border-emerald-700 scale-105'
                      : isWrong
                      ? 'bg-rose-100 text-rose-700 border-rose-400 animate-wiggle'
                      : ['a', 'e', 'i', 'o', 'u'].includes(opt)
                      ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 border-amber-600'
                      : 'bg-sky-400 hover:bg-sky-300 text-sky-950 border-sky-600'
                  }`}
                >
                  {formatLetter(opt)}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Feedback Banner */}
        {isAnswerCorrect === true && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <span className="font-fredoka text-emerald-950 font-bold text-lg">
                Bingo! You solved the mystery sound!
              </span>
            </div>
            <button
              onClick={handleNextWord}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Next Mystery →
            </button>
          </motion.div>
        )}

        {isAnswerCorrect === false && (
          <p className="text-center text-rose-600 font-bold text-sm mt-4 animate-wiggle">
            Almost! Listen to the sound again and try another letter!
          </p>
        )}
      </div>
    </div>
  );
};
