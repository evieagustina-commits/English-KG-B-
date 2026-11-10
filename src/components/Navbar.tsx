import React from 'react';
import { Volume2, VolumeX, Sparkles, Settings } from 'lucide-react';
import { GameMode } from '../types/phonics';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  starCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  starCount,
  soundEnabled,
  onToggleSound,
  onOpenSettings
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white/90 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onSelectMode('spell-blend')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl font-bold text-amber-950 font-fredoka">CVC</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 font-fredoka whitespace-nowrap">
            Phonics Pals
          </span>
        </button>
      </div>

      {/* Zone 2: 4-5 clean single-line nav links */}
      <nav className="hidden lg:flex items-center gap-2 text-sm font-semibold">
        <button
          onClick={() => onSelectMode('spell-blend')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
            currentMode === 'spell-blend'
              ? 'bg-amber-100 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          Spell & Blend
        </button>
        <button
          onClick={() => onSelectMode('missing-sound')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
            currentMode === 'missing-sound'
              ? 'bg-amber-100 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          Missing Sound
        </button>
        <button
          onClick={() => onSelectMode('word-family')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
            currentMode === 'word-family'
              ? 'bg-amber-100 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          Rhyme Families
        </button>
        <button
          onClick={() => onSelectMode('soundboard')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
            currentMode === 'soundboard'
              ? 'bg-amber-100 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          Phonics Letters
        </button>
        <button
          onClick={() => onSelectMode('sticker-book')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            currentMode === 'sticker-book'
              ? 'bg-amber-100 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Star Jar ({starCount})</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action cluster */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Quick Audio Mute Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <VolumeX className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {/* Teacher / Settings Modal trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 shadow-2xs transition-colors whitespace-nowrap shrink-0"
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </header>
  );
};
