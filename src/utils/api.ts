import axios from 'axios';

// Vous devrez enregistrer votre propre clé API sur https://www.alphavantage.co/
const API_KEY = 'demo'; // Utilisation de la clé démo pour le développement

const BASE_URL = 'https://www.alphavantage.co/query';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default api;

export interface StockData {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockPriceData {
  symbol: string;
  prices: StockData[];
}

export interface StockOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string;
  DividendYield: string;
  EPS: string;
  PriceToBookRatio: string;
  ProfitMargin: string;
  ReturnOnEquityTTM: string;
  DividendPerShare: string;
  Beta: string;
  [key: string]: string;
}

export interface TechnicalIndicator {
  date: string;
  value: number;
}

export interface StockSearchResult {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
}

export interface MACDResult {
  date: string;
  MACD: number;
  MACD_Signal: number;
  MACD_Hist: number;
}

export interface BollingerBandsResult {
  date: string;
  upper: number;
  middle: number;
  lower: number;
}

// Obtenir l'historique des prix d'une action
export const getStockPriceHistory = async (
  symbol: string,
  interval: 'daily' | 'weekly' | 'monthly' = 'daily'
): Promise<StockPriceData> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: `TIME_SERIES_${interval.toUpperCase()}`,
        symbol,
        apikey: API_KEY,
        outputsize: 'compact', // compact = 100 derniers points de données
      },
    });

    const timeSeriesKey = `Time Series (${
      interval === 'daily' ? 'Daily' : interval === 'weekly' ? 'Weekly' : 'Monthly'
    })`;
    
    const timeSeries = response.data[timeSeriesKey];
    
    if (!timeSeries) {
      throw new Error('Pas de données disponibles pour ce symbole');
    }

    const prices: StockData[] = Object.keys(timeSeries).map((date) => {
      const data = timeSeries[date];
      return {
        symbol,
        date,
        open: parseFloat(data['1. open']),
        high: parseFloat(data['2. high']),
        low: parseFloat(data['3. low']),
        close: parseFloat(data['4. close']),
        volume: parseFloat(data['5. volume']),
      };
    });

    // Tri par date, du plus récent au plus ancien
    prices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      symbol,
      prices,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des prix des actions:', error);
    throw error;
  }
};

// Rechercher des actions
export const searchStocks = async (keywords: string): Promise<StockSearchResult[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords,
        apikey: API_KEY,
      },
    });

    return response.data.bestMatches || [];
  } catch (error) {
    console.error('Erreur lors de la recherche d\'actions:', error);
    throw error;
  }
};

// Obtenir des informations détaillées sur une entreprise
export const getCompanyOverview = async (symbol: string): Promise<StockOverview> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol,
        apikey: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des informations sur l\'entreprise:', error);
    throw error;
  }
};

// Obtenir l'indicateur technique RSI (Relative Strength Index)
export const getRSI = async (
  symbol: string,
  interval: string = 'daily',
  timePeriod: number = 14
): Promise<TechnicalIndicator[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'RSI',
        symbol,
        interval,
        time_period: timePeriod,
        series_type: 'close',
        apikey: API_KEY,
      },
    });

    const data = response.data['Technical Analysis: RSI'];
    if (!data) {
      throw new Error('Données RSI non disponibles');
    }

    return Object.keys(data).map((date) => ({
      date,
      value: parseFloat(data[date].RSI),
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération du RSI:', error);
    throw error;
  }
};

// Obtenir l'indicateur MACD (Moving Average Convergence Divergence)
export const getMACD = async (
  symbol: string,
  interval: string = 'daily'
): Promise<MACDResult[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'MACD',
        symbol,
        interval,
        series_type: 'close',
        fastperiod: 12,
        slowperiod: 26,
        signalperiod: 9,
        apikey: API_KEY,
      },
    });

    const data = response.data['Technical Analysis: MACD'];
    if (!data) {
      throw new Error('Données MACD non disponibles');
    }

    return Object.keys(data).map((date) => ({
      date,
      MACD: parseFloat(data[date].MACD),
      MACD_Signal: parseFloat(data[date].MACD_Signal),
      MACD_Hist: parseFloat(data[date].MACD_Hist),
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération du MACD:', error);
    throw error;
  }
};

// Obtenir les moyennes mobiles (Simple Moving Average)
export const getSMA = async (
  symbol: string,
  interval: string = 'daily',
  timePeriod: number = 20
): Promise<TechnicalIndicator[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'SMA',
        symbol,
        interval,
        time_period: timePeriod,
        series_type: 'close',
        apikey: API_KEY,
      },
    });

    const data = response.data['Technical Analysis: SMA'];
    if (!data) {
      throw new Error('Données SMA non disponibles');
    }

    return Object.keys(data).map((date) => ({
      date,
      value: parseFloat(data[date].SMA),
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération de la SMA:', error);
    throw error;
  }
};

// Obtenir l'indice de volatilité (Bollinger Bands)
export const getBollingerBands = async (
  symbol: string,
  interval: string = 'daily',
  timePeriod: number = 20
): Promise<BollingerBandsResult[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'BBANDS',
        symbol,
        interval,
        time_period: timePeriod,
        series_type: 'close',
        nbdevup: 2,
        nbdevdn: 2,
        apikey: API_KEY,
      },
    });

    const data = response.data['Technical Analysis: BBANDS'];
    if (!data) {
      throw new Error('Données Bollinger Bands non disponibles');
    }

    return Object.keys(data).map((date) => ({
      date,
      upper: parseFloat(data[date]['Real Upper Band']),
      middle: parseFloat(data[date]['Real Middle Band']),
      lower: parseFloat(data[date]['Real Lower Band']),
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des Bollinger Bands:', error);
    throw error;
  }
};

// Pour les données BRVM spécifiques, vous devrez peut-être créer une API personnalisée
// ou utiliser des données simulées pour les actions BRVM
export const getBRVMStocks = (): string[] => {
  return [
    'SONATEL', 
    'ECOBANK', 
    'BOAD', 
    'BOA', 
    'SGBV', 
    'ORABANK', 
    'PALM',
    'NESTLE', 
    'SOLIBRA', 
    'SICABLE'
  ];
};

// Données simulées pour les actions BRVM
export const getSimulatedBRVMData = (symbol: string): StockPriceData => {
  // Générer des données aléatoires basées sur le symbole
  const basePrice = symbol.length * 1000;
  const prices: StockData[] = [];
  
  const today = new Date();
  
  for (let i = 180; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Variations quotidiennes
    const changePercent = (Math.random() * 6) - 3; // -3% à +3%
    const closePrice = basePrice * (1 + (changePercent / 100) * (i / 20));
    
    prices.push({
      symbol,
      date: date.toISOString().split('T')[0],
      open: closePrice * (1 - Math.random() * 0.01),
      high: closePrice * (1 + Math.random() * 0.015),
      low: closePrice * (1 - Math.random() * 0.015),
      close: closePrice,
      volume: Math.floor(Math.random() * 100000) + 10000,
    });
  }
  
  return {
    symbol,
    prices,
  };
};

// ============ Fonctions pour l'analyse avancée du marché ============

// Obtenir l'indice VIX (Volatilité) simulé pour la BRVM
export const getMarketVolatilityIndex = (
  period: string = '1M'
): { date: string; value: number; threshold: number }[] => {
  // Données simulées pour l'exemple
  const dates = generateDateRange(30, period);
  const baseValue = 16.5;
  const threshold = 20;
  
  return dates.map((date, index) => {
    const noise = Math.sin(index / 3) * 3 + (Math.random() * 6 - 3);
    return {
      date,
      value: Math.max(5, Math.round((baseValue + noise) * 10) / 10),
      threshold,
    };
  });
};

// Obtenir les données de corrélation entre actifs et indices
export const getAssetCorrelations = (): { 
  asset: string; 
  correlationWithIndex: number;
  correlationWithBenchmark: number; 
}[] => {
  // Liste des actions principales
  const stocks = getBRVMStocks().slice(0, 10);
  
  return stocks.map(stock => {
    // Générer des corrélations simulées
    const correlationWithIndex = Math.round(Math.random() * 80 + 20) / 100;
    const correlationWithBenchmark = Math.round(Math.random() * 70 + 10) / 100;
    
    return {
      asset: stock,
      correlationWithIndex,
      correlationWithBenchmark,
    };
  });
};

// Obtenir l'analyse des tendances sectorielles
export const getSectorTrendAnalysis = (): {
  sector: string;
  currentTrend: 'Haussière' | 'Baissière' | 'Neutre';
  strengthIndex: number;
  duration: string;
  potentialReversal: 'Faible' | 'Modéré' | 'Élevé';
}[] => {
  const sectors = [
    'Banques', 
    'Télécommunications', 
    'Agriculture', 
    'Énergie', 
    'Distribution',
    'Industrie', 
    'Transport',
    'Immobilier'
  ];
  
  return sectors.map(sector => {
    const random = Math.random();
    const strengthIndex = Math.round(Math.random() * 70 + 15);
    let currentTrend: 'Haussière' | 'Baissière' | 'Neutre';
    
    if (random > 0.65) {
      currentTrend = 'Haussière';
    } else if (random > 0.35) {
      currentTrend = 'Neutre';
    } else {
      currentTrend = 'Baissière';
    }
    
    const duration = `${Math.round(Math.random() * 5 + 1)} mois`;
    
    let potentialReversal: 'Faible' | 'Modéré' | 'Élevé';
    if (strengthIndex > 70) {
      potentialReversal = 'Faible';
    } else if (strengthIndex > 40) {
      potentialReversal = 'Modéré';
    } else {
      potentialReversal = 'Élevé';
    }
    
    return {
      sector,
      currentTrend,
      strengthIndex,
      duration,
      potentialReversal
    };
  });
};

// Obtenir les données de sentiment du marché
export const getMarketSentiment = (
  period: string = '1M'
): { date: string; value: number }[] => {
  // Données simulées pour l'exemple
  const dates = generateDateRange(30, period);
  const baseValue = 60; // Valeur de référence (échelle 0-100)
  
  return dates.map((date, index) => {
    const trend = Math.sin(index / 10) * 15;
    const noise = (Math.random() * 10 - 5);
    const value = Math.max(5, Math.min(95, Math.round(baseValue + trend + noise)));
    
    return {
      date,
      value
    };
  });
};

// Fonction utilitaire pour générer des plages de dates
function generateDateRange(days: number, period: string): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  // Déterminer le nombre de jours à générer en fonction de la période
  let daysToGenerate = days;
  switch (period) {
    case '1W':
      daysToGenerate = 7;
      break;
    case '1M':
      daysToGenerate = 30;
      break;
    case '3M':
      daysToGenerate = 90;
      break;
    case '6M':
      daysToGenerate = 180;
      break;
    case '1Y':
      daysToGenerate = 365;
      break;
    default:
      daysToGenerate = 30;
  }
  
  // Générer les dates en remontant dans le temps
  for (let i = daysToGenerate - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
} 