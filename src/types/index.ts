export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface DressPlan {
  id: string;
  day: DayOfWeek;
  dayNumber: number; // 0=Sunday, 1=Monday...
  clothing: string;
  color: string;
  shoes: string;
  accessories: string;
  description: string;
  smartTip: string;
  badge: string;
  iconName: string;
  houseDependent?: boolean;
  specialEvent?: string;
}

export type EventCategory = 'sports' | 'cultural' | 'exam' | 'art' | 'celebration' | 'submission' | 'special';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  category: EventCategory;
  description: string;
  location?: string;
  dressRecommendation?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
  pinned: boolean;
}

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export interface FeatureSuggestion {
  id: string;
  title: string;
  category: string;
  author: string;
  submittedAt: string;
  likes: number;
}

export interface QuizQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number; // index 0-3
  explanation: string;
}

export type ActiveTab = 
  | 'home'
  | 'dress'
  | 'ai'
  | 'study'
  | 'calendar'
  | 'tools'
  | 'demo'
  | 'about';

export type OnboardingStep = 
  | 'welcome'
  | 'name-entry'
  | 'special-welcome'
  | 'feature-intro'
  | 'completed';
