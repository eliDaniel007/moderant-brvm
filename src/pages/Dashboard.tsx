import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
  Chip,
  Divider,
  useMediaQuery,
  Grid,
  Button,
  Tab,
  Tabs,
  IconButton,
  Avatar,
  Paper,
  LinearProgress,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

// Importation fictive de Chart.js (doit être installé avec npm install chart.js react-chartjs-2)
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';

// Importation du composant MarketAnalysisTools
import MarketAnalysisTools from '../components/charts/MarketAnalysisTools';

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [socialMediaData] = useState({
    facebook: { followers: 12460, engagement: 2.8, trend: 1.2 },
    twitter: { followers: 8750, engagement: 3.2, trend: 0.8 },
    linkedin: { followers: 5320, engagement: 1.9, trend: 2.5 },
    instagram: { followers: 15280, engagement: 4.1, trend: 3.4 },
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const portfolio = [
    {
      stock: 'SONATEL',
      quantity: 100,
      averagePrice: 12500,
      value: 1250000,
      change: 2.4,
    },
    {
      stock: 'ORABANK',
      quantity: 50,
      averagePrice: 8500,
      value: 425000,
      change: -1.2,
    },
    {
      stock: 'ECOBANK',
      quantity: 200,
      averagePrice: 4200,
      value: 840000,
      change: 3.8,
    },
    {
      stock: 'BOLLORE',
      quantity: 80,
      averagePrice: 3600,
      value: 288000,
      change: 1.5,
    },
    {
      stock: 'SOCIETE GENERALE',
      quantity: 30,
      averagePrice: 18900,
      value: 567000,
      change: -0.7,
    },
  ];

  const totalValue = portfolio.reduce((acc, item) => acc + item.value, 0);
  const performancePercentage = 15.2;
  const performanceValue = totalValue * (performancePercentage / 100);
  const dividends = 125000;

  // Données pour les actualités du marché
  const marketNews = [
    {
      id: 1,
      title: "La BRVM enregistre une hausse de 2,8% sur le premier trimestre",
      date: "2023-04-15",
      source: "Financial Africa",
      summary: "Les marchés boursiers ouest-africains montrent des signes de reprise...",
    },
    {
      id: 2,
      title: "SONATEL annonce une augmentation de ses dividendes pour 2023",
      date: "2023-04-10",
      source: "Investir UEMOA",
      summary: "Le géant des télécommunications SONATEL a déclaré une hausse de 15% de ses dividendes...",
    },
    {
      id: 3,
      title: "Nouvelle introduction en bourse prévue pour juin 2023",
      date: "2023-04-05",
      source: "BRVM News",
      summary: "Une importante entreprise du secteur énergétique prépare son entrée à la BRVM...",
    },
  ];

  // Données pour les transactions récentes
  const recentTransactions = [
    {
      id: 1,
      type: "achat",
      stock: "SONATEL",
      date: "2023-04-14",
      quantity: 25,
      price: 12700,
      amount: 317500,
    },
    {
      id: 2,
      type: "vente",
      stock: "BOLLORE",
      date: "2023-04-12",
      quantity: 15,
      price: 3580,
      amount: 53700,
    },
    {
      id: 3,
      type: "achat",
      stock: "ECOBANK",
      date: "2023-04-10",
      quantity: 50,
      price: 4250,
      amount: 212500,
    },
  ];

  // Données pour le graphique d'évolution du portefeuille
  const portfolioChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Valeur du portefeuille (FCFA)',
        data: [2800000, 2750000, 2900000, 3100000, 3050000, 3250000, 3370000, 3200000, 3400000, 3550000, 3600000, 3700000],
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 198, 174, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Options du graphique
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return `${(Number(value) / 1000000).toFixed(1)}M`;
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Données pour le graphique de répartition par secteur
  const sectorAllocationData = {
    labels: ['Télécommunications', 'Finance', 'Énergie', 'Transport', 'Industrie'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          '#00C6AE', 
          '#2D8CFF', 
          '#5856D6', 
          '#FF9500', 
          '#FF2D55'
        ],
        borderWidth: 0,
      },
    ],
  };

  // Options pour le graphique de répartition
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },
    cutout: '70%',
  };

  // Fonction pour générer les données des réseaux sociaux
  const getSocialMediaChartData = (platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram') => {
    const engagementData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      datasets: [
        {
          label: 'Engagement',
          data: [2.1, 2.3, 2.5, 2.8, 3.0, 3.2],
          backgroundColor: platform === 'facebook' ? '#1877F2' : 
                           platform === 'twitter' ? '#1DA1F2' : 
                           platform === 'linkedin' ? '#0A66C2' : 
                           '#E4405F',
          borderColor: platform === 'facebook' ? '#1877F2' : 
                        platform === 'twitter' ? '#1DA1F2' : 
                        platform === 'linkedin' ? '#0A66C2' : 
                        '#E4405F',
          borderWidth: 2,
        }
      ]
    };
  
    return engagementData;
  };
  
  const socialMediaChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Données pour les indicateurs techniques
  const technicalIndicators = [
    { name: 'RSI', value: 58, status: 'neutral', description: 'Relative Strength Index' },
    { name: 'MACD', value: 0.45, status: 'bullish', description: 'Moving Average Convergence Divergence' },
    { name: 'Stochastic', value: 72, status: 'bullish', description: 'Stochastic Oscillator' },
    { name: 'MA 50/200', value: 1.05, status: 'bullish', description: 'Moving Average Ratio (50/200)' },
    { name: 'Bollinger', value: 0.85, status: 'neutral', description: 'Position in Bollinger Bands' },
    { name: 'ADX', value: 23, status: 'neutral', description: 'Average Directional Index' },
  ];

  // Données pour les événements économiques
  const economicEvents = [
    { date: '2023-05-10', time: '10:00', event: 'Publication du taux d\'inflation UEMOA', impact: 'high' },
    { date: '2023-05-15', time: '14:30', event: 'Annonce dividendes SONATEL', impact: 'medium' },
    { date: '2023-05-18', time: '09:00', event: 'Rapport trimestriel BRVM', impact: 'high' },
    { date: '2023-05-22', time: '11:00', event: 'Décision de la BCEAO sur les taux', impact: 'high' },
    { date: '2023-05-25', time: '15:00', event: 'Publication résultats ECOBANK', impact: 'medium' },
  ];

  // Données pour la comparaison des indices sectoriels
  const sectoralIndices = [
    { sector: 'Banque & Finance', change: 2.8, ytd: 14.2 },
    { sector: 'Télécommunications', change: 1.5, ytd: 8.7 },
    { sector: 'Agriculture', change: -0.9, ytd: 4.3 },
    { sector: 'Industrie', change: 0.6, ytd: 5.2 },
    { sector: 'Transport', change: 1.2, ytd: 7.9 },
    { sector: 'Services Publics', change: -0.5, ytd: 2.1 },
  ];

  // Données pour l'analyse comparative des actions
  const stockComparison = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
    datasets: [
      {
        label: 'SONATEL',
        data: [100, 105, 103, 108, 112],
        borderColor: '#00C6AE',
        backgroundColor: 'transparent',
        tension: 0.3,
      },
      {
        label: 'ECOBANK',
        data: [100, 104, 108, 110, 115],
        borderColor: '#2D8CFF',
        backgroundColor: 'transparent',
        tension: 0.3,
      },
      {
        label: 'BOLLORE',
        data: [100, 98, 102, 105, 104],
        borderColor: '#5856D6',
        backgroundColor: 'transparent',
        tension: 0.3,
      },
    ],
  };

  // Options pour le graphique de comparaison
  const comparisonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        min: 95,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Rendu des sections principales
  const renderSummaryCard = () => (
            <Card
              sx={{ 
                height: '100%',
                background: 'rgba(35, 39, 47, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600, 
                    mb: { xs: 2, md: 3 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            display: 'flex',
            alignItems: 'center',
                  }}
                >
          <AccountBalanceIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Résumé Financier
                </Typography>
                
                <List disablePadding>
                  <ListItem sx={{ px: 0, py: { xs: 1, sm: 1.5 } }}>
                    <ListItemText
              primary="Valeur totale du portefeuille"
                      primaryTypographyProps={{
                        variant: 'body2',
                        color: 'text.secondary',
                      }}
                      secondary={`${totalValue.toLocaleString('fr-FR')} FCFA`}
                      secondaryTypographyProps={{
                        variant: 'h6',
                        color: 'text.primary',
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                      }}
                    />
                  </ListItem>
                  <Divider sx={{ opacity: 0.1 }} />
                  <ListItem sx={{ px: 0, py: { xs: 1, sm: 1.5 } }}>
                    <ListItemText
              primary="Performance globale"
                      primaryTypographyProps={{
                        variant: 'body2',
                        color: 'text.secondary',
                      }}
                    />
                    <Chip
                      icon={<TrendingUpIcon />}
                      label={`+${performancePercentage}%`}
                      sx={{
                        bgcolor: 'rgba(0, 198, 174, 0.1)',
                        color: '#00C6AE',
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                          color: '#00C6AE',
                        },
                      }}
                    />
                  </ListItem>
                  <Divider sx={{ opacity: 0.1 }} />
                  <ListItem sx={{ px: 0, py: { xs: 1, sm: 1.5 } }}>
                    <ListItemText
                      primary={`+${performanceValue.toLocaleString('fr-FR')} FCFA`}
                      secondary="Profit réalisé"
                      primaryTypographyProps={{
                        sx: { 
                          color: '#00C6AE', 
                          fontWeight: 600,
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                        },
                      }}
                      secondaryTypographyProps={{
                        variant: 'body2',
                        color: 'text.secondary',
                      }}
                    />
                  </ListItem>
                  <Divider sx={{ opacity: 0.1 }} />
                  <ListItem sx={{ px: 0, py: { xs: 1, sm: 1.5 } }}>
                    <ListItemText
              primary="Dividendes perçus"
                      primaryTypographyProps={{
                        variant: 'body2',
                        color: 'text.secondary',
                      }}
                      secondary={`${dividends.toLocaleString('fr-FR')} FCFA`}
                      secondaryTypographyProps={{
                        variant: 'body1',
                        color: 'text.primary',
                        fontWeight: 600,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                      }}
                    />
                  </ListItem>
          <Divider sx={{ opacity: 0.1 }} />
          <ListItem sx={{ px: 0, py: { xs: 1, sm: 1.5 } }}>
            <ListItemText
              primary="Rendement annuel"
              primaryTypographyProps={{
                variant: 'body2',
                color: 'text.secondary',
              }}
              secondary="8.75%"
              secondaryTypographyProps={{
                variant: 'body1',
                color: '#00C6AE',
                fontWeight: 600,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            />
          </ListItem>
                </List>
              </CardContent>
            </Card>
  );

  const renderPortfolioCard = () => (
            <Card
              sx={{ 
                height: '100%',
                background: 'rgba(35, 39, 47, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                overflow: 'auto',
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              display: 'flex',
              alignItems: 'center',
                  }}
                >
            <BarChartIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Portefeuille d'actifs
                </Typography>
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ 
              borderRadius: '8px', 
              fontSize: '0.75rem',
              py: 0.5
            }}
          >
            Voir tout
          </Button>
        </Box>
                <TableContainer sx={{ overflowX: 'auto' }}>
                  <Table size={isMobile ? "small" : "medium"}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ 
                          color: theme.palette.text.secondary, 
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          whiteSpace: 'nowrap', 
                          padding: { xs: '6px 8px', sm: '16px' }
                        }}>
                          Action
                        </TableCell>
                        <TableCell 
                          align="right" 
                          sx={{ 
                            color: theme.palette.text.secondary, 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            whiteSpace: 'nowrap',
                            display: { xs: isTablet ? 'none' : 'table-cell', md: 'table-cell' },
                            padding: { xs: '6px 8px', sm: '16px' }
                          }}
                        >
                          Quantité
                        </TableCell>
                        <TableCell 
                          align="right" 
                          sx={{ 
                            color: theme.palette.text.secondary, 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            whiteSpace: 'nowrap',
                            display: { xs: isTablet ? 'none' : 'table-cell', md: 'table-cell' },
                            padding: { xs: '6px 8px', sm: '16px' }
                          }}
                        >
                          Prix moyen
                        </TableCell>
                        <TableCell 
                          align="right" 
                          sx={{ 
                            color: theme.palette.text.secondary, 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            whiteSpace: 'nowrap',
                            padding: { xs: '6px 8px', sm: '16px' }
                          }}
                        >
                          Valeur
                        </TableCell>
                        <TableCell 
                          align="right" 
                          sx={{ 
                            color: theme.palette.text.secondary, 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            whiteSpace: 'nowrap',
                            padding: { xs: '6px 8px', sm: '16px' }
                          }}
                        >
                          Évolution
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portfolio.map((item) => (
                        <TableRow 
                          key={item.stock}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell 
                            component="th" 
                            scope="row"
                            sx={{ 
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                              padding: { xs: '6px 8px', sm: '16px' }
                            }}
                          >
                            {item.stock}
                          </TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                              whiteSpace: 'nowrap',
                              display: { xs: isTablet ? 'none' : 'table-cell', md: 'table-cell' },
                              padding: { xs: '6px 8px', sm: '16px' }
                            }}
                          >
                            {item.quantity}
                          </TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                              whiteSpace: 'nowrap',
                              display: { xs: isTablet ? 'none' : 'table-cell', md: 'table-cell' },
                              padding: { xs: '6px 8px', sm: '16px' }
                            }}
                          >
                            {item.averagePrice.toLocaleString('fr-FR')} FCFA
                          </TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                              padding: { xs: '6px 8px', sm: '16px' }
                            }}
                          >
                            {item.value.toLocaleString('fr-FR')} FCFA
                          </TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                              padding: { xs: '6px 8px', sm: '16px' }
                            }}
                          >
                            <Chip
                              icon={item.change >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                              label={`${item.change >= 0 ? '+' : ''}${item.change}%`}
                              sx={{
                                bgcolor: item.change >= 0 
                                  ? 'rgba(0, 198, 174, 0.1)' 
                                  : 'rgba(249, 87, 56, 0.1)',
                                color: item.change >= 0 ? '#00C6AE' : '#F95738',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                '& .MuiChip-icon': {
                                  color: item.change >= 0 ? '#00C6AE' : '#F95738',
                                },
                              }}
                              size={isMobile ? "small" : "medium"}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
  );

  const renderPortfolioChart = () => (
    <Card
      sx={{ 
        height: '100%',
        background: 'rgba(35, 39, 47, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TimelineIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Évolution du portefeuille
          </Typography>
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ 
              borderRadius: '8px', 
              fontSize: '0.75rem',
              py: 0.5
            }}
          >
            Année en cours
          </Button>
          </Box>
        <Box sx={{ height: { xs: 220, sm: 280, md: 300 }, position: 'relative' }}>
          <Line data={portfolioChartData} options={chartOptions} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Début d'année
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              2,800,000 FCFA
            </Typography>
    </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" align="right">
              Aujourd'hui
            </Typography>
            <Typography variant="body2" fontWeight={600} color="#00C6AE">
              3,700,000 FCFA (+32.1%)
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderSectorAllocation = () => (
    <Card
      sx={{ 
        height: '100%',
        background: 'rgba(35, 39, 47, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BarChartIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Répartition par secteur
        </Typography>
        <Box sx={{ height: 220, position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <Doughnut data={sectorAllocationData} options={doughnutOptions} />
        </Box>
      </CardContent>
    </Card>
  );

  const renderMarketNews = () => (
    <Card
      sx={{ 
        height: '100%',
        background: 'rgba(35, 39, 47, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <NewspaperIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Actualités du marché
          </Typography>
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ 
              borderRadius: '8px', 
              fontSize: '0.75rem',
              py: 0.5
            }}
          >
            Voir tout
          </Button>
        </Box>
        <List disablePadding>
          {marketNews.map((news, index) => (
            <React.Fragment key={news.id}>
              <ListItem 
                alignItems="flex-start" 
                disablePadding 
                sx={{ 
                  py: 1.5,
                  px: 0
                }}
              >
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Avatar 
                    variant="rounded" 
                    sx={{ 
                      bgcolor: 'rgba(45, 140, 255, 0.2)', 
                      color: '#2D8CFF',
                      width: 42,
                      height: 42,
                      mr: 2
                    }}
                  >
                    <NewspaperIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 0.5,
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}
                    >
                      {news.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                    >
                      {news.summary}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {news.source}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {news.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
              {index < marketNews.length - 1 && <Divider sx={{ opacity: 0.1 }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const renderRecentTransactions = () => (
    <Card
      sx={{ 
        height: '100%',
        background: 'rgba(35, 39, 47, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SwapHorizIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Transactions récentes
          </Typography>
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ 
              borderRadius: '8px', 
              fontSize: '0.75rem',
              py: 0.5
            }}
          >
            Historique
          </Button>
        </Box>
        <List disablePadding>
          {recentTransactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <ListItem 
                disablePadding 
                sx={{ 
                  py: 1.5,
                  px: 0
                }}
              >
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: transaction.type === 'achat' ? 'rgba(0, 198, 174, 0.2)' : 'rgba(249, 87, 56, 0.2)', 
                      color: transaction.type === 'achat' ? '#00C6AE' : '#F95738',
                      width: 42,
                      height: 42,
                      mr: 2
                    }}
                  >
                    {transaction.type === 'achat' ? '+' : '-'}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {transaction.stock}
                      </Typography>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight={600}
                        color={transaction.type === 'achat' ? '#00C6AE' : '#F95738'}
                      >
                        {transaction.type === 'achat' ? '+' : '-'}{transaction.amount.toLocaleString('fr-FR')} FCFA
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {transaction.type === 'achat' ? 'Achat' : 'Vente'} de {transaction.quantity} actions
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {transaction.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
              {index < recentTransactions.length - 1 && <Divider sx={{ opacity: 0.1 }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const renderSocialMediaCard = () => (
    <Card
      sx={{ 
        height: '100%',
        background: 'rgba(35, 39, 47, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            mb: 3,
            '& .MuiTabs-indicator': {
              backgroundColor: tabValue === 0 ? '#1877F2' : 
                              tabValue === 1 ? '#1DA1F2' :
                              tabValue === 2 ? '#0A66C2' : 
                              '#E4405F',
            },
          }}
        >
          <Tab 
            icon={<FacebookIcon />} 
            label="Facebook" 
            sx={{ 
              minHeight: 48,
              textTransform: 'none',
              color: tabValue === 0 ? '#1877F2' : 'text.secondary',
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
          />
          <Tab 
            icon={<TwitterIcon />} 
            label="Twitter" 
            sx={{ 
              minHeight: 48,
              textTransform: 'none',
              color: tabValue === 1 ? '#1DA1F2' : 'text.secondary',
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
          />
          <Tab 
            icon={<LinkedInIcon />} 
            label="LinkedIn" 
            sx={{ 
              minHeight: 48,
              textTransform: 'none',
              color: tabValue === 2 ? '#0A66C2' : 'text.secondary',
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
          />
          <Tab 
            icon={<InstagramIcon />} 
            label="Instagram" 
            sx={{ 
              minHeight: 48,
              textTransform: 'none',
              color: tabValue === 3 ? '#E4405F' : 'text.secondary',
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {renderSocialMediaStats('facebook')}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {renderSocialMediaStats('twitter')}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {renderSocialMediaStats('linkedin')}
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          {renderSocialMediaStats('instagram')}
        </TabPanel>
      </CardContent>
    </Card>
  );

  const renderSocialMediaStats = (platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram') => {
    const platformData = socialMediaData[platform];
    const color = platform === 'facebook' ? '#1877F2' : 
                  platform === 'twitter' ? '#1DA1F2' : 
                  platform === 'linkedin' ? '#0A66C2' : 
                  '#E4405F';

    return (
      <>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Abonnés
              </Typography>
              <Typography variant="h6" color={color} fontWeight={600}>
                {platformData.followers.toLocaleString('fr-FR')}
              </Typography>
              <Chip
                label={`+${platformData.trend}%`}
                size="small"
                sx={{
                  bgcolor: 'rgba(0, 198, 174, 0.1)',
                  color: '#00C6AE',
                  fontSize: '0.7rem',
                  height: 20,
                  mt: 1
                }}
              />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Engagement
              </Typography>
              <Typography variant="h6" color={color} fontWeight={600}>
                {platformData.engagement}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={platformData.engagement * 10}
                sx={{
                  width: '80%',
                  mt: 1,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: color,
                    borderRadius: 3,
                  },
                }}
              />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Publications
              </Typography>
              <Typography variant="h6" color={color} fontWeight={600}>
                36
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                ce mois-ci
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
          Évolution de l'engagement
        </Typography>
        <Box sx={{ height: 180, position: 'relative' }}>
          <Bar data={getSocialMediaChartData(platform)} options={socialMediaChartOptions} />
        </Box>
      </>
    );
  };

  const renderTechnicalIndicators = () => (
    <Card
      sx={{ 
        height: '100%',
        background: 'rgba(35, 39, 47, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AssessmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Indicateurs Techniques
          </Typography>
          <IconButton
            size="small"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <InfoIcon fontSize="small" />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          {technicalIndicators.map((indicator) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={indicator.name}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {indicator.name}
                  </Typography>
                  <Chip
                    icon={
                      indicator.status === 'bullish' ? <TrendingUpIcon /> : 
                      indicator.status === 'bearish' ? <TrendingDownIcon /> : 
                      <TrendingFlatIcon />
                    }
                    label={indicator.status.charAt(0).toUpperCase() + indicator.status.slice(1)}
                    size="small"
                    sx={{
                      fontSize: '0.7rem',
                      height: 20,
                      bgcolor: indicator.status === 'bullish' ? 'rgba(0, 198, 174, 0.1)' : 
                              indicator.status === 'bearish' ? 'rgba(249, 87, 56, 0.1)' : 
                              'rgba(255, 255, 255, 0.1)',
                      color: indicator.status === 'bullish' ? '#00C6AE' : 
                            indicator.status === 'bearish' ? '#F95738' : 
                            '#A0AEC0',
                    }}
                  />
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  {typeof indicator.value === 'number' ? 
                    (Number.isInteger(indicator.value) ? 
                      indicator.value : 
                      indicator.value.toFixed(2)) : 
                    indicator.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', pt: 1 }}>
                  {indicator.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderEconomicCalendar = () => (
    <Card
      sx={{ 
        height: '100%',
        background: 'rgba(35, 39, 47, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CalendarTodayIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Calendrier Économique
          </Typography>
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ 
              borderRadius: '8px', 
              fontSize: '0.75rem',
              py: 0.5
            }}
          >
            Mai 2023
          </Button>
        </Box>
        <List disablePadding>
          {economicEvents.map((event, index) => (
            <React.Fragment key={event.date + event.event}>
              <ListItem 
                disablePadding 
                sx={{ 
                  py: 1.5,
                  px: 0
                }}
              >
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      bgcolor: event.impact === 'high' ? '#F95738' : 
                              event.impact === 'medium' ? '#FF9500' : 
                              '#00C6AE',
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: event.impact === 'high' ? '0 0 10px rgba(249, 87, 56, 0.5)' : 
                                 event.impact === 'medium' ? '0 0 10px rgba(255, 149, 0, 0.5)' : 
                                 '0 0 10px rgba(0, 198, 174, 0.5)',
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {event.event}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.time}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {event.date}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              {index < economicEvents.length - 1 && <Divider sx={{ opacity: 0.1 }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const renderSectoralIndices = () => (
    <Card
      sx={{ 
        height: '100%',
        background: 'rgba(35, 39, 47, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BarChartIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          Indices Sectoriels BRVM
        </Typography>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  color: theme.palette.text.secondary, 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}>
                  Secteur
                </TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    color: theme.palette.text.secondary, 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  Var. jour
                </TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    color: theme.palette.text.secondary, 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  Var. YTD
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sectoralIndices.map((item) => (
                <TableRow 
                  key={item.sector}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      fontWeight: 600,
                    }}
                  >
                    {item.sector}
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      fontWeight: 600,
                      color: item.change >= 0 ? '#00C6AE' : '#F95738',
                    }}
                  >
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      fontWeight: 500,
                    }}
                  >
                    +{item.ytd}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const renderStocksComparison = () => (
    <Card
      sx={{ 
        height: '100%',
        background: 'rgba(35, 39, 47, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CompareArrowsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Analyse Comparative
          </Typography>
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ 
              borderRadius: '8px', 
              fontSize: '0.75rem',
              py: 0.5
            }}
          >
            Base 100
          </Button>
        </Box>
        <Box sx={{ height: 250, position: 'relative' }}>
          <Line data={stockComparison} options={comparisonOptions} />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Performances relatives (YTD)
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" fontWeight={500}>SONATEL</Typography>
                <Typography variant="body2" fontWeight={600} color="#00C6AE">+12.0%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={12 * 100 / 15} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'rgba(0, 198, 174, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#00C6AE',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" fontWeight={500}>ECOBANK</Typography>
                <Typography variant="body2" fontWeight={600} color="#2D8CFF">+15.0%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={15 * 100 / 15} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'rgba(45, 140, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#2D8CFF',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" fontWeight={500}>BOLLORE</Typography>
                <Typography variant="body2" fontWeight={600} color="#5856D6">+4.0%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={4 * 100 / 15} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'rgba(88, 86, 214, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#5856D6',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth={false} sx={{ pt: 3, pb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          {renderSummaryCard()}
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          {renderPortfolioChart()}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <MarketAnalysisTools />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          {renderPortfolioCard()}
        </Grid>
        <Grid size={{xs: 12 ,md:6 ,lg:4}} >
          {renderSectorAllocation()}
        </Grid>

        <Grid  size={{xs: 12 ,md:6}}>
          {renderRecentTransactions()}
        </Grid>
        <Grid size={{xs: 12 ,md:6 }}>
          {renderSocialMediaCard()}
        </Grid>

        <Grid size={{ xs: 12 }}>
          {renderMarketNews()}
        </Grid>

        <Grid size={{ xs: 12 }}>
          {renderTechnicalIndicators()}
        </Grid>
        <Grid size={{ xs: 12 }}>
          {renderEconomicCalendar()}
        </Grid>

        <Grid size={{ xs: 12 }}>
          {renderSectoralIndices()}
        </Grid>
        <Grid size={{ xs: 12 }}>
          {renderStocksComparison()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 