import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/homePage';
import LoginPage from '@/pages/loginPage';
import ProfilePage from '@/pages/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './themes';

interface RootState {
  mode: string;
}

const App = () => {
  const mode = useSelector((state: RootState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;