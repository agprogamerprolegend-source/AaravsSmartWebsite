import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Trophy, 
  Theater, 
  Palette, 
  PartyPopper, 
  GraduationCap, 
  FileText, 
  Shirt, 
  MapPin, 
  Clock, 
  Plus, 
  Trash2,
  Filter
} from 'lucide-react';
import { CalendarEvent, EventCategory } from '../../types';
import { playSound } from '../../utils/sound';

interface SchoolCalendarProps {
  events: CalendarEvent[];
  onAddEventClick: () => void;
  onDeleteEvent?: (id: string) => void;
}

export const SchoolCalendar: React.FC<SchoolCalendarProps> = ({
  events,
  onAddEventClick,
  onDeleteEvent,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getCategoryBadge = (cat: EventCategory) => {
    switch (cat) {
      case 'sports':
        return { label: 'Sports', icon: <Trophy className="w-3.5 h-3.5" />, color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
      case 'cultural':
        return { label: 'Annual Function', icon: <Theater className="w-3.5 h-3.5" />, color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800' };
      case 'art':
        return { label: 'Art Competition', icon: <Palette className="w-3.5 h-3.5" />, color: 'bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border-pink-200 dark:border-pink-800' };
      case 'celebration':
        return { label: 'Celebration', icon: <PartyPopper className="w-3.5 h-3.5" />, color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800' };
      case 'exam':
        return { label: 'Exam', icon: <GraduationCap className="w-3.5 h-3.5" />, color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800' };
      case 'submission':
        return { label: 'Project Submission', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' };
      case 'special':
      default:
        return { label: 'Special Dress Day', icon: <Shirt className="w-3.5 h-3.5" />, color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' };
    }
  };

  const filteredEvents = events.filter((evt) => {
    if (selectedFilter === 'all') return true;
    return evt.category === selectedFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic & Activity Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            School Calendar 📅
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            Track competitions, exams, functions, and corresponding dress codes.
          </p>
        </div>

        <button
          onClick={() => {
            playSound('click');
            onAddEventClick();
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event (Demo Mode)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        {[
          { id: 'all', label: 'All Events' },
          { id: 'sports', label: '🏆 Sports' },
          { id: 'cultural', label: '🎭 Annual Function' },
          { id: 'art', label: '🎨 Art Competition' },
          { id: 'celebration', label: '🎉 Celebrations' },
          { id: 'exam', label: '📚 Exams' },
          { id: 'submission', label: '📝 Project Submission' },
          { id: 'special', label: '👔 Special Dress' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playSound('click');
              setSelectedFilter(tab.id);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const badge = getCategoryBadge(evt.category);
          return (
            <div
              key={evt.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>

                  {onDeleteEvent && (
                    <button
                      onClick={() => {
                        playSound('click');
                        onDeleteEvent(evt.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {evt.description}
                </p>

                {/* Event Metadata */}
                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{evt.date}</span>
                    {evt.time && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {evt.time}
                        </span>
                      </>
                    )}
                  </div>

                  {evt.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommended Dress Code */}
              {evt.dressRecommendation && (
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 -mx-6 -mb-6 p-4 rounded-b-3xl">
                  <div className="flex items-start gap-2">
                    <Shirt className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Dress Recommendation:
                      </span>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                        {evt.dressRecommendation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <CalendarIcon className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No events found in this category
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Switch category filters or add a new event using Demo Mode.
          </p>
        </div>
      )}
    </div>
  );
};
