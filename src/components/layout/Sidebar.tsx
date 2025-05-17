import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Menu, MenuItem, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [socialAnchorEl, setSocialAnchorEl] = useState<null | HTMLElement>(null);
  const socialOpen = Boolean(socialAnchorEl);

  const handleSocialClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: 80,
        bgcolor: '#181A20',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        zIndex: 1200,
        boxShadow: '2px 0 16px 0 rgba(0,0,0,0.4)',
      }}
    >
      <Box sx={{ mb: 6 }}>
        <img src="/logo192.png" alt="Logo" style={{ width: 40, height: 40 }} />
      </Box>
      <Tooltip title="Accueil" placement="right">
        <IconButton component={Link} to="/" sx={{ color: '#2D8CFF', mb: 4 }}>
          <HomeIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Tableau de bord" placement="right">
        <IconButton component={Link} to="/dashboard" sx={{ color: '#00C6AE', mb: 4 }}>
          <DashboardIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Messages" placement="right">
        <IconButton component={Link} to="/messages" sx={{ color: '#2D8CFF', mb: 4 }}>
          <MailIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      
      {/* Nouveau bouton pour les réseaux sociaux */}
      <Tooltip title="Réseaux Sociaux" placement="right">
        <IconButton 
          onClick={handleSocialClick}
          sx={{ 
            color: '#00C6AE', 
            mb: 4,
            position: 'relative',
            '&:hover': {
              backgroundColor: 'rgba(0, 198, 174, 0.1)',
            }
          }}
        >
          <ShareIcon fontSize="large" />
        </IconButton>
      </Tooltip>
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
      
      <Tooltip title="Connexion" placement="right">
        <IconButton component={Link} to="/login" sx={{ color: '#00C6AE', mb: 4 }}>
          <LoginIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Profil" placement="right">
        <IconButton component={Link} to="/profile" sx={{ color: '#A0AEC0', mt: 'auto' }}>
          <PersonIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Sidebar; 