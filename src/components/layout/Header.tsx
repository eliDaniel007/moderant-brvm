import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  alpha,
  useMediaQuery,
  useTheme,
  Link as MuiLink,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [socialAnchorEl, setSocialAnchorEl] = useState<null | HTMLElement>(null);
  
  const socialOpen = Boolean(socialAnchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSocialClick = (event: React.MouseEvent<HTMLElement>) => {
    setSocialAnchorEl(event.currentTarget);
  };

  const handleSocialClose = () => {
    setSocialAnchorEl(null);
  };

  const handleSocialRedirect = (platform: string) => {
    // Fermer le menu
    handleSocialClose();
    
    // Naviguer vers le tableau de bord
    navigate('/dashboard');
    
    // Ici, vous pourriez ajouter une logique pour passer des paramètres
    // ou activer un état spécifique dans le tableau de bord si nécessaire
    console.log(`Redirection vers ${platform}`);
  };

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/subscription' },
    { name: 'Nous rejoindre', path: '/register' },
    { name: 'Réseaux', path: '#', isDropdown: true },
  ];

  const renderSearch = () => (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '12px',
        backgroundColor: alpha(theme.palette.common.white, 0.08),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.12),
        },
        marginLeft: 2,
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconButton sx={{ p: '10px', color: '#A0AEC0' }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Rechercher..."
        inputProps={{ 'aria-label': 'search' }}
        sx={{
          color: 'inherit',
          '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            width: '100%',
          },
        }}
      />
    </Box>
  );

  const mobileSearch = searchOpen && (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: theme.palette.background.default,
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <InputBase
          autoFocus
          fullWidth
          placeholder="Rechercher..."
          sx={{ color: 'white', fontSize: '1.2rem' }}
        />
        <IconButton onClick={() => setSearchOpen(false)} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      {mobileSearch}
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: 'none',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(24, 26, 32, 0.8)',
          boxShadow: 'none',
          zIndex: 1100,
          marginLeft: !isMobile ? '80px' : 0,
          width: !isMobile ? 'calc(100% - 80px)' : '100%',
          right: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 }, width: '100%' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="start"
              onClick={handleMenu}
              sx={{ mr: 2, color: '#A0AEC0' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                item.isDropdown ? (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      onClick={handleSocialClick}
                      sx={{
                        color: socialOpen ? '#FFFFFF' : '#A0AEC0',
                        mx: 2,
                        pb: 0.5,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: socialOpen ? '2px solid #00C6AE' : 'none',
                        '&:hover': {
                          color: '#FFFFFF',
                          borderBottom: '2px solid #00C6AE',
                        },
                      }}
                    >
                      {item.name}
                      {socialOpen ? <ExpandLessIcon sx={{ ml: 0.5 }} /> : <ExpandMoreIcon sx={{ ml: 0.5 }} />}
                    </Box>
                    <Menu
                      anchorEl={socialAnchorEl}
                      open={socialOpen}
                      onClose={handleSocialClose}
                      sx={{
                        '& .MuiPaper-root': {
                          bgcolor: '#23272F',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                          minWidth: '180px',
                          mt: 1,
                        }
                      }}
                    >
                      <MenuItem onClick={() => handleSocialRedirect('facebook')} sx={{ py: 1.5 }}>
                        <FacebookIcon sx={{ mr: 2, color: '#1877F2' }} />
                        <Typography>Facebook</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => handleSocialRedirect('twitter')} sx={{ py: 1.5 }}>
                        <TwitterIcon sx={{ mr: 2, color: '#1DA1F2' }} />
                        <Typography>Twitter</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => handleSocialRedirect('linkedin')} sx={{ py: 1.5 }}>
                        <LinkedInIcon sx={{ mr: 2, color: '#0A66C2' }} />
                        <Typography>LinkedIn</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => handleSocialRedirect('instagram')} sx={{ py: 1.5 }}>
                        <InstagramIcon sx={{ mr: 2, color: '#E4405F' }} />
                        <Typography>Instagram</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <MuiLink
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: '#A0AEC0',
                      textDecoration: 'none',
                      mx: 2,
                      pb: 0.5,
                      borderBottom: item.path === '/' ? '2px solid #00C6AE' : 'none',
                      '&:hover': {
                        color: '#FFFFFF',
                        borderBottom: '2px solid #00C6AE',
                      },
                    }}
                  >
                    {item.name}
                  </MuiLink>
                )
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && renderSearch()}
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={() => setSearchOpen(true)}
                sx={{ color: '#A0AEC0' }}
              >
                <SearchIcon />
              </IconButton>
            )}
            <IconButton sx={{ ml: 1, color: '#A0AEC0' }}>
              <NotificationsIcon />
            </IconButton>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              color="primary"
              sx={{
                ml: 2,
                px: 3,
                py: 1,
                borderRadius: '12px',
                '&:hover': {
                  boxShadow: '0 4px 14px 0 rgba(0, 198, 174, 0.3)',
                },
              }}
            >
              Se connecter
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              sx={{
                ml: 2,
                px: 3,
                py: 1,
                borderRadius: '12px',
                boxShadow: '0 4px 14px 0 rgba(0, 198, 174, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 20px 0 rgba(0, 198, 174, 0.5)',
                },
              }}
            >
              S'inscrire
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#23272F',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        {navItems.map((item) => (
          item.isDropdown ? (
            <MenuItem
              key={item.name}
              onClick={handleSocialClick}
              sx={{
                color: '#A0AEC0',
                '&:hover': {
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(0, 198, 174, 0.08)',
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {item.name}
              <ExpandMoreIcon fontSize="small" />
            </MenuItem>
          ) : (
            <MenuItem
              key={item.name}
              onClick={handleClose}
              component={RouterLink}
              to={item.path}
              sx={{
                color: '#A0AEC0',
                '&:hover': {
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(0, 198, 174, 0.08)',
                },
              }}
            >
              {item.name}
            </MenuItem>
          )
        ))}
        
        {/* Sous-menu pour les réseaux sociaux dans le menu mobile */}
        {Boolean(anchorEl) && socialOpen && (
          <Box sx={{ pl: 2 }}>
            <MenuItem onClick={() => handleSocialRedirect('facebook')} sx={{ color: '#1877F2' }}>
              <FacebookIcon sx={{ mr: 1 }} /> Facebook
            </MenuItem>
            <MenuItem onClick={() => handleSocialRedirect('twitter')} sx={{ color: '#1DA1F2' }}>
              <TwitterIcon sx={{ mr: 1 }} /> Twitter
            </MenuItem>
            <MenuItem onClick={() => handleSocialRedirect('linkedin')} sx={{ color: '#0A66C2' }}>
              <LinkedInIcon sx={{ mr: 1 }} /> LinkedIn
            </MenuItem>
            <MenuItem onClick={() => handleSocialRedirect('instagram')} sx={{ color: '#E4405F' }}>
              <InstagramIcon sx={{ mr: 1 }} /> Instagram
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default Header; 