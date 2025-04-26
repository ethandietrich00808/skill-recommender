import React from 'react';
import './App.css';
import SkillsIncomeTracker from './SkillsIncomeTracker';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SkillsIncomeTracker />
      </div>
    </ThemeProvider>
  );
}

export default App;
