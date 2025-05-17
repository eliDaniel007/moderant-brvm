import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  TextField,
  Grid,
  Divider,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import StockChart from '../components/charts/StockChart';
import { 
  getBRVMStocks, 
  getSimulatedBRVMData, 
} from '../utils/api';
import type { StockData, StockPriceData } from '../utils/api';
import type { SelectChangeEvent } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Analysis: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState('SONATEL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stockData, setStockData] = useState<StockPriceData | null>(null);

  // Liste des actions disponibles
  const stocksList = getBRVMStocks();

  // Charger les données simulées au chargement et lors du changement d'action
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Utiliser les données simulées pour la BRVM
        const data = getSimulatedBRVMData(selectedStock);
        setStockData(data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedStock]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStockChange = (event: SelectChangeEvent) => {
    setSelectedStock(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredStocks = stocksList.filter((stock) => 
    stock.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculer les indicateurs techniques à partir des données
  const calculateTechnicalIndicators = (data: StockData[]) => {
    if (!data || data.length === 0) return null;

    // Calculer le RSI simple (14 périodes)
    const calculateRSI = (prices: number[], periods = 14) => {
      if (prices.length < periods + 1) return 50; // Valeur par défaut si pas assez de données
      
      let gains = 0;
      let losses = 0;
      
      for (let i = prices.length - periods; i < prices.length; i++) {
        const difference = prices[i] - prices[i - 1];
        if (difference >= 0) {
          gains += difference;
        } else {
          losses -= difference;
        }
      }
      
      if (losses === 0) return 100;
      
      const relativeStrength = gains / losses;
      return 100 - (100 / (1 + relativeStrength));
    };
    
    // Calculer les moyennes mobiles (SMA)
    const calculateSMA = (prices: number[], periods: number) => {
      if (prices.length < periods) return null;
      
      const sum = prices.slice(-periods).reduce((acc, price) => acc + price, 0);
      return sum / periods;
    };
    
    // Données de prix de clôture
    const closePrices = data.map((item) => item.close);
    
    // Calculer le RSI
    const rsi = calculateRSI(closePrices);
    
    // Calculer les moyennes mobiles
    const sma20 = calculateSMA(closePrices, 20);
    const sma50 = calculateSMA(closePrices, 50);
    const sma200 = calculateSMA(closePrices, 200);
    
    // Calculer les niveaux de support/résistance (simplifiés)
    const sortedPrices = [...closePrices].sort((a, b) => a - b);
    const min = sortedPrices[0];
    const max = sortedPrices[sortedPrices.length - 1];
    const range = max - min;
    
    const support1 = Math.round(min + range * 0.236);
    const support2 = Math.round(min + range * 0.382);
    const resistance1 = Math.round(max - range * 0.236);
    const resistance2 = Math.round(max - range * 0.382);
    
    // Déterminer la tendance
    const currentPrice = closePrices[closePrices.length - 1];
    const prevPrice = closePrices[closePrices.length - 10]; // 10 jours avant
    const trend = currentPrice > prevPrice ? 'Haussière' : 'Baissière';
    const trendPercent = ((currentPrice - prevPrice) / prevPrice) * 100;
    
    return {
      rsi,
      sma20,
      sma50,
      sma200,
      support1,
      support2,
      resistance1,
      resistance2,
      trend,
      trendPercent,
    };
  };

  // Calculer les indicateurs fondamentaux (simulés)
  const calculateFundamentalIndicators = (symbol: string) => {
    // Ces valeurs sont simulées pour la démonstration
    const baseValue = symbol.length * 1000;
    
    // Générer des données fondamentales cohérentes mais variables selon le symbole
    const per = (baseValue % 25) + 8; // PER entre 8 et 32
    const roe = (baseValue % 15) + 5; // ROE entre 5% et 19%
    const pb = ((baseValue % 30) + 100) / 100; // P/B entre 1.0 et 4.0
    const dividendYield = ((baseValue % 60) + 20) / 10; // Rendement entre 2% et 8%
    const netMargin = (baseValue % 20) + 10; // Marge nette entre 10% et 29%
    const debtToEquity = ((baseValue % 80) + 20) / 100; // Ratio dette/fonds propres entre 0.2 et 1.0
    
    return {
      per,
      roe,
      pb,
      dividendYield,
      netMargin,
      debtToEquity,
      marketCap: baseValue * 1000000,
      eps: baseValue / per,
      dividendPerShare: (baseValue * (dividendYield / 100)),
      bookValue: baseValue / pb,
    };
  };

  // Récupérer les indicateurs techniques et fondamentaux
  const technicalIndicators = stockData?.prices 
    ? calculateTechnicalIndicators(stockData.prices) 
    : null;
  
  const fundamentalIndicators = selectedStock 
    ? calculateFundamentalIndicators(selectedStock) 
    : null;

  // Formater les nombres avec séparateur de milliers et devise
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Formater les pourcentages
  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* En-tête et sélecteurs */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom 
          sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(to right, #00C6AE, #2D8CFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3
          }}>
          Analyse Boursière
        </Typography>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <FormControl sx={{ minWidth: 200, flex: 1 }}>
                <InputLabel id="stock-select-label">Action</InputLabel>
                <Select
                  labelId="stock-select-label"
                  value={selectedStock}
                  label="Action"
                  onChange={handleStockChange}
                >
                  {filteredStocks.map((stock) => (
                    <MenuItem key={stock} value={stock}>
                      {stock}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                label="Rechercher"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: <SearchIcon color="action" />,
                }}
                sx={{ flex: 2, minWidth: 200 }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Contenu principal */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : stockData ? (
        <>
          {/* Graphique */}
          <Box sx={{ mb: 4 }}>
            <StockChart 
              data={stockData.prices} 
              symbol={selectedStock} 
              height={500}
              showVolume
            />
          </Box>

          {/* Onglets d'analyse */}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Analyse Technique" />
                <Tab label="Analyse Fondamentale" />
                <Tab label="Actualités & Recommandations" />
              </Tabs>
            </Box>

            {/* Onglet Analyse Technique */}
            <TabPanel value={activeTab} index={0}>
              {technicalIndicators && (
                <Grid container spacing={3}>
                  {/* Indicateurs principaux */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Tendance & Momentum
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Chip
                            icon={technicalIndicators.trendPercent >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                            label={technicalIndicators.trend}
                            color={technicalIndicators.trendPercent >= 0 ? 'success' : 'error'}
                            sx={{ mr: 1 }}
                          />
                          <Typography 
                            variant="body1" 
                            color={technicalIndicators.trendPercent >= 0 ? 'success.main' : 'error.main'}
                          >
                            {formatPercent(technicalIndicators.trendPercent)}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" gutterBottom>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>RSI (14):</span> 
                            <Box component="span" sx={{ 
                              fontWeight: 600,
                              color: technicalIndicators.rsi > 70 ? 'error.main' : 
                                     technicalIndicators.rsi < 30 ? 'success.main' : 'inherit'
                            }}>
                              {technicalIndicators.rsi.toFixed(2)}
                              {technicalIndicators.rsi > 70 ? ' (Survente)' : 
                               technicalIndicators.rsi < 30 ? ' (Surachat)' : ' (Neutre)'}
                            </Box>
                          </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Moyennes mobiles */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Moyennes Mobiles
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>MM 20 jours:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {technicalIndicators.sma20 ? formatCurrency(technicalIndicators.sma20) : 'N/A'}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>MM 50 jours:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {technicalIndicators.sma50 ? formatCurrency(technicalIndicators.sma50) : 'N/A'}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2">
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>MM 200 jours:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {technicalIndicators.sma200 ? formatCurrency(technicalIndicators.sma200) : 'N/A'}
                            </Box>
                          </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Support et résistance */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Support & Résistance
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Résistance 2:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatCurrency(technicalIndicators.resistance2)}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Résistance 1:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatCurrency(technicalIndicators.resistance1)}
                            </Box>
                          </Box>
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Support 1:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatCurrency(technicalIndicators.support1)}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2">
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Support 2:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatCurrency(technicalIndicators.support2)}
                            </Box>
                          </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </TabPanel>

            {/* Onglet Analyse Fondamentale */}
            <TabPanel value={activeTab} index={1}>
              {fundamentalIndicators && (
                <Grid container spacing={3}>
                  {/* Valorisation */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Valorisation
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Capitalisation boursière:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatCurrency(fundamentalIndicators.marketCap)}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>PER (Price/Earnings):</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {fundamentalIndicators.per.toFixed(2)}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2">
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>P/B (Price/Book):</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {fundamentalIndicators.pb.toFixed(2)}
                            </Box>
                          </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Rentabilité */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Rentabilité
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>ROE:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatPercent(fundamentalIndicators.roe)}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Marge nette:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatPercent(fundamentalIndicators.netMargin)}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2">
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>EPS:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatCurrency(fundamentalIndicators.eps)}
                            </Box>
                          </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Dividendes et dette */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Dividendes & Structure
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Rendement dividende:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatPercent(fundamentalIndicators.dividendYield)}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Dividende par action:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatCurrency(fundamentalIndicators.dividendPerShare)}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2">
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Dette/Fonds propres:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {fundamentalIndicators.debtToEquity.toFixed(2)}
                            </Box>
                          </Box>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </TabPanel>

            {/* Onglet Actualités & Recommandations */}
            <TabPanel value={activeTab} index={2}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Dernières actualités
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          {selectedStock} annonce ses résultats du deuxième trimestre
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          02/06/2024 - {selectedStock} a publié des résultats supérieurs aux attentes pour le T2 2024, avec un chiffre d'affaires en hausse de 12% et une marge bénéficiaire de 18%.
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Nouveau plan stratégique pour {selectedStock}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          15/05/2024 - Le conseil d'administration de {selectedStock} a approuvé un nouveau plan stratégique quinquennal visant à renforcer sa présence régionale et à développer de nouveaux services.
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" gutterBottom>
                          Dividende exceptionnel pour les actionnaires
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          03/05/2024 - {selectedStock} a annoncé un dividende exceptionnel de 500 FCFA par action, en plus du dividende ordinaire, suite à la cession d'une filiale non stratégique.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Recommandations des analystes
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', my: 3 }}>
                        <Chip 
                          label="ACHETER" 
                          color="success" 
                          sx={{ fontSize: '1.2rem', py: 2, px: 3, mb: 1 }} 
                        />
                        <Typography variant="body2" color="text.secondary">
                          Consensus de 7 analystes
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box>
                        <Typography variant="body2" gutterBottom>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Objectif de cours moyen:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {formatCurrency(stockData.prices[0].close * 1.15)}
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Potentiel de hausse:</span> 
                            <Box component="span" sx={{ fontWeight: 600, color: 'success.main' }}>
                              +15%
                            </Box>
                          </Box>
                        </Typography>
                        <Typography variant="body2">
                          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Risque:</span> 
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              Modéré
                            </Box>
                          </Box>
                        </Typography>
                      </Box>
                      <Button 
                        variant="outlined" 
                        fullWidth 
                        sx={{ mt: 3 }}
                      >
                        Voir l'analyse complète
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </>
      ) : (
        <Typography>Aucune donnée disponible pour cette action.</Typography>
      )}
    </Container>
  );
};

export default Analysis; 