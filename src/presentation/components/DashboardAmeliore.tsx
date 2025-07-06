import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
  Divider
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js';

import { Container } from '../../infrastructure/container/Container';
import { RecupererActionsUseCase } from '../../domain/usecases/RecupererActionsUseCase';
import { AnalyserActionUseCase } from '../../domain/usecases/AnalyserActionUseCase';
import { Action } from '../../domain/entities/Action';

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

interface DashboardAmelioreProps {
  onActionSelect?: (action: Action) => void;
}

const DashboardAmeliore: React.FC<DashboardAmelioreProps> = ({ onActionSelect }) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [actionsPlusActives, setActionsPlusActives] = useState<Action[]>([]);
  const [actionsPlusFortesHausses, setActionsPlusFortesHausses] = useState<Action[]>([]);
  const [actionsPlusFortesBaisses, setActionsPlusFortesBaisses] = useState<Action[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [derniereMAJ, setDerniereMAJ] = useState<Date>(new Date());

  useEffect(() => {
    chargerDonnees();
  }, []);

  const chargerDonnees = async () => {
    try {
      setChargement(true);
      setErreur(null);
      
      const container = Container.getInstance();
      const recupererActionsUseCase = container.getRecupererActionsUseCase();
      
      // Charger toutes les actions
      const toutesActions = await recupererActionsUseCase.executer();
      setActions(toutesActions);
      
      // Charger les actions les plus actives
      const plusActives = await recupererActionsUseCase.executerPlusActives(5);
      setActionsPlusActives(plusActives);
      
      // Charger les actions avec les plus fortes hausses
      const plusFortesHausses = await recupererActionsUseCase.executerPlusFortesVariations(5, 'hausse');
      setActionsPlusFortesHausses(plusFortesHausses);
      
      // Charger les actions avec les plus fortes baisses
      const plusFortesBaisses = await recupererActionsUseCase.executerPlusFortesVariations(5, 'baisse');
      setActionsPlusFortesBaisses(plusFortesBaisses);
      
      setDerniereMAJ(new Date());
    } catch (erreur) {
      setErreur(erreur instanceof Error ? erreur.message : 'Erreur inconnue');
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

  const formaterVariation = (variation: number): string => {
    const signe = variation >= 0 ? '+' : '';
    return `${signe}${variation.toFixed(2)}%`;
  };

  const obtenirCouleurVariation = (variation: number): string => {
    if (variation > 0) return '#4caf50';
    if (variation < 0) return '#f44336';
    return '#9e9e9e';
  };

  const obtenirIconeVariation = (variation: number) => {
    if (variation > 0) return <TrendingUpIcon sx={{ color: '#4caf50' }} />;
    if (variation < 0) return <TrendingDownIcon sx={{ color: '#f44336' }} />;
    return <TrendingFlatIcon sx={{ color: '#9e9e9e' }} />;
  };

  const formaterVolume = (volume: number): string => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const calculerStatistiquesMarche = () => {
    if (actions.length === 0) return null;

    const hausses = actions.filter(a => a.variationPourcentage > 0).length;
    const baisses = actions.filter(a => a.variationPourcentage < 0).length;
    const stables = actions.filter(a => a.variationPourcentage === 0).length;
    
    const variationMoyenne = actions.reduce((acc, a) => acc + a.variationPourcentage, 0) / actions.length;
    const volumeTotal = actions.reduce((acc, a) => acc + a.volume, 0);
    const capitalisationTotale = actions.reduce((acc, a) => acc + a.capitalisation, 0);

    return {
      hausses,
      baisses,
      stables,
      variationMoyenne,
      volumeTotal,
      capitalisationTotale,
      totalActions: actions.length
    };
  };

  const creerDonneesGraphiqueVariations = () => {
    const stats = calculerStatistiquesMarche();
    if (!stats) return null;

    return {
      labels: ['Hausses', 'Baisses', 'Stables'],
      datasets: [
        {
          data: [stats.hausses, stats.baisses, stats.stables],
          backgroundColor: ['#4caf50', '#f44336', '#9e9e9e'],
          borderWidth: 0
        }
      ]
    };
  };

  const creerDonneesGraphiqueSecteurs = () => {
    const secteurs = new Map<string, number>();
    
    actions.forEach(action => {
      const secteur = action.secteur;
      secteurs.set(secteur, (secteurs.get(secteur) || 0) + 1);
    });

    const couleurs = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
      '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
    ];

    return {
      labels: Array.from(secteurs.keys()),
      datasets: [
        {
          data: Array.from(secteurs.values()),
          backgroundColor: couleurs.slice(0, secteurs.size),
          borderWidth: 0
        }
      ]
    };
  };

  const creerDonneesGraphiquePerformance = () => {
    const actionsTriees = [...actions]
      .sort((a, b) => b.variationPourcentage - a.variationPourcentage)
      .slice(0, 10);

    return {
      labels: actionsTriees.map(a => a.symbole),
      datasets: [
        {
          label: 'Variation (%)',
          data: actionsTriees.map(a => a.variationPourcentage),
          backgroundColor: actionsTriees.map(a => 
            a.variationPourcentage > 0 ? '#4caf50' : '#f44336'
          ),
          borderWidth: 0
        }
      ]
    };
  };

  const stats = calculerStatistiquesMarche();

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
      {/* En-tête avec statistiques globales */}
      <Box sx={{ mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="bold">
            Tableau de Bord BRVM
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" color="text.secondary">
              Dernière MAJ: {derniereMAJ.toLocaleTimeString('fr-FR')}
            </Typography>
            <Tooltip title="Actualiser les données">
              <IconButton onClick={chargerDonnees} size="small">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {stats && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {stats.totalActions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Actions cotées
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#4caf50' }}>
                    {formaterVariation(stats.variationMoyenne)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Variation moyenne
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {formaterVolume(stats.volumeTotal)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Volume total
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {new Intl.NumberFormat('fr-FR', {
                      notation: 'compact',
                      maximumFractionDigits: 1
                    }).format(stats.capitalisationTotale)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Capitalisation totale
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Actions les plus actives */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actions les plus actives
              </Typography>
              <Box>
                {actionsPlusActives.map((action, index) => (
                  <Box key={action.symbole} display="flex" alignItems="center" justifyContent="space-between" py={1}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="body2" fontWeight="bold">
                        {index + 1}.
                      </Typography>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {action.symbole}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {action.nom}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="body2">
                        {formaterPrix(action.dernierPrix)}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        {obtenirIconeVariation(action.variationPourcentage)}
                        <Typography
                          variant="body2"
                          sx={{ color: obtenirCouleurVariation(action.variationPourcentage) }}
                        >
                          {formaterVariation(action.variationPourcentage)}
                        </Typography>
                      </Box>
                      {onActionSelect && (
                        <Tooltip title="Voir l'analyse">
                          <IconButton
                            size="small"
                            onClick={() => onActionSelect(action)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Graphique des variations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Répartition des variations
              </Typography>
              <Box height={200}>
                <Doughnut
                  data={creerDonneesGraphiqueVariations() || { labels: [], datasets: [] }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions en forte hausse */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#4caf50' }}>
                🚀 Actions en forte hausse
              </Typography>
              <Box>
                {actionsPlusFortesHausses.map((action, index) => (
                  <Box key={action.symbole} display="flex" alignItems="center" justifyContent="space-between" py={1}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="body2" fontWeight="bold">
                        {index + 1}.
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {action.symbole}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="body2">
                        {formaterPrix(action.dernierPrix)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#4caf50' }}>
                        +{action.variationPourcentage.toFixed(2)}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions en forte baisse */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#f44336' }}>
                📉 Actions en forte baisse
              </Typography>
              <Box>
                {actionsPlusFortesBaisses.map((action, index) => (
                  <Box key={action.symbole} display="flex" alignItems="center" justifyContent="space-between" py={1}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="body2" fontWeight="bold">
                        {index + 1}.
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {action.symbole}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="body2">
                        {formaterPrix(action.dernierPrix)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#f44336' }}>
                        {action.variationPourcentage.toFixed(2)}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Graphique des secteurs */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Répartition par secteur
              </Typography>
              <Box height={200}>
                <Doughnut
                  data={creerDonneesGraphiqueSecteurs() || { labels: [], datasets: [] }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Graphique de performance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top 10 des performances
              </Typography>
              <Box height={200}>
                <Bar
                  data={creerDonneesGraphiquePerformance() || { labels: [], datasets: [] }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardAmeliore; 