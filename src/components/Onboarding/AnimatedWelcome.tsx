import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface AnimatedWelcomeProps {
  onNext: () => void;
}

export const AnimatedWelcome: React.FC<AnimatedWelcomeProps> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 bg-linear-to-b from-slate-900 via-indigo-950 to-slate-950 text-white">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Subtle floating school and tech icons */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-[12%] left-[10%] text-3xl md:text-4xl animate-float-slow opacity-60">👔</div>
        <div className="absolute top-[20%] right-[12%] text-3xl md:text-4xl animate-float-reverse opacity-60" style={{ animationDelay: '1s' }}>👕</div>
        <div className="absolute top-[60%] left-[8%] text-3xl md:text-4xl animate-float-reverse opacity-60" style={{ animationDelay: '2s' }}>📅</div>
        <div className="absolute top-[75%] right-[14%] text-3xl md:text-4xl animate-float-slow opacity-60" style={{ animationDelay: '1.5s' }}>🤖</div>
        <div className="absolute bottom-[18%] left-[22%] text-3xl md:text-4xl animate-float-slow opacity-60" style={{ animationDelay: '3s' }}>📚</div>
        <div className="absolute top-[35%] left-[80%] text-3xl md:text-4xl animate-float-reverse opacity-60" style={{ animationDelay: '2.5s' }}>💡</div>
        <div className="absolute bottom-[28%] right-[25%] text-3xl md:text-4xl animate-float-slow opacity-60" style={{ animationDelay: '0.8s' }}>💻</div>
        <div className="absolute top-[18%] left-[50%] -translate-x-1/2 text-2xl animate-float-slow opacity-70 text-amber-300">✨</div>
      </div>

      {/* Center Welcome Card */}
      <div className="relative z-10 max-w-2xl w-full text-center mx-auto bg-slate-900/70 border border-slate-700/60 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl transition-all">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Interactive Web Project</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
          Welcome to Aarav&apos;s Web! 👋
        </h1>

        {/* Project Name */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent mb-3">
          Aarav&apos;s Smart Dress Planner and More... 👔✨
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl font-medium text-slate-300 mb-2">
          A Web Designing Project by Aarav Garkoti
        </p>

        {/* Small Tagline */}
        <p className="text-sm sm:text-base text-slate-400 italic mb-8 max-w-md mx-auto">
          &ldquo;One website. Many smart possibilities.&rdquo;
        </p>

        {/* Floating icon pills preview */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <span className="px-3 py-1 text-xs rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">👔 Dress Planner</span>
          <span className="px-3 py-1 text-xs rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">🤖 AI Assistant</span>
          <span className="px-3 py-1 text-xs rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">📚 Study Helper</span>
          <span className="px-3 py-1 text-xs rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">📅 Calendar</span>
          <span className="px-3 py-1 text-xs rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">💡 Smart Tools</span>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
