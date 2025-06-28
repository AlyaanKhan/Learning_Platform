export type QuestionType = 'mcq' | 'coding';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  points: number;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
  correctAnswer: number; // index of correct option
}

export interface CodingQuestion extends BaseQuestion {
  type: 'coding';
  initialCode: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
}

export type Question = MCQQuestion | CodingQuestion;

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: Question[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalPoints: number;
  timeTaken: number;
  answers: {
    questionId: string;
    userAnswer: string | number;
    isCorrect: boolean;
    points: number;
  }[];
  completedAt: string;
} 