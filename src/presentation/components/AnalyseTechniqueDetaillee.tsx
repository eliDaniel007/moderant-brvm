import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
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
  Filler
} from 'chart.js';

import { Container } from '../../infrastructure/container/Container';
import { AnalyserActionUseCase } from '../../domain/usecases/AnalyserActionUseCase';
import { Action } from '../../domain/entities/Action';

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

interface AnalyseTechniqueDetailleeProps {
  action: Action;
}

const AnalyseTechniqueDetaillee: React.FC<AnalyseTechniqueDetailleeProps> = ({ action }) => {
  const [analyse, setAnalyse] = useState<any>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    analyserAction();
  }, [action.symbole]);

  const analyserAction = async () => {
    try {
      setChargement(true);
      setErreur(null);
      
      const container = Container.getInstance();
      const analyserActionUseCase = container.getAnalyserActionUseCase();
      
      const resultatAnalyse = await analyserActionUseCase.executer(action.symbole);
      setAnalyse(resultatAnalyse);
    } catch (erreur) {
      setErreur(erreur instanceof Error ? erreur.message : 'Erreur lors de l\'analyse');
    } finally {
      setChargement(false);
    }
  };

  const formaterPrix = (prix: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(prix);
  };

  const formaterPourcentage = (valeur: number): string => {
    return `${valeur.toFixed(2)}%`;
  };

  const obtenirCouleurSignal = (type: string): string => {
    switch (type) {
      case 'achat': return '#4caf50';
      case 'vente': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const creerDonneesGraphiquePrix = () => {
    if (!analyse?.donneesHistoriques) return null;

    const donnees = analyse.donneesHistoriques.slice(-30); // 30 derniers jours

    return {
      labels: donnees.map((d: any) => d.date),
      datasets: [
        {
          label: 'Prix de clôture',
          data: donnees.map((d: any) => d.prixCloture),
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          tension: 0.1,
          fill: true
        }
      ]
    };
  };

  const creerDonneesGraphiqueIndicateurs = () => {
    if (!analyse?.donneesHistoriques) return null;

    const donnees = analyse.donneesHistoriques.slice(-30);
    const prix = donnees.map((d: any) => d.prixCloture);

    // Calculer SMA 20
    const sma20 = [];
    for (let i = 19; i < prix.length; i++) {
      const moyenne = prix.slice(i - 19, i + 1).reduce((a: number, b: number) => a + b, 0) / 20;
      sma20.push(moyenne);
    }

    return {
      labels: donnees.slice(19).map((d: any) => d.date),
      datasets: [
        {
          label: 'Prix',
          data: prix.slice(19),
          borderColor: '#2196f3',
          backgroundColor: 'transparent',
          tension: 0.1
        },
        {
          label: 'SMA 20',
          data: sma20,
          borderColor: '#ff9800',
          backgroundColor: 'transparent',
          tension: 0.1
        }
      ]
    };
  };

  if (chargement) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (erreur) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {erreur}
      </Alert>
    );
  }

  return (
    <Box>
      {/* En-tête de l'action */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {action.symbole}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {action.nom}
              </Typography>
              <Chip 
                label={action.secteur} 
                variant="outlined" 
                size="small" 
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="flex-end" flexDirection="column" alignItems="flex-end">
                <Typography variant="h5" fontWeight="bold">
                  {formaterPrix(action.dernierPrix)}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: action.variationPourcentage > 0 ? '#4caf50' : '#f44336'
                  }}
                >
                  {action.variationPourcentage > 0 ? '+' : ''}{formaterPourcentage(action.variationPourcentage)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Volume: {action.volume.toLocaleString('fr-FR')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Signaux et recommandations */}
      {analyse?.signaux && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Signaux d'analyse technique
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box textAlign="center" p={2} border={1} borderColor="divider" borderRadius={1}>
                  <Typography variant="h6" color={obtenirCouleurSignal(analyse.signaux.type)}>
                    {analyse.signaux.type.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Signal principal
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box textAlign="center" p={2} border={1} borderColor="divider" borderRadius={1}>
                  <Typography variant="h6">
                    {(analyse.signaux.confiance * 100).toFixed(0)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Niveau de confiance
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box textAlign="center" p={2} border={1} borderColor="divider" borderRadius={1}>
                  <Typography variant="h6">
                    {analyse.tendance}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tendance générale
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
              {analyse.signaux.description}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Graphiques */}
      <Grid container spacing={3}>
        {/* Graphique des prix */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Évolution des prix (30 derniers jours)
              </Typography>
              <Box height={300}>
                <Line
                  data={creerDonneesGraphiquePrix() || { labels: [], datasets: [] }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top'
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Indicateurs techniques */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Indicateurs techniques
              </Typography>
              {analyse?.indicateurs && (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>RSI</TableCell>
                        <TableCell align="right">
                          {analyse.indicateurs.rsi.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>MACD</TableCell>
                        <TableCell align="right">
                          {analyse.indicateurs.macd.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>SMA (20)</TableCell>
                        <TableCell align="right">
                          {formaterPrix(analyse.indicateurs.sma)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>EMA (20)</TableCell>
                        <TableCell align="right">
                          {formaterPrix(analyse.indicateurs.ema)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bollinger Sup.</TableCell>
                        <TableCell align="right">
                          {formaterPrix(analyse.indicateurs.bollingerBandes.superieure)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bollinger Inf.</TableCell>
                        <TableCell align="right">
                          {formaterPrix(analyse.indicateurs.bollingerBandes.inferieure)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Graphique avec moyennes mobiles */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Prix et moyennes mobiles
              </Typography>
              <Box height={300}>
                <Line
                  data={creerDonneesGraphiqueIndicateurs() || { labels: [], datasets: [] }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top'
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Niveaux de support et résistance */}
        {analyse?.niveaux && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Niveaux de support et résistance
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Supports
                    </Typography>
                    {analyse.niveaux.supports.slice(0, 3).map((support: number, index: number) => (
                      <Typography key={index} variant="body2">
                        S{index + 1}: {formaterPrix(support)}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="error" gutterBottom>
                      Résistances
                    </Typography>
                    {analyse.niveaux.resistances.slice(0, 3).map((resistance: number, index: number) => (
                      <Typography key={index} variant="body2">
                        R{index + 1}: {formaterPrix(resistance)}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Patterns détectés */}
        {analyse?.patterns && analyse.patterns.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Patterns détectés
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {analyse.patterns.map((pattern: string, index: number) => (
                    <Chip 
                      key={index} 
                      label={pattern} 
                      variant="outlined" 
                      color="primary"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Recommandations */}
      {analyse?.recommandations && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recommandations
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box textAlign="center" p={2} border={1} borderColor="divider" borderRadius={1}>
                  <Typography variant="h6" color={obtenirCouleurSignal(analyse.recommandations.recommandation)}>
                    {analyse.recommandations.recommandation.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Action recommandée
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box textAlign="center" p={2} border={1} borderColor="divider" borderRadius={1}>
                  <Typography variant="h6">
                    {(analyse.recommandations.niveauConfiance * 100).toFixed(0)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Confiance
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box textAlign="center" p={2} border={1} borderColor="divider" borderRadius={1}>
                  <Typography variant="h6">
                    {formaterPrix(analyse.recommandations.prixCible)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Prix cible
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box textAlign="center" p={2} border={1} borderColor="divider" borderRadius={1}>
                  <Typography variant="h6">
                    {formaterPrix(analyse.recommandations.stopLoss)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stop Loss
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
              {analyse.recommandations.raison}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AnalyseTechniqueDetaillee; 