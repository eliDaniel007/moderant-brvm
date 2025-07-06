import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { mockStocks } from '../data/mockData';

const Stocks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');

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

  const sectors = ['all', ...Array.from(new Set(mockStocks.map(stock => stock.sector)))];

  const filteredStocks = mockStocks.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || stock.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="flex-grow bg-dark-900 text-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-100">Actions BRVM</h1>
          <p className="text-slate-400">Découvrez toutes les actions disponibles sur la Bourse Régionale des Valeurs Mobilières</p>
        </div>

        {/* Filtres */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Rechercher une action (ex: BOAC, NSIA...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:w-48">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sectors.map(sector => (
                  <option key={sector} value={sector}>
                    {sector === 'all' ? 'Tous les secteurs' : sector}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistiques du marché */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {mockStocks.filter(s => s.change > 0).length}
            </p>
            <p className="text-slate-400">En hausse</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {mockStocks.filter(s => s.change < 0).length}
            </p>
            <p className="text-slate-400">En baisse</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-bold text-slate-200">
              {mockStocks.length}
            </p>
            <p className="text-slate-400">Actions totales</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-bold text-primary-400">
              {sectors.length - 1}
            </p>
            <p className="text-slate-400">Secteurs</p>
          </Card>
        </div>

        {/* Liste des actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => (
            <Card key={stock.symbol} hover className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{stock.name}</h3>
                  <p className="text-primary-400 font-bold">{stock.symbol}</p>
                  <p className="text-sm text-slate-400">{stock.sector}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(stock.currentPrice)}
                  </p>
                  <p className={`text-sm font-medium ${
                    stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatPercent(stock.change)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-slate-400">Volume</p>
                  <p className="text-white font-semibold">{stock.volume.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400">Market Cap</p>
                  <p className="text-white font-semibold">{(stock.marketCap / 1000000000).toFixed(1)}B</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link to="/analysis" className="flex-1">
                  <button className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium">
                    Voir analyse
                  </button>
                </Link>
                <button className="py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium">
                  + Alerte
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredStocks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucune action trouvée</h3>
            <p className="text-slate-400">Essayez avec un autre terme de recherche ou secteur</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stocks; 