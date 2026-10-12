import React, { useState } from 'react';
import { Bot, Send, Trash2, Sparkles, ShieldAlert, Lightbulb, User } from 'lucide-react';
import { DressPlan } from '../../types';
import { playSound } from '../../utils/sound';

interface AIAssistantProps {
  schedule: DressPlan[];
  selectedHouse: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ schedule, selectedHouse }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello! I'm Aarav's AI Assistant. I can help you with school dress recommendations, study advice, computer science facts, and daily planning. Ask me anything!`,
      timestamp: 'Just now',
    },
  ]);

  const suggestedQuestions = [
    'Give me a study tip.',
    'Explain photosynthesis simply.',
    'Give me a computer fact.',
    'Help me plan my day.',
    'What should I wear today?',
    'Give me a motivational quote.',
  ];

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Check today's schedule
    const todayIndex = new Date().getDay();
    const todayPlan = schedule.find((s) => s.dayNumber === todayIndex) || schedule[0];

    if (q.includes('study tip') || q.includes('how to study')) {
      return `Study Tip: Try the Pomodoro Technique! Study focused for 25 minutes, then take a strict 5-minute break. After 4 sessions, take a longer 20-minute rest. Also, use active recall by closing your notes and explaining the concept out loud to an imaginary classmate. You can also use Aarav's Study Helper timer!`;
    }

    if (q.includes('photosynthesis')) {
      return `Photosynthesis Explained Simply 🌱:\nIt's the recipe green plants use to make food!\n\n1. Plants absorb Sunlight (solar energy) with chlorophyll.\n2. They take Carbon Dioxide from the air.\n3. They draw Water from roots in the soil.\n\nResult: The plant creates Glucose (sugar food) to grow, and releases fresh Oxygen (O₂) into the air for us to breathe!`;
    }

    if (q.includes('computer fact') || q.includes('coding fact') || q.includes('technology fact')) {
      const facts = [
        `Computer Fact: The first computer mouse was carved out of wood by Doug Engelbart in 1964!`,
        `Computer Fact: The first computer bug was an actual real moth found trapped inside the Harvard Mark II computer in 1947 by Grace Hopper's team!`,
        `Computer Fact: Over 90% of the world's currency exists only in digital form on computer servers!`,
        `Web Fact: The World Wide Web was invented by Sir Tim Berners-Lee in 1989 at CERN to help scientists share research!`,
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }

    if (q.includes('plan my day') || q.includes('schedule my day') || q.includes('routine')) {
      return `Daily Student Blueprint 🎯:\n1. Morning: Check Aarav's Dress Planner for the right uniform, polish shoes, pack bag according to your timetable.\n2. School Hours: Stay attentive, take brief notes, participate in house activities.\n3. Afternoon: 30 mins rest and healthy snack.\n4. Study Block: 2 x 25-min Pomodoro sessions in Aarav's Study Helper for homework and revision.\n5. Evening: Physical activity or sports, then pack books for tomorrow before sleeping!`;
    }

    if (q.includes('wear') || q.includes('dress') || q.includes('uniform')) {
      const houseText = todayPlan.houseDependent ? ` (${selectedHouse} House Color)` : '';
      return `Uniform Recommendation 👔:\nToday is ${todayPlan.day}. You should wear the "${todayPlan.clothing}" in ${todayPlan.color}${houseText}.\nFootwear: ${todayPlan.shoes}.\nAarav's Tip: "${todayPlan.smartTip}"`;
    }

    if (q.includes('quote') || q.includes('motivat')) {
      const quotes = [
        `"The secret of getting ahead is getting started." — Mark Twain`,
        `"It always seems impossible until it's done." — Nelson Mandela`,
        `"Success is the sum of small efforts, repeated day in and day out." — Robert Collier`,
        `"Code is like humor. When you have to explain it, it’s bad." — Cory House`,
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    }

    if (q.includes('aarav') || q.includes('who made') || q.includes('creator')) {
      return `This entire project was designed and coded by Aarav Garkoti for his Web Designing Project (2026). Aarav built it to prove that student utility websites can be modern, interactive, and smart!`;
    }

    if (q.includes('math') || q.includes('science') || q.includes('formula')) {
      return `Great academic question! In Aarav's Study Helper section, you can explore detailed topic summaries, formulas, and test your knowledge in the Quick Quiz!`;
    }

    // Default intelligent response
    return `That's an interesting question! In Demo AI Mode, I specialize in school dress rules, study methods, science concepts, and student planning. Try asking: "What should I wear today?", "Explain photosynthesis simply", or "Give me a study tip"!`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    playSound('click');
    const timeStr = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date());

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate smart thinking delay
    setTimeout(() => {
      const aiReplyText = getAIResponse(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiReplyText,
        timestamp: timeStr,
      };
      setMessages((prev) => [...prev, aiMsg]);
      playSound('chime');
    }, 350);
  };

  const handleClearChat = () => {
    playSound('click');
    setMessages([
      {
        id: 'init-1',
        sender: 'assistant',
        text: `Conversation cleared! How can I help you next?`,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Assistant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ask Aarav&apos;s AI 🤖
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Get intelligent school tips, dress advice, and quick academic help.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Demo AI Mode Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            Demo AI Mode
          </span>

          <button
            onClick={handleClearChat}
            className="p-2.5 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Clear Chat Conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Demo AI Mode Notice banner */}
      <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
        <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900 dark:text-white">Note for Teacher & Principal:</span>{' '}
          This assistant operates in transparent <strong>Demo AI Mode</strong> with modular response logic. It can easily connect to an external real AI model (like OpenAI or Claude) via API keys in the future!
        </div>
      </div>

      {/* Chat Area Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[520px]">
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm ${
                    isUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-linear-to-tr from-blue-600 to-indigo-600 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700/70'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggested Chips Bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Suggested Questions:</span>
          </p>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your question for Aarav's AI..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-md"
          >
            <span className="hidden sm:inline">Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
