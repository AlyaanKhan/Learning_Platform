import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Timer, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { quizzes } from '../data/quizzes';
import type { Question, QuizResult } from '../types/quiz';
import MCQQuestion from '../components/MCQQuestion';
import CodingQuestion from '../components/CodingQuestion';
import { useSnackbar } from 'notistack';

const TimerBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  zIndex: 1000,
}));

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const timerRef = useRef<number | null>(null);

  const quiz = quizzes.find(q => q.id === quizId);
  const currentQuestion = quiz?.questions[currentQuestionIndex];

  useEffect(() => {
    if (!quiz) {
      navigate('/quizzes');
      return;
    }

    setTimeLeft(quiz.timeLimit * 60);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quiz]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowConfirmDialog(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = (): QuizResult => {
    if (!quiz) throw new Error('Quiz not found');

    const answersList = quiz.questions.map(question => {
      const userAnswer = answers[question.id];
      let isCorrect = false;
      let points = 0;

      if (question.type === 'mcq') {
        isCorrect = userAnswer === question.correctAnswer;
        points = isCorrect ? question.points : 0;
      } else {
        // For coding questions, we'll need to implement test case checking
        // This is a placeholder for now
        isCorrect = true;
        points = question.points;
      }

      return {
        questionId: question.id,
        userAnswer: userAnswer || '',
        isCorrect,
        points,
      };
    });

    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const score = answersList.reduce((sum, a) => sum + a.points, 0);

    return {
      quizId: quiz.id,
      score,
      totalPoints,
      timeTaken: quiz.timeLimit * 60 - timeLeft,
      answers: answersList,
      completedAt: new Date().toISOString(),
    };
  };

  const handleQuizComplete = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const result = calculateScore();
    // Store result in localStorage or send to backend
    localStorage.setItem(`quiz_result_${quizId}`, JSON.stringify(result));
    
    enqueueSnackbar('Quiz completed! Redirecting to results...', {
      variant: 'success',
      autoHideDuration: 3000,
    });

    setTimeout(() => {
      navigate(`/quiz/${quizId}/result`);
    }, 3000);
  };

  if (!quiz || !currentQuestion) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <TimerBox>
        <Timer size={24} />
        <Typography variant="h6">
          {formatTime(timeLeft)}
        </Typography>
      </TimerBox>

      <Box sx={{ mb: 4 }}>
        <LinearProgress 
          variant="determinate" 
          value={(currentQuestionIndex + 1) / quiz.questions.length * 100} 
          sx={{ height: 8, borderRadius: 4 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {currentQuestion.question}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Points: {currentQuestion.points}
        </Typography>

        {currentQuestion.type === 'mcq' ? (
          <MCQQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={answers[currentQuestion.id] as number}
          />
        ) : (
          <CodingQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            initialCode={answers[currentQuestion.id] as string}
          />
        )}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          startIcon={<ArrowLeft />}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          endIcon={currentQuestionIndex === quiz.questions.length - 1 ? <Check /> : <ArrowRight />}
          variant="contained"
          onClick={handleNext}
        >
          {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>

      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
        <DialogTitle>Complete Quiz?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to complete the quiz? You have {formatTime(timeLeft)} remaining.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Continue</Button>
          <Button onClick={handleQuizComplete} variant="contained">
            Complete Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuizPage; 