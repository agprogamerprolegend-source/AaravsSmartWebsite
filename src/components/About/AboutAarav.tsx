import React from 'react';
import { Award, Code, Heart, Sparkles, Laptop, ShieldCheck } from 'lucide-react';

interface AboutAaravProps {
  onTriggerEasterEgg?: () => void;
}

export const AboutAarav: React.FC<AboutAaravProps> = ({ onTriggerEasterEgg }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Student Creator Profile</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About Aarav&apos;s Project 👨‍💻
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          A modern web designing submission combining design aesthetics with interactive utility.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-2xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left space-y-3">
            <div className="w-24 h-24 rounded-3xl bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-4xl shadow-xl mx-auto md:mx-0 border border-white/20">
              👨‍💻
            </div>
            <div>
              <button 
                onClick={onTriggerEasterEgg}
                className="text-2xl font-black text-white hover:text-indigo-300 transition-colors text-left cursor-pointer"
                title="Click to discover Easter egg"
              >
                Aarav Garkoti
              </button>
              <p className="text-xs font-semibold text-indigo-300">
                Student & Web Designer
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-slate-400 uppercase font-bold">Project Name</span>
                <p className="text-sm font-bold text-white mt-0.5">
                  Web Designing Project
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-slate-400 uppercase font-bold">Application</span>
                <p className="text-sm font-bold text-indigo-200 mt-0.5">
                  Aarav&apos;s Smart Dress Planner and More...
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Project Purpose
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                &ldquo;This project demonstrates how web technologies can be used to create an interactive school utility application with smart tools, AI features, educational features and a customizable dress planner.&rdquo;
              </p>
            </div>

            <div className="text-center md:text-left text-xs font-semibold text-indigo-300 flex items-center justify-center md:justify-start gap-1.5 pt-1">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Designed with creativity. Built with code. ❤️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture & Engineering Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 w-fit">
            <Code className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Modern Tech Stack
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Built using React, TypeScript, Tailwind CSS, Lucide icons, and Web Audio API synthesized sound cues.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            100% Client-Side Privacy
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All user names, custom dress edits, tasks, and notes stay securely inside the browser via localStorage.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 w-fit">
            <Laptop className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Principal Demo Mode
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Interactive demonstration panel allowing teachers to test changing the weekly dress rules in real time.
          </p>
        </div>
      </div>

      {/* Project Credits Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Official Project Credits
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-bold uppercase">Concept & Design</span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Aarav Garkoti</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-bold uppercase">Web Project</span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Aarav Garkoti</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-bold uppercase">Application</span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1 truncate">Aarav&apos;s Smart Dress Planner...</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-bold uppercase">Year</span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};
