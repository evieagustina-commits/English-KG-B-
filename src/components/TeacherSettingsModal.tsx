import React from 'react';
import { X, Volume2, Sparkles, BookOpen, RotateCcw } from 'lucide-react';
import { LetterCase } from '../types/phonics';
import { sound } from '../utils/soundService';

interface TeacherSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterCase: LetterCase;
  onChangeLetterCase: (newCase: LetterCase) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  speechRate: 'normal' | 'slow';
  onChangeSpeechRate: (rate: 'normal' | 'slow') => void;
  onResetProgress: () => void;
}

export const TeacherSettingsModal: React.FC<TeacherSettingsModalProps> = ({
  isOpen,
  onClose,
  letterCase,
  onChangeLetterCase,
  soundEnabled,
  onToggleSound,
  speechRate,
  onChangeSpeechRate,
  onResetProgress
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-pop">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-fredoka text-xl font-bold text-slate-800">
                Teacher & Parent Guide
              </h3>
              <p className="text-xs text-slate-500">Kindergarten B Phonics Controls</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 py-4">
          {/* Letter Case Toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Letter Case (Alphabet Display)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  onChangeLetterCase('lower');
                }}
                className={`py-3 px-4 rounded-2xl font-bold text-sm border transition-all cursor-pointer ${
                  letterCase === 'lower'
                    ? 'bg-amber-100 border-amber-300 text-amber-900 ring-2 ring-amber-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="font-fredoka text-lg">abc</span> (lowercase)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  onChangeLetterCase('upper');
                }}
                className={`py-3 px-4 rounded-2xl font-bold text-sm border transition-all cursor-pointer ${
                  letterCase === 'upper'
                    ? 'bg-amber-100 border-amber-300 text-amber-900 ring-2 ring-amber-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="font-fredoka text-lg">ABC</span> (UPPERCASE)
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              Kindergarten B typically reads lowercase words in storybooks.
            </p>
          </div>

          {/* Phonics Speech Speed */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Phonics Sound Cue Speed
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  onChangeSpeechRate('normal');
                }}
                className={`py-2.5 px-4 rounded-2xl font-bold text-xs border transition-all cursor-pointer ${
                  speechRate === 'normal'
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-900 ring-2 ring-indigo-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Standard Rate (0.8x)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  onChangeSpeechRate('slow');
                }}
                className={`py-2.5 px-4 rounded-2xl font-bold text-xs border transition-all cursor-pointer ${
                  speechRate === 'slow'
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-900 ring-2 ring-indigo-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Clear & Slow (0.65x)
              </button>
            </div>
          </div>

          {/* Master Audio Toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Audio & Speech
            </label>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                onToggleSound();
              }}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-sm border flex items-center justify-between transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-emerald-600" />
                <span>Sound & Spoken Phonics Cues</span>
              </div>
              <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-full bg-white border">
                {soundEnabled ? 'Enabled' : 'Muted'}
              </span>
            </button>
          </div>

          {/* Pedagogical Phonics Tips for Kindergarten B */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
            <h4 className="font-bold font-fredoka text-sm text-amber-950 flex items-center gap-1.5">
              <span>💡</span>
              <span>Kindergarten B Teaching Tips:</span>
            </h4>
            <p>
              • <strong>Sounding Out:</strong> Encourage children to touch each letter as they say its pure sound (/k/ - /æ/ - /t/), avoiding adding extra "uh" sounds when possible.
            </p>
            <p>
              • <strong>Continuous Blending:</strong> Ask the child to slide their finger across the blend bar smoothly so sounds melt together into one word!
            </p>
            <p>
              • <strong>Word Families:</strong> Use the "Rhyme Families" tab to show that words with the same ending (-at: cat, bat, hat) are rhyming pals!
            </p>
          </div>

          {/* Reset Progress Button */}
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                if (window.confirm('Reset star collection and solved words?')) {
                  onResetProgress();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Star Progress</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
