import React, { useState } from 'react';
import { User, AlertCircle, Sparkles } from 'lucide-react';
import { StorageService } from '../../utils/storage';
import { playSound } from '../../utils/sound';

interface NameEntryCardProps {
  onNameSubmitted: (name: string, isPrincipal: boolean) => void;
}

export const NameEntryCard: React.FC<NameEntryCardProps> = ({ onNameSubmitted }) => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setErrorMessage('Please enter your name to continue 😊');
      return;
    }

    setErrorMessage('');
    playSound('click');
    const isPrincipal = StorageService.checkIsPrincipal(trimmed);
    StorageService.setUserName(trimmed);
    StorageService.setIsPrincipal(isPrincipal);
    onNameSubmitted(trimmed, isPrincipal);
  };

  const setPreset = (presetName: string) => {
    setName(presetName);
    setErrorMessage('');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-b from-slate-900 via-slate-950 to-indigo-950 text-white">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-slate-900/80 border border-slate-700/70 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 mb-6 mx-auto">
          <User className="w-7 h-7" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-400 mb-2">
            Before we begin...
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What&apos;s your full name?
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Aarav will personalize your schedule, recommendations, and dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Enter your full name..."
              className="w-full px-5 py-4 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              autoFocus
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Continue →</span>
          </button>
        </form>

        {/* Quick Demo Assist Chips */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400 mb-3 flex items-center justify-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Try quick demo names:</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setPreset('Dr. N. Chauhan (Principal)')}
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-200 transition-colors cursor-pointer"
            >
              🎉 Dr. N. Chauhan (Principal)
            </button>
            <button
              type="button"
              onClick={() => setPreset('Nitin Sharma')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Nitin Sharma (&quot;N&quot;)
            </button>
            <button
              type="button"
              onClick={() => setPreset('Aarav Garkoti')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              👨‍💻 Aarav Garkoti
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Stored locally in your browser. No external server tracking.
          </p>
        </div>
      </div>
    </div>
  );
};
