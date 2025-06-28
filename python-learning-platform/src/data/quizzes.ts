import type { Quiz } from '../types/quiz';

export const quizzes: Quiz[] = [
  {
    id: 'python-basics-1',
    title: 'Python Basics Quiz',
    description: 'Test your knowledge of Python fundamentals',
    timeLimit: 15, // 15 minutes
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is the correct way to create a variable in Python?',
        points: 2,
        options: [
          'var x = 5',
          'x = 5',
          'let x = 5',
          'const x = 5'
        ],
        correctAnswer: 1
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'Which of the following is NOT a Python data type?',
        points: 2,
        options: [
          'List',
          'Dictionary',
          'Array',
          'Tuple'
        ],
        correctAnswer: 2
      },
      {
        id: 'q3',
        type: 'coding',
        question: 'Write a function that returns the sum of all even numbers in a list.',
        points: 5,
        initialCode: `def sum_even_numbers(numbers):
    # Write your code here
    pass`,
        testCases: [
          {
            input: '[1, 2, 3, 4, 5, 6]',
            expectedOutput: '12'
          },
          {
            input: '[2, 4, 6, 8]',
            expectedOutput: '20'
          }
        ]
      },
      {
        id: 'q4',
        type: 'mcq',
        question: 'What is the output of print(type(1/2))?',
        points: 2,
        options: [
          '<class "int">',
          '<class "float">',
          '<class "number">',
          '<class "decimal">'
        ],
        correctAnswer: 1
      },
      {
        id: 'q5',
        type: 'coding',
        question: 'Write a function to check if a string is a palindrome.',
        points: 5,
        initialCode: `def is_palindrome(text):
    # Write your code here
    pass`,
        testCases: [
          {
            input: '"radar"',
            expectedOutput: 'True'
          },
          {
            input: '"hello"',
            expectedOutput: 'False'
          }
        ]
      }
    ]
  },
  {
    id: 'python-advanced-1',
    title: 'Advanced Python Concepts',
    description: 'Test your knowledge of advanced Python concepts',
    timeLimit: 20, // 20 minutes
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is a decorator in Python?',
        points: 3,
        options: [
          'A function that modifies another function',
          'A way to create classes',
          'A type of loop',
          'A data structure'
        ],
        correctAnswer: 0
      },
      {
        id: 'q2',
        type: 'coding',
        question: 'Implement a decorator that measures the execution time of a function.',
        points: 5,
        initialCode: `import time

def timer_decorator(func):
    # Write your code here
    pass

@timer_decorator
def example_function():
    time.sleep(1)
    return "Done"`,
        testCases: [
          {
            input: 'example_function()',
            expectedOutput: 'Done'
          }
        ]
      },
      {
        id: 'q3',
        type: 'mcq',
        question: 'Which of the following is NOT a valid way to create a list comprehension?',
        points: 2,
        options: [
          '[x for x in range(10)]',
          '[x*2 for x in range(10) if x % 2 == 0]',
          '[x for x in range(10) where x > 5]',
          '[x for x in range(10) if x > 5]'
        ],
        correctAnswer: 2
      }
    ]
  }
]; 