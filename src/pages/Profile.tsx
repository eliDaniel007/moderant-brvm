import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Tab,
  Tabs,
  Switch,
  FormControlLabel,
  IconButton,
  Card,
  CardContent,
  Alert,
  useTheme,
  InputAdornment,
  Badge,
  Chip,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Données utilisateur
  const [userData, setUserData] = useState({
    firstName: 'Thomas',
    lastName: 'Kouassi',
    email: 'thomas.kouassi@example.com',
    phoneNumber: '+225 07 0123 4567',
    avatar: '',
    notifications: {
      email: true,
      app: true,
      marketAlerts: true,
      newReports: true,
    },
    security: {
      twoFactorAuth: true,
      passwordLastChanged: '15/03/2023',
    },
    subscription: {
      plan: 'Premium',
      renewalDate: '15/07/2023',
      status: 'active',
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    setSuccessMessage('Vos informations ont été mises à jour avec succès');
    
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSavePassword = () => {
    // Logique pour changer le mot de passe
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setSuccessMessage('Votre mot de passe a été mis à jour avec succès');
    
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <Box sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 2, md: 3 }, width: '100%' }}>
      <Container maxWidth={false} sx={{ width: '100%' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            mb: { xs: 2, sm: 3, md: 4 }, 
            fontWeight: 600,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            background: 'linear-gradient(to right, #00C6AE, #2D8CFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Mon Profil
        </Typography>

        {successMessage && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3, 
              background: 'rgba(0, 198, 174, 0.15)', 
              color: '#00C6AE' 
            }}
          >
            {successMessage}
          </Alert>
        )}
        
        <Paper 
          sx={{ 
            background: 'rgba(35, 39, 47, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            overflow: 'hidden',
          }}
        >
          {/* En-tête avec avatar et informations de base */}
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              background: 'linear-gradient(135deg, rgba(0, 198, 174, 0.1) 0%, rgba(45, 140, 255, 0.1) 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton 
                  size="small" 
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <CameraAltIcon fontSize="small" />
                </IconButton>
              }
            >
              <Avatar
                src={userData.avatar}
                alt={`${userData.firstName} ${userData.lastName}`}
                sx={{
                  width: { xs: 100, md: 120 },
                  height: { xs: 100, md: 120 },
                  border: '4px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  fontSize: '3rem',
                  bgcolor: theme.palette.primary.main,
                }}
              >
                {userData.firstName[0] + userData.lastName[0]}
              </Avatar>
            </Badge>
            
            <Box 
              sx={{ 
                ml: { xs: 0, sm: 3 },
                mt: { xs: 2, sm: 0 },
                textAlign: { xs: 'center', sm: 'left' },
                flexGrow: 1,
              }}
            >
              <Typography variant="h5" component="h2" fontWeight={600}>
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                {userData.email}
              </Typography>
              <Box sx={{ display: 'flex', mt: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <Chip 
                  icon={<VerifiedUserIcon />} 
                  label={userData.subscription.plan}
                  color="primary"
                  sx={{ mr: 1 }}
                />
                <Chip 
                  icon={<CheckCircleIcon />} 
                  label="Vérifié"
                  color="success"
                  variant="outlined"
                />
              </Box>
            </Box>
            
            {!editing && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{ mt: { xs: 2, sm: 0 } }}
              >
                Modifier
              </Button>
            )}
          </Box>
          
          {/* Onglets de navigation */}
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <Tab 
              icon={<PersonIcon />} 
              label="Informations" 
              iconPosition="start"
              sx={{ 
                minHeight: 64,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
              }}
            />
            <Tab 
              icon={<NotificationsIcon />} 
              label="Préférences" 
              iconPosition="start"
              sx={{ 
                minHeight: 64,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
              }}
            />
            <Tab 
              icon={<SecurityIcon />} 
              label="Sécurité" 
              iconPosition="start"
              sx={{ 
                minHeight: 64,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
              }}
            />
            <Tab 
              icon={<SubscriptionsIcon />} 
              label="Abonnement" 
              iconPosition="start"
              sx={{ 
                minHeight: 64,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
              }}
            />
          </Tabs>
          
          {/* Contenu des onglets */}
          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {/* Onglet Informations */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Prénom"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    disabled={!editing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Nom"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    disabled={!editing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    disabled={!editing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Numéro de téléphone"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    disabled={!editing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                
                {editing && (
                  <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={handleCancel}
                      sx={{ mr: 2 }}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Enregistrer
                    </Button>
                  </Grid>
                )}
              </Grid>
            </TabPanel>
            
            {/* Onglet Préférences */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    Notifications
                  </Typography>
                  <Divider sx={{ mb: 2, opacity: 0.1 }} />
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={userData.notifications.email} 
                        onChange={handleNotificationChange}
                        name="email"
                        color="primary"
                      />
                    }
                    label="Recevoir des notifications par email"
                    sx={{ mb: 2, display: 'flex' }}
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={userData.notifications.app} 
                        onChange={handleNotificationChange}
                        name="app"
                        color="primary"
                      />
                    }
                    label="Recevoir des notifications dans l'application"
                    sx={{ mb: 2, display: 'flex' }}
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={userData.notifications.marketAlerts} 
                        onChange={handleNotificationChange}
                        name="marketAlerts"
                        color="primary"
                      />
                    }
                    label="Alertes de marché (changements de prix significatifs)"
                    sx={{ mb: 2, display: 'flex' }}
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={userData.notifications.newReports} 
                        onChange={handleNotificationChange}
                        name="newReports"
                        color="primary"
                      />
                    }
                    label="Nouveaux rapports et analyses"
                    sx={{ mb: 2, display: 'flex' }}
                  />
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }}
                    onClick={handleSave}
                  >
                    Enregistrer les préférences
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            
            {/* Onglet Sécurité */}
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>
                    Changer le mot de passe
                  </Typography>
                  <Divider sx={{ mb: 2, opacity: 0.1 }} />
                  
                  <TextField
                    label="Mot de passe actuel"
                    name="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                  
                  <TextField
                    label="Nouveau mot de passe"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                  
                  <TextField
                    label="Confirmer le nouveau mot de passe"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }}
                    onClick={handleSavePassword}
                    disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword || passwordData.newPassword !== passwordData.confirmPassword}
                  >
                    Mettre à jour le mot de passe
                  </Button>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>
                    Sécurité du compte
                  </Typography>
                  <Divider sx={{ mb: 2, opacity: 0.1 }} />
                  
                  <Card 
                    sx={{ 
                      background: 'rgba(35, 39, 47, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      mb: 2,
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={500}>
                            Authentification à deux facteurs
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {userData.security.twoFactorAuth ? 'Activée' : 'Désactivée'}
                          </Typography>
                        </Box>
                        <Switch 
                          checked={userData.security.twoFactorAuth} 
                          onChange={() => {
                            setUserData(prev => ({
                              ...prev,
                              security: {
                                ...prev.security,
                                twoFactorAuth: !prev.security.twoFactorAuth
                              }
                            }));
                          }}
                          color="primary"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    sx={{ 
                      background: 'rgba(35, 39, 47, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={500}>
                            Dernier changement de mot de passe
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {userData.security.passwordLastChanged}
                          </Typography>
                        </Box>
                        <ChevronRightIcon color="action" />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            
            {/* Onglet Abonnement */}
            <TabPanel value={tabValue} index={3}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 2
                  }}>
                    <Typography variant="h6">
                      Informations d'abonnement
                    </Typography>
                    <Chip 
                      label={userData.subscription.status === 'active' ? 'Actif' : 'Inactif'} 
                      color={userData.subscription.status === 'active' ? 'success' : 'default'}
                    />
                  </Box>
                  <Divider sx={{ mb: 3, opacity: 0.1 }} />
                  
                  <Card 
                    sx={{ 
                      background: 'linear-gradient(135deg, rgba(0, 198, 174, 0.15) 0%, rgba(45, 140, 255, 0.15) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      mb: 3,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" gutterBottom fontWeight={600}>
                        Plan {userData.subscription.plan}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Accès complet à toutes les analyses et fonctionnalités premium
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <CheckCircleIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">Analyses techniques avancées</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <CheckCircleIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">Alertes personnalisées illimitées</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <CheckCircleIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">Rapports exclusifs mensuels</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">Support prioritaire</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Prochain renouvellement
                    </Typography>
                    <Typography variant="body1">
                      {userData.subscription.renewalDate}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Mode de paiement
                    </Typography>
                    <Typography variant="body1">
                      **** **** **** 4242
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                    >
                      Changer de plan
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="inherit"
                    >
                      Mettre à jour le paiement
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile; 