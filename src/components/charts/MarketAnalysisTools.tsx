import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Tooltip,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';

// Importation de Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Importation des fonctions API
import { 
  getMarketVolatilityIndex, 
  getAssetCorrelations, 
  getSectorTrendAnalysis, 
  getMarketSentiment 
} from '../../utils/api';

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`market-analysis-tabpanel-${index}`}
      aria-labelledby={`market-analysis-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

// Define proper interfaces for data types
interface VolatilityDataPoint {
  date: string;
  value: number;
  threshold: number;
}

interface CorrelationDataPoint {
  asset: string;
  correlationWithIndex: number;
}

interface TrendDataPoint {
  sector: string;
  currentTrend: 'Haussière' | 'Baissière' | 'Neutre';
  strengthIndex: number;
  duration: string;
  potentialReversal: 'Faible' | 'Modéré' | 'Élevé';
}

interface SentimentDataPoint {
  date: string;
  value: number;
}

const MarketAnalysisTools: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [timeframe, setTimeframe] = useState('1M');
  
  // États pour les données d'analyse
  const [volatilityData, setVolatilityData] = useState<VolatilityDataPoint[]>([]);
  const [correlationData, setCorrelationData] = useState<CorrelationDataPoint[]>([]);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentDataPoint[]>([]);

  // Chargement des données
  useEffect(() => {
    // Charger les données VIX
    const vixData = getMarketVolatilityIndex(timeframe);
    setVolatilityData(vixData);
    
    // Charger les données de corrélation
    const corrData = getAssetCorrelations();
    setCorrelationData(corrData);
    
    // Charger les données de tendance sectorielle
    const sectorsData = getSectorTrendAnalysis();
    setTrendData(sectorsData);
    
    // Charger les données de sentiment
    const sentData = getMarketSentiment(timeframe);
    setSentimentData(sentData);
  }, [timeframe]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleTimeframeChange = (event: SelectChangeEvent) => {
    setTimeframe(event.target.value);
  };
  
  // Préparation des données pour les graphiques
  const prepareVolatilityChartData = () => {
    if (volatilityData.length === 0) return { labels: [], datasets: [] };
    
    return {
      labels: volatilityData.map(item => item.date),
      datasets: [
        {
          label: 'Indice de Volatilité BRVM',
          data: volatilityData.map(item => item.value),
          borderColor: '#ff6384',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Seuil de Volatilité Élevée',
          data: volatilityData.map(item => item.threshold),
          borderColor: '#ff9f40',
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
        },
      ],
    };
  };
  
  const prepareCorrelationChartData = () => {
    if (correlationData.length === 0) return { labels: [], datasets: [] };
    
    return {
      labels: correlationData.map(item => item.asset),
      datasets: [
        {
          label: 'Corrélation avec BRVM Composite',
          data: correlationData.map(item => item.correlationWithIndex),
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };
  
  const prepareSentimentChartData = () => {
    if (sentimentData.length === 0) return { labels: [], datasets: [] };
    
    return {
      labels: sentimentData.map(item => item.date),
      datasets: [
        {
          label: 'Indice de Sentiment Marché',
          data: sentimentData.map(item => item.value),
          borderColor: '#36a2eb',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  // Options des graphiques
  const vixChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Évolution de la Volatilité du Marché',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Indice VIX',
        },
      },
    },
  };

  const correlationChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Corrélation des Actions avec l\'Indice Principal',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        title: {
          display: true,
          text: 'Coefficient de corrélation',
        },
      },
    },
  };

  const sentimentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Indice de Sentiment du Marché',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Indice de Sentiment (0-100)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Composant pour l'indice de volatilité (VIX)
  const renderVolatilityIndex = () => {
    // Valeur actuelle de la volatilité (dernier point)
    const currentVix = volatilityData.length > 0 
      ? volatilityData[volatilityData.length - 1].value 
      : 0;
    
    // Seuil de volatilité élevée
    const threshold = volatilityData.length > 0 
      ? volatilityData[0].threshold 
      : 20;
    
    // Moyenne sur 30 jours
    const avgVix = volatilityData.length > 0 
      ? (volatilityData.reduce((sum, item) => sum + item.value, 0) / volatilityData.length).toFixed(1) 
      : 0;
    
    // Tendance (différence avec moyenne)
    const trend = currentVix - parseFloat(avgVix.toString());
    
    // Calcul de la volatilité relative (% au-dessous/en-dessous du seuil)
    const relativeToThreshold = ((currentVix - threshold) / threshold * 100).toFixed(1);
    
    // Classification du niveau de risque
    const getRiskLevel = () => {
      if (currentVix > threshold * 1.5) return { text: "Très élevé", color: "error.dark" };
      if (currentVix > threshold) return { text: "Élevé", color: "error.main" };
      if (currentVix > threshold * 0.7) return { text: "Modéré", color: "warning.main" };
      return { text: "Faible", color: "success.main" };
    };
    
    const riskLevel = getRiskLevel();
    
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <AssessmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Indice de Volatilité du Marché (BRVM-VIX)
          <Tooltip title="L'indice de volatilité mesure l'anticipation de la volatilité du marché pour les 30 prochains jours. Une valeur élevée indique une forte incertitude.">
            <InfoOutlinedIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle', color: theme.palette.text.secondary }} />
          </Tooltip>
        </Typography>
        
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 2, height: '400px', bgcolor: theme.palette.background.default }}>
              <Line data={prepareVolatilityChartData()} options={vixChartOptions} />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: 320, overflow: 'visible' }}>
            <Paper
              sx={{
                p: 2,
                height: { xs: 'auto', md: 480 },
                minHeight: 320,
                maxHeight: { xs: 'none', md: 520 },
                bgcolor: theme.palette.background.default,
                overflowY: 'auto',
                overflowX: 'visible',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ 
                mb: 2, 
                pb: 1, 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                Analyse de Volatilité
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Niveau de volatilité actuel
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography variant="h4" fontWeight="bold" color={riskLevel.color}>
                    {currentVix.toFixed(1)}
                  </Typography>
                  <Box sx={{ 
                    ml: 1, 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 1, 
                    bgcolor: `${riskLevel.color}20`,
                    color: riskLevel.color
                  }}>
                    <Typography variant="caption" fontWeight="bold">
                      {riskLevel.text}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    width: '100%', 
                    height: 8, 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: 4,
                    position: 'relative'
                  }}>
                    <Box sx={{ 
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: `${Math.min(100, (currentVix / (threshold * 2)) * 100)}%`,
                      bgcolor: currentVix < threshold ? 'success.main' : 'error.main',
                      borderRadius: 4,
                      transition: 'width 0.5s ease-in-out'
                    }} />
                    <Box sx={{ 
                      position: 'absolute',
                      left: `${(threshold / (threshold * 2)) * 100}%`,
                      top: -4,
                      height: 16,
                      width: 2,
                      bgcolor: 'warning.main',
                    }} />
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">Stable</Typography>
                  <Typography variant="caption" color="warning.main">Seuil: {threshold}</Typography>
                  <Typography variant="caption" color="text.secondary">Volatile</Typography>
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Écart au seuil
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {parseFloat(relativeToThreshold) > 0 ? (
                        <TrendingUpIcon sx={{ color: 'error.main', fontSize: 20, mr: 0.5 }} />
                      ) : (
                        <TrendingDownIcon sx={{ color: 'success.main', fontSize: 20, mr: 0.5 }} />
                      )}
                      <Typography 
                        variant="body1" 
                        fontWeight="medium" 
                        color={parseFloat(relativeToThreshold) > 0 ? 'error.main' : 'success.main'}
                      >
                        {parseFloat(relativeToThreshold) > 0 ? '+' : ''}{relativeToThreshold}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Moyenne 30j
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {avgVix}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2 }}>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Tendance de volatilité
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {trend < 0 ? (
                      <TrendingDownIcon sx={{ color: 'success.main', fontSize: 20, mr: 0.5 }} />
                    ) : (
                      <TrendingUpIcon sx={{ color: 'error.main', fontSize: 20, mr: 0.5 }} />
                    )}
                    <Typography 
                      variant="body1" 
                      fontWeight="medium" 
                      color={trend < 0 ? 'success.main' : 'error.main'}
                    >
                      {trend < 0 ? 'En baisse' : 'En hausse'} ({Math.abs(trend).toFixed(1)} points)
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Paper 
                variant="outlined" 
                sx={{ 
                  mt: 3, 
                  p: 2.5, 
                  borderRadius: 2,
                  minHeight: 120,
                  borderColor: currentVix < threshold ? 'success.main' : 'error.main',
                  bgcolor: `${currentVix < threshold ? 'success' : 'error'}.main10`,
                  overflow: 'visible',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="subtitle2" color={currentVix < threshold ? 'success.main' : 'error.main'} gutterBottom>
                  <InfoOutlinedIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                  Interprétation
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                  {currentVix < threshold 
                    ? "La volatilité du marché est actuellement dans une zone de confiance modérée.\nL'environnement est relativement favorable pour des investissements à moyen terme."
                    : "La volatilité du marché est actuellement élevée.\nUne prudence accrue est recommandée pour les nouveaux investissements.\nPrivilégiez les actifs défensifs et diversifiez davantage."}
                </Typography>
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Composant pour l'analyse de corrélation
  const renderCorrelationAnalysis = () => {
    // Trouver les actions avec la plus faible et la plus forte corrélation
    const sortedCorrelations = [...correlationData].sort((a, b) => a.correlationWithIndex - b.correlationWithIndex);
    const lowCorrelationStocks = sortedCorrelations.slice(0, 2).map(item => item.asset);
    const highCorrelationStocks = sortedCorrelations.slice(-2).map(item => item.asset);
    
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <CompareArrowsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Analyse de Corrélation des Actifs
          <Tooltip title="La corrélation mesure la relation entre deux actifs. Une corrélation proche de 1 indique que les actifs évoluent ensemble, une corrélation proche de -1 indique qu'ils évoluent en sens inverse.">
            <InfoOutlinedIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle', color: theme.palette.text.secondary }} />
          </Tooltip>
        </Typography>
        
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 2, height: '400px', bgcolor: theme.palette.background.default }}>
              <Bar data={prepareCorrelationChartData()} options={correlationChartOptions} />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, height: '400px', bgcolor: theme.palette.background.default }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ 
                mb: 2, 
                pb: 1, 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                Implications pour la Diversification
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Actions faiblement corrélées</Typography>
                  <Typography variant="body1">{lowCorrelationStocks.join(', ')}</Typography>
                  <Chip 
                    size="small" 
                    label="Excellentes pour diversification" 
                    sx={{ mt: 0.5, bgcolor: 'success.light', color: 'white' }} 
                  />
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">Actions fortement corrélées</Typography>
                  <Typography variant="body1">{highCorrelationStocks.join(', ')}</Typography>
                  <Chip 
                    size="small" 
                    label="Faible diversification" 
                    sx={{ mt: 0.5, bgcolor: 'warning.light', color: 'white' }} 
                  />
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">Recommandation</Typography>
                  <Typography variant="body2">
                    Pour optimiser la diversification de votre portefeuille, considérez l'ajout d'actifs
                    peu corrélés à l'indice principal comme {lowCorrelationStocks[0]} ou {lowCorrelationStocks[1]}.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Composant pour l'analyse de tendance
  const renderTrendAnalysis = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Analyse des Tendances Sectorielles
        <Tooltip title="Cette analyse évalue la force et la durée des tendances actuelles pour chaque secteur, ainsi que la probabilité d'un renversement de tendance.">
          <InfoOutlinedIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle', color: theme.palette.text.secondary }} />
        </Tooltip>
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Secteur</TableCell>
              <TableCell>Tendance Actuelle</TableCell>
              <TableCell>Indice de Force</TableCell>
              <TableCell>Durée</TableCell>
              <TableCell>Potentiel de Renversement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trendData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sector}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {row.currentTrend === 'Haussière' ? (
                      <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5 }} />
                    ) : row.currentTrend === 'Baissière' ? (
                      <TrendingDownIcon sx={{ color: 'error.main', mr: 0.5 }} />
                    ) : (
                      <CompareArrowsIcon sx={{ color: 'text.secondary', mr: 0.5 }} />
                    )}
                    {row.currentTrend}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 60,
                        bgcolor: 'grey.300',
                        borderRadius: 1,
                        mr: 1,
                      }}
                    >
                      <Box
                        sx={{
                          height: 8,
                          borderRadius: 1,
                          width: `${row.strengthIndex}%`,
                          bgcolor: 
                            row.strengthIndex > 70 ? 'success.main' : 
                            row.strengthIndex > 40 ? 'warning.main' : 
                            'error.main',
                        }}
                      />
                    </Box>
                    {row.strengthIndex}
                  </Box>
                </TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>
                  <Chip 
                    size="small" 
                    label={row.potentialReversal} 
                    sx={{ 
                      bgcolor: 
                        row.potentialReversal === 'Faible' ? 'success.light' : 
                        row.potentialReversal === 'Modéré' ? 'warning.light' : 
                        'error.light',
                      color: 'white' 
                    }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  // Composant pour l'analyse de sentiment
  const renderSentimentAnalysis = () => {
    // Valeur actuelle du sentiment (dernier point)
    const currentSentiment = sentimentData.length > 0 
      ? sentimentData[sentimentData.length - 1].value 
      : 0;
    
    // Tendance sur 3 mois (différence entre le point actuel et il y a 3 mois)
    const sentimentChange = sentimentData.length > 10 
      ? currentSentiment - sentimentData[sentimentData.length - 10].value 
      : 0;
    
    // Classification du niveau de sentiment
    const getSentimentLevel = () => {
      if (currentSentiment > 75) return { text: "Très optimiste", color: "success.dark" };
      if (currentSentiment > 50) return { text: "Optimiste", color: "success.main" };
      if (currentSentiment > 30) return { text: "Neutre", color: "warning.main" };
      return { text: "Pessimiste", color: "error.main" };
    };
    
    const sentimentLevel = getSentimentLevel();
    
    // Message d'interprétation basé sur le niveau de sentiment
    const getInterpretationMessage = () => {
      if (currentSentiment > 75) {
        return 'Le sentiment est actuellement très optimiste, ce qui peut être un signal contrariant. Une prudence accrue pourrait être justifiée car les niveaux d\'euphorie précèdent souvent des périodes de correction.';
      } else if (currentSentiment < 25) {
        return 'Le pessimisme dominant peut représenter une opportunité d\'achat selon la théorie contrarienne. Les périodes de pessimisme excessif précèdent souvent des rebonds.';
      } else if (currentSentiment > 50) {
        return 'Le sentiment est plutôt optimiste, indiquant une confiance modérée dans le marché. Surveillez les signaux de surachat potentiels si cette tendance se renforce.';
      } else {
        return 'Le sentiment est plutôt négatif, reflétant des inquiétudes sur les perspectives du marché. Recherchez des actions défensives et surveillez les opportunités d\'achat si le pessimisme devient excessif.';
      }
    };
    
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <BarChartIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Analyse de Sentiment du Marché
          <Tooltip title="L'indice de sentiment mesure l'optimisme ou le pessimisme des investisseurs sur une échelle de 0 à 100. Un score supérieur à 50 indique un sentiment positif.">
            <InfoOutlinedIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle', color: theme.palette.text.secondary }} />
          </Tooltip>
        </Typography>
        
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 2, height: '400px', bgcolor: theme.palette.background.default }}>
              <Line data={prepareSentimentChartData()} options={sentimentChartOptions} />
              
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Chip
                  icon={sentimentChange > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  label={`Tendance: ${sentimentChange > 0 ? '+' : ''}${sentimentChange.toFixed(1)} points sur 3 mois`}
                  color={sentimentChange > 0 ? "success" : "error"}
                  variant="outlined"
                  sx={{ fontWeight: 'medium' }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: 320, overflow: 'visible' }}>
            <Paper
              sx={{
                p: 2,
                height: { xs: 'auto', md: 480 },
                minHeight: 320,
                maxHeight: { xs: 'none', md: 520 },
                bgcolor: theme.palette.background.default,
                overflowY: 'auto',
                overflowX: 'visible',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ 
                mb: 2, 
                pb: 1, 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                Indicateurs de Sentiment
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Sentiment actuel
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography variant="h4" fontWeight="bold" color={sentimentLevel.color}>
                    {currentSentiment.toFixed(1)}
                  </Typography>
                  <Box sx={{ 
                    ml: 1, 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 1, 
                    bgcolor: `${sentimentLevel.color}20`,
                    color: sentimentLevel.color
                  }}>
                    <Typography variant="caption" fontWeight="bold">
                      {sentimentLevel.text}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    width: '100%', 
                    height: 8, 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: 4,
                    position: 'relative'
                  }}>
                    <Box sx={{ 
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: `${currentSentiment}%`,
                      bgcolor: currentSentiment > 50 ? 'success.main' : 'error.main',
                      borderRadius: 4,
                      transition: 'width 0.5s ease-in-out'
                    }} />
                    <Box sx={{ 
                      position: 'absolute',
                      left: '50%',
                      top: -4,
                      height: 16,
                      width: 2,
                      bgcolor: 'warning.main',
                    }} />
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">Pessimiste</Typography>
                  <Typography variant="caption" color="warning.main">Neutre</Typography>
                  <Typography variant="caption" color="text.secondary">Optimiste</Typography>
                </Box>
              </Box>
              
              <Paper 
                variant="outlined" 
                sx={{ 
                  mt: 3, 
                  p: 1.5, 
                  borderRadius: 2,
                  borderColor: sentimentLevel.color,
                  bgcolor: `${sentimentLevel.color}10`,
                }}
              >
                <Typography variant="subtitle2" color={sentimentLevel.color} gutterBottom>
                  <InfoOutlinedIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                  Interprétation contrarienne
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {getInterpretationMessage()}
                </Typography>
              </Paper>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Implication pour l'investissement
                </Typography>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                }}>
                  <Typography variant="body2">
                    {currentSentiment > 75 
                      ? 'Envisagez de prendre des bénéfices sur les positions ayant fortement performé et augmentez votre allocation en liquidités.' 
                      : currentSentiment < 25 
                        ? 'Considérez l\'accumulation progressive de positions sur des actions de qualité à des valorisations attractives.' 
                        : 'Maintenez une allocation équilibrée et diversifiée sans surpondération excessive.'}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="div">
            Analyses Avancées du Marché
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="timeframe-select-label">Période</InputLabel>
            <Select
              labelId="timeframe-select-label"
              id="timeframe-select"
              value={timeframe}
              label="Période"
              onChange={handleTimeframeChange}
            >
              <MenuItem value="1W">1 Semaine</MenuItem>
              <MenuItem value="1M">1 Mois</MenuItem>
              <MenuItem value="3M">3 Mois</MenuItem>
              <MenuItem value="6M">6 Mois</MenuItem>
              <MenuItem value="1Y">1 An</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="market analysis tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<AssessmentIcon />} label="Volatilité" />
            <Tab icon={<CompareArrowsIcon />} label="Corrélation" />
            <Tab icon={<TimelineIcon />} label="Tendances" />
            <Tab icon={<BarChartIcon />} label="Sentiment" />
          </Tabs>
        </Box>
        
        <TabPanel value={activeTab} index={0}>
          {renderVolatilityIndex()}
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          {renderCorrelationAnalysis()}
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          {renderTrendAnalysis()}
        </TabPanel>
        
        <TabPanel value={activeTab} index={3}>
          {renderSentimentAnalysis()}
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default MarketAnalysisTools; 