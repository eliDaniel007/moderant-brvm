import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Produits',
      links: [
        { name: 'Analyses', path: '/analysis' },
        { name: 'Abonnements', path: '/subscription' },
        { name: 'API', path: '/api' },
        { name: 'Portefeuille', path: '/dashboard' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { name: 'Documentation', path: '/docs' },
        { name: 'Blog', path: '/blog' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Support', path: '/support' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { name: 'À propos', path: '/about' },
        { name: 'Carrières', path: '/careers' },
        { name: 'Contact', path: '/contact' },
        { name: 'Mentions légales', path: '/legal' },
      ],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'rgba(24, 26, 32, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        py: 6,
        mt: 'auto',
        width: '100%',
      }}
    >
      <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, sm: 4, md: 5 } }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, px: 2, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  background: 'linear-gradient(to right, #00C6AE, #2D8CFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                MODERANT BRVM
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '300px' }}>
                Plateforme d'analyse et de suivi des marchés financiers pour la Bourse Régionale des Valeurs Mobilières.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" sx={{ color: '#2D8CFF' }}>
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: '#2D8CFF' }}>
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: '#2D8CFF' }}>
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: '#2D8CFF' }}>
                  <TelegramIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {footerLinks.map((section) => (
            <Box 
              key={section.title}
              sx={{ 
                width: { xs: '50%', sm: '33.33%', md: '22%' }, 
                px: 2, 
                mb: 4 
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: '#00C6AE',
                        },
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.05)' }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            © {currentYear} MODERANT BRVM. Tous droits réservés.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              sx={{ 
                color: 'text.secondary', 
                textDecoration: 'none', 
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#00C6AE',
                } 
              }}
            >
              Confidentialité
            </Link>
            <Link 
              component={RouterLink} 
              to="/terms" 
              sx={{ 
                color: 'text.secondary', 
                textDecoration: 'none', 
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#00C6AE',
                } 
              }}
            >
              Conditions d'utilisation
            </Link>
            <Link 
              component={RouterLink} 
              to="/cookies" 
              sx={{ 
                color: 'text.secondary', 
                textDecoration: 'none', 
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#00C6AE',
                } 
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 