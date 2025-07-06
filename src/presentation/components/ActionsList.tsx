import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Container } from '../../infrastructure/container/Container';
import { RecupererActionsUseCase } from '../../domain/usecases/RecupererActionsUseCase';
import { Action } from '../../domain/entities/Action';

interface ActionsListProps {
  onActionSelect?: (action: Action) => void;
}

const ActionsList: React.FC<ActionsListProps> = ({ onActionSelect }) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    chargerActions();
  }, []);

  const chargerActions = async () => {
    try {
      setChargement(true);
      setErreur(null);
      
      const container = Container.getInstance();
      const recupererActionsUseCase = container.getRecupererActionsUseCase();
      
      const actionsRecuperees = await recupererActionsUseCase.executer();
      setActions(actionsRecuperees);
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

  const formaterCapitalisation = (capitalisation: number): string => {
    if (capitalisation >= 1000000000) {
      return `${(capitalisation / 1000000000).toFixed(1)}Md`;
    }
    if (capitalisation >= 1000000) {
      return `${(capitalisation / 1000000).toFixed(1)}M`;
    }
    return formaterPrix(capitalisation);
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
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Actions BRVM
        </Typography>
        
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbole</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell align="right">Dernier Prix</TableCell>
                <TableCell align="right">Variation</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Capitalisation</TableCell>
                <TableCell>Secteur</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actions.map((action) => (
                <TableRow key={action.symbole} hover>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {action.symbole}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {action.nom}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="bold">
                      {formaterPrix(action.dernierPrix)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                      {obtenirIconeVariation(action.variationPourcentage)}
                      <Typography
                        variant="body2"
                        sx={{ color: obtenirCouleurVariation(action.variationPourcentage) }}
                      >
                        {formaterVariation(action.variationPourcentage)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {formaterVolume(action.volume)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {formaterCapitalisation(action.capitalisation)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={action.secteur}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {onActionSelect && (
                      <Tooltip title="Voir l'analyse">
                        <IconButton
                          size="small"
                          onClick={() => onActionSelect(action)}
                          sx={{ color: 'primary.main' }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ActionsList; 