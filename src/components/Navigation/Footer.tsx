import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Award } from 'lucide-react';
import { ActiveTab } from '../../types';
import { playSound } from '../../utils/sound';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
  onTriggerEasterEgg: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onTriggerEasterEgg }) => {
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<number | null>(null);

  const handleNameClick = () => {
    playSound('click');
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current);
    }

    if (newCount >= 5) {
      setClickCount(0);
      playSound('celebrate');
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.8 },
      });
      onTriggerEasterEgg();
    } else {
      clickTimeoutRef.current = window.setTimeout(() => {
        setClickCount(0);
      }, 2500);
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👔</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Aarav&apos;s Smart Dress Planner and More... 👔✨
              </h2>
            </div>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              A Web Designing Project by Aarav Garkoti
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Designed as a modern interactive web application featuring an intelligent school dress scheduler, AI assistant, study tools, school calendar, and live demonstration controls.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Explore Modules
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('dress')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  👔 Smart Dress Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ai')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  🤖 Ask Aarav&apos;s AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('study')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  📚 Study Helper & Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('calendar')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  📅 School Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tools')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  💡 Smart Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('demo')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  ⚙️ Demo Mode
                </button>
              </li>
            </ul>
          </div>

          {/* Project Credits #21 */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Project Credits
            </h3>
            <div className="space-y-2 text-xs">
              <p>
                <span className="font-semibold text-slate-800 dark:text-slate-300">Concept & Design:</span> Aarav Garkoti
              </p>
              <p>
                <span className="font-semibold text-slate-800 dark:text-slate-300">Web Project:</span> Aarav Garkoti
              </p>
              <p>
                <span className="font-semibold text-slate-800 dark:text-slate-300">Application:</span> Aarav&apos;s Smart Dress Planner and More...
              </p>
              <p>
                <span className="font-semibold text-slate-800 dark:text-slate-300">Year:</span> 2026
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px] font-medium text-indigo-700 dark:text-indigo-300">
                  <Award className="w-3.5 h-3.5 text-indigo-500" />
                  School Project 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line with Easter Egg on Aarav Garkoti */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              Aarav&apos;s Smart Dress Planner and More...
            </p>
            <p className="text-slate-500">
              A Web Designing Project by{' '}
              <button
                onClick={handleNameClick}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer focus:outline-hidden inline-flex items-center gap-1 group"
                title="Click 5 times quickly to reveal a secret!"
              >
                <span>Aarav Garkoti</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 inline group-hover:scale-125 transition-transform" />
              </button>
              {clickCount > 0 && clickCount < 5 && (
                <span className="ml-2 text-[10px] text-amber-500 animate-pulse">
                  ({5 - clickCount} clicks to secret!)
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Designed with creativity. Built with code.
            </span>
            <span>•</span>
            <span>All Data Saved in Browser</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
