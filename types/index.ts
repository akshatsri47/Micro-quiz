export interface QuizCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    quizCount: number;
  }
  
  export interface Quiz {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    questions: Question[];
    timeLimit?: number; // in minutes
    createdAt: string;
  }
  
  export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    points: number;
  }
  
  export interface QuizResult {
    score: number;
    totalQuestions: number;
    answers: UserAnswer[];
    completedAt: string;
    timeTaken: number; // in seconds
  }
  
  export interface UserAnswer {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }