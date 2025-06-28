import React from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Box,
} from '@mui/material';
import type { MCQQuestion as MCQQuestionType } from '../types/quiz';

interface MCQQuestionProps {
  question: MCQQuestionType;
  onAnswer: (questionId: string, answer: number) => void;
  selectedAnswer?: number;
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({
  question,
  onAnswer,
  selectedAnswer,
}) => {
  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 2, 
        mt: 2,
        backgroundColor: 'background.default',
      }}
    >
      <RadioGroup
        value={selectedAnswer}
        onChange={(e) => onAnswer(question.id, parseInt(e.target.value))}
      >
        {question.options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={index}
            control={<Radio />}
            label={option}
            sx={{
              mb: 1,
              p: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          />
        ))}
      </RadioGroup>
    </Paper>
  );
};

export default MCQQuestion; 