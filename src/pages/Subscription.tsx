import React from 'react';

const Subscription: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Abonnement</h1>
      <p className="text-dark-300 mb-6">Choisissez le plan qui vous convient le mieux</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Plan Gratuit */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <h2 className="text-xl font-semibold mb-4">Gratuit</h2>
          <div className="text-3xl font-bold mb-4">0 FCFA<span className="text-sm text-dark-300">/mois</span></div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Accès aux données de base
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              5 alertes par mois
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Support email
            </li>
          </ul>
          <button className="btn-secondary w-full">Plan actuel</button>
        </div>

        {/* Plan Premium */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg p-6 border border-primary-500 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-warning-500 text-white px-3 py-1 rounded-full text-sm font-medium">Populaire</span>
          </div>
          <h2 className="text-xl font-semibold mb-4">Premium</h2>
          <div className="text-3xl font-bold mb-4">25 000 FCFA<span className="text-sm text-primary-200">/mois</span></div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <svg className="w-4 h-4 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Toutes les fonctionnalités gratuites
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Alertes illimitées
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Analyses techniques avancées
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Support prioritaire
            </li>
          </ul>
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-colors duration-200 w-full">
            Choisir Premium
          </button>
        </div>

        {/* Plan Pro */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <h2 className="text-xl font-semibold mb-4">Pro</h2>
          <div className="text-3xl font-bold mb-4">50 000 FCFA<span className="text-sm text-dark-300">/mois</span></div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Toutes les fonctionnalités Premium
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Conseiller personnel
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Rapports personnalisés
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Support 24/7
            </li>
          </ul>
          <button className="btn-primary w-full">Choisir Pro</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription; 