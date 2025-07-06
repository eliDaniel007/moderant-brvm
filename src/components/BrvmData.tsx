import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BrvmStock {
  symbol: string;
  name: string;
  lastPrice: string;
  variation: string;
  volume: string;
}

interface HistoricalData {
  prices: Array<{
    date: string;
    close: number;
  }>;
  indicators: {
    rsi: number;
    macd: number;
    sma: number;
  };
}

const BrvmData: React.FC = () => {
  const [stocks, setStocks] = useState<BrvmStock[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('SNTS');
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentPrices();
  }, []);

  useEffect(() => {
    if (selectedStock) {
      fetchHistoricalData(selectedStock);
    }
  }, [selectedStock]);

  const fetchCurrentPrices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/brvm/cours');
      const data = await response.json();
      setStocks(data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors de la récupération des cours');
      setLoading(false);
    }
  };

  const fetchHistoricalData = async (ticker: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/brvm/${ticker}`);
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      setError('Erreur lors de la récupération des données historiques');
    }
  };

  const chartData = {
    labels: historicalData?.prices.map(price => price.date) || [],
    datasets: [
      {
        label: 'Prix de clôture',
        data: historicalData?.prices.map(price => price.close) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Données BRVM
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbole</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Dernier Prix</TableCell>
              <TableCell>Variation</TableCell>
              <TableCell>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow
                key={stock.symbol}
                onClick={() => setSelectedStock(stock.symbol)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
              >
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.lastPrice}</TableCell>
                <TableCell>{stock.variation}</TableCell>
                <TableCell>{stock.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {historicalData && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Données historiques - {selectedStock}
          </Typography>
          <Box height={400}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </Box>
          <Box mt={2}>
            <Typography variant="h6">Indicateurs techniques</Typography>
            <Typography>RSI: {historicalData.indicators.rsi}</Typography>
            <Typography>MACD: {historicalData.indicators.macd}</Typography>
            <Typography>SMA: {historicalData.indicators.sma}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BrvmData; 