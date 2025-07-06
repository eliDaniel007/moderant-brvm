process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Données simulées pour les actions BRVM
const brvmStocks = [
  {
    symbol: 'SONATEL',
    name: 'Sonatel',
    lastPrice: '15000',
    variation: '2.5',
    volume: '150000'
  },
  {
    symbol: 'BOA',
    name: 'Bank of Africa',
    lastPrice: '8500',
    variation: '-1.2',
    volume: '75000'
  },
  {
    symbol: 'SGBV',
    name: 'Société Générale',
    lastPrice: '12000',
    variation: '0.8',
    volume: '45000'
  },
  {
    symbol: 'ETIT',
    name: 'Ecobank Transnational',
    lastPrice: '9500',
    variation: '-0.5',
    volume: '60000'
  }
];

// Route pour obtenir tous les cours
app.get('/api/brvm/cours', (req, res) => {
  res.json(brvmStocks);
});

// Route pour obtenir les données historiques d'une action
app.get('/api/brvm/:symbol', (req, res) => {
  const { symbol } = req.params;
  const stock = brvmStocks.find(s => s.symbol === symbol);
  
  if (!stock) {
    return res.status(404).json({ error: 'Action non trouvée' });
  }

  // Générer des données historiques simulées
  const today = new Date();
  const prices = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      close: parseFloat(stock.lastPrice) * (1 + (Math.random() - 0.5) * 0.1)
    };
  }).reverse();

  // Calculer des indicateurs techniques simulés
  const indicators = {
    rsi: 50 + (Math.random() - 0.5) * 20, // RSI entre 30 et 70
    macd: (Math.random() - 0.5) * 2, // MACD entre -1 et 1
    sma: parseFloat(stock.lastPrice) * (1 + (Math.random() - 0.5) * 0.05) // SMA proche du dernier prix
  };

  res.json({
    prices,
    indicators
  });
});

app.listen(port, () => {
  console.log(`BRVM API server running at http://localhost:${port}`);
}); 