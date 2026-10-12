import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  HelpCircle, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Lightbulb,
  Award
} from 'lucide-react';
import { STUDY_TOPICS_DATABASE, QUIZ_QUESTIONS } from '../../data/initialData';
import { playSound } from '../../utils/sound';

export const StudyHelper: React.FC = () => {
  // --- SUB-TOOL 1: TOPIC EXPLAINER ---
  const [searchTopic, setSearchTopic] = useState('Photosynthesis');
  const [topicResult, setTopicResult] = useState(STUDY_TOPICS_DATABASE['photosynthesis']);

  const handleSearchTopic = (topicName: string) => {
    playSound('click');
    const key = topicName.toLowerCase().trim();
    setSearchTopic(topicName);

    // Look for direct match or partial match in keys
    const matchKey = Object.keys(STUDY_TOPICS_DATABASE).find(
      (k) => k.includes(key) || key.includes(k)
    );

    if (matchKey && STUDY_TOPICS_DATABASE[matchKey]) {
      setTopicResult(STUDY_TOPICS_DATABASE[matchKey]);
    } else {
      setTopicResult({
        summary: `Here is a quick overview of "${topicName}": A fundamental subject concept studied in school. Focus on understanding the core definitions, scientific principles, and real-world applications.`,
        points: [
          'Break down the concept into key terms and definitions.',
          'Connect the topic to everyday observations or experiments.',
          'Practice drawing flowcharts or summary diagrams.',
          'Review textbook summary questions and formula derivations.',
        ],
        funFact: `Deep conceptual understanding lasts much longer than rote memorization!`,
      });
    }
  };

  // --- SUB-TOOL 2: QUICK QUIZ ---
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuizIndex];

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    playSound('click');
    setSelectedOption(idx);
  };

  const handleSubmitQuiz = () => {
    if (selectedOption === null || hasSubmitted) return;
    setHasSubmitted(true);

    if (selectedOption === currentQ.correctAnswer) {
      playSound('success');
      setQuizScore((prev) => prev + 1);
    } else {
      playSound('click');
    }
  };

  const handleNextQuizQuestion = () => {
    playSound('click');
    if (currentQuizIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    playSound('click');
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  // --- SUB-TOOL 3: ROTATING STUDY TIPS ---
  const studyTips = [
    { title: 'The Pomodoro Technique', desc: 'Focus intensely for 25 minutes, then rest for 5 minutes. This keeps your brain fresh and prevents mental fatigue.' },
    { title: 'Feynman Technique', desc: 'Pretend you are teaching the concept to a 6th grader in plain words. If you get stuck, that is where your gap is!' },
    { title: 'Active Recall', desc: 'Close your book immediately after reading a section and write down everything you remember on a blank sheet.' },
    { title: 'Spaced Repetition', desc: 'Review notes on Day 1, Day 3, Day 7, and Day 14 to convert short-term facts into lifelong memory.' },
    { title: 'Hydration & Posture', desc: 'Drink a glass of water every hour and sit upright. Dehydration drops focus and memory retention by up to 20%.' },
  ];
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const handleNextTip = () => {
    playSound('click');
    setCurrentTipIndex((prev) => (prev + 1) % studyTips.length);
  };

  // --- SUB-TOOL 4: STUDY TIMER ---
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState<number>(25);
  const [customInput, setCustomInput] = useState('30');
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            setIsTimerRunning(false);
            playSound('alarm');
            alert('⏰ Aarav’s Study Timer: Session completed! Take a well-earned break!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  const handleStartPause = () => {
    playSound('click');
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = (minutes?: number) => {
    playSound('click');
    setIsTimerRunning(false);
    const mins = minutes !== undefined ? minutes : timerPreset;
    setTimerSeconds(mins * 60);
  };

  const setCustomMinutes = () => {
    const parsed = parseInt(customInput, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 180) {
      setTimerPreset(parsed);
      handleResetTimer(parsed);
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Learning Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Aarav&apos;s Study Helper 📚
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            Explain topics, master quick quizzes, track study timers, and learn smarter.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TOOL 1: EXPLAIN A TOPIC */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Search className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Explain a Topic
                </h3>
              </div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                Instant Concept Breakdown
              </span>
            </div>

            {/* Input & Search Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchTopic(searchTopic);
              }}
              className="flex gap-2 mb-4"
            >
              <input
                type="text"
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                placeholder="Enter a topic (e.g. Photosynthesis, Newton)..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm cursor-pointer transition-colors shadow-sm"
              >
                Explain
              </button>
            </form>

            {/* Popular Topics Quick Click */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {['Photosynthesis', 'Newton', 'Solar System', 'Water Cycle', 'Artificial Intelligence', 'Coding'].map(
                (topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleSearchTopic(topic)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
                  >
                    {topic}
                  </button>
                )
              )}
            </div>

            {/* Result Box */}
            {topicResult && (
              <div className="space-y-4 p-5 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {topicResult.summary}
                </p>

                {topicResult.formulaOrLaw && (
                  <div className="p-3 rounded-xl bg-indigo-100/70 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold text-indigo-900 dark:text-indigo-200">
                    🔬 Key Formula / Law: {topicResult.formulaOrLaw}
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Key Takeaways:</p>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {topicResult.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Did you know?</strong> {topicResult.funFact}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TOOL 2: QUICK QUIZ */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <HelpCircle className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Quick Quiz
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                Score: {quizScore} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {!quizCompleted ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Subject: {currentQ.subject}
                  </span>
                  <span>Question {currentQuizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {currentQ.question}
                </h4>

                {/* 4 Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctAnswer;
                    let styleClass = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400';

                    if (hasSubmitted) {
                      if (isCorrect) {
                        styleClass = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        styleClass = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200 font-semibold';
                      }
                    } else if (isSelected) {
                      styleClass = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-semibold ring-2 ring-indigo-500/20';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={hasSubmitted}
                        className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${styleClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-bold flex items-center justify-center text-slate-700 dark:text-slate-200">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {hasSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        )}
                        {hasSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Explanation */}
                {hasSubmitted && (
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <p className="font-bold text-slate-900 dark:text-white mb-1">
                      {selectedOption === currentQ.correctAnswer ? '🎉 Correct Answer!' : '❌ Incorrect'}
                    </p>
                    <p>{currentQ.explanation}</p>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz completion summary */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                  Quiz Completed!
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  You scored <strong className="text-indigo-600 dark:text-indigo-400">{quizScore}</strong> out of {QUIZ_QUESTIONS.length}!
                </p>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm cursor-pointer transition-colors shadow-md"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {!quizCompleted && (
            <div className="pt-4 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              {!hasSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={selectedOption === null}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm cursor-pointer transition-colors shadow-sm"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuizQuestion}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <span>{currentQuizIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question →' : 'See Final Score 🏆'}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* LOWER ROW: STUDY TIPS & STUDY TIMER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SUB-TOOL 3: ROTATING STUDY TIPS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900 border border-amber-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Rotating Study Tip
                </h3>
              </div>
              <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                Tip {currentTipIndex + 1} of {studyTips.length}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-amber-200/60 dark:border-slate-700 space-y-3 min-h-[140px] flex flex-col justify-center">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                💡 {studyTips[currentTipIndex].title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {studyTips[currentTipIndex].desc}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-amber-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={handleNextTip}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs cursor-pointer transition-colors shadow-sm"
            >
              <span>Next Study Tip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SUB-TOOL 4: WORKING STUDY TIMER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Clock className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Study Timer (Pomodoro)
                </h3>
              </div>
              <span className="text-xs text-slate-400">Audio Alarm Integrated</span>
            </div>

            {/* Timer Presets */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {[25, 15, 5].map((mins) => (
                <button
                  key={mins}
                  onClick={() => {
                    setTimerPreset(mins);
                    handleResetTimer(mins);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    timerPreset === mins
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {mins} min
                </button>
              ))}

              {/* Custom input */}
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-16 px-2 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-center"
                />
                <button
                  onClick={setCustomMinutes}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  Set
                </button>
              </div>
            </div>

            {/* Timer Big Display */}
            <div className="text-center py-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="font-mono text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-wider">
                {formatTimer(timerSeconds)}
              </span>
              <p className="text-xs text-slate-400 mt-2">
                {isTimerRunning ? '🔥 Deep Focus in Progress...' : 'Ready to start your focus session'}
              </p>
            </div>
          </div>

          {/* Controls: Start, Pause, Reset */}
          <div className="pt-4 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3">
            <button
              onClick={handleStartPause}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all cursor-pointer shadow-md ${
                isTimerRunning
                  ? 'bg-amber-600 hover:bg-amber-500'
                  : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {isTimerRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Focus</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleResetTimer()}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
