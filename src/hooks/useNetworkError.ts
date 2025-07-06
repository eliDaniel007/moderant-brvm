import { useState, useEffect } from 'react';

interface NetworkError {
  type: 'cors' | 'network' | 'server' | 'unknown';
  message: string;
  details?: string;
}

export const useNetworkError = () => {
  const [error, setError] = useState<NetworkError | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setError(null);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setError({
        type: 'network',
        message: 'Connexion Internet perdue',
        details: 'Vérifiez votre connexion Internet et réessayez.'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleApiError = (err: any): NetworkError => {
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      return {
        type: 'network',
        message: 'Impossible de se connecter au serveur',
        details: 'Le serveur backend n\'est peut-être pas démarré ou accessible.'
      };
    }

    if (err.message?.includes('CORS')) {
      return {
        type: 'cors',
        message: 'Erreur de configuration CORS',
        details: 'Le serveur backend n\'autorise pas les requêtes depuis cette origine.'
      };
    }

    if (err.status >= 500) {
      return {
        type: 'server',
        message: 'Erreur serveur',
        details: 'Le serveur rencontre des difficultés. Veuillez réessayer plus tard.'
      };
    }

    if (err.status >= 400) {
      return {
        type: 'server',
        message: 'Erreur de requête',
        details: err.message || 'La requête n\'a pas pu être traitée.'
      };
    }

    return {
      type: 'unknown',
      message: 'Erreur inconnue',
      details: err.message || 'Une erreur inattendue s\'est produite.'
    };
  };

  const setApiError = (err: any) => {
    const networkError = handleApiError(err);
    setError(networkError);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    isOnline,
    setApiError,
    clearError
  };
}; 