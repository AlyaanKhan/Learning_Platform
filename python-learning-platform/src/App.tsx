import React, { useMemo, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PythonBasics from './pages/PythonBasics';
import AdvancedPython from './pages/AdvancedPython';
import Libraries from './pages/Libraries';
import MachineLearning from './pages/MachineLearning';
import ArtificialIntelligence from './pages/ArtificialIntelligence';
import LangChain from './pages/LangChain';
import CodeEditorPage from './pages/CodeEditorPage';
import QuizList from './components/QuizList';
import QuizPage from './pages/QuizPage';
import QuizResult from './pages/QuizResult';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#4855b8',
      light: '#6b76d4',
      dark: '#2c3a9e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'dark' ? '#181c20' : '#f8f9fa',
      paper: mode === 'dark' ? '#23272e' : '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(72, 85, 184, 0.2)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '2rem',
          paddingBottom: '2rem',
        },
      },
    },
  },
});

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
  }), []);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/python-basics" element={<PythonBasics />} />
              <Route path="/advanced-python" element={<AdvancedPython />} />
              <Route path="/libraries" element={<Libraries />} />
              <Route path="/machine-learning" element={<MachineLearning />} />
              <Route path="/artificial-intelligence" element={<ArtificialIntelligence />} />
              <Route path="/langchain" element={<LangChain />} />
              <Route path="/code-editor" element={<CodeEditorPage />} />
              <Route path="/quizzes" element={<QuizList />} />
              <Route path="/quiz/:quizId" element={<QuizPage />} />
              <Route path="/quiz/:quizId/result" element={<QuizResult />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
}

export default App;
