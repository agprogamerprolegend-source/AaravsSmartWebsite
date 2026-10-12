import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Calculator as CalcIcon, 
  BookMarked, 
  Dice5, 
  Lightbulb, 
  Timer, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Circle, 
  Sparkles, 
  RefreshCw, 
  Pin 
} from 'lucide-react';
import { NoteItem, TaskItem } from '../../types';
import { playSound } from '../../utils/sound';

interface SmartToolsProps {
  notes: NoteItem[];
  onSaveNotes: (notes: NoteItem[]) => void;
  tasks: TaskItem[];
  onSaveTasks: (tasks: TaskItem[]) => void;
}

type ToolTab = 'notes' | 'todo' | 'calc' | 'dict' | 'quiz' | 'ideas' | 'countdown';

export const SmartTools: React.FC<SmartToolsProps> = ({
  notes,
  onSaveNotes,
  tasks,
  onSaveTasks,
}) => {
  const [activeTool, setActiveTool] = useState<ToolTab>('notes');

  // --- 1. QUICK NOTES STATE ---
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('General');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return;
    playSound('click');

    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: newNoteTitle.trim() || 'Untitled Note',
      content: newNoteContent.trim(),
      category: newNoteCategory,
      updatedAt: 'Just now',
      pinned: false,
    };

    onSaveNotes([newNote, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleDeleteNote = (id: string) => {
    playSound('click');
    onSaveNotes(notes.filter((n) => n.id !== id));
  };

  const handleTogglePinNote = (id: string) => {
    playSound('click');
    onSaveNotes(
      notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  // --- 2. TO-DO LIST STATE ---
  const [taskText, setTaskText] = useState('');
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    playSound('click');

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      text: taskText.trim(),
      completed: false,
      priority: taskPriority,
    };

    onSaveTasks([newTask, ...tasks]);
    setTaskText('');
  };

  const handleToggleTask = (id: string) => {
    playSound('click');
    onSaveTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    playSound('click');
    onSaveTasks(tasks.filter((t) => t.id !== id));
  };

  // --- 3. CALCULATOR STATE ---
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcEquation, setCalcEquation] = useState('');

  const handleCalcClick = (val: string) => {
    playSound('click');
    if (val === 'C') {
      setCalcDisplay('0');
      setCalcEquation('');
    } else if (val === 'DEL') {
      if (calcDisplay.length > 1) {
        setCalcDisplay(calcDisplay.slice(0, -1));
      } else {
        setCalcDisplay('0');
      }
    } else if (val === '=') {
      try {
        // Safe evaluation of arithmetic expressions
        const sanitized = (calcEquation + calcDisplay).replace(/×/g, '*').replace(/÷/g, '/');
        if (/^[\d+\-*/. ]+$/.test(sanitized)) {
          // eslint-disable-next-line no-eval
          const result = Function(`'use strict'; return (${sanitized})`)();
          setCalcDisplay(String(Number(result.toFixed(6))));
          setCalcEquation('');
        }
      } catch (e) {
        setCalcDisplay('Error');
        setCalcEquation('');
      }
    } else if (['+', '-', '×', '÷'].includes(val)) {
      setCalcEquation(`${calcDisplay} ${val} `);
      setCalcDisplay('0');
    } else {
      if (calcDisplay === '0' || calcDisplay === 'Error') {
        setCalcDisplay(val);
      } else {
        setCalcDisplay(calcDisplay + val);
      }
    }
  };

  // --- 4. WORD HELPER STATE ---
  const [wordQuery, setWordQuery] = useState('Perseverance');
  const [wordData, setWordData] = useState({
    word: 'Perseverance',
    partOfSpeech: 'noun',
    meaning: 'Persistence in doing something despite difficulty or delay in achieving success.',
    example: 'Through dedication and perseverance, Aarav finished his web designing project with excellence.',
    synonym: 'Tenacity, endurance, determination',
  });

  const wordDictionary: Record<string, typeof wordData> = {
    'perseverance': {
      word: 'Perseverance',
      partOfSpeech: 'noun',
      meaning: 'Persistence in doing something despite difficulty or delay in achieving success.',
      example: 'Through dedication and perseverance, Aarav finished his web designing project with excellence.',
      synonym: 'Tenacity, endurance, determination',
    },
    'algorithm': {
      word: 'Algorithm',
      partOfSpeech: 'noun',
      meaning: 'A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.',
      example: 'The dress planner algorithm selects your uniform based on the detected day of the week.',
      synonym: 'Procedure, method, protocol',
    },
    'empathy': {
      word: 'Empathy',
      partOfSpeech: 'noun',
      meaning: 'The ability to understand and share the feelings of another.',
      example: 'Good school leaders demonstrate empathy towards their classmates and teachers.',
      synonym: 'Compassion, sensitivity, understanding',
    },
    'hypothesis': {
      word: 'Hypothesis',
      partOfSpeech: 'noun',
      meaning: 'A proposed explanation made on the basis of limited evidence as a starting point for further investigation.',
      example: 'The students formulated a hypothesis before beginning the science laboratory experiment.',
      synonym: 'Theory, premise, proposition',
    },
  };

  const handleSearchWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordQuery.trim()) return;
    playSound('click');
    const key = wordQuery.toLowerCase().trim();
    if (wordDictionary[key]) {
      setWordData(wordDictionary[key]);
    } else {
      setWordData({
        word: wordQuery,
        partOfSpeech: 'noun / verb',
        meaning: `A vocabulary word to enrich student learning and essay writing.`,
        example: `Remember to look up unfamiliar words regularly to build an expansive vocabulary.`,
        synonym: 'Contextual synonyms apply depending on sentence usage',
      });
    }
  };

  // --- 5. RANDOM QUIZ GENERATOR ---
  const randomBank = [
    { q: 'What is the powerhouse of the plant and animal cell?', a: 'Mitochondria' },
    { q: 'Who is recognized as the father of modern computers?', a: 'Charles Babbage' },
    { q: 'What is the chemical symbol for Gold on the periodic table?', a: 'Au (from Latin Aurum)' },
    { q: 'What does CSS stand for in web designing?', a: 'Cascading Style Sheets' },
    { q: 'Which is the largest organ in the human body?', a: 'The Skin' },
  ];
  const [currentRandomIndex, setCurrentRandomIndex] = useState(0);
  const [showRandomAnswer, setShowRandomAnswer] = useState(false);

  const handleNextRandomQuestion = () => {
    playSound('click');
    setCurrentRandomIndex((prev) => (prev + 1) % randomBank.length);
    setShowRandomAnswer(false);
  };

  // --- 6. IDEA GENERATOR ---
  const projectIdeas = [
    { title: 'Smart School Weather Station', category: 'Science & IoT', difficulty: 'Intermediate', desc: 'Build an ambient sensor system that displays current temperature and rain forecasts on the classroom screen.' },
    { title: 'Interactive Periodic Table Flashcards', category: 'Computer Science', difficulty: 'Beginner', desc: 'Create a web application where clicking any chemical element reveals atomic weight, discovery story, and uses.' },
    { title: 'School Cleanliness & Recycling Tracker', category: 'Social & Environment', difficulty: 'All Grades', desc: 'An app awarding eco-points for paper recycling and keeping classroom desks clean.' },
    { title: 'Classroom Debate Argument Timer & Arbiter', category: 'Language & Debate', difficulty: 'Beginner', desc: 'A digital stopwatch that keeps fair turn times and records debate scorecards.' },
  ];
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);

  const handleNextIdea = () => {
    playSound('click');
    setCurrentIdeaIndex((prev) => (prev + 1) % projectIdeas.length);
  };

  // --- 7. COUNTDOWN TIMER ---
  const [countdownTarget, setCountdownTarget] = useState('2026-10-15');
  const [countdownEventName, setCountdownEventName] = useState('Inter-House Sports Day 🏆');
  const [countdownRemaining, setCountdownRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const targetTime = new Date(`${countdownTarget}T00:00:00`).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setCountdownRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdownRemaining({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [countdownTarget]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Productivity & Utilities Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Aarav&apos;s Smart Tools ✨
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            Functional mini-applications built directly inside the website.
          </p>
        </div>
      </div>

      {/* Tool Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'notes', label: '📝 Quick Notes', count: notes.length },
          { id: 'todo', label: '✅ To-Do List', count: tasks.filter((t) => !t.completed).length },
          { id: 'calc', label: '🔢 Calculator' },
          { id: 'dict', label: '🔤 Word Helper' },
          { id: 'quiz', label: '🎯 Random Quiz' },
          { id: 'ideas', label: '💡 Idea Generator' },
          { id: 'countdown', label: '⏰ Countdown' },
        ].map((tab) => {
          const isActive = activeTool === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playSound('click');
                setActiveTool(tab.id as ToolTab);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TOOL 1: QUICK NOTES */}
      {activeTool === 'notes' && (
        <div className="space-y-6">
          <form onSubmit={handleAddNote} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              <span>Create a New Quick Note</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Note Title..."
                className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={newNoteCategory}
                onChange={(e) => setNewNoteCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden"
              >
                <option value="General">General</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Science">Science</option>
                <option value="House Activities">House Activities</option>
                <option value="Exam Prep">Exam Prep</option>
              </select>
            </div>

            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write your note contents here..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Save Note</span>
              </button>
            </div>
          </form>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  note.pinned
                    ? 'bg-amber-50/70 dark:bg-slate-800/90 border-amber-300 dark:border-amber-800 shadow-md ring-1 ring-amber-300/40'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {note.category}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePinNote(note.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          note.pinned
                            ? 'text-amber-500 bg-amber-100 dark:bg-amber-950/40'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={note.pinned ? 'Unpin' : 'Pin to top'}
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Delete Note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {note.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {note.content}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                  Updated: {note.updatedAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 2: TO-DO LIST */}
      {activeTool === 'todo' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <form onSubmit={handleAddTask} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-500" />
              <span>Add a School Task</span>
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="What do you need to do? (e.g. Iron uniform, submit project)..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />

              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as 'high' | 'medium' | 'low')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden"
              >
                <option value="high">🔥 High Priority</option>
                <option value="medium">⚡ Medium</option>
                <option value="low">🌱 Low</option>
              </select>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm cursor-pointer transition-colors shadow-sm whitespace-nowrap"
              >
                Add Task
              </button>
            </div>
          </form>

          {/* Tasks List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-md overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="text-slate-400 hover:text-emerald-500 cursor-pointer shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950/60" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <span
                    className={`text-sm ${
                      task.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-800 dark:text-slate-100 font-medium'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                      task.priority === 'high'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        : task.priority === 'medium'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                    }`}
                  >
                    {task.priority}
                  </span>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 3: CALCULATOR */}
      {activeTool === 'calc' && (
        <div className="max-w-sm mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalcIcon className="w-4 h-4 text-indigo-500" />
              <span>School Calculator</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Standard Mode</span>
          </div>

          {/* Calculator Screen */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 text-right border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-400 font-mono h-4 overflow-hidden">
              {calcEquation}
            </div>
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white tracking-wider overflow-x-auto">
              {calcDisplay}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-2 text-sm font-bold">
            {['C', 'DEL', '÷', '×'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcClick(btn)}
                className="py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              >
                {btn}
              </button>
            ))}

            {['7', '8', '9', '-'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcClick(btn)}
                className={`py-3 rounded-xl cursor-pointer transition-colors ${
                  btn === '-'
                    ? 'bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {btn}
              </button>
            ))}

            {['4', '5', '6', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcClick(btn)}
                className={`py-3 rounded-xl cursor-pointer transition-colors ${
                  btn === '+'
                    ? 'bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {btn}
              </button>
            ))}

            {['1', '2', '3', '='].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcClick(btn)}
                className={`py-3 rounded-xl cursor-pointer transition-colors ${
                  btn === '='
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md row-span-2 flex items-center justify-center'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {btn}
              </button>
            ))}

            {['0', '.'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcClick(btn)}
                className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 4: WORD HELPER */}
      {activeTool === 'dict' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <form onSubmit={handleSearchWord} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-indigo-500" />
              <span>Word Helper & Vocabulary</span>
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={wordQuery}
                onChange={(e) => setWordQuery(e.target.value)}
                placeholder="Enter word (e.g. Perseverance, Algorithm)..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer transition-colors shadow-sm"
              >
                Lookup
              </button>
            </div>
          </form>

          {/* Word Details Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {wordData.word}
                </h4>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 italic">
                  [{wordData.partOfSpeech}]
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Meaning:</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">
                {wordData.meaning}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700">
              <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Example Sentence:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 italic">
                &ldquo;{wordData.example}&rdquo;
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Synonyms:</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                {wordData.synonym}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 5: RANDOM QUIZ */}
      {activeTool === 'quiz' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Dice5 className="w-5 h-5 text-indigo-500" />
              <span>Random School Question Generator</span>
            </h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              Flash Card Mode
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700 space-y-4">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Question #{currentRandomIndex + 1}:
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {randomBank[currentRandomIndex].q}
            </h4>

            {showRandomAnswer ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-sm font-bold animate-fade-in">
                Answer: {randomBank[currentRandomIndex].a}
              </div>
            ) : (
              <button
                onClick={() => {
                  playSound('click');
                  setShowRandomAnswer(true);
                }}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                Reveal Answer 👁️
              </button>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNextRandomQuestion}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer transition-colors shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Random Question</span>
            </button>
          </div>
        </div>
      )}

      {/* TOOL 6: IDEA GENERATOR */}
      {activeTool === 'ideas' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Student Project Idea Generator</span>
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              {projectIdeas[currentIdeaIndex].category}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-black text-slate-900 dark:text-white">
                {projectIdeas[currentIdeaIndex].title}
              </h4>
              <span className="text-[11px] font-bold text-slate-500">
                Level: {projectIdeas[currentIdeaIndex].difficulty}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {projectIdeas[currentIdeaIndex].desc}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNextIdea}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm cursor-pointer transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Another Idea</span>
            </button>
          </div>
        </div>
      )}

      {/* TOOL 7: COUNTDOWN TIMER */}
      {activeTool === 'countdown' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Timer className="w-5 h-5 text-indigo-500" />
              <span>Event Countdown Timer</span>
            </h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              Live Precision
            </span>
          </div>

          {/* Target Event Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Event Name</label>
              <input
                type="text"
                value={countdownEventName}
                onChange={(e) => setCountdownEventName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Target Date</label>
              <input
                type="date"
                value={countdownTarget}
                onChange={(e) => setCountdownTarget(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold"
              />
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-indigo-900 to-slate-950 text-white text-center space-y-4">
            <h4 className="text-lg font-bold text-indigo-200">
              Counting down to: {countdownEventName}
            </h4>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
              <div className="p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black">{countdownRemaining.days}</span>
                <p className="text-[10px] text-slate-300 uppercase tracking-wider mt-1">Days</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black">{countdownRemaining.hours}</span>
                <p className="text-[10px] text-slate-300 uppercase tracking-wider mt-1">Hours</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black">{countdownRemaining.minutes}</span>
                <p className="text-[10px] text-slate-300 uppercase tracking-wider mt-1">Mins</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md">
                <span className="font-mono text-2xl sm:text-4xl font-black text-amber-300">{countdownRemaining.seconds}</span>
                <p className="text-[10px] text-slate-300 uppercase tracking-wider mt-1">Secs</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
