import React from 'react';
import { ArrowRight, Sparkles, Shirt, Bot, BookOpen, Calendar, Wrench, SlidersHorizontal } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface FeatureIntroProps {
  onExplore: () => void;
}

export const FeatureIntro: React.FC<FeatureIntroProps> = ({ onExplore }) => {
  const features = [
    {
      icon: <Shirt className="w-7 h-7 text-blue-400" />,
      title: '👔 Smart Dress Planner',
      desc: 'Know what to wear on each school day.',
      bg: 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
    },
    {
      icon: <Bot className="w-7 h-7 text-indigo-400" />,
      title: '🤖 AI Assistant',
      desc: 'Ask questions and get smart help.',
      bg: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20',
    },
    {
      icon: <BookOpen className="w-7 h-7 text-emerald-400" />,
      title: '📚 Study Helper',
      desc: 'Learn topics, take quizzes and study smarter.',
      bg: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20',
    },
    {
      icon: <Calendar className="w-7 h-7 text-amber-400" />,
      title: '📅 School Calendar',
      desc: 'Track school events and important dates.',
      bg: 'from-amber-500/10 to-amber-600/5 border-amber-500/20',
    },
    {
      icon: <Wrench className="w-7 h-7 text-purple-400" />,
      title: '💡 Smart Tools',
      desc: 'Use useful mini-tools in one place.',
      bg: 'from-purple-500/10 to-purple-600/5 border-purple-500/20',
    },
    {
      icon: <SlidersHorizontal className="w-7 h-7 text-rose-400" />,
      title: '⚙️ Demo Mode',
      desc: 'Modify and test the project interactively.',
      bg: 'from-rose-500/10 to-rose-600/5 border-rose-500/20',
    },
  ];

  const handleExplore = () => {
    playSound('chime');
    onExplore();
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-linear-to-b from-slate-900 via-slate-950 to-indigo-950 text-white">
      <div className="max-w-5xl w-full mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Interactive Student Project Tour</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Welcome to Aarav&apos;s Smart Dress Planner and More... ✨
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          More than a dress planner. It&apos;s a collection of smart ideas built by Aarav.
        </p>
      </div>

      {/* Grid of 6 Features */}
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feat, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl bg-linear-to-b ${feat.bg} border backdrop-blur-md hover:border-slate-500 transition-all transform hover:-translate-y-1 shadow-lg text-left`}
          >
            <div className="p-3 rounded-xl bg-slate-800/80 w-fit mb-4 border border-slate-700/50">
              {feat.icon}
            </div>
            <h2 className="text-lg font-bold text-white mb-1.5">{feat.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* Explore Aarav's Project Button */}
      <button
        onClick={handleExplore}
        className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg shadow-xl hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      >
        <span>Explore Aarav&apos;s Project →</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
