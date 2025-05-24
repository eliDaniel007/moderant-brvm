import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const serviceList = [
  { label: 'Analyse technique', path: '/services/technique' },
  { label: 'Analyse fondamentale', path: '/services/fondamentale' },
  { label: 'Alertes personnalisées', path: '/services/alertes' },
  { label: 'Recommandations', path: '/services/recommandations' },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [servicesAnchor, setServicesAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleServicesOpen = (event: React.MouseEvent<HTMLElement>) => {
    setServicesAnchor(event.currentTarget);
  };
  const handleServicesClose = () => {
    setServicesAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(24, 26, 32, 0.85)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        px: { xs: 1, sm: 4 },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
        {/* Titre à gauche */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#00C6AE', fontWeight: 700, letterSpacing: 1 }}>
            BRVM Analyse
          </Typography>
        </Box>

        {/* Liens centraux ou menu mobile */}
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleServicesOpen}>Services</MenuItem>
              <Menu
                anchorEl={servicesAnchor}
                open={Boolean(servicesAnchor)}
                onClose={handleServicesClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {serviceList.map((service) => (
                  <MenuItem key={service.label} component={RouterLink} to={service.path} onClick={handleServicesClose}>
                    {service.label}
                  </MenuItem>
                ))}
              </Menu>
              <MenuItem component={RouterLink} to="/dashboard" onClick={handleMenuClose}>
                Tableau de bord
              </MenuItem>
              <MenuItem component={RouterLink} to="/messages" onClick={handleMenuClose}>
                Messages
              </MenuItem>
              <MenuItem component={RouterLink} to="/login" onClick={handleMenuClose}>
                Connexion
              </MenuItem>
              <MenuItem component={RouterLink} to="/register" onClick={handleMenuClose}>
                <Button variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, fontWeight: 700 }}>
                  Commencer gratuitement
                </Button>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              color="inherit"
              sx={{ fontWeight: 600, fontSize: '1rem', letterSpacing: 0.5 }}
              onClick={handleServicesOpen}
            >
              Services
            </Button>
            <Menu
              anchorEl={servicesAnchor}
              open={Boolean(servicesAnchor)}
              onClose={handleServicesClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {serviceList.map((service) => (
                <MenuItem key={service.label} component={RouterLink} to={service.path} onClick={handleServicesClose}>
                  {service.label}
                </MenuItem>
              ))}
            </Menu>
            <Button
              component={RouterLink}
              to="/dashboard"
              color="inherit"
              sx={{ fontWeight: 600, fontSize: '1rem', letterSpacing: 0.5 }}
            >
              Tableau de bord
            </Button>
            <Button
              component={RouterLink}
              to="/messages"
              color="inherit"
              sx={{ fontWeight: 600, fontSize: '1rem', letterSpacing: 0.5 }}
            >
              Messages
            </Button>
          </Box>
        )}

        {/* Actions à droite */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              sx={{ fontWeight: 600, fontSize: '1rem' }}
            >
              Connexion
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, fontWeight: 700, px: 3 }}
            >
              Commencer gratuitement
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 