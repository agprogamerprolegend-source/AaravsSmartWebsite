import React, { useState } from 'react';
import { 
  Shirt, 
  Calendar as CalendarIcon, 
  RotateCcw, 
  Save, 
  Plus, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';
import { DressPlan, CalendarEvent, EventCategory } from '../../types';
import { playSound } from '../../utils/sound';

interface DemoModeProps {
  schedule: DressPlan[];
  onUpdateSchedule: (newSchedule: DressPlan[]) => void;
  onAddEvent: (newEvent: CalendarEvent) => void;
  onResetProject: () => void;
  initialDayId?: string;
}

export const DemoMode: React.FC<DemoModeProps> = ({
  schedule,
  onUpdateSchedule,
  onAddEvent,
  onResetProject,
  initialDayId,
}) => {
  // --- SUBSECTION 1: DRESS SCHEDULE EDITOR ---
  const [selectedDayId, setSelectedDayId] = useState<string>(initialDayId || 'monday');
  const activeDay = schedule.find((s) => s.id === selectedDayId) || schedule[0];

  const [clothing, setClothing] = useState(activeDay.clothing);
  const [color, setColor] = useState(activeDay.color);
  const [shoes, setShoes] = useState(activeDay.shoes);
  const [description, setDescription] = useState(activeDay.description);
  const [smartTip, setSmartTip] = useState(activeDay.smartTip);
  const [dressSavedToast, setDressSavedToast] = useState(false);

  // Sync state when day changes
  const handleSelectDayToEdit = (dayId: string) => {
    setSelectedDayId(dayId);
    const day = schedule.find((s) => s.id === dayId);
    if (day) {
      setClothing(day.clothing);
      setColor(day.color);
      setShoes(day.shoes);
      setDescription(day.description);
      setSmartTip(day.smartTip);
    }
  };

  const handleSaveDressEdit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');

    const updated = schedule.map((d) => {
      if (d.id === selectedDayId) {
        return {
          ...d,
          clothing,
          color,
          shoes,
          description,
          smartTip,
        };
      }
      return d;
    });

    onUpdateSchedule(updated);
    setDressSavedToast(true);
    setTimeout(() => setDressSavedToast(false), 3000);
  };

  // --- SUBSECTION 2: EVENT EDITOR ---
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-11-15');
  const [newEventCategory, setNewEventCategory] = useState<EventCategory>('special');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [newEventDress, setNewEventDress] = useState('');
  const [eventAddedToast, setEventAddedToast] = useState(false);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    playSound('success');

    const created: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: newEventTitle.trim(),
      date: newEventDate,
      category: newEventCategory,
      description: newEventDesc.trim() || 'School event scheduled in Demo Mode.',
      dressRecommendation: newEventDress.trim() || 'Follow teacher instructions',
    };

    onAddEvent(created);
    setNewEventTitle('');
    setNewEventDesc('');
    setNewEventDress('');
    setEventAddedToast(true);
    setTimeout(() => setEventAddedToast(false), 3000);
  };

  // --- SUBSECTION 3: RESET DIALOG ---
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleConfirmReset = () => {
    playSound('click');
    onResetProject();
    setShowConfirmReset(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      {/* Header with Demo Mode Active Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>Demo Mode Active</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Aarav&apos;s Project Demo Mode ⚙️
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            Built specially for the Principal and Computer Teacher to interactively modify school rules.
          </p>
        </div>

        {/* Reset Project Button */}
        <button
          onClick={() => setShowConfirmReset(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 transition-colors text-xs font-bold cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restore Default Data</span>
        </button>
      </div>

      {/* Confirmation Modal for Reset */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Reset Project to Defaults?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This will restore all default uniform schedules, sample events, notes, and tasks stored in localStorage.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs cursor-pointer"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. DRESS SCHEDULE EDITOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Shirt className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Dress Schedule Editor
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Modify uniform, color code, footwear, and tips for any day of the week.
              </p>
            </div>
          </div>

          {dressSavedToast && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>Schedule Updated!</span>
            </span>
          )}
        </div>

        {/* Day Selectors */}
        <div className="flex flex-wrap gap-2">
          {schedule.map((day) => {
            const isSelected = selectedDayId === day.id;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => handleSelectDayToEdit(day.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {day.day}
              </button>
            );
          })}
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSaveDressEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Clothing Title
              </label>
              <input
                type="text"
                value={clothing}
                onChange={(e) => setClothing(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Color Palette
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Footwear
              </label>
              <input
                type="text"
                value={shoes}
                onChange={(e) => setShoes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Uniform Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Smart Day Tip
              </label>
              <textarea
                value={smartTip}
                onChange={(e) => setSmartTip(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm cursor-pointer transition-colors shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes for {activeDay.day}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. EVENT EDITOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <CalendarIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                School Event Editor
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add an upcoming event with custom dress instructions.
              </p>
            </div>
          </div>

          {eventAddedToast && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>New Event Added!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Event Name</label>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="e.g. Science Fair 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Date</label>
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Category</label>
              <select
                value={newEventCategory}
                onChange={(e) => setNewEventCategory(e.target.value as EventCategory)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden"
              >
                <option value="sports">Sports</option>
                <option value="cultural">Annual Function / Cultural</option>
                <option value="art">Art Competition</option>
                <option value="celebration">Celebration</option>
                <option value="exam">Exam</option>
                <option value="submission">Project Submission</option>
                <option value="special">Special Dress Day</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Event Description</label>
              <input
                type="text"
                value={newEventDesc}
                onChange={(e) => setNewEventDesc(e.target.value)}
                placeholder="Details of what happens during the event..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Dress Code Recommendation</label>
              <input
                type="text"
                value={newEventDress}
                onChange={(e) => setNewEventDress(e.target.value)}
                placeholder="e.g. White formal uniform, lab coat, sports shoes..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm cursor-pointer transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event to Calendar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
