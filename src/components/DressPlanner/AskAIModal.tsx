import React, { useState } from 'react';
import { X, Send, ShieldAlert } from 'lucide-react';
import { DressPlan } from '../../types';
import { playSound } from '../../utils/sound';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: DressPlan[];
  selectedHouse: string;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({
  isOpen,
  onClose,
  schedule,
  selectedHouse,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I am Aarav's Dress Advisor Assistant (Demo AI Mode). Ask me what to wear today, tomorrow, on rainy days, or during school events!`,
      time: 'Just now',
    },
  ]);

  if (!isOpen) return null;

  // Day calculations
  const todayIdx = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const todayPlan = schedule.find((s) => s.dayNumber === todayIdx) || schedule[0];
  const tomorrowIdx = (todayIdx + 1) % 7;
  const tomorrowPlan = schedule.find((s) => s.dayNumber === tomorrowIdx) || schedule[1];

  const answerQuery = (query: string) => {
    const q = query.toLowerCase();
    let reply = '';

    if (q.includes('today')) {
      const houseText = todayPlan.houseDependent ? ` (Selected House: ${selectedHouse})` : '';
      reply = `According to your configured school schedule for today (${todayPlan.day}): Wear your ${todayPlan.clothing} in ${todayPlan.color}${houseText}. Recommended shoes: ${todayPlan.shoes}. Aarav's Tip: "${todayPlan.smartTip}"`;
    } else if (q.includes('tomorrow')) {
      const houseText = tomorrowPlan.houseDependent ? ` (Selected House: ${selectedHouse})` : '';
      reply = `For tomorrow (${tomorrowPlan.day}): Wear your ${tomorrowPlan.clothing} (${tomorrowPlan.color}${houseText}). Accessories: ${tomorrowPlan.accessories}. Remember to prepare and iron your clothes tonight!`;
    } else if (q.includes('sports')) {
      const sportsPlan = schedule.find((s) => s.clothing.toLowerCase().includes('sports')) || schedule[3];
      reply = `For Sports Day or PE classes, wear your ${sportsPlan.clothing} (${sportsPlan.color}) with clean athletic running shoes and sports socks. Don't forget your water bottle and hand towel!`;
    } else if (q.includes('rain') || q.includes('raining') || q.includes('monsoon')) {
      reply = `When it's raining outside, wear your scheduled day uniform (${todayPlan.clothing}) but be sure to carry a raincoat or sturdy umbrella and keep an extra pair of dry socks in your school bag! Ensure your school shoes have good grip.`;
    } else if (q.includes('function') || q.includes('ceremony') || q.includes('annual')) {
      reply = `For school functions or ceremonies, ensure your uniform is exceptionally crisp and clean. If performing, follow teacher costume directions; otherwise, wear the full Formal School Uniform with polished shoes, neat belt, and school ID card.`;
    } else if (q.includes('house') || q.includes('tuesday')) {
      reply = `For House Uniform days, wear your assigned ${selectedHouse} House t-shirt with standard school trousers/skirt, white sneakers or regular school shoes, and your house badge!`;
    } else {
      reply = `Based on your configured schedule: Today is ${todayPlan.day} (${todayPlan.clothing}), and tomorrow is ${tomorrowPlan.day} (${tomorrowPlan.clothing}). If you have a specific dress code inquiry, you can also customize the weekly rules in Demo Mode!`;
    }

    const timeStr = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date());

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: query, time: timeStr },
      { sender: 'ai', text: reply, time: timeStr },
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    playSound('click');
    const q = inputQuery.trim();
    setInputQuery('');
    answerQuery(q);
  };

  const handleSuggestedClick = (text: string) => {
    playSound('click');
    answerQuery(text);
  };

  const suggestedQuestions = [
    'What should I wear today?',
    'What should I wear tomorrow?',
    'I have sports day tomorrow.',
    'It’s raining today.',
    'I have a school function.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-2xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Ask AI What Should I Wear? 🤖👔
              </h3>
              <p className="text-xs text-indigo-100 flex items-center gap-1">
                <span>Demo AI Mode</span>
                <span>•</span>
                <span>Rule-based schedule reasoning</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Disclaimer */}
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2 shrink-0">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>
            <strong>Demo AI Mode:</strong> Responses are generated using intelligent rule matching against your configured school schedule. No external server tracking.
          </span>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700/60'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* Suggested chips */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Quick Questions:
          </p>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSuggestedClick(q)}
                className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input bar */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2 shrink-0">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Aarav's AI what to wear..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
