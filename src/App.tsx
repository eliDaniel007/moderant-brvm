import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Stocks from './pages/Stocks';
import Login from './pages/Login';
import Register from './pages/Register';
import Alerts from './pages/Alerts';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Subscription from './pages/Subscription';
import { useAppDispatch } from './store/hooks';
import { checkAuth } from './features/auth/authSlice';
import ErrorBoundary from './components/ui/ErrorBoundary';
import NetworkError from './components/ui/NetworkError';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dark-900 text-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/subscription" element={<Subscription />} />
          </Routes>
        </main>
        <Footer />
        <NetworkError />
      </div>
    </ErrorBoundary>
  );
};

export default App;
