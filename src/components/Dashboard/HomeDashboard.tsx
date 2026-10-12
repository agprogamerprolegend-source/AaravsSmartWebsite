import React from 'react';
import { 
  Shirt, 
  Bot, 
  BookOpen, 
  Calendar as CalendarIcon, 
  CheckSquare, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  Zap, 
  SlidersHorizontal 
} from 'lucide-react';
import { DressPlan, CalendarEvent, TaskItem, ActiveTab } from '../../types';
import { DAILY_SMART_TIPS } from '../../data/initialData';
import { playSound } from '../../utils/sound';

interface HomeDashboardProps {
  userName: string;
  isPrincipal: boolean;
  schedule: DressPlan[];
  selectedHouse: string;
  events: CalendarEvent[];
  tasks: TaskItem[];
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenDressPlannerModal?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  userName,
  isPrincipal,
  schedule,
  selectedHouse,
  events,
  tasks,
  onNavigateTab,
}) => {
  // Current Day & Today's Dress Plan
  const todayIdx = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const todayPlan = schedule.find((s) => s.dayNumber === todayIdx) || schedule[0];

  // Daily Smart Tip based on today's day
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[todayIdx];
  const tipObj = DAILY_SMART_TIPS.find((t) => t.day === todayName) || DAILY_SMART_TIPS[1];

  // Incomplete Tasks
  const incompleteTasks = tasks.filter((t) => !t.completed);

  // Next Upcoming Event
  const nextEvent = events.length > 0 ? events[0] : null;

  const handleCardClick = (tab: ActiveTab) => {
    playSound('click');
    onNavigateTab(tab);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-10 shadow-2xl border border-indigo-500/30">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Web Designing Project 2026</span>
            </span>
            {isPrincipal && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                🎉 Principal Sir Demonstration Active
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Aarav&apos;s Smart Dress Planner and More... 👔✨
          </h1>

          <p className="text-base sm:text-xl font-medium text-slate-300">
            A Web Designing Project created by <strong className="text-white">Aarav Garkoti</strong>
          </p>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Welcome, {userName}! Explore today&apos;s uniform recommendations, chat with the AI assistant, test your knowledge in the Study Helper, and inspect live project customizations in Demo Mode.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleCardClick('dress')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Shirt className="w-4 h-4" />
              <span>Open Dress Planner →</span>
            </button>

            <button
              onClick={() => handleCardClick('demo')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-rose-300" />
              <span>Launch Demo Mode</span>
            </button>

            <button
              onClick={() => handleCardClick('ai')}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-200 font-semibold text-sm transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Ask Aarav&apos;s AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 19: AARAV'S SMART TIP OF THE DAY */}
      <div className="p-5 rounded-2xl bg-linear-to-r from-amber-500/10 via-amber-500/5 to-indigo-500/10 dark:from-amber-950/40 dark:to-slate-900 border border-amber-300/50 dark:border-amber-800/60 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl shrink-0">
            {tipObj.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Aarav&apos;s Smart Tip of the Day ({todayName})
              </span>
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
              &ldquo;{tipObj.tip}&rdquo;
            </p>
          </div>
        </div>

        <button
          onClick={() => handleCardClick('study')}
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 cursor-pointer"
        >
          <span>More Study Tips</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SECTION 7: 6 LARGE ATTRACTIVE CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Quick Dashboard Overview
          </h2>
          <span className="text-xs text-slate-400">Live Interactive Widgets</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CARD 1: 👔 TODAY'S DRESS */}
          <div
            onClick={() => handleCardClick('dress')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Shirt className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  {todayPlan.day}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Today&apos;s Recommended Dress
              </h3>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {todayPlan.clothing}
              </h4>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                🎨 {todayPlan.houseDependent ? `${selectedHouse} House (${todayPlan.color})` : todayPlan.color}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                &ldquo;{todayPlan.description}&rdquo;
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>View Full Weekly Schedule</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* CARD 2: 🤖 ASK AI */}
          <div
            onClick={() => handleCardClick('ai')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                  Demo AI Mode
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                AI Assistant
              </h3>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Ask Aarav&apos;s AI
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Need quick uniform advice, a 25-minute study tip, or an explanation of photosynthesis? Get instant answers.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Chat with Assistant</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* CARD 3: 📚 STUDY HELPER */}
          <div
            onClick={() => handleCardClick('study')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Interactive
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Learning & Quiz
              </h3>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Aarav&apos;s Study Helper
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Take the 6-question school quiz, search topic summaries, and run the working 25-minute Pomodoro focus timer.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Open Study Tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* CARD 4: 📅 NEXT EVENT */}
          <div
            onClick={() => handleCardClick('calendar')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <CalendarIcon className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                  {nextEvent ? nextEvent.date : 'Upcoming'}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Next School Event
              </h3>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {nextEvent ? nextEvent.title : 'No events scheduled'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                {nextEvent ? nextEvent.description : 'Add new events in Demo Mode.'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>View School Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* CARD 5: ✅ TASKS */}
          <div
            onClick={() => handleCardClick('tools')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                  {incompleteTasks.length} Pending
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                To-Do & Homework Tasks
              </h3>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {incompleteTasks.length > 0 ? incompleteTasks[0].text : 'All tasks completed!'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Stored safely in browser storage. Click to mark complete or add new tasks.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Manage To-Do List</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* CARD 6: 💡 SMART TOOLS & CALCULATOR */}
          <div
            onClick={() => handleCardClick('tools')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                  7 Mini-Apps
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Productivity Suite
              </h3>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Aarav&apos;s Smart Tools
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Calculator, Word Helper, Project Idea Generator, Quick Notes, and Event Countdown.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Launch Mini-Apps</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: WHAT'S NEW IN AARAV'S WEB? */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Changelog & Highlights</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              What&apos;s New in Aarav&apos;s Web?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Recent advancements engineered by Aarav for the Web Designing submission.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              Feature Release
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              House T-Shirt Live Selector
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Students can select Red, Blue, Green, or Yellow house with instant Tuesday color changes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              Demonstration Feature
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Principal Demonstration Trigger
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized celebration screen dynamically triggered when names begin with &quot;N&quot; or contain &quot;Chauhan&quot;.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 space-y-2">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
              Audio Synthesis
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Synthesized Audio Engine
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Timer alarms and celebration chimes run entirely through native Web Audio API with zero external media files.
            </p>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS FOR TEACHER & PRINCIPAL */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Demonstration & Evaluation FAQ
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Frequently asked questions during computer science project evaluations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Is user data uploaded to an external database?</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              No. In adherence to privacy guidelines, all custom uniforms, notes, tasks, and names are stored strictly inside the browser&apos;s localStorage.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Can the Principal change school uniform rules live?</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yes! Opening <strong>Demo Mode</strong> lets the evaluator modify clothing titles, colors, shoes, and advice for any day, persisting instantly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>How is the AI Assistant designed?</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              It features a modular rule-based reasoning engine in transparent Demo AI mode, with clean architecture ready to connect real AI endpoints.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Does this website adapt to school projector screens?</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yes, fully responsive CSS with high-contrast text and Dark/Light modes ensures flawless clarity on lab projectors, laptops, and tablets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
