import React from 'react';
import { useNetworkError } from '../../hooks/useNetworkError';

interface NetworkErrorProps {
  className?: string;
}

const NetworkError: React.FC<NetworkErrorProps> = ({ className = '' }) => {
  const { error, isOnline, clearError } = useNetworkError();

  if (!error) return null;

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'cors':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'network':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
          </svg>
        );
      case 'server':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
    }
  };

  const getErrorColor = (type: string) => {
    switch (type) {
      case 'cors':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'network':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'server':
        return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      default:
        return 'bg-red-500/20 border-red-500/30 text-red-400';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md ${className}`}>
      <div className={`p-4 rounded-lg border ${getErrorColor(error.type)} shadow-lg`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getErrorIcon(error.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium mb-1">
              {error.message}
            </h3>
            {error.details && (
              <p className="text-sm opacity-90 mb-2">
                {error.details}
              </p>
            )}
            {error.type === 'cors' && (
              <div className="text-xs opacity-75 space-y-1">
                <p>• Vérifiez que le serveur Django est démarré</p>
                <p>• Port attendu : http://127.0.0.1:8000</p>
                <p>• Commande : <code className="bg-black/20 px-1 rounded">python manage.py runserver</code></p>
              </div>
            )}
            {error.type === 'network' && !isOnline && (
              <p className="text-xs opacity-75">
                Vérifiez votre connexion Internet
              </p>
            )}
          </div>
          <button
            onClick={clearError}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkError; 