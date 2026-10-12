import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Award, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface SpecialWelcomeProps {
  name: string;
  isPrincipal: boolean;
  onProceed: () => void;
}

export const SpecialWelcome: React.FC<SpecialWelcomeProps> = ({ name, isPrincipal, onProceed }) => {
  useEffect(() => {
    if (isPrincipal) {
      playSound('celebrate');
      // Fire confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#3b82f6', '#ec4899', '#f59e0b', '#10b981'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);

      return () => clearTimeout(timer);
    } else {
      playSound('chime');
    }
  }, [isPrincipal]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-b from-slate-900 via-indigo-950 to-slate-950 text-white overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-16 left-[15%] text-2xl animate-float-slow opacity-60">✨</div>
        <div className="absolute top-24 right-[18%] text-3xl animate-float-reverse opacity-60">🎉</div>
        <div className="absolute bottom-20 left-[20%] text-2xl animate-float-slow opacity-60">⭐</div>
        <div className="absolute bottom-32 right-[22%] text-2xl animate-float-reverse opacity-60">✨</div>
      </div>

      <div className="relative z-10 max-w-xl w-full text-center bg-slate-900/80 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
        {isPrincipal ? (
          <>
            {/* Principal Celebration Header */}
            <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-400/40 flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
              <GraduationCap className="w-10 h-10 text-amber-300" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold mb-4">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Special Principal Demonstration Mode</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Oh! Welcome, Principal Sir! 👋🎉
            </h1>

            <p className="text-lg sm:text-xl font-semibold bg-linear-to-r from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent mb-3">
              Welcome to Aarav&apos;s Smart Dress Planner and More...
            </p>

            <p className="text-base sm:text-lg text-slate-300 mb-6 leading-relaxed">
              Let me show you what Aarav created for his Web Designing Project!
            </p>

            {/* Respectful Demo Disclaimer note */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 mb-8 text-left text-xs text-slate-400 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Demonstration Note:</strong> This personalized greeting was triggered automatically because your name matches the demonstration condition (begins with &quot;N&quot; or contains &quot;Chauhan&quot;).
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Standard User Welcome */}
            <div className="w-18 h-18 rounded-3xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-9 h-9 text-indigo-400" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Welcome, {name}! 👋
            </h1>

            <p className="text-lg sm:text-xl font-semibold bg-linear-to-r from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent mb-3">
              Welcome to Aarav&apos;s Smart Dress Planner and More...
            </p>

            <p className="text-base text-slate-300 mb-8">
              A Web Designing Project by Aarav Garkoti. Ready to explore all the smart school utilities?
            </p>
          </>
        )}

        <button
          onClick={onProceed}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span>See Feature Tour →</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
