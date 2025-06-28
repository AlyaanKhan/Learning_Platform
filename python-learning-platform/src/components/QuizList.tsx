import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { Timer, Code, CheckSquare } from 'lucide-react';
import { quizzes } from '../data/quizzes';

const QuizList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Quizzes
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {quizzes.map((quiz) => (
          <Card 
            key={quiz.id}
            sx={{ 
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {quiz.title}
              </Typography>
              <Typography color="text.secondary" paragraph>
                {quiz.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<Timer size={16} />}
                  label={`${quiz.timeLimit} minutes`}
                  size="small"
                />
                <Chip
                  icon={<CheckSquare size={16} />}
                  label={`${quiz.questions.filter(q => q.type === 'mcq').length} MCQs`}
                  size="small"
                />
                <Chip
                  icon={<Code size={16} />}
                  label={`${quiz.questions.filter(q => q.type === 'coding').length} Coding`}
                  size="small"
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default QuizList; 