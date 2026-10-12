import React, { useState } from 'react';
import { 
  Shirt, 
  Sparkles, 
  Bot, 
  ArrowRight, 
  SlidersHorizontal, 
  Shield, 
  Palette, 
  Activity, 
  Home as HomeIcon 
} from 'lucide-react';
import { DressPlan } from '../../types';
import { DayDetailsModal } from './DayDetailsModal';
import { AskAIModal } from './AskAIModal';
import { playSound } from '../../utils/sound';

interface DressPlannerProps {
  schedule: DressPlan[];
  selectedHouse: string;
  onSelectHouse: (house: string) => void;
  onNavigateToDemo: (dayId?: string) => void;
}

export const DressPlanner: React.FC<DressPlannerProps> = ({
  schedule,
  selectedHouse,
  onSelectHouse,
  onNavigateToDemo,
}) => {
  const [selectedDayModal, setSelectedDayModal] = useState<DressPlan | null>(null);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);

  // Automatically detect the current day using JavaScript (0=Sunday, 1=Monday, ..., 6=Saturday)
  const currentDayIndex = new Date().getDay();
  const todayPlan = schedule.find((s) => s.dayNumber === currentDayIndex) || schedule[0];

  const houses = ['Red', 'Blue', 'Green', 'Yellow'];

  const getDayIcon = (dayNumber: number) => {
    switch (dayNumber) {
      case 1:
      case 3:
      case 5:
        return <Shirt className="w-5 h-5" />;
      case 2:
        return <Shield className="w-5 h-5" />;
      case 4:
        return <Activity className="w-5 h-5" />;
      case 6:
        return <Palette className="w-5 h-5" />;
      case 0:
      default:
        return <HomeIcon className="w-5 h-5" />;
    }
  };

  const handleOpenDay = (day: DressPlan) => {
    playSound('click');
    setSelectedDayModal(day);
  };

  const handlePrevDay = () => {
    if (!selectedDayModal) return;
    const currentIndex = schedule.findIndex((s) => s.id === selectedDayModal.id);
    const prevIndex = (currentIndex - 1 + schedule.length) % schedule.length;
    setSelectedDayModal(schedule[prevIndex]);
  };

  const handleNextDay = () => {
    if (!selectedDayModal) return;
    const currentIndex = schedule.findIndex((s) => s.id === selectedDayModal.id);
    const nextIndex = (currentIndex + 1) % schedule.length;
    setSelectedDayModal(schedule[nextIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Main Feature</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Aarav&apos;s Smart Dress Planner 👔
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            Always wear the right uniform with smart day detection and House customization.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              playSound('click');
              setIsAskAIOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI What Should I Wear? 🤖👔</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onNavigateToDemo();
            }}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span>Customize Schedule</span>
          </button>
        </div>
      </div>

      {/* House Selector Strip */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛡️</span>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Select Your School House
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Updates Tuesday&apos;s House t-shirt recommendation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {houses.map((house) => {
            const isSelected = selectedHouse === house;
            const houseColors: Record<string, string> = {
              Red: 'bg-rose-500 text-white ring-rose-300',
              Blue: 'bg-blue-500 text-white ring-blue-300',
              Green: 'bg-emerald-500 text-white ring-emerald-300',
              Yellow: 'bg-amber-500 text-white ring-amber-300',
            };

            return (
              <button
                key={house}
                onClick={() => {
                  playSound('click');
                  onSelectHouse(house);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? `${houseColors[house]} ring-2 shadow-sm scale-105`
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {house} House
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 8: LARGE CARD - "What should I wear today?" */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-10 shadow-xl border border-indigo-500/30">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white animate-pulse">
                TODAY
              </span>
              <span className="text-sm font-semibold text-indigo-300">
                {todayPlan.day}
              </span>
            </div>

            <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              ⚡ Automatically Detected by System
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
            What should I wear today?
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Clothing Main details */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-2xl">
                  👔
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-indigo-300 tracking-wide">
                    Recommended Clothing
                  </p>
                  <h4 className="text-xl sm:text-2xl font-black text-white">
                    {todayPlan.clothing}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                  <p className="text-xs text-indigo-300 font-semibold">🎨 Color</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {todayPlan.houseDependent ? `${selectedHouse} House Color (${todayPlan.color})` : todayPlan.color}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                  <p className="text-xs text-indigo-300 font-semibold">👞 Shoes</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {todayPlan.shoes}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-indigo-300 font-semibold">📝 Description</p>
                <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                  &ldquo;{todayPlan.description}&rdquo;
                </p>
              </div>
            </div>

            {/* Smart tip card */}
            <div className="p-6 rounded-2xl bg-amber-500/15 backdrop-blur-md border border-amber-400/30 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Aarav&apos;s Smart Tip</span>
                </div>
                <p className="text-base sm:text-lg font-semibold text-amber-100 leading-snug">
                  &ldquo;{todayPlan.smartTip}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-amber-400/20 flex items-center justify-between">
                <button
                  onClick={() => handleOpenDay(todayPlan)}
                  className="text-xs font-bold text-white hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 9: WEEKLY DRESS SCHEDULE (7 CARDS) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Weekly Dress Schedule
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Click any day to see complete footwear, accessories, and tips.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            All values editable through Demo Mode
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {schedule.map((day) => {
            const isToday = day.dayNumber === currentDayIndex;
            const displayColor = day.houseDependent
              ? `${selectedHouse} (${day.color.split(' ')[0]})`
              : day.color;

            return (
              <div
                key={day.id}
                onClick={() => handleOpenDay(day)}
                className={`relative group p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border ${
                  isToday
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/20 transform -translate-y-1'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg'
                }`}
              >
                {/* Day Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {day.day}
                    </span>
                    {isToday && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                        TODAY
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
                    {getDayIcon(day.dayNumber)}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                      {day.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {day.clothing}
                  </h4>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    🎨 {displayColor}
                  </p>
                </div>

                {/* Bottom details preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                    &ldquo;{day.smartTip}&rdquo;
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <DayDetailsModal
        day={selectedDayModal}
        selectedHouse={selectedHouse}
        onClose={() => setSelectedDayModal(null)}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
        onOpenDemoEdit={(dayId) => {
          setSelectedDayModal(null);
          onNavigateToDemo(dayId);
        }}
      />

      <AskAIModal
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
        schedule={schedule}
        selectedHouse={selectedHouse}
      />
    </div>
  );
};
