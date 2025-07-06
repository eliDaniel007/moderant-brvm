import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { mockAlerts } from '../data/mockData';

const Alerts: React.FC = () => {
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    if (filterActive === 'all') return true;
    if (filterActive === 'active') return alert.isActive;
    if (filterActive === 'inactive') return !alert.isActive;
    return true;
  });

  const getConditionText = (condition: string) => {
    return condition === 'above' ? 'Au-dessus de' : 'En-dessous de';
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'sms':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'push':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H6a4 4 0 00-2.83 1.17z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow bg-dark-900 text-white p-4 lg:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gradient-animated">
            Mes Alertes
          </h1>
          <p className="text-slate-400 text-lg">
            Gérez vos alertes de prix personnalisées
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Alertes</p>
                <p className="text-2xl font-bold text-slate-200">{mockAlerts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H6a4 4 0 00-2.83 1.17z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Alertes Actives</p>
                <p className="text-2xl font-bold text-green-400">
                  {mockAlerts.filter(a => a.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Alertes Déclenchées</p>
                <p className="text-2xl font-bold text-yellow-400">2</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Filtres et actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex bg-slate-700 rounded-lg p-1">
            {[
              { key: 'all', label: 'Toutes', count: mockAlerts.length },
              { key: 'active', label: 'Actives', count: mockAlerts.filter(a => a.isActive).length },
              { key: 'inactive', label: 'Inactives', count: mockAlerts.filter(a => !a.isActive).length }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterActive(filter.key as 'all' | 'active' | 'inactive')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  filterActive === filter.key
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-600'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          <button className="btn-primary flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Créer une alerte</span>
          </button>
        </div>

        {/* Liste des alertes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              className="hover-lift animate-fade-in"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-200">{alert.stockName}</h3>
                  <p className="text-slate-400 text-sm">{alert.stockSymbol}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  alert.isActive 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {alert.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Condition:</span>
                  <span className="text-slate-200 text-sm font-medium">
                    {getConditionText(alert.condition)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Seuil:</span>
                  <span className="text-primary-400 font-semibold">
                    {alert.threshold.toLocaleString()} FCFA
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Prix actuel:</span>
                  <span className={`font-semibold ${
                    alert.condition === 'above' && alert.currentPrice >= alert.threshold ? 'text-green-400' :
                    alert.condition === 'below' && alert.currentPrice <= alert.threshold ? 'text-green-400' : 'text-slate-200'
                  }`}>
                    {alert.currentPrice.toLocaleString()} FCFA
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Notification:</span>
                  <div className="flex items-center space-x-1">
                    {getNotificationIcon(alert.notificationType)}
                    <span className="text-slate-200 text-sm capitalize">{alert.notificationType}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Créée le:</span>
                  <span className="text-slate-200 text-sm">
                    {new Date(alert.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex gap-2">
                <button className="flex-1 py-2 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200 text-sm font-medium">
                  Modifier
                </button>
                <button className="flex-1 py-2 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 text-sm font-medium">
                  Supprimer
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H6a4 4 0 00-2.83 1.17z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Aucune alerte trouvée</h3>
            <p className="text-slate-400 mb-4">
              {filterActive === 'all' 
                ? "Vous n'avez pas encore créé d'alertes" 
                : `Aucune alerte ${filterActive === 'active' ? 'active' : 'inactive'} trouvée`
              }
            </p>
            <button className="btn-primary">
              Créer votre première alerte
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts; 