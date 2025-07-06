// Types pour les données
export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  volume: number;
  marketCap: number;
  sector: string;
}

export interface Analysis {
  ticker: string;
  nom: string;
  prixActuel: number;
  recommandation: 'Acheter' | 'Vendre' | 'Conserver';
  resume: string;
  indicateurs: Record<string, string>;
  historiquePrix: Array<{
    date: string;
    prix: number;
  }>;
  sentiment: 'Positif' | 'Négatif' | 'Neutre';
}

export interface User {
  id: number;
  name: string;
  email: string;
  portfolio: {
    totalValue: number;
    totalChangePercent: number;
    stocks: Array<{
      symbol: string;
      shares: number;
      currentValue: number;
      change: number;
    }>;
  };
  subscription: {
    type: string;
    status: string;
  };
}

export interface Recommendation {
  id: number;
  stockName: string;
  stockSymbol: string;
  type: 'buy' | 'sell' | 'hold';
  reasoning: string;
  targetPrice: number;
  date: string;
}

export interface Alert {
  id: string;
  stockSymbol: string;
  stockName: string;
  condition: 'above' | 'below';
  threshold: number;
  currentPrice: number;
  isActive: boolean;
  notificationType: 'email' | 'sms' | 'push';
  createdAt: string;
}

// Toutes les actions de la BRVM
export const mockStocks: Stock[] = [
  {
    symbol: 'SNTL',
    name: 'Sonatel',
    currentPrice: 12500,
    change: 2.5,
    volume: 1542000,
    marketCap: 1250000000000,
    sector: 'Télécommunications'
  },
  {
    symbol: 'BOAB',
    name: 'Bank of Africa',
    currentPrice: 8500,
    change: -1.2,
    volume: 890000,
    marketCap: 850000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOAN',
    name: 'Bank of Africa Niger',
    currentPrice: 4200,
    change: 0.8,
    volume: 450000,
    marketCap: 420000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABF',
    name: 'Bank of Africa Burkina Faso',
    currentPrice: 3800,
    change: -0.5,
    volume: 320000,
    marketCap: 380000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABM',
    name: 'Bank of Africa Mali',
    currentPrice: 4100,
    change: 1.1,
    volume: 380000,
    marketCap: 410000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABC',
    name: 'Bank of Africa Côte d\'Ivoire',
    currentPrice: 5200,
    change: 0.3,
    volume: 520000,
    marketCap: 520000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABG',
    name: 'Bank of Africa Guinée',
    currentPrice: 2800,
    change: -0.8,
    volume: 180000,
    marketCap: 280000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABT',
    name: 'Bank of Africa Togo',
    currentPrice: 3100,
    change: 0.6,
    volume: 220000,
    marketCap: 310000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABD',
    name: 'Bank of Africa Bénin',
    currentPrice: 2900,
    change: -0.2,
    volume: 200000,
    marketCap: 290000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABS',
    name: 'Bank of Africa Sénégal',
    currentPrice: 4800,
    change: 1.4,
    volume: 450000,
    marketCap: 480000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABR',
    name: 'Bank of Africa République Centrafricaine',
    currentPrice: 1800,
    change: 0.9,
    volume: 120000,
    marketCap: 180000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABK',
    name: 'Bank of Africa Kenya',
    currentPrice: 6500,
    change: -1.5,
    volume: 680000,
    marketCap: 650000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABU',
    name: 'Bank of Africa Uganda',
    currentPrice: 3200,
    change: 0.7,
    volume: 280000,
    marketCap: 320000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABTZ',
    name: 'Bank of Africa Tanzanie',
    currentPrice: 3800,
    change: -0.4,
    volume: 320000,
    marketCap: 380000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABRW',
    name: 'Bank of Africa Rwanda',
    currentPrice: 2400,
    change: 1.2,
    volume: 180000,
    marketCap: 240000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABDR',
    name: 'Bank of Africa République Démocratique du Congo',
    currentPrice: 2200,
    change: 0.5,
    volume: 150000,
    marketCap: 220000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABCM',
    name: 'Bank of Africa Cameroun',
    currentPrice: 3600,
    change: -0.6,
    volume: 280000,
    marketCap: 360000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABGA',
    name: 'Bank of Africa Gabon',
    currentPrice: 2800,
    change: 0.8,
    volume: 200000,
    marketCap: 280000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABCG',
    name: 'Bank of Africa Congo',
    currentPrice: 2400,
    change: -0.3,
    volume: 160000,
    marketCap: 240000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABTD',
    name: 'Bank of Africa Tchad',
    currentPrice: 1600,
    change: 1.0,
    volume: 100000,
    marketCap: 160000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABGQ',
    name: 'Bank of Africa Guinée Équatoriale',
    currentPrice: 2000,
    change: 0.4,
    volume: 120000,
    marketCap: 200000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABCF',
    name: 'Bank of Africa République Centrafricaine',
    currentPrice: 1800,
    change: 0.9,
    volume: 120000,
    marketCap: 180000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABDJ',
    name: 'Bank of Africa Djibouti',
    currentPrice: 2200,
    change: -0.7,
    volume: 140000,
    marketCap: 220000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABKM',
    name: 'Bank of Africa Comores',
    currentPrice: 1400,
    change: 0.6,
    volume: 80000,
    marketCap: 140000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABMG',
    name: 'Bank of Africa Madagascar',
    currentPrice: 2600,
    change: 1.1,
    volume: 180000,
    marketCap: 260000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABMU',
    name: 'Bank of Africa Maurice',
    currentPrice: 4200,
    change: -0.8,
    volume: 320000,
    marketCap: 420000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABSC',
    name: 'Bank of Africa Seychelles',
    currentPrice: 1800,
    change: 0.5,
    volume: 100000,
    marketCap: 180000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABCV',
    name: 'Bank of Africa Cap-Vert',
    currentPrice: 2400,
    change: 0.7,
    volume: 160000,
    marketCap: 240000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABGW',
    name: 'Bank of Africa Guinée-Bissau',
    currentPrice: 1600,
    change: -0.4,
    volume: 90000,
    marketCap: 160000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABST',
    name: 'Bank of Africa São Tomé-et-Principe',
    currentPrice: 1200,
    change: 0.8,
    volume: 60000,
    marketCap: 120000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABAO',
    name: 'Bank of Africa Angola',
    currentPrice: 3400,
    change: 1.3,
    volume: 240000,
    marketCap: 340000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABMZ',
    name: 'Bank of Africa Mozambique',
    currentPrice: 2200,
    change: -0.5,
    volume: 140000,
    marketCap: 220000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABZW',
    name: 'Bank of Africa Zimbabwe',
    currentPrice: 1800,
    change: 0.9,
    volume: 100000,
    marketCap: 180000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABNA',
    name: 'Bank of Africa Namibie',
    currentPrice: 2800,
    change: 0.6,
    volume: 180000,
    marketCap: 280000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABBW',
    name: 'Bank of Africa Botswana',
    currentPrice: 3200,
    change: -0.7,
    volume: 200000,
    marketCap: 320000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABLS',
    name: 'Bank of Africa Lesotho',
    currentPrice: 1600,
    change: 0.4,
    volume: 80000,
    marketCap: 160000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABSZ',
    name: 'Bank of Africa Eswatini',
    currentPrice: 2000,
    change: 0.8,
    volume: 120000,
    marketCap: 200000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABZA',
    name: 'Bank of Africa Afrique du Sud',
    currentPrice: 5800,
    change: -1.2,
    volume: 520000,
    marketCap: 580000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABET',
    name: 'Bank of Africa Éthiopie',
    currentPrice: 2600,
    change: 1.0,
    volume: 180000,
    marketCap: 260000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABSO',
    name: 'Bank of Africa Somalie',
    currentPrice: 1200,
    change: 0.3,
    volume: 60000,
    marketCap: 120000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABER',
    name: 'Bank of Africa Érythrée',
    currentPrice: 1000,
    change: 0.5,
    volume: 40000,
    marketCap: 100000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABSD',
    name: 'Bank of Africa Soudan',
    currentPrice: 1400,
    change: -0.6,
    volume: 80000,
    marketCap: 140000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABSS',
    name: 'Bank of Africa Soudan du Sud',
    currentPrice: 800,
    change: 0.7,
    volume: 30000,
    marketCap: 80000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABEG',
    name: 'Bank of Africa Égypte',
    currentPrice: 4400,
    change: 0.9,
    volume: 360000,
    marketCap: 440000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABLY',
    name: 'Bank of Africa Libye',
    currentPrice: 2000,
    change: -0.4,
    volume: 120000,
    marketCap: 200000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABTN',
    name: 'Bank of Africa Tunisie',
    currentPrice: 3600,
    change: 0.6,
    volume: 280000,
    marketCap: 360000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABDZ',
    name: 'Bank of Africa Algérie',
    currentPrice: 3200,
    change: 0.8,
    volume: 240000,
    marketCap: 320000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABMA',
    name: 'Bank of Africa Maroc',
    currentPrice: 4800,
    change: -0.5,
    volume: 400000,
    marketCap: 480000000000,
    sector: 'Banque'
  },
  {
    symbol: 'BOABEH',
    name: 'Bank of Africa Sahara Occidental',
    currentPrice: 600,
    change: 0.2,
    volume: 20000,
    marketCap: 60000000000,
    sector: 'Banque'
  }
];

// Analyses techniques enrichies avec plus de courbes
export const mockAnalyses: Analysis[] = [
  {
    ticker: 'SNTL',
    nom: 'Sonatel',
    prixActuel: 12500,
    recommandation: 'Acheter',
    resume: 'Sonatel affiche une tendance haussière solide avec un support technique à 12,000 FCFA. Les indicateurs techniques montrent un momentum positif avec un RSI à 65 et un MACD en phase de croisement haussier. Le volume d\'échanges est en augmentation, confirmant l\'intérêt des investisseurs.',
    indicateurs: {
      rsi: '65.2',
      macd: 'Positif',
      'moyenne mobile 20': '12,200 FCFA',
      'moyenne mobile 50': '11,800 FCFA',
      'bandes de bollinger': '12,800 - 11,200 FCFA',
      'volume moyen': '1.2M actions',
      'beta': '0.85',
      'per': '15.2',
      'dividendYield': '4.2%'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 11800 },
      { date: '2024-01-02', prix: 11900 },
      { date: '2024-01-03', prix: 12000 },
      { date: '2024-01-04', prix: 12100 },
      { date: '2024-01-05', prix: 12200 },
      { date: '2024-01-08', prix: 12300 },
      { date: '2024-01-09', prix: 12400 },
      { date: '2024-01-10', prix: 12500 },
      { date: '2024-01-11', prix: 12450 },
      { date: '2024-01-12', prix: 12500 },
      { date: '2024-01-15', prix: 12550 },
      { date: '2024-01-16', prix: 12600 },
      { date: '2024-01-17', prix: 12550 },
      { date: '2024-01-18', prix: 12500 },
      { date: '2024-01-19', prix: 12500 }
    ],
    sentiment: 'Positif'
  },
  {
    ticker: 'BOAB',
    nom: 'Bank of Africa',
    prixActuel: 8500,
    recommandation: 'Conserver',
    resume: 'BOAB se stabilise autour de 8,500 FCFA après une période de volatilité. Les indicateurs montrent une consolidation avec un RSI neutre à 52. Le support technique est établi à 8,300 FCFA. Attendre une confirmation de tendance avant de prendre position.',
    indicateurs: {
      rsi: '52.1',
      macd: 'Neutre',
      'moyenne mobile 20': '8,450 FCFA',
      'moyenne mobile 50': '8,600 FCFA',
      'bandes de bollinger': '8,800 - 8,200 FCFA',
      'volume moyen': '890K actions',
      'beta': '1.1',
      'per': '12.8'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 8600 },
      { date: '2024-01-02', prix: 8550 },
      { date: '2024-01-03', prix: 8500 },
      { date: '2024-01-04', prix: 8450 },
      { date: '2024-01-05', prix: 8400 },
      { date: '2024-01-08', prix: 8350 },
      { date: '2024-01-09', prix: 8300 },
      { date: '2024-01-10', prix: 8350 },
      { date: '2024-01-11', prix: 8400 },
      { date: '2024-01-12', prix: 8450 },
      { date: '2024-01-15', prix: 8500 },
      { date: '2024-01-16', prix: 8550 },
      { date: '2024-01-17', prix: 8500 },
      { date: '2024-01-18', prix: 8450 },
      { date: '2024-01-19', prix: 8500 }
    ],
    sentiment: 'Neutre'
  },
  {
    ticker: 'BOAN',
    nom: 'Bank of Africa Niger',
    prixActuel: 4200,
    recommandation: 'Acheter',
    resume: 'BOAN montre une tendance haussière prometteuse avec un breakout au-dessus de la résistance à 4,100 FCFA. Le RSI à 68 indique un momentum positif sans être suracheté. Le volume confirme l\'intérêt croissant des investisseurs.',
    indicateurs: {
      rsi: '68.3',
      macd: 'Positif',
      'moyenne mobile 20': '4,150 FCFA',
      'moyenne mobile 50': '4,000 FCFA',
      'bandes de bollinger': '4,300 - 3,900 FCFA',
      'volume moyen': '450K actions',
      'beta': '0.9',
      'per': '10.5'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 4000 },
      { date: '2024-01-02', prix: 4050 },
      { date: '2024-01-03', prix: 4100 },
      { date: '2024-01-04', prix: 4150 },
      { date: '2024-01-05', prix: 4200 },
      { date: '2024-01-08', prix: 4250 },
      { date: '2024-01-09', prix: 4300 },
      { date: '2024-01-10', prix: 4250 },
      { date: '2024-01-11', prix: 4200 },
      { date: '2024-01-12', prix: 4150 },
      { date: '2024-01-15', prix: 4200 },
      { date: '2024-01-16', prix: 4250 },
      { date: '2024-01-17', prix: 4200 },
      { date: '2024-01-18', prix: 4150 },
      { date: '2024-01-19', prix: 4200 }
    ],
    sentiment: 'Positif'
  },
  {
    ticker: 'BOABF',
    nom: 'Bank of Africa Burkina Faso',
    prixActuel: 3800,
    recommandation: 'Vendre',
    resume: 'BOABF affiche une tendance baissière avec un RSI à 35 indiquant une zone de surachat. Le prix a cassé le support à 3,900 FCFA. Les volumes sont en baisse, confirmant le manque d\'intérêt des investisseurs. Recommandation de vente.',
    indicateurs: {
      rsi: '35.7',
      macd: 'Négatif',
      'moyenne mobile 20': '3,850 FCFA',
      'moyenne mobile 50': '4,000 FCFA',
      'bandes de bollinger': '4,100 - 3,700 FCFA',
      'volume moyen': '320K actions',
      'beta': '1.2',
      'per': '8.9'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 4000 },
      { date: '2024-01-02', prix: 3950 },
      { date: '2024-01-03', prix: 3900 },
      { date: '2024-01-04', prix: 3850 },
      { date: '2024-01-05', prix: 3800 },
      { date: '2024-01-08', prix: 3750 },
      { date: '2024-01-09', prix: 3700 },
      { date: '2024-01-10', prix: 3750 },
      { date: '2024-01-11', prix: 3800 },
      { date: '2024-01-12', prix: 3850 },
      { date: '2024-01-15', prix: 3800 },
      { date: '2024-01-16', prix: 3750 },
      { date: '2024-01-17', prix: 3800 },
      { date: '2024-01-18', prix: 3850 },
      { date: '2024-01-19', prix: 3800 }
    ],
    sentiment: 'Négatif'
  },
  {
    ticker: 'BOABM',
    nom: 'Bank of Africa Mali',
    prixActuel: 4100,
    recommandation: 'Acheter',
    resume: 'BOABM présente une opportunité d\'achat intéressante avec un RSI à 45 qui remonte depuis la zone de surachat. Le prix se stabilise au-dessus du support à 4,000 FCFA. Les volumes commencent à augmenter, signalant un regain d\'intérêt.',
    indicateurs: {
      rsi: '45.2',
      macd: 'En amélioration',
      'moyenne mobile 20': '4,100 FCFA',
      'moyenne mobile 50': '4,200 FCFA',
      'bandes de bollinger': '4,300 - 3,900 FCFA',
      'volume moyen': '380K actions',
      'beta': '0.95',
      'per': '11.2'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 4200 },
      { date: '2024-01-02', prix: 4150 },
      { date: '2024-01-03', prix: 4100 },
      { date: '2024-01-04', prix: 4050 },
      { date: '2024-01-05', prix: 4000 },
      { date: '2024-01-08', prix: 4050 },
      { date: '2024-01-09', prix: 4100 },
      { date: '2024-01-10', prix: 4150 },
      { date: '2024-01-11', prix: 4100 },
      { date: '2024-01-12', prix: 4050 },
      { date: '2024-01-15', prix: 4100 },
      { date: '2024-01-16', prix: 4150 },
      { date: '2024-01-17', prix: 4100 },
      { date: '2024-01-18', prix: 4050 },
      { date: '2024-01-19', prix: 4100 }
    ],
    sentiment: 'Positif'
  },
  {
    ticker: 'BOABC',
    nom: 'Bank of Africa Côte d\'Ivoire',
    prixActuel: 5200,
    recommandation: 'Acheter',
    resume: 'BOABC bénéficie de la croissance économique ivoirienne avec un RSI à 62. Le prix se maintient au-dessus de la moyenne mobile 50. Les volumes sont stables et les indicateurs techniques montrent une tendance haussière modérée.',
    indicateurs: {
      rsi: '62.1',
      macd: 'Positif',
      'moyenne mobile 20': '5,150 FCFA',
      'moyenne mobile 50': '5,000 FCFA',
      'bandes de bollinger': '5,400 - 4,800 FCFA',
      'volume moyen': '520K actions',
      'beta': '0.88',
      'per': '13.5'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 5000 },
      { date: '2024-01-02', prix: 5050 },
      { date: '2024-01-03', prix: 5100 },
      { date: '2024-01-04', prix: 5150 },
      { date: '2024-01-05', prix: 5200 },
      { date: '2024-01-08', prix: 5250 },
      { date: '2024-01-09', prix: 5200 },
      { date: '2024-01-10', prix: 5150 },
      { date: '2024-01-11', prix: 5200 },
      { date: '2024-01-12', prix: 5250 },
      { date: '2024-01-15', prix: 5200 },
      { date: '2024-01-16', prix: 5150 },
      { date: '2024-01-17', prix: 5200 },
      { date: '2024-01-18', prix: 5250 },
      { date: '2024-01-19', prix: 5200 }
    ],
    sentiment: 'Positif'
  },
  {
    ticker: 'BOABS',
    nom: 'Bank of Africa Sénégal',
    prixActuel: 4800,
    recommandation: 'Acheter',
    resume: 'BOABS affiche une performance solide avec un RSI à 58. Le prix a franchi la résistance à 4,700 FCFA. Les volumes augmentent et les indicateurs techniques confirment une tendance haussière. Opportunité d\'achat intéressante.',
    indicateurs: {
      rsi: '58.4',
      macd: 'Positif',
      'moyenne mobile 20': '4,750 FCFA',
      'moyenne mobile 50': '4,600 FCFA',
      'bandes de bollinger': '5,000 - 4,500 FCFA',
      'volume moyen': '450K actions',
      'beta': '0.92',
      'per': '12.1'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 4600 },
      { date: '2024-01-02', prix: 4650 },
      { date: '2024-01-03', prix: 4700 },
      { date: '2024-01-04', prix: 4750 },
      { date: '2024-01-05', prix: 4800 },
      { date: '2024-01-08', prix: 4850 },
      { date: '2024-01-09', prix: 4900 },
      { date: '2024-01-10', prix: 4850 },
      { date: '2024-01-11', prix: 4800 },
      { date: '2024-01-12', prix: 4750 },
      { date: '2024-01-15', prix: 4800 },
      { date: '2024-01-16', prix: 4850 },
      { date: '2024-01-17', prix: 4800 },
      { date: '2024-01-18', prix: 4750 },
      { date: '2024-01-19', prix: 4800 }
    ],
    sentiment: 'Positif'
  },
  {
    ticker: 'BOABK',
    nom: 'Bank of Africa Kenya',
    prixActuel: 6500,
    recommandation: 'Vendre',
    resume: 'BOABK montre des signes de faiblesse avec un RSI à 38. Le prix a cassé le support à 6,600 FCFA. Les volumes sont en baisse et les indicateurs techniques suggèrent une continuation de la tendance baissière.',
    indicateurs: {
      rsi: '38.2',
      macd: 'Négatif',
      'moyenne mobile 20': '6,450 FCFA',
      'moyenne mobile 50': '6,800 FCFA',
      'bandes de bollinger': '6,800 - 6,200 FCFA',
      'volume moyen': '680K actions',
      'beta': '1.15',
      'per': '14.2'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 6800 },
      { date: '2024-01-02', prix: 6750 },
      { date: '2024-01-03', prix: 6700 },
      { date: '2024-01-04', prix: 6650 },
      { date: '2024-01-05', prix: 6600 },
      { date: '2024-01-08', prix: 6550 },
      { date: '2024-01-09', prix: 6500 },
      { date: '2024-01-10', prix: 6450 },
      { date: '2024-01-11', prix: 6500 },
      { date: '2024-01-12', prix: 6550 },
      { date: '2024-01-15', prix: 6500 },
      { date: '2024-01-16', prix: 6450 },
      { date: '2024-01-17', prix: 6500 },
      { date: '2024-01-18', prix: 6550 },
      { date: '2024-01-19', prix: 6500 }
    ],
    sentiment: 'Négatif'
  },
  {
    ticker: 'BOABEG',
    nom: 'Bank of Africa Égypte',
    prixActuel: 4400,
    recommandation: 'Acheter',
    resume: 'BOABEG présente une opportunité d\'achat avec un RSI à 55. Le prix se stabilise au-dessus du support à 4,300 FCFA. Les volumes sont stables et les indicateurs techniques montrent une tendance haussière modérée.',
    indicateurs: {
      rsi: '55.3',
      macd: 'En amélioration',
      'moyenne mobile 20': '4,350 FCFA',
      'moyenne mobile 50': '4,200 FCFA',
      'bandes de bollinger': '4,600 - 4,000 FCFA',
      'volume moyen': '360K actions',
      'beta': '0.87',
      'per': '11.8'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 4200 },
      { date: '2024-01-02', prix: 4250 },
      { date: '2024-01-03', prix: 4300 },
      { date: '2024-01-04', prix: 4350 },
      { date: '2024-01-05', prix: 4400 },
      { date: '2024-01-08', prix: 4450 },
      { date: '2024-01-09', prix: 4400 },
      { date: '2024-01-10', prix: 4350 },
      { date: '2024-01-11', prix: 4400 },
      { date: '2024-01-12', prix: 4450 },
      { date: '2024-01-15', prix: 4400 },
      { date: '2024-01-16', prix: 4350 },
      { date: '2024-01-17', prix: 4400 },
      { date: '2024-01-18', prix: 4450 },
      { date: '2024-01-19', prix: 4400 }
    ],
    sentiment: 'Positif'
  },
  {
    ticker: 'BOABMA',
    nom: 'Bank of Africa Maroc',
    prixActuel: 4800,
    recommandation: 'Conserver',
    resume: 'BOABMA se stabilise autour de 4,800 FCFA avec un RSI neutre à 48. Le prix oscille entre support et résistance. Les volumes sont modérés et les indicateurs techniques suggèrent une consolidation avant une nouvelle tendance.',
    indicateurs: {
      rsi: '48.7',
      macd: 'Neutre',
      'moyenne mobile 20': '4,800 FCFA',
      'moyenne mobile 50': '4,850 FCFA',
      'bandes de bollinger': '5,000 - 4,600 FCFA',
      'volume moyen': '400K actions',
      'beta': '0.94',
      'per': '13.1'
    },
    historiquePrix: [
      { date: '2024-01-01', prix: 4850 },
      { date: '2024-01-02', prix: 4800 },
      { date: '2024-01-03', prix: 4750 },
      { date: '2024-01-04', prix: 4800 },
      { date: '2024-01-05', prix: 4850 },
      { date: '2024-01-08', prix: 4800 },
      { date: '2024-01-09', prix: 4750 },
      { date: '2024-01-10', prix: 4800 },
      { date: '2024-01-11', prix: 4850 },
      { date: '2024-01-12', prix: 4800 },
      { date: '2024-01-15', prix: 4750 },
      { date: '2024-01-16', prix: 4800 },
      { date: '2024-01-17', prix: 4850 },
      { date: '2024-01-18', prix: 4800 },
      { date: '2024-01-19', prix: 4800 }
    ],
    sentiment: 'Neutre'
  }
];

// Données utilisateur mock
export const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  portfolio: {
    totalValue: 2450000,
    totalChangePercent: 12.5,
    stocks: [
      { symbol: 'SNTL', shares: 100, currentValue: 1250000, change: 25000 },
      { symbol: 'BOAB', shares: 50, currentValue: 425000, change: -5000 },
      { symbol: 'BOAN', shares: 200, currentValue: 840000, change: 16000 }
    ]
  },
  subscription: {
    type: 'premium',
    status: 'active'
  }
};

// Recommandations mock
export const mockRecommendations: Recommendation[] = [
  {
    id: 1,
    stockName: 'Sonatel',
    stockSymbol: 'SNTL',
    type: 'buy',
    reasoning: 'Tendance haussière confirmée avec support technique solide. RSI et MACD positifs.',
    targetPrice: 13000,
    date: '2024-01-19'
  },
  {
    id: 2,
    stockName: 'Bank of Africa Niger',
    stockSymbol: 'BOAN',
    type: 'buy',
    reasoning: 'Breakout au-dessus de la résistance avec volume confirmant l\'intérêt.',
    targetPrice: 4500,
    date: '2024-01-19'
  },
  {
    id: 3,
    stockName: 'Bank of Africa Burkina Faso',
    stockSymbol: 'BOABF',
    type: 'sell',
    reasoning: 'Tendance baissière avec cassure du support. RSI en zone de surachat.',
    targetPrice: 3600,
    date: '2024-01-19'
  }
];

// Alertes mock
export const mockAlerts: Alert[] = [
  {
    id: '1',
    stockSymbol: 'SNTL',
    stockName: 'Sonatel',
    condition: 'above',
    threshold: 13000,
    currentPrice: 12500,
    isActive: true,
    notificationType: 'email',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    stockSymbol: 'BOAB',
    stockName: 'Bank of Africa',
    condition: 'below',
    threshold: 8000,
    currentPrice: 8500,
    isActive: true,
    notificationType: 'push',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    stockSymbol: 'BOAN',
    stockName: 'Bank of Africa Niger',
    condition: 'above',
    threshold: 4500,
    currentPrice: 4200,
    isActive: false,
    notificationType: 'sms',
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    stockSymbol: 'BOABF',
    stockName: 'Bank of Africa Burkina Faso',
    condition: 'below',
    threshold: 3500,
    currentPrice: 3800,
    isActive: true,
    notificationType: 'email',
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    stockSymbol: 'BOABM',
    stockName: 'Bank of Africa Mali',
    condition: 'above',
    threshold: 4200,
    currentPrice: 4100,
    isActive: true,
    notificationType: 'push',
    createdAt: '2024-01-11'
  },
  {
    id: '6',
    stockSymbol: 'BOABC',
    stockName: 'Bank of Africa Côte d\'Ivoire',
    condition: 'above',
    threshold: 5500,
    currentPrice: 5200,
    isActive: false,
    notificationType: 'email',
    createdAt: '2024-01-10'
  }
]; 