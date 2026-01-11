/**
 * TypeScript Type Definitions for Mindora Personality Quiz
 * Comprehensive type safety for all API responses, state, and localStorage
 */

// ============================================================================
// PERSONALITY TYPES
// ============================================================================

export interface Personality {
  id: string;
  name: string;
  description: string;
  traits: string[];
}

export interface PersonalitiesResponse {
  personalities: Personality[];
}

// ============================================================================
// QUIZ QUESTION TYPES
// ============================================================================

export interface QuestionOption {
  id: string;
  text: string;
  scores: Record<string, number>;
}

export interface Question {
  id: string;
  text: string;
  weight: number;
  order: number;
  options: QuestionOption[];
}

export interface QuestionsResponse {
  questions: Question[];
}

// ============================================================================
// QUIZ SUBMISSION TYPES
// ============================================================================

export interface Answer {
  questionId: string;
  optionId: string;
}

export interface QuizSubmission {
  answers: Answer[];
}

export interface QuizSubmissionResponse {
  token: string;
  topPersonality: string;
  scores: Record<string, number>;
}

// ============================================================================
// QUIZ RESULT TYPES
// ============================================================================

export interface QuizResult {
  token?: string;
  topPersonality: Personality;
  scores: Record<string, number>;
  createdAt: string;
}

// ============================================================================
// LOCAL STORAGE TYPES
// ============================================================================

export interface StoredResult {
  token: string;
  personalityId: string;
  personalityName: string;
  timestamp: number;
  scores: Record<string, number>;
}

// ============================================================================
// QUIZ STATE TYPES
// ============================================================================

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  isSubmitting: boolean;
  error: string | null;
}

export interface QuizProgress {
  current: number;
  total: number;
  percentage: number;
  answeredCount: number;
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
  code?: string;
}

// ============================================================================
// PERSONALITY COLOR MAPPING
// ============================================================================

export type PersonalityColor = 'blue' | 'purple' | 'green' | 'orange';

export interface PersonalityTheme {
  primary: string;
  secondary: string;
  glow: string;
  gradient: string;
}

export const PERSONALITY_COLORS: Record<string, PersonalityColor> = {
  'Architect': 'blue',
  'Explorer': 'purple',
  'Supporter': 'green',
  'Leader': 'orange',
};

// ============================================================================
// API ERROR TYPES
// ============================================================================

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'outline';
  glow?: PersonalityColor | 'none';
  animated?: boolean;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  animated?: boolean;
  color?: PersonalityColor;
  className?: string;
}

// ============================================================================
// ANIMATION TYPES
// ============================================================================

export interface AnimationConfig {
  duration: number;
  ease: string;
  stagger?: number;
  delay?: number;
}

export type AnimationType = 
  | 'fadeIn' 
  | 'fadeOut' 
  | 'slideInLeft' 
  | 'slideInRight' 
  | 'slideOutLeft' 
  | 'slideOutRight' 
  | 'scaleIn' 
  | 'scaleOut'
  | 'stagger';

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type AsyncState<T> = {
  data: Nullable<T>;
  loading: boolean;
  error: Nullable<string>;
};
