import React, { useState } from 'react';
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import DashboardAmeliore from '../presentation/components/DashboardAmeliore';
import ActionsList from '../presentation/components/ActionsList';
import AnalyseTechniqueDetaillee from '../presentation/components/AnalyseTechniqueDetaillee';
import { Action } from '../domain/entities/Action';

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

const DashboardAmeliorePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [actionSelectionnee, setActionSelectionnee] = useState<Action | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleActionSelect = (action: Action) => {
    setActionSelectionnee(action);
    // Ici vous pouvez naviguer vers la page d'analyse ou ouvrir un modal
    console.log('Action sélectionnée:', action);
  };

  const handleActionSelectFromList = (action: Action) => {
    setActionSelectionnee(action);
    // Naviguer vers l'onglet d'analyse ou ouvrir un modal
    setTabValue(2); // Basculer vers l'onglet d'analyse technique
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          MODERANT BRVM
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Plateforme d'analyse et de trading pour la Bourse Régionale des Valeurs Mobilières
        </Typography>
      </Box>

      {/* Onglets principaux */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
        >
          <Tab label="Tableau de Bord" />
          <Tab label="Liste des Actions" />
          <Tab label="Analyse Technique" />
          <Tab label="Portefeuille" />
        </Tabs>
      </Box>

      {/* Contenu des onglets */}
      <TabPanel value={tabValue} index={0}>
        <DashboardAmeliore onActionSelect={handleActionSelect} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ActionsList onActionSelect={handleActionSelectFromList} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {actionSelectionnee ? (
          <AnalyseTechniqueDetaillee action={actionSelectionnee} />
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Analyse Technique
              </Typography>
              <Alert severity="info">
                Sélectionnez une action depuis le tableau de bord ou la liste des actions pour voir son analyse technique détaillée.
              </Alert>
            </CardContent>
          </Card>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Mon Portefeuille
            </Typography>
            <Alert severity="info">
              La gestion du portefeuille sera implémentée dans la prochaine étape.
            </Alert>
          </CardContent>
        </Card>
      </TabPanel>
    </Container>
  );
};

export default DashboardAmeliorePage; 