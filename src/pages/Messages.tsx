import React from 'react';

const Messages: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      <p className="text-dark-300 mb-6">Communiquez avec notre équipe et recevez des notifications</p>
      
      <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Aucun message</h2>
          <p className="text-dark-300 mb-4">Vous n'avez pas encore de messages</p>
          <button className="btn-primary">
            Contacter le support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages; 