import { useState, useEffect } from 'react';
import { ActiveTab, OnboardingStep, DressPlan, CalendarEvent, NoteItem, TaskItem, FeatureSuggestion } from './types';
import { StorageService } from './utils/storage';
import { playSound } from './utils/sound';

// Onboarding Components
import { AnimatedWelcome } from './components/Onboarding/AnimatedWelcome';
import { NameEntryCard } from './components/Onboarding/NameEntryCard';
import { SpecialWelcome } from './components/Onboarding/SpecialWelcome';
import { FeatureIntro } from './components/Onboarding/FeatureIntro';

// Navigation & Global Components
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Navigation/Footer';
import { EasterEggModal } from './components/EasterEgg/EasterEggModal';

// Main Application Screens
import { HomeDashboard } from './components/Dashboard/HomeDashboard';
import { DressPlanner } from './components/DressPlanner/DressPlanner';
import { AIAssistant } from './components/AIAssistant/AIAssistant';
import { StudyHelper } from './components/StudyHelper/StudyHelper';
import { SchoolCalendar } from './components/Calendar/SchoolCalendar';
import { SmartTools } from './components/SmartTools/SmartTools';
import { DemoMode } from './components/DemoMode/DemoMode';
import { AboutAarav } from './components/About/AboutAarav';
import { FeatureSuggestions } from './components/Suggestions/FeatureSuggestions';

export function App() {
  // --- THEME STATE ---
  const [theme, setTheme] = useState<'light' | 'dark'>(() => StorageService.getTheme());

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    StorageService.setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    playSound('click');
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // --- USER & ONBOARDING STATE ---
  const [userName, setUserName] = useState<string>(() => StorageService.getUserName());
  const [isPrincipal, setIsPrincipal] = useState<boolean>(() => StorageService.getIsPrincipal());
  
  // Decide initial step: if userName exists, go straight to dashboard or allow replay
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(() => {
    const savedName = StorageService.getUserName();
    return savedName ? 'completed' : 'welcome';
  });

  // --- APPLICATION DATA STATE ---
  const [schedule, setSchedule] = useState<DressPlan[]>(() => StorageService.getDressSchedule());
  const [events, setEvents] = useState<CalendarEvent[]>(() => StorageService.getEvents());
  const [notes, setNotes] = useState<NoteItem[]>(() => StorageService.getNotes());
  const [tasks, setTasks] = useState<TaskItem[]>(() => StorageService.getTasks());
  const [suggestions, setSuggestions] = useState<FeatureSuggestion[]>(() => StorageService.getSuggestions());
  const [selectedHouse, setSelectedHouse] = useState<string>(() => StorageService.getSelectedHouse());

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [demoEditDayId, setDemoEditDayId] = useState<string | undefined>(undefined);

  // Easter egg modal
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  // Sync state changes with localStorage
  const handleUpdateSchedule = (newSchedule: DressPlan[]) => {
    setSchedule(newSchedule);
    StorageService.setDressSchedule(newSchedule);
  };



  const handleAddEvent = (newEvent: CalendarEvent) => {
    const updated = [newEvent, ...events];
    setEvents(updated);
    StorageService.setEvents(updated);
  };

  const handleDeleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    StorageService.setEvents(updated);
  };

  const handleSaveNotes = (newNotes: NoteItem[]) => {
    setNotes(newNotes);
    StorageService.setNotes(newNotes);
  };

  const handleSaveTasks = (newTasks: TaskItem[]) => {
    setTasks(newTasks);
    StorageService.setTasks(newTasks);
  };

  const handleAddSuggestion = (newSug: FeatureSuggestion) => {
    const updated = [newSug, ...suggestions];
    setSuggestions(updated);
    StorageService.setSuggestions(updated);
  };

  const handleLikeSuggestion = (id: string) => {
    playSound('click');
    const updated = suggestions.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s));
    setSuggestions(updated);
    StorageService.setSuggestions(updated);
  };

  const handleSelectHouse = (house: string) => {
    setSelectedHouse(house);
    StorageService.setSelectedHouse(house);
  };

  const handleResetProject = () => {
    StorageService.resetAllToDefault();
    setSchedule(StorageService.getDressSchedule());
    setEvents(StorageService.getEvents());
    setNotes(StorageService.getNotes());
    setTasks(StorageService.getTasks());
    setSuggestions(StorageService.getSuggestions());
    playSound('chime');
  };

  const handleResetUser = () => {
    playSound('click');
    setOnboardingStep('name-entry');
  };

  // --- ONBOARDING FLOW HANDLERS ---
  const handleWelcomeNext = () => {
    playSound('click');
    setOnboardingStep('name-entry');
  };

  const handleNameSubmitted = (name: string, principalMode: boolean) => {
    setUserName(name);
    setIsPrincipal(principalMode);
    setOnboardingStep('special-welcome');
  };

  const handleSpecialWelcomeProceed = () => {
    playSound('click');
    setOnboardingStep('feature-intro');
  };

  const handleFeatureIntroExplore = () => {
    setOnboardingStep('completed');
    setActiveTab('home');
  };

  // Render onboarding steps if not completed
  if (onboardingStep === 'welcome') {
    return <AnimatedWelcome onNext={handleWelcomeNext} />;
  }

  if (onboardingStep === 'name-entry') {
    return <NameEntryCard onNameSubmitted={handleNameSubmitted} />;
  }

  if (onboardingStep === 'special-welcome') {
    return (
      <SpecialWelcome
        name={userName}
        isPrincipal={isPrincipal}
        onProceed={handleSpecialWelcomeProceed}
      />
    );
  }

  if (onboardingStep === 'feature-intro') {
    return <FeatureIntro onExplore={handleFeatureIntroExplore} />;
  }

  // --- MAIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        userName={userName}
        isPrincipal={isPrincipal}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onResetUser={handleResetUser}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <HomeDashboard
              userName={userName}
              isPrincipal={isPrincipal}
              schedule={schedule}
              selectedHouse={selectedHouse}
              events={events}
              tasks={tasks}
              onNavigateTab={setActiveTab}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FeatureSuggestions
                suggestions={suggestions}
                onAddSuggestion={handleAddSuggestion}
                onLikeSuggestion={handleLikeSuggestion}
                userName={userName}
              />
            </div>
          </div>
        )}

        {activeTab === 'dress' && (
          <DressPlanner
            schedule={schedule}
            selectedHouse={selectedHouse}
            onSelectHouse={handleSelectHouse}
            onNavigateToDemo={(dayId) => {
              setDemoEditDayId(dayId);
              setActiveTab('demo');
            }}
          />
        )}

        {activeTab === 'ai' && (
          <AIAssistant schedule={schedule} selectedHouse={selectedHouse} />
        )}

        {activeTab === 'study' && <StudyHelper />}

        {activeTab === 'calendar' && (
          <SchoolCalendar
            events={events}
            onAddEventClick={() => setActiveTab('demo')}
            onDeleteEvent={handleDeleteEvent}
          />
        )}

        {activeTab === 'tools' && (
          <SmartTools
            notes={notes}
            onSaveNotes={handleSaveNotes}
            tasks={tasks}
            onSaveTasks={handleSaveTasks}
          />
        )}

        {activeTab === 'demo' && (
          <div className="space-y-12">
            <DemoMode
              schedule={schedule}
              onUpdateSchedule={handleUpdateSchedule}
              onAddEvent={handleAddEvent}
              onResetProject={handleResetProject}
              initialDayId={demoEditDayId}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FeatureSuggestions
                suggestions={suggestions}
                onAddSuggestion={handleAddSuggestion}
                onLikeSuggestion={handleLikeSuggestion}
                userName={userName}
              />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <AboutAarav onTriggerEasterEgg={() => setIsEasterEggOpen(true)} />
        )}
      </main>

      {/* Footer with 5-click easter egg trigger */}
      <Footer
        onSelectTab={setActiveTab}
        onTriggerEasterEgg={() => setIsEasterEggOpen(true)}
      />

      {/* Easter Egg Celebration Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />
    </div>
  );
}
export default App;
