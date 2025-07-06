import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartData {
  labels: string[];
  prices: number[];
}

interface StockPriceChartProps {
  data: ChartData;
  ticker: string;
}

const StockPriceChart: React.FC<StockPriceChartProps> = ({ data, ticker }) => {
  // Calculer les moyennes mobiles
  const calculateMovingAverage = (prices: number[], period: number) => {
    const ma = [];
    for (let i = 0; i < prices.length; i++) {
      if (i < period - 1) {
        ma.push(null);
      } else {
        const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        ma.push(sum / period);
      }
    }
    return ma;
  };

  // Calculer les bandes de Bollinger
  const calculateBollingerBands = (prices: number[], period: number = 20, stdDev: number = 2) => {
    const ma = calculateMovingAverage(prices, period);
    const upper = [];
    const lower = [];

    for (let i = 0; i < prices.length; i++) {
      if (i < period - 1) {
        upper.push(null);
        lower.push(null);
      } else {
        const slice = prices.slice(i - period + 1, i + 1);
        const mean = ma[i];
        const variance = slice.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / period;
        const standardDeviation = Math.sqrt(variance);
        
        upper.push(mean + (standardDeviation * stdDev));
        lower.push(mean - (standardDeviation * stdDev));
      }
    }

    return { upper, lower, middle: ma };
  };

  const ma20 = calculateMovingAverage(data.prices, 20);
  const ma50 = calculateMovingAverage(data.prices, 50);
  const bollinger = calculateBollingerBands(data.prices, 20, 2);

  // Simuler des données de volume
  const volumeData = data.prices.map((_, index) => 
    Math.floor(Math.random() * 1000000) + 500000
  );

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Prix',
        data: data.prices,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: 'MM 20',
        data: ma20,
        borderColor: '#10B981',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        label: 'MM 50',
        data: ma50,
        borderColor: '#F59E0B',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        label: 'Bande supérieure',
        data: bollinger.upper,
        borderColor: 'rgba(156, 163, 175, 0.5)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderWidth: 1,
        fill: '+1',
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        label: 'Bande inférieure',
        data: bollinger.lower,
        borderColor: 'rgba(156, 163, 175, 0.5)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderWidth: 1,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
      }
    ]
  };

  const volumeChartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Volume',
        data: volumeData,
        backgroundColor: data.prices.map((price, index) => {
          if (index === 0) return 'rgba(59, 130, 246, 0.6)';
          return price >= data.prices[index - 1] 
            ? 'rgba(16, 185, 129, 0.6)' 
            : 'rgba(239, 68, 68, 0.6)';
        }),
        borderColor: data.prices.map((price, index) => {
          if (index === 0) return '#3B82F6';
          return price >= data.prices[index - 1] ? '#10B981' : '#EF4444';
        }),
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#E5E7EB',
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#E5E7EB',
        bodyColor: '#E5E7EB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            if (context.dataset.label === 'Volume') {
              return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} actions`;
            }
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} FCFA`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9CA3AF',
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(value: any) {
            return value.toLocaleString() + ' FCFA';
          }
        }
      }
    }
  };

  const volumeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#E5E7EB',
        bodyColor: '#E5E7EB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `Volume: ${context.parsed.y.toLocaleString()} actions`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9CA3AF',
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(value: any) {
            return (value / 1000).toFixed(0) + 'K';
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Graphique principal */}
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
      
      {/* Graphique de volume */}
      <div className="h-32">
        <Bar data={volumeChartData} options={volumeOptions} />
      </div>
      
      {/* Légende des indicateurs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-slate-400">Prix</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-slate-400">MM 20</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-slate-400">MM 50</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-slate-400 rounded"></div>
          <span className="text-slate-400">Bollinger</span>
        </div>
      </div>
    </div>
  );
};

export default StockPriceChart; 