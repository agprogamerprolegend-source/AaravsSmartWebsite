import React from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Info, 
  Footprints, 
  Watch, 
  AlertCircle 
} from 'lucide-react';
import { DressPlan } from '../../types';
import { playSound } from '../../utils/sound';

interface DayDetailsModalProps {
  day: DressPlan | null;
  selectedHouse: string;
  onClose: () => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onOpenDemoEdit?: (dayId: string) => void;
}

export const DayDetailsModal: React.FC<DayDetailsModalProps> = ({
  day,
  selectedHouse,
  onClose,
  onPrevDay,
  onNextDay,
  onOpenDemoEdit,
}) => {
  if (!day) return null;

  // Compute dress color if house dependent
  const displayColor = day.houseDependent 
    ? `${selectedHouse} House Color (${day.color})` 
    : day.color;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-2xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all">
        {/* Top Header Strip */}
        <div className="px-6 py-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👔</span>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">
                {day.day} Detailed Schedule
              </h3>
              <p className="text-xs text-indigo-100">
                Aarav&apos;s Smart Dress Planner
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Uniform Card */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-600 text-white">
                {day.badge}
              </span>
              {day.specialEvent && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {day.specialEvent}
                </span>
              )}
            </div>

            <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              {day.clothing}
            </h4>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
              🎨 Color Code: {displayColor}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              {day.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shrink-0">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Recommended Shoes</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {day.shoes}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 shrink-0">
                <Watch className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Accessories & Kit</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {day.accessories}
                </p>
              </div>
            </div>
          </div>

          {/* Smart Tip of the day */}
          <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase">
                Aarav&apos;s Smart Day Tip
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5 font-medium">
                &ldquo;{day.smartTip}&rdquo;
              </p>
            </div>
          </div>

          {/* Demo edit suggestion note */}
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              Need to change this uniform for your school?
            </span>
            {onOpenDemoEdit && (
              <button
                onClick={() => onOpenDemoEdit(day.id)}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
              >
                Edit in Demo Mode →
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              playSound('click');
              onPrevDay();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Day</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            Back to Week
          </button>

          <button
            onClick={() => {
              playSound('click');
              onNextDay();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>Next Day</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
