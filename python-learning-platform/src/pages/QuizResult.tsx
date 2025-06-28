import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';
import { ArrowLeft, Check, X } from 'lucide-react';
import { quizzes } from '../data/quizzes';
import type { QuizResult } from '../types/quiz';

const QuizResultPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [quiz, setQuiz] = useState(quizzes.find(q => q.id === quizId));

  useEffect(() => {
    if (!quizId) {
      navigate('/quizzes');
      return;
    }

    const savedResult = localStorage.getItem(`quiz_result_${quizId}`);
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      navigate('/quizzes');
    }
  }, [quizId]);

  if (!result || !quiz) {
    return null;
  }

  const scorePercentage = (result.score / result.totalPoints) * 100;
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowLeft />}
        onClick={() => navigate('/quizzes')}
        sx={{ mb: 3 }}
      >
        Back to Quizzes
      </Button>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Quiz Results
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          {quiz.title}
        </Typography>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">Score</Typography>
            <Typography variant="h6">
              {result.score} / {result.totalPoints} points
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={scorePercentage}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography
            variant="h3"
            color="primary"
            sx={{ textAlign: 'center', mt: 2 }}
          >
            {scorePercentage.toFixed(1)}%
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Time Taken: {formatTime(result.timeTaken)}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Completed: {new Date(result.completedAt).toLocaleString()}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Question Details
        </Typography>
        <List>
          {result.answers.map((answer, index) => {
            const question = quiz.questions.find(q => q.id === answer.questionId);
            if (!question) return null;

            return (
              <ListItem
                key={answer.questionId}
                sx={{
                  mb: 2,
                  backgroundColor: 'background.default',
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">
                        Question {index + 1}
                      </Typography>
                      <Chip
                        size="small"
                        label={question.type === 'mcq' ? 'MCQ' : 'Coding'}
                        color={question.type === 'mcq' ? 'primary' : 'secondary'}
                      />
                      <Chip
                        size="small"
                        icon={answer.isCorrect ? <Check size={16} /> : <X size={16} />}
                        label={answer.isCorrect ? 'Correct' : 'Incorrect'}
                        color={answer.isCorrect ? 'success' : 'error'}
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {question.question}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Points: {answer.points} / {question.points}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/quiz/${quizId}`)}
          >
            Retake Quiz
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/quizzes')}
          >
            Back to Quiz List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuizResultPage; 