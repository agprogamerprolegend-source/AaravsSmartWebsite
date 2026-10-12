import { DressPlan, CalendarEvent, NoteItem, TaskItem, FeatureSuggestion } from '../types';
import { 
  DEFAULT_DRESS_SCHEDULE, 
  DEFAULT_CALENDAR_EVENTS, 
  DEFAULT_NOTES, 
  DEFAULT_TASKS, 
  INITIAL_SUGGESTIONS 
} from '../data/initialData';

const STORAGE_KEYS = {
  USER_NAME: 'aarav_web_userName',
  IS_PRINCIPAL: 'aarav_web_isPrincipalMode',
  ONBOARDING_STEP: 'aarav_web_onboardingStep',
  THEME: 'aarav_web_theme',
  DRESS_SCHEDULE: 'aarav_web_dressSchedule',
  EVENTS: 'aarav_web_events',
  NOTES: 'aarav_web_notes',
  TASKS: 'aarav_web_tasks',
  SUGGESTIONS: 'aarav_web_suggestions',
  SELECTED_HOUSE: 'aarav_web_selectedHouse',
  CUSTOM_TIPS: 'aarav_web_customTips',
};

// Safe JSON getter
function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

// Safe JSON setter
function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing localStorage key "${key}":`, error);
  }
}

export const StorageService = {
  getUserName(): string {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME) || '';
  },
  setUserName(name: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
    } catch (e) {
      console.warn(e);
    }
  },

  getIsPrincipal(): boolean {
    return localStorage.getItem(STORAGE_KEYS.IS_PRINCIPAL) === 'true';
  },
  setIsPrincipal(isPrincipal: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.IS_PRINCIPAL, isPrincipal ? 'true' : 'false');
    } catch (e) {
      console.warn(e);
    }
  },

  getOnboardingStep(): string {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_STEP) || 'welcome';
  },
  setOnboardingStep(step: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_STEP, step);
    } catch (e) {
      console.warn(e);
    }
  },

  getTheme(): 'light' | 'dark' {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (theme === 'dark' || theme === 'light') return theme;
    // Default to dark or system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },
  setTheme(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn(e);
    }
  },

  getDressSchedule(): DressPlan[] {
    return getStoredItem<DressPlan[]>(STORAGE_KEYS.DRESS_SCHEDULE, DEFAULT_DRESS_SCHEDULE);
  },
  setDressSchedule(schedule: DressPlan[]): void {
    setStoredItem(STORAGE_KEYS.DRESS_SCHEDULE, schedule);
  },

  getEvents(): CalendarEvent[] {
    return getStoredItem<CalendarEvent[]>(STORAGE_KEYS.EVENTS, DEFAULT_CALENDAR_EVENTS);
  },
  setEvents(events: CalendarEvent[]): void {
    setStoredItem(STORAGE_KEYS.EVENTS, events);
  },

  getNotes(): NoteItem[] {
    return getStoredItem<NoteItem[]>(STORAGE_KEYS.NOTES, DEFAULT_NOTES);
  },
  setNotes(notes: NoteItem[]): void {
    setStoredItem(STORAGE_KEYS.NOTES, notes);
  },

  getTasks(): TaskItem[] {
    return getStoredItem<TaskItem[]>(STORAGE_KEYS.TASKS, DEFAULT_TASKS);
  },
  setTasks(tasks: TaskItem[]): void {
    setStoredItem(STORAGE_KEYS.TASKS, tasks);
  },

  getSuggestions(): FeatureSuggestion[] {
    return getStoredItem<FeatureSuggestion[]>(STORAGE_KEYS.SUGGESTIONS, INITIAL_SUGGESTIONS);
  },
  setSuggestions(suggestions: FeatureSuggestion[]): void {
    setStoredItem(STORAGE_KEYS.SUGGESTIONS, suggestions);
  },

  getSelectedHouse(): string {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_HOUSE) || 'Red';
  },
  setSelectedHouse(house: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_HOUSE, house);
    } catch (e) {
      console.warn(e);
    }
  },

  resetAllToDefault(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.DRESS_SCHEDULE);
      localStorage.removeItem(STORAGE_KEYS.EVENTS);
      localStorage.removeItem(STORAGE_KEYS.NOTES);
      localStorage.removeItem(STORAGE_KEYS.TASKS);
      localStorage.removeItem(STORAGE_KEYS.SUGGESTIONS);
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_TIPS);
    } catch (e) {
      console.warn(e);
    }
  },

  // Check if name matches Principal condition
  checkIsPrincipal(name: string): boolean {
    const trimmed = name.trim();
    if (!trimmed) return false;
    const lower = trimmed.toLowerCase();
    
    // Condition 1: contains "chauhan"
    if (lower.includes('chauhan')) {
      return true;
    }

    // Condition 2: user's first name begins with "N"
    const firstName = trimmed.split(/\s+/)[0];
    if (firstName && firstName.toLowerCase().startsWith('n')) {
      return true;
    }

    return false;
  }
};
