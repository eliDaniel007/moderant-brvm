import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Analysis from './pages/Analysis';
import Subscription from './pages/Subscription';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

// Créer un thème sombre moderne pour le trading
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00C6AE',
    },
    secondary: {
      main: '#2D8CFF',
    },
    background: {
      default: '#181A20',
      paper: '#23272F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0AEC0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: '0 4px 14px 0 rgba(0, 198, 174, 0.4)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(35, 39, 47, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: '100%',
          maxWidth: '100%',
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        bgcolor: '#181A20',
        backgroundImage: `radial-gradient(circle at 15% 50%, rgba(0, 198, 174, 0.08) 0%, transparent 25%), 
                           radial-gradient(circle at 85% 30%, rgba(45, 140, 255, 0.08) 0%, transparent 30%)`
      }}>
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            minHeight: '100vh',
            background: `linear-gradient(135deg, #181A20 0%, #141518 100%)`,
            backgroundImage: `radial-gradient(circle at 15% 50%, rgba(0, 198, 174, 0.08) 0%, transparent 25%), 
                            radial-gradient(circle at 85% 30%, rgba(45, 140, 255, 0.08) 0%, transparent 30%)`,
            overflowX: 'hidden',
          }}
        >
          <Header />
          <Box sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
