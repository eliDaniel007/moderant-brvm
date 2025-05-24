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

const navLinks = [
  { label: 'Services', path: '/subscription' },
  { label: 'Tableau de bord', path: '/dashboard' },
  { label: 'Messages', path: '/messages' },
  { label: 'Tarification', path: '/subscription' },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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
        {/* Logo à gauche */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/logo192.png" alt="Logo" style={{ height: 40, marginRight: 12 }} />
            <Typography variant="h6" sx={{ color: '#00C6AE', fontWeight: 700, letterSpacing: 1 }}>
              Moderant
            </Typography>
          </RouterLink>
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
              {navLinks.map((link) => (
                <MenuItem key={link.label} component={RouterLink} to={link.path} onClick={handleMenuClose}>
                  {link.label}
                </MenuItem>
              ))}
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
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={RouterLink}
                to={link.path}
                color="inherit"
                sx={{ fontWeight: 600, fontSize: '1rem', letterSpacing: 0.5 }}
              >
                {link.label}
              </Button>
            ))}
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