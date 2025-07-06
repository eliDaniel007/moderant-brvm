import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { mockAnalyses, mockStocks } from '../data/mockData';
import StockPriceChart from '../components/charts/StockPriceChart';
import Button from '../components/ui/Button';
import { DollarSign, Shield, Target, Zap } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const Analysis = () => {
  const [selectedTicker, setSelectedTicker] = useState('SNTL');

  const analyseSelectionnee = mockAnalyses.find(a => a.ticker === selectedTicker);

  if (!analyseSelectionnee) {
    return (
      <div className="flex-grow flex items-center justify-center text-slate-400">
        Aucune donnée d'analyse disponible pour {selectedTicker}.
      </div>
    );
  }
  
  const chartData = {
    labels: analyseSelectionnee.historiquePrix.map(h => h.date),
    prices: analyseSelectionnee.historiquePrix.map(h => h.prix),
  };

  const getRecommendationColor = (recommandation: string) => {
    switch (recommandation) {
      case 'Acheter':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Vendre':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Conserver':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getRSIColor = (rsi: string) => {
    const rsiValue = parseFloat(rsi);
    if (rsiValue > 70) return 'text-red-400';
    if (rsiValue < 30) return 'text-green-400';
    return 'text-yellow-400';
  };

  const getMACDColor = (macd: string) => {
    if (macd.includes('Positif')) return 'text-green-400';
    if (macd.includes('Négatif')) return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="flex-grow bg-dark-900 text-white p-4 lg:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 lg:mb-0 text-slate-100">Analyse Technique</h1>
          
          {/* Sélecteur d'actions */}
          <div className="w-full lg:w-auto">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Sélectionner une action
            </label>
            <select
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value)}
              className="w-full lg:w-80 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {mockStocks.map((stock) => (
                <option key={stock.symbol} value={stock.symbol}>
                  {stock.name} ({stock.symbol}) - {stock.currentPrice.toLocaleString()} FCFA
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* En-tête de l'action sélectionnée */}
        <Card className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-slate-200">
                {analyseSelectionnee.nom} ({analyseSelectionnee.ticker})
              </h2>
              <p className="text-primary-400 font-bold text-3xl mb-2">
                {analyseSelectionnee.prixActuel.toLocaleString()} FCFA
              </p>
              <p className="text-slate-400 text-sm">
                Secteur: {mockStocks.find(s => s.symbol === selectedTicker)?.sector}
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-col items-end">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getRecommendationColor(analyseSelectionnee.recommandation)}`}>
                {analyseSelectionnee.recommandation}
              </span>
              <div className="mt-2 text-xs text-slate-400">
                Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
          
          {/* Graphique principal */}
          <div className="h-96">
            <StockPriceChart data={chartData} ticker={analyseSelectionnee.ticker} />
          </div>
        </Card>

        {/* Wrapper pour tout le contenu sous le graphique */}
        <div className="flex flex-col gap-6">

          {/* Section Actions Rapides et Résumé */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Actions rapides */}
            <Card className="lg:col-span-2">
              <Card.Header>
                <Card.Title>Actions Rapides</Card.Title>
              </Card.Header>
              <Card.Content className="flex flex-wrap gap-4">
                <Button variant="primary" icon={<DollarSign size={16} />}>Acheter/Vendre</Button>
                <Button variant="secondary" icon={<Shield size={16} />}>Définir un Stop-Loss</Button>
                <Button variant="secondary" icon={<Target size={16} />}>Définir un Take-Profit</Button>
                <Button variant="outline" icon={<Zap size={16} />}>Créer une alerte de prix</Button>
              </Card.Content>
            </Card>

            {/* Résumé */}
            <Card className="flex flex-col items-center justify-center text-center bg-blue-50">
              <Card.Header>
                <Card.Title>Résumé de l'Analyse</Card.Title>
              </Card.Header>
              <Card.Content className="flex flex-col items-center gap-2">
                <CheckCircle size={40} className="text-blue-500" />
                <p className="text-2xl font-bold text-blue-800">{analyseSelectionnee.resume}</p>
                <p className="text-sm text-gray-500">Basé sur les indicateurs techniques</p>
              </Card.Content>
            </Card>
          </div>

          {/* Grille des 3 indicateurs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Indicateurs Techniques */}
            <Card>
              <Card.Header>
                <Card.Title>Indicateurs Techniques</Card.Title>
              </Card.Header>
              <Card.Content>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li className="flex justify-between items-center">
                    <span>RSI (14)</span>
                    <span className={`font-semibold ${getRSIColor(analyseSelectionnee.indicateurs.rsi)}`}>
                      {analyseSelectionnee.indicateurs.rsi}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>MACD</span>
                    <span className={`font-semibold ${getMACDColor(analyseSelectionnee.indicateurs.macd)}`}>
                      {analyseSelectionnee.indicateurs.macd}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Moyenne Mobile 20</span>
                    <span className="font-semibold text-slate-200">
                      {analyseSelectionnee.indicateurs['moyenne mobile 20']}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Moyenne Mobile 50</span>
                    <span className="font-semibold text-slate-200">
                      {analyseSelectionnee.indicateurs['moyenne mobile 50']}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Bandes de Bollinger</span>
                    <span className="font-semibold text-slate-200 text-sm">
                      {analyseSelectionnee.indicateurs['bandes de bollinger']}
                    </span>
                  </li>
                </ul>
              </Card.Content>
            </Card>

            {/* Moyennes Mobiles */}
            <Card>
              <Card.Header>
                <Card.Title>Indicateurs Fondamentaux</Card.Title>
              </Card.Header>
              <Card.Content>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li className="flex justify-between items-center">
                    <span>P/E Ratio</span>
                    <span className="font-semibold text-slate-200">
                      {analyseSelectionnee.indicateurs.per}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Beta</span>
                    <span className="font-semibold text-slate-200">
                      {analyseSelectionnee.indicateurs.beta}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Rendement Dividende</span>
                    <span className="font-semibold text-slate-200">
                      {analyseSelectionnee.indicateurs.dividendYield}
                    </span>
                  </li>
                </ul>
              </Card.Content>
            </Card>

            {/* Sentiment du Marché */}
            <Card>
              <Card.Header>
                <Card.Title>Sentiment du Marché</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="flex flex-col items-center justify-center h-full">
                  <p className={`text-4xl font-bold ${analyseSelectionnee.sentiment === 'Positif' ? 'text-green-400' : 'text-red-400'}`}>
                    {analyseSelectionnee.sentiment}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Basé sur les nouvelles récentes</p>
                </div>
              </Card.Content>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Analysis; 