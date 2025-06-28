import React, { useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  Paper,
  Button,
  Collapse,
  Alert,
} from '@mui/material';
import { Play, ChevronDown, ChevronUp } from 'lucide-react';
import type { CodingQuestion as CodingQuestionType } from '../types/quiz';

interface CodingQuestionProps {
  question: CodingQuestionType;
  onAnswer: (questionId: string, code: string) => void;
  initialCode?: string;
}

const CodingQuestion: React.FC<CodingQuestionProps> = ({
  question,
  onAnswer,
  initialCode,
}) => {
  const [code, setCode] = useState(initialCode || question.initialCode);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showTestCases, setShowTestCases] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onAnswer(question.id, newCode);
  };

  const runCode = async () => {
    setLoading(true);
    setOutput('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (response.ok) {
        setOutput(result.output);
        setError(result.error);
      } else {
        setError(result.error || 'An error occurred while running the code');
      }
    } catch (err: any) {
      setError('Failed to connect to the backend: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={10}
        value={code}
        onChange={handleCodeChange}
        variant="outlined"
        sx={{
          fontFamily: 'Fira Code, monospace',
          '& .MuiInputBase-input': {
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.9rem',
          },
        }}
      />

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Play size={20} />}
          onClick={runCode}
          disabled={loading}
        >
          {loading ? 'Running...' : 'Run Code'}
        </Button>
        <Button
          variant="outlined"
          endIcon={showTestCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          onClick={() => setShowTestCases(!showTestCases)}
        >
          {showTestCases ? 'Hide Test Cases' : 'Show Test Cases'}
        </Button>
      </Box>

      <Collapse in={showTestCases}>
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Test Cases
          </Typography>
          {question.testCases.map((testCase, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Test Case {index + 1}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                Input: {testCase.input}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                Expected Output: {testCase.expectedOutput}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Collapse>

      {(output || error) && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Output
          </Typography>
          {output && (
            <Typography
              component="pre"
              sx={{
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                backgroundColor: 'background.default',
                p: 1,
                borderRadius: 1,
              }}
            >
              {output}
            </Typography>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default CodingQuestion; 