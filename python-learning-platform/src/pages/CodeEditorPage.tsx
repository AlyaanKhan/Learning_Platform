import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography, Button, TextField, Paper, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Terminal } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const CodeContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.mode === 'dark' ? '#23272e' : theme.palette.grey[100],
  color: theme.palette.mode === 'dark' ? '#f8f8f2' : theme.palette.text.primary,
  fontFamily: 'Fira Mono, monospace',
  fontSize: 16,
  borderRadius: theme.shape.borderRadius,
  overflowX: 'auto',
}));

const OutputContainer = styled(CodeContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.mode === 'dark' ? '#181c20' : theme.palette.grey[200],
  color: theme.palette.mode === 'dark' ? '#e0e0e0' : theme.palette.text.primary,
  border: `1px solid ${theme.palette.mode === 'dark' ? '#2c313a' : theme.palette.grey[300]}`,
}));

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiAlert-root': {
    minWidth: '300px',
    borderRadius: '12px',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 4px 20px rgba(0, 0, 0, 0.5)'
      : '0 4px 20px rgba(0, 0, 0, 0.15)',
    '&.MuiAlert-standardSuccess': {
      backgroundColor: theme.palette.mode === 'dark' ? '#1b5e20' : '#e8f5e9',
      color: theme.palette.mode === 'dark' ? '#fff' : '#1b5e20',
      '& .MuiAlert-icon': {
        color: theme.palette.mode === 'dark' ? '#4caf50' : '#2e7d32',
      },
    },
    '&.MuiAlert-standardError': {
      backgroundColor: theme.palette.mode === 'dark' ? '#b71c1c' : '#fdecea',
      color: theme.palette.mode === 'dark' ? '#fff' : '#d32f2f',
      '& .MuiAlert-icon': {
        color: theme.palette.mode === 'dark' ? '#ef5350' : '#d32f2f',
      },
      '& .MuiAlert-message': {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      },
    },
  },
}));

const ErrorMessage = styled('div')(({ theme }) => ({
  fontSize: '0.9rem',
  opacity: 0.9,
  marginTop: '4px',
  paddingLeft: '4px',
  borderLeft: `2px solid ${theme.palette.mode === 'dark' ? '#ef5350' : '#d32f2f'}`,
}));

const CodeEditorPage = () => {
  const location = useLocation();
  const initialCode = location.state?.code || '';
  const outputRef = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<React.ReactNode>('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>('success');

  const scrollToOutput = () => {
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const showNotification = (message: React.ReactNode, severity: 'success' | 'error') => {
    setToastMessage(message);
    setToastSeverity(severity);
    setShowToast(true);
  };

  const getErrorMessage = (error: string) => {
    if (error.includes('Failed to connect')) {
      return {
        title: 'Connection Error',
        details: 'Unable to connect to the Python backend. Please check if the server is running.'
      };
    }
    if (error.includes('timed out')) {
      return {
        title: 'Execution Timeout',
        details: 'Your code took too long to execute. Please optimize your code or reduce complexity.'
      };
    }
    return {
      title: 'Execution Failed',
      details: error
    };
  };

  const handleRunCode = async () => {
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
        if (result.error) {
          const errorInfo = getErrorMessage(result.error);
          showNotification(
            <div>
              <div>{errorInfo.title}</div>
              <ErrorMessage>{errorInfo.details}</ErrorMessage>
            </div>,
            'error'
          );
        } else {
          showNotification('Code executed successfully!', 'success');
        }
        setTimeout(scrollToOutput, 100);
      } else {
        const errorInfo = getErrorMessage(result.error || 'An unknown error occurred');
        setError(result.error || 'An unknown error occurred');
        setOutput(result.output || '');
        showNotification(
          <div>
            <div>{errorInfo.title}</div>
            <ErrorMessage>{errorInfo.details}</ErrorMessage>
          </div>,
          'error'
        );
      }
    } catch (err: any) {
      const errorInfo = getErrorMessage(err.message);
      setError('Failed to connect to the backend or an error occurred: ' + err.message);
      showNotification(
        <div>
          <div>{errorInfo.title}</div>
          <ErrorMessage>{errorInfo.details}</ErrorMessage>
        </div>,
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Python Code Editor
      </Typography>
      <TextField
        label="Edit your Python code"
        multiline
        fullWidth
        rows={15}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        variant="outlined"
        sx={{ mb: 2, fontFamily: 'Fira Mono, monospace' }}
        InputProps={{
          style: {
            fontFamily: 'Fira Mono, monospace',
            fontSize: 16,
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<Terminal size={20} />}
        onClick={handleRunCode}
        disabled={loading}
      >
        {loading ? 'Running...' : 'Run Code'}
      </Button>
      
      {(output || error) && (
        <OutputContainer elevation={0} ref={outputRef}>
          <Typography variant="h6" gutterBottom>
            Output:
          </Typography>
          {output && <pre>{output}</pre>}
          {error && <pre style={{ color: 'red' }}>{error}</pre>}
        </OutputContainer>
      )}

      <StyledSnackbar
        open={showToast}
        autoHideDuration={5000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
        }}
      >
        <Alert 
          onClose={() => setShowToast(false)} 
          severity={toastSeverity}
          variant="standard"
          sx={{
            width: '100%',
            '& .MuiAlert-message': {
              fontSize: '0.95rem',
              fontWeight: 500,
            },
            '& .MuiAlert-icon': {
              fontSize: '1.5rem',
            },
          }}
        >
          {toastMessage}
        </Alert>
      </StyledSnackbar>
    </Container>
  );
};

export default CodeEditorPage; 