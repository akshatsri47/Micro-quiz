// src/data/mockData.ts
import { Quiz, QuizCategory } from '@/types';

export const mockCategories: QuizCategory[] = [
  {
    id: 'history',
    name: 'History',
    description: 'Test your knowledge of historical events and figures',
    icon: '🏛️',
    color: 'bg-amber-500',
    quizCount: 3
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Explore the wonders of scientific discoveries',
    icon: '🔬',
    color: 'bg-blue-500',
    quizCount: 4
  },
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Challenge yourself with mathematical problems',
    icon: '🧮',
    color: 'bg-green-500',
    quizCount: 2
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Test your coding knowledge and best practices',
    icon: '💻',
    color: 'bg-purple-500',
    quizCount: 5
  }
];

export const mockQuizzes: Quiz[] = [
  // History Quizzes
  {
    id: 'history-world-war-2',
    title: 'World War II Facts',
    description: 'Test your knowledge about the Second World War',
    category: 'history',
    difficulty: 'medium',
    timeLimit: 10,
    createdAt: '2024-01-15T10:00:00Z',
    questions: [
      {
        id: 'q1',
        question: 'In which year did World War II end?',
        options: ['1944', '1945', '1946', '1947'],
        correctAnswer: 1,
        explanation: 'World War II ended in 1945 with the surrender of Japan.',
        points: 10
      },
      {
        id: 'q2',
        question: 'Which country was NOT part of the Axis Powers?',
        options: ['Germany', 'Italy', 'Japan', 'United States'],
        correctAnswer: 3,
        explanation: 'The United States was part of the Allied Powers, not the Axis Powers.',
        points: 10
      },
      {
        id: 'q3',
        question: 'What was the code name for the Allied invasion of Normandy?',
        options: ['Operation Overlord', 'Operation Barbarossa', 'Operation Market Garden', 'Operation Torch'],
        correctAnswer: 0,
        explanation: 'Operation Overlord was the codename for the Battle of Normandy.',
        points: 15
      }
    ]
  },
  {
    id: 'history-ancient-civilizations',
    title: 'Ancient Civilizations',
    description: 'Discover the mysteries of ancient worlds',
    category: 'history',
    difficulty: 'hard',
    timeLimit: 15,
    createdAt: '2024-01-10T14:30:00Z',
    questions: [
      {
        id: 'q1',
        question: 'Which ancient civilization built Machu Picchu?',
        options: ['Maya', 'Aztec', 'Inca', 'Olmec'],
        correctAnswer: 2,
        explanation: 'Machu Picchu was built by the Inca civilization in the 15th century.',
        points: 10
      },
      {
        id: 'q2',
        question: 'The Rosetta Stone was key to deciphering which ancient script?',
        options: ['Cuneiform', 'Hieroglyphics', 'Linear B', 'Sanskrit'],
        correctAnswer: 1,
        explanation: 'The Rosetta Stone helped scholars decode Egyptian hieroglyphics.',
        points: 15
      }
    ]
  },
  // Science Quizzes
  {
    id: 'science-physics-basics',
    title: 'Physics Fundamentals',
    description: 'Basic principles of physics',
    category: 'science',
    difficulty: 'easy',
    timeLimit: 8,
    createdAt: '2024-01-20T09:15:00Z',
    questions: [
      {
        id: 'q1',
        question: 'What is the speed of light in vacuum?',
        options: ['299,792,458 m/s', '300,000,000 m/s', '299,000,000 m/s', '301,000,000 m/s'],
        correctAnswer: 0,
        explanation: 'The speed of light in vacuum is exactly 299,792,458 meters per second.',
        points: 10
      },
      {
        id: 'q2',
        question: 'Which law states that force equals mass times acceleration?',
        options: ['Newton\'s First Law', 'Newton\'s Second Law', 'Newton\'s Third Law', 'Law of Gravity'],
        correctAnswer: 1,
        explanation: 'Newton\'s Second Law states that F = ma.',
        points: 10
      }
    ]
  },
  // Math Quizzes
  {
    id: 'math-algebra-basics',
    title: 'Algebra Basics',
    description: 'Fundamental algebraic concepts',
    category: 'math',
    difficulty: 'easy',
    timeLimit: 12,
    createdAt: '2024-01-25T11:00:00Z',
    questions: [
      {
        id: 'q1',
        question: 'What is the value of x in the equation 2x + 5 = 15?',
        options: ['3', '5', '7', '10'],
        correctAnswer: 1,
        explanation: '2x + 5 = 15, so 2x = 10, therefore x = 5.',
        points: 10
      },
      {
        id: 'q2',
        question: 'What is the slope of the line y = 3x + 2?',
        options: ['2', '3', '5', '1'],
        correctAnswer: 1,
        explanation: 'In the equation y = mx + b, m is the slope. Here m = 3.',
        points: 10
      }
    ]
  },
  // Programming Quizzes
  {
    id: 'programming-javascript-basics',
    title: 'JavaScript Fundamentals',
    description: 'Core JavaScript concepts',
    category: 'programming',
    difficulty: 'medium',
    timeLimit: 15,
    createdAt: '2024-01-30T16:45:00Z',
    questions: [
      {
        id: 'q1',
        question: 'What is the output of console.log(typeof null)?',
        options: ['null', 'undefined', 'object', 'boolean'],
        correctAnswer: 2,
        explanation: 'In JavaScript, typeof null returns "object" due to a historical bug.',
        points: 15
      },
      {
        id: 'q2',
        question: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0,
        explanation: 'The push() method adds elements to the end of an array.',
        points: 10
      }
    ]
  },
  {
    id: 'programming-react-concepts',
    title: 'React Concepts',
    description: 'Understanding React fundamentals',
    category: 'programming',
    difficulty: 'hard',
    timeLimit: 20,
    createdAt: '2024-02-01T13:20:00Z',
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of useEffect hook?',
        options: ['State management', 'Side effects', 'Context sharing', 'Event handling'],
        correctAnswer: 1,
        explanation: 'useEffect is used for performing side effects in functional components.',
        points: 15
      },
      {
        id: 'q2',
        question: 'When does a React component re-render?',
        options: ['When props change', 'When state changes', 'When parent re-renders', 'All of the above'],
        correctAnswer: 3,
        explanation: 'React components re-render when props change, state changes, or parent re-renders.',
        points: 20
      }
    ]
  }
];

// Helper functions for API routes
export function getCategoryById(id: string): QuizCategory | undefined {
  return mockCategories.find(cat => cat.id === id);
}

export function getQuizzesByCategory(category: string): Quiz[] {
  return mockQuizzes.filter(quiz => quiz.category === category);
}

export function getQuizById(id: string): Quiz | undefined {
  return mockQuizzes.find(quiz => quiz.id === id);
}

export function getAllCategories(): QuizCategory[] {
  return mockCategories;
}