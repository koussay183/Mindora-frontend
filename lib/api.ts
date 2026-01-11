/**
 * API Client for Mindora Personality Quiz
 * Handles all HTTP requests to the backend API
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  PersonalitiesResponse,
  QuestionsResponse,
  QuizSubmission,
  QuizSubmissionResponse,
  QuizResult,
  ApiError,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mindora-backend-mjdl.onrender.com/api/quiz';

/**
 * Get JWT token from localStorage
 */
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

/**
 * Axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add auth token to requests
 */
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Error handler for API requests
 */
const handleApiError = (error: AxiosError<ApiError>): never => {
  if (error.response) {
    // Handle authentication errors
    if (error.response.status === 401) {
      // Clear invalid token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
      throw new Error('Authentication required. Please login.');
    }
    
    if (error.response.status === 403) {
      throw new Error(error.response.data?.message || 'Access denied');
    }
    
    // Server responded with error status
    const message = error.response.data?.message || 'An error occurred';
    throw new Error(message);
  } else if (error.request) {
    // No response received
    throw new Error('Network error. Please check your connection.');
  } else {
    // Request setup error
    throw new Error('Failed to make request');
  }
};

/**
 * Fetch all personality types (PUBLIC)
 */
export const getPersonalities = async (): Promise<PersonalitiesResponse> => {
  try {
    const response = await apiClient.get<PersonalitiesResponse>('/personalities');
    return response.data;
  } catch (error) {
    return handleApiError(error as AxiosError<ApiError>);
  }
};

/**
 * Fetch all quiz questions (PUBLIC)
 */
export const getQuestions = async (): Promise<QuestionsResponse> => {
  try {
    const response = await apiClient.get<QuestionsResponse>('/questions');
    return response.data;
  } catch (error) {
    return handleApiError(error as AxiosError<ApiError>);
  }
};

/**
 * Submit quiz answers (PROTECTED - Requires JWT)
 */
export const submitQuiz = async (submission: QuizSubmission): Promise<QuizSubmissionResponse> => {
  try {
    const response = await apiClient.post<QuizSubmissionResponse>('/submit', submission);
    return response.data;
  } catch (error) {
    return handleApiError(error as AxiosError<ApiError>);
  }
};

/**
 * Get quiz result by token (PROTECTED - Requires JWT)
 */
export const getResult = async (token: string): Promise<QuizResult> => {
  try {
    const response = await apiClient.get<QuizResult>(`/result/${token}`);
    return response.data;
  } catch (error) {
    return handleApiError(error as AxiosError<ApiError>);
  }
};

/**
 * Get current user's quiz result (PROTECTED - Requires JWT)
 */
export const getMyResult = async (): Promise<QuizResult> => {
  try {
    const response = await apiClient.get<QuizResult>('/my-result');
    return response.data;
  } catch (error) {
    return handleApiError(error as AxiosError<ApiError>);
  }
};

/**
 * Retry wrapper for failed API calls
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError!;
};

export default apiClient;
