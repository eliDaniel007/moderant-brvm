import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const features = [
    {
      icon: '📊',
      title: 'Analyses Techniques Avancées',
      description: 'Accédez à des analyses détaillées et des indicateurs techniques pour prendre des décisions éclairées.'
    },
    {
      icon: '🔔',
      title: 'Alertes Personnalisées',
      description: 'Configurez des alertes sur vos actions préférées et soyez notifié des opportunités importantes.'
    },
    {
      icon: '📈',
      title: 'Suivi de Performance',
      description: 'Surveillez vos investissements avec des graphiques interactifs et des rapports détaillés.'
    },
    {
      icon: '💰',
      title: 'Gestion de Portefeuille',
      description: 'Gérez efficacement votre portefeuille d\'actions avec des outils professionnels.'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Utilisateurs actifs' },
    { value: '500+', label: 'Actions suivies' },
    { value: '95%', label: 'Précision des analyses' },
    { value: '24/7', label: 'Support disponible' }
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-950 to-dark-950"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Investissez avec{' '}
              <span className="text-gradient-animated">Confiance</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              La plateforme de trading la plus avancée pour les marchés financiers africains. 
              Analysez, investissez et gérez votre portefeuille avec des outils professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Commencer gratuitement
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Pourquoi choisir MODERANT ?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Une suite complète d'outils conçus pour les investisseurs modernes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card hover-lift text-center p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à transformer vos investissements ?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Rejoignez des milliers d'investisseurs qui font confiance à MODERANT pour leurs décisions financières.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="primary" size="lg">
                Créer mon compte gratuit
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="secondary" size="lg">
                Voir la démo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-950 py-12 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">MODERANT</h3>
              <p className="text-slate-400">
                La plateforme de trading moderne pour les marchés africains.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Communauté</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 MODERANT. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 