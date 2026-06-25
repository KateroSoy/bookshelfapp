/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Note {
  id: string;
  content: string;
  page?: number;
  createdAt: string;
}

export interface Quote {
  id: string;
  content: string;
  page?: number;
  createdAt: string;
}

export interface ReviewCard {
  id: string;
  question: string;
  answer: string;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewDate: string; // ISO string
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverGradient: string; // Tailwind gradient class or custom CSS gradient
  coverTextColor: string; // textColor for the cover details
  status: 'reading' | 'finished' | 'tbr';
  progress: number; // 0 to 100
  rating: number; // 0 to 5 (or 0 if unrated)
  genre: string;
  shelf: string;
  pages: number;
  pagesRead: number;
  notesCount: number;
  quotesCount: number;
  aiSummary: string;
  keyTakeaways: string[];
  reviewDue: boolean;
  dateStarted?: string; // YYYY-MM-DD
  dateFinished?: string; // YYYY-MM-DD
  notes: Note[];
  quotes: Quote[];
  reviewCards: ReviewCard[];
  isFavorite: boolean;
}

export interface ReadingGoal {
  annualTarget: number;
  annualCompleted: number;
  monthlyPagesTarget: number;
  monthlyPagesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  streakDates: string[]; // YYYY-MM-DD
  monthlyHistory: { month: string; pagesRead: number; booksCompleted: number }[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  favoriteGenres: string[];
  joinedAt: string;
}
