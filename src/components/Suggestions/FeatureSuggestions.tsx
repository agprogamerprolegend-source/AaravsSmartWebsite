import React, { useState } from 'react';
import { Send, Lightbulb, ThumbsUp, CheckCircle, Rocket } from 'lucide-react';
import { FeatureSuggestion } from '../../types';
import { playSound } from '../../utils/sound';

interface FeatureSuggestionsProps {
  suggestions: FeatureSuggestion[];
  onAddSuggestion: (suggestion: FeatureSuggestion) => void;
  onLikeSuggestion: (id: string) => void;
  userName: string;
}

export const FeatureSuggestions: React.FC<FeatureSuggestionsProps> = ({
  suggestions,
  onAddSuggestion,
  onLikeSuggestion,
  userName,
}) => {
  const [ideaText, setIdeaText] = useState('');
  const [ideaCategory, setIdeaCategory] = useState('AI & Smart Features');
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim()) return;
    playSound('success');

    const newSug: FeatureSuggestion = {
      id: `sug-${Date.now()}`,
      title: ideaText.trim(),
      category: ideaCategory,
      author: userName || 'Classmate / Teacher',
      submittedAt: 'Just now',
      likes: 1,
    };

    onAddSuggestion(newSug);
    setIdeaText('');
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 5000);
  };

  const upcomingRoadmap = [
    { title: 'Better AI Assistant', icon: '🤖', desc: 'Integration with advanced multimodal language models.' },
    { title: 'Voice Assistant', icon: '🎤', desc: 'Listen to spoken questions and speak out uniform answers.' },
    { title: 'Weather-based clothing suggestions', icon: '🌦️', desc: 'Real-time weather API check to suggest sweaters or umbrellas.' },
    { title: 'Android & iOS App', icon: '📱', desc: 'Progressive web app installation directly onto mobile phones.' },
    { title: 'Student Grade Dashboard', icon: '📊', desc: 'Visual charts to monitor homework completion and test marks.' },
    { title: 'Bus Reminder & Tracking', icon: '🚌', desc: 'Morning notification bell 15 minutes before the school bus.' },
    { title: 'Homework Assistant', icon: '📖', desc: 'Track daily subject assignments and textbook exercise numbers.' },
    { title: 'School Event Manager', icon: '🏆', desc: 'Participate and submit entries for annual school competitions.' },
    { title: 'Smart Notifications', icon: '🔔', desc: 'Sound and desktop reminder alarms before bedtime.' },
    { title: 'Educational Games', icon: '🎮', desc: 'Science puzzles and coding challenges to play with friends.' },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* SECTION 17: WHAT SHOULD AARAV ADD NEXT? */}
      <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Interactive Feedback Hub</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            What Should Aarav Add Next? 💡
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mb-6">
            Have an idea for Aarav&apos;s Web? Suggest a feature! This is especially helpful if the Principal Sir or Teacher envisions a new utility.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="Type your idea (e.g. Weather forecast, Bus reminder)..."
                className="sm:col-span-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-400"
              />
              <select
                value={ideaCategory}
                onChange={(e) => setIdeaCategory(e.target.value)}
                className="px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white text-sm focus:outline-hidden"
              >
                <option value="AI & Smart Features">AI & Smart Features</option>
                <option value="Dress & Uniforms">Dress & Uniforms</option>
                <option value="School Calendar">School Calendar</option>
                <option value="Study & Quizzes">Study & Quizzes</option>
                <option value="Student Utilities">Student Utilities</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-linear-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-sm flex items-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <span>Submit Idea</span>
                <Send className="w-4 h-4" />
              </button>

              {justSubmitted && (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-2 rounded-xl animate-bounce">
                  <CheckCircle className="w-4 h-4" />
                  <span>Thanks! Aarav can add this in the next version. 🚀</span>
                </div>
              )}
            </div>
          </form>

          {/* Submitted Ideas Wall */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Ideas Submitted During Demonstration:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {suggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 font-semibold">
                      {sug.category}
                    </span>
                    <p className="text-xs font-bold text-white mt-1.5 leading-snug">
                      {sug.title}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                    <span>By: {sug.author}</span>
                    <button
                      onClick={() => onLikeSuggestion(sug.id)}
                      className="flex items-center gap-1 text-indigo-300 hover:text-white cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{sug.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 18: WHAT'S NEXT FOR AARAV'S WEB? (ROADMAP) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Rocket className="w-3.5 h-3.5" />
              <span>Future Upgrades Roadmap</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              What&apos;s Next for Aarav&apos;s Web? 🚀
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Planned innovations demonstrating how this student project will expand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {upcomingRoadmap.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    Coming Soon
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
