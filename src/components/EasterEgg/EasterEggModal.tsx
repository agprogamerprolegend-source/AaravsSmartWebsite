import React from 'react';
import { Sparkles, Trophy, X, Heart } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-md w-full bg-slate-900 border border-indigo-500/40 rounded-3xl p-8 text-center text-white shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/30 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl" />

        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto mb-5 text-amber-300">
          <Trophy className="w-8 h-8 animate-bounce" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Secret Easter Egg Unlocked</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          🎉 You found Aarav&apos;s secret!
        </h2>

        <p className="text-lg font-semibold text-indigo-300 mb-4">
          Thanks for exploring my project!
        </p>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          &ldquo;I spent extra time carefully designing every single button, schedule card, and mini-tool so this web application feels complete and real. Thank you for your curiosity!&rdquo;
        </p>

        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400 flex items-center justify-center gap-2 mb-6">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>Made by Aarav Garkoti • Web Designing 2026</span>
        </div>

        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all cursor-pointer"
        >
          Awesome, Take Me Back! 🚀
        </button>
      </div>
    </div>
  );
};
