import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { mockStocks } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = mockStocks.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getPerformanceColor = (value: number) => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  const getPerformanceBg = (value: number) => {
    if (value > 0) return 'bg-green-500/10 border-green-500/20';
    if (value < 0) return 'bg-red-500/10 border-red-500/20';
    return 'bg-slate-500/10 border-slate-500/20';
  };

  return (
    <div className="flex-grow bg-dark-900 text-white p-4 lg:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec animations */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gradient-animated">
            Tableau de Bord
          </h1>
          <p className="text-slate-400 text-lg">
            Bienvenue sur votre espace de trading personnel
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Valeur du Portefeuille</p>
                <p className="text-2xl font-bold text-primary-400">2,450,000 FCFA</p>
              </div>
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-400 text-sm font-medium">+12.5%</span>
              <span className="text-slate-400 text-sm ml-2">ce mois</span>
            </div>
          </Card>

          <Card className="hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Actions Détenues</p>
                <p className="text-2xl font-bold text-slate-200">24</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-blue-400 text-sm font-medium">+3</span>
              <span className="text-slate-400 text-sm ml-2">nouvelle(s)</span>
            </div>
          </Card>

          <Card className="hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Performance</p>
                <p className="text-2xl font-bold text-green-400">+8.2%</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-400 text-sm font-medium">+2.1%</span>
              <span className="text-slate-400 text-sm ml-2">vs marché</span>
            </div>
          </Card>

          <Card className="hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Alertes Actives</p>
                <p className="text-2xl font-bold text-yellow-400">5</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H6a4 4 0 00-2.83 1.17z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-yellow-400 text-sm font-medium">2</span>
              <span className="text-slate-400 text-sm ml-2">déclenchées</span>
            </div>
          </Card>
        </div>

        {/* Contrôles et recherche */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-full sm:w-64"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex bg-dark-700 rounded-lg p-1">
              {['1J', '1S', '1M', '3M', '1A'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedPeriod === period
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-dark-600'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-primary flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Ajouter une action</span>
          </button>
        </div>

        {/* Tableau des actions */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-3 px-4 font-medium text-slate-400">Action</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-400">Prix</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-400">Variation</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-400">Volume</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock, index) => (
                  <tr 
                    key={stock.symbol} 
                    className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{stock.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{stock.name}</p>
                          <p className="text-sm text-slate-400">{stock.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <p className="font-semibold text-slate-200">{formatCurrency(stock.currentPrice)}</p>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPerformanceBg(stock.change)}`}>
                        <span className={getPerformanceColor(stock.change)}>
                          {formatPercent(stock.change)}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <p className="text-slate-400">{stock.volume.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 