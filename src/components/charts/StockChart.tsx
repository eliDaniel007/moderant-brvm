import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
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
import type { StockData } from '../../utils/api';

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

export interface StockChartProps {
  data: StockData[];
  symbol: string;
  title?: string;
  height?: number;
  showVolume?: boolean;
}

type ChartType = 'line' | 'candlestick' | 'bar';

const StockChart: React.FC<StockChartProps> = ({
  data,
  symbol,
  title = 'Évolution du prix',
  height = 400,
  showVolume = false,
}) => {
  const theme = useTheme();
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeRange, setTimeRange] = useState<string>('1M'); // 1D, 1W, 1M, 3M, 1Y

  // Filtrer les données en fonction de la plage temporelle sélectionnée
  const filterDataByTimeRange = (data: StockData[]): StockData[] => {
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const today = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case '1D':
        startDate.setDate(today.getDate() - 1);
        break;
      case '1W':
        startDate.setDate(today.getDate() - 7);
        break;
      case '1M':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case '3M':
        startDate.setMonth(today.getMonth() - 3);
        break;
      case '6M':
        startDate.setMonth(today.getMonth() - 6);
        break;
      case '1Y':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(today.getMonth() - 1);
    }
    
    return sortedData.filter(
      (item) => new Date(item.date).getTime() >= startDate.getTime()
    );
  };

  const filteredData = filterDataByTimeRange(data);
  
  // Préparer les données pour le graphique
  const labels = filteredData.map((item) => item.date);
  const prices = filteredData.map((item) => item.close);
  const volumes = filteredData.map((item) => item.volume);
  
  // Trouver le changement de prix pour déterminer la couleur
  const priceChange = prices.length > 1 ? prices[prices.length - 1] - prices[0] : 0;
  const isPriceUp = priceChange >= 0;
  
  const lineColor = isPriceUp ? '#00C6AE' : '#F95738';
  const areaColor = isPriceUp 
    ? 'rgba(0, 198, 174, 0.1)' 
    : 'rgba(249, 87, 56, 0.1)';
  const volumeColor = 'rgba(45, 140, 255, 0.6)';

  const handleChartTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newChartType: ChartType | null,
  ) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const handleTimeRangeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTimeRange: string | null,
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  // Configuration du graphique linéaire
  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Prix',
        data: prices,
        borderColor: lineColor,
        backgroundColor: areaColor,
        tension: 0.1,
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: theme.palette.text.secondary,
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: theme.palette.text.secondary,
          callback: (value: number) => 
            new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'XOF',
              maximumFractionDigits: 0,
            }).format(value),
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context: unknown) => {
            // @ts-expect-error: context type from Chart.js
            const value = context.raw;
            return `Prix: ${new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'XOF',
              maximumFractionDigits: 0,
            }).format(value)}`;
          },
        },
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
  };

  // Configuration du graphique en barres (volume)
  const volumeChartData = {
    labels,
    datasets: [
      {
        label: 'Volume',
        data: volumes,
        backgroundColor: volumeColor,
        barThickness: 10,
      },
    ],
  };

  const volumeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: unknown) => {
            // @ts-expect-error: context type from Chart.js
            const value = context.raw;
            return `Volume: ${new Intl.NumberFormat('fr-FR').format(value)}`;
          },
        },
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
  };

  // Configuration du graphique en bougies (simulé avec des barres)
  const candlestickChartData = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Prix',
        data: filteredData.map((item) => item.high - item.low),
        backgroundColor: filteredData.map((item) => 
          item.close >= item.open ? 'rgba(0, 198, 174, 0.8)' : 'rgba(249, 87, 56, 0.8)'
        ),
        barThickness: 10,
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line options={lineChartOptions as any} data={lineChartData} />;
      case 'bar':
        return <Bar options={volumeChartOptions as any} data={volumeChartData} />;
      case 'candlestick':
        return <Bar options={lineChartOptions as any} data={candlestickChartData} />;
      default:
        return <Line options={lineChartOptions as any} data={lineChartData} />;
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            {title} - {symbol}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <ToggleButtonGroup
              size="small"
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              aria-label="Période"
              sx={{ 
                '& .MuiToggleButton-root': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: theme.palette.text.secondary,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 198, 174, 0.1)',
                    color: '#00C6AE',
                  },
                },
              }}
            >
              <ToggleButton value="1W" aria-label="1 semaine">
                1S
              </ToggleButton>
              <ToggleButton value="1M" aria-label="1 mois">
                1M
              </ToggleButton>
              <ToggleButton value="3M" aria-label="3 mois">
                3M
              </ToggleButton>
              <ToggleButton value="6M" aria-label="6 mois">
                6M
              </ToggleButton>
              <ToggleButton value="1Y" aria-label="1 an">
                1A
              </ToggleButton>
            </ToggleButtonGroup>
            
            <ToggleButtonGroup
              size="small"
              value={chartType}
              exclusive
              onChange={handleChartTypeChange}
              aria-label="Type de graphique"
              sx={{ 
                '& .MuiToggleButton-root': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: theme.palette.text.secondary,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(45, 140, 255, 0.1)',
                    color: '#2D8CFF',
                  },
                },
              }}
            >
              <ToggleButton value="line" aria-label="ligne">
                Ligne
              </ToggleButton>
              <ToggleButton value="candlestick" aria-label="bougies">
                Bougies
              </ToggleButton>
              <ToggleButton value="bar" aria-label="volume">
                Volume
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        
        <Box sx={{ height: height }}>
          {renderChart()}
        </Box>
        
        {showVolume && chartType !== 'bar' && (
          <Box sx={{ height: 100, mt: 2 }}>
            <Bar options={volumeChartOptions as any} data={volumeChartData} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StockChart; 