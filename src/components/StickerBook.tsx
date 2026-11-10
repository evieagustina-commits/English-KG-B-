import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Star, Award } from 'lucide-react';
import { STICKER_REWARDS } from '../data/cvcWords';
import { sound } from '../utils/soundService';

interface StickerBookProps {
  starCount: number;
  solvedWordCount: number;
}

export const StickerBook: React.FC<StickerBookProps> = ({
  starCount,
  solvedWordCount
}) => {
  const handleTapSticker = (isUnlocked: boolean, title: string) => {
    if (isUnlocked) {
      sound.playSuccessFanfare();
      sound.speakPraise(`You unlocked the ${title} sticker!`);
    } else {
      sound.playGentleTryAgain();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Hero Star Jar Stats Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-white/30 backdrop-blur-xs flex items-center justify-center text-5xl shadow-inner">
            🌟
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/40 px-3 py-1 rounded-full">
              Your Kindergarten Trophy Room
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold mt-1">
              {starCount} Shiny Stars!
            </h2>
            <p className="text-sm font-medium opacity-90">
              You have successfully blended {solvedWordCount} CVC words!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xs p-3 rounded-2xl border border-white/30">
          <Trophy className="w-8 h-8 text-amber-950" />
          <div className="text-right">
            <div className="text-xs font-bold uppercase">Badge Rank</div>
            <div className="font-fredoka text-lg font-bold">
              {solvedWordCount >= 16 ? 'CVC Champion 👑' : solvedWordCount >= 8 ? 'Master Blender 🌈' : 'Word Explorer ⭐'}
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-white rounded-3xl border border-amber-100 shadow-md p-6 sm:p-8">
        <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500" />
          <span>Collectible Phonics Stickers</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
          Solve more words to unlock all the magical badges in your sticker jar!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {STICKER_REWARDS.map((sticker) => {
            const isUnlocked = solvedWordCount >= sticker.unlockedAtWordCount;
            const wordsLeft = sticker.unlockedAtWordCount - solvedWordCount;

            return (
              <motion.button
                key={sticker.id}
                type="button"
                whileHover={isUnlocked ? { scale: 1.04, y: -2 } : {}}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleTapSticker(isUnlocked, sticker.title)}
                className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                  isUnlocked
                    ? 'bg-amber-50/70 border-amber-200 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-xs ${
                    isUnlocked ? 'bg-amber-100 ring-2 ring-amber-300' : 'bg-slate-200 grayscale'
                  }`}
                >
                  {sticker.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-fredoka text-lg font-bold text-slate-800 truncate">
                      {sticker.title}
                    </h4>
                    {isUnlocked ? (
                      <span className="text-xs font-bold text-emerald-600">Unlocked!</span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        {wordsLeft} more word{wordsLeft > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-1">{sticker.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
