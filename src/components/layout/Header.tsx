import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logoutUser, enableDemoMode, disableDemoMode } from '../../features/auth/authSlice';
import { RootState } from '../../store/store';

const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, isDemoMode } = useAppSelector((state: RootState) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/stocks', label: 'Actions', public: true },
    { path: '/analysis', label: 'Analyses', public: true },
    { path: '/dashboard', label: 'Tableau de bord', public: false },
    { path: '/alerts', label: 'Alertes', public: false },
    { path: '/messages', label: 'Messages', public: false },
  ];

  const handleLogout = () => {
    if (isDemoMode) {
      dispatch(disableDemoMode());
    } else {
      dispatch(logoutUser());
    }
  };

  const handleDemoMode = () => {
    dispatch(enableDemoMode());
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-950/90 backdrop-blur-md border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-gradient font-bold text-xl">BRVM Analyse</span>
            {isDemoMode && (
              <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full font-medium">
                DÉMO
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              (link.public || isAuthenticated) && (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${
                    isActiveLink(link.path) ? 'nav-link-active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors">
                  <span className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.first_name.charAt(0)}
                  </span>
                  <span className="hidden lg:inline">{user?.first_name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-lg border border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-700">
                      Mon Profil
                    </Link>
                    <Link to="/subscription" className="block px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-700">
                      Abonnement
                    </Link>
                    <div className="border-t border-dark-700 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-danger-400 hover:text-danger-300 hover:bg-dark-700"
                    >
                      {isDemoMode ? 'Quitter le mode démo' : 'Déconnexion'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    S'abonner
                  </Button>
                </Link>
                <button
                  onClick={handleDemoMode}
                  className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Mode Démo
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-800">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                (link.public || isAuthenticated) && (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`nav-link px-4 py-2 rounded-lg ${
                      isActiveLink(link.path)
                        ? 'nav-link-active bg-dark-800'
                        : 'hover:bg-dark-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-dark-800 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2 px-4 rounded-lg bg-dark-800 text-white hover:bg-dark-700 transition-colors"
                    >
                      Mon Profil
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-center py-2 px-4 rounded-lg bg-danger-600 text-white hover:bg-danger-700 transition-colors"
                    >
                      {isDemoMode ? 'Quitter le mode démo' : 'Déconnexion'}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2 px-4 rounded-lg bg-dark-800 text-white hover:bg-dark-700 transition-colors"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2 px-4 rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:shadow-lg transition-all"
                    >
                      S'abonner
                    </Link>
                    <button
                      onClick={() => {
                        handleDemoMode();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-center py-2 px-4 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
                    >
                      Mode Démo
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 