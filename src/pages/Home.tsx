import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const features = [
    {
      title: 'Analyses en temps réel',
      description: 'Accédez à des analyses techniques et fondamentales détaillées des actions BRVM',
      icon: <CandlestickChartIcon fontSize={isMobile ? "medium" : "large"} sx={{ color: '#00C6AE' }} />,
    },
    {
      title: 'Recommandations mensuelles',
      description: 'Recevez des recommandations d\'achat/vente basées sur des analyses approfondies',
      icon: <AutoGraphIcon fontSize={isMobile ? "medium" : "large"} sx={{ color: '#2D8CFF' }} />,
    },
    {
      title: 'Alertes personnalisées',
      description: 'Soyez notifié dès qu\'une action atteint vos seuils de prix',
      icon: <NotificationsActiveIcon fontSize={isMobile ? "medium" : "large"} sx={{ color: '#F95738' }} />,
    },
  ];

  return (
    <Box sx={{ pb: { xs: 4, sm: 6, md: 8 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 6, sm: 8, md: 12 },
          px: { xs: 2, sm: 3, md: 4 },
          textAlign: 'center',
          width: '100%',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(0, 198, 174, 0.15) 0%, transparent 30%)',
            zIndex: -1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 60%, rgba(45, 140, 255, 0.1) 0%, transparent 40%)',
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, sm: 4, md: 5 } }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' },
              lineHeight: { xs: 1.2, sm: 1.2, md: 1.1 },
              background: 'linear-gradient(to right, #00C6AE, #2D8CFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: { xs: 2, sm: 2.5, md: 3 }
            }}
          >
            BRVM Analyse : Votre allié pour investir intelligemment
          </Typography>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            sx={{ 
              color: '#A0AEC0',
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              maxWidth: '800px',
              mx: 'auto',
              mb: { xs: 3, sm: 3.5, md: 4 }
            }}
          >
            Prenez une longueur d'avance sur la BRVM. Découvrez des analyses financières puissantes, des alertes personnalisées et des recommandations exclusives. Commencez gratuitement dès aujourd'hui !
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            sx={{ 
              py: { xs: 1, sm: 1.25, md: 1.5 },
              px: { xs: 3, sm: 3.5, md: 4 },
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              boxShadow: '0 4px 14px 0 rgba(0, 198, 174, 0.5)',
              '&:hover': {
                boxShadow: '0 6px 20px 0 rgba(0, 198, 174, 0.7)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Commencer gratuitement
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth={false} sx={{ py: { xs: 4, sm: 5, md: 10 }, width: '100%', px: { xs: 2, sm: 4, md: 5 } }}>
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ 
            mb: { xs: 3, sm: 4, md: 6 },
            fontWeight: 600,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
          }}
        >
          Fonctionnalités Principales
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            gap: { xs: 2, sm: 3, md: 4 },
            justifyContent: 'center'
          }}
        >
          {features.map((feature) => (
            <Box 
              key={feature.title} 
              sx={{ 
                width: { xs: '100%', sm: 'calc(50% - 16px)', md: '30%' },
                minWidth: { sm: '280px', md: '280px' },
                flex: { sm: '1 1 280px' },
                maxWidth: { sm: '100%', md: '380px' }
              }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'rgba(35, 39, 47, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    border: '1px solid rgba(0, 198, 174, 0.2)',
                  },
                }}
              >
                <CardContent sx={{ 
                  p: { xs: 2.5, sm: 3, md: 4 }, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center' 
                }}>
                  <Box sx={{ mb: { xs: 2, md: 3 } }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600, 
                      mb: { xs: 1, md: 2 },
                      fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.5rem' }
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' } 
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Pricing Section */}
      <Box sx={{ py: { xs: 4, sm: 5, md: 10 } }}>
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: { xs: 3, sm: 4, md: 6 },
              fontWeight: 600,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
            }}
          >
            Tarifs simples et transparents
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: 'wrap',
              gap: { xs: 2, sm: 3, md: 4 },
              justifyContent: 'center'
            }}
          >
            <Box 
              sx={{ 
                width: { xs: '100%', sm: 'calc(50% - 16px)', md: '45%' },
                minWidth: { sm: '280px', md: '280px' },
                flex: { sm: '1 1 280px' },
                maxWidth: { sm: '100%', md: '380px' }
              }}
            >
              <Card
                sx={{ 
                  background: 'rgba(35, 39, 47, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    border: '1px solid rgba(0, 198, 174, 0.2)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 }, textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } 
                    }}
                  >
                    Mensuel
                  </Typography>
                  <Typography 
                    variant="h3" 
                    component="div" 
                    color="primary" 
                    gutterBottom
                    sx={{ 
                      my: { xs: 2, md: 3 },
                      fontWeight: 700,
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                    }}
                  >
                    10 000 FCFA
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    paragraph 
                    sx={{ 
                      mb: { xs: 3, md: 4 },
                      fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' }
                    }}
                  >
                    Accès à toutes les fonctionnalités
                  </Typography>
                  <Button
                    component={Link}
                    to="/subscription"
                    variant="outlined"
                    size={isMobile ? "medium" : "large"}
                    sx={{ 
                      width: '100%',
                      py: { xs: 0.75, sm: 1, md: 1.5 }
                    }}
                  >
                    Choisir
                  </Button>
                </CardContent>
              </Card>
            </Box>

            <Box 
              sx={{ 
                width: { xs: '100%', sm: 'calc(50% - 16px)', md: '45%' },
                minWidth: { sm: '280px', md: '280px' },
                flex: { sm: '1 1 280px' },
                maxWidth: { sm: '100%', md: '380px' }
              }}
            >
              <Card
                sx={{ 
                  background: 'rgba(45, 140, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(45, 140, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    border: '1px solid rgba(45, 140, 255, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 }, textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                    }}
                  >
                    Annuel
                  </Typography>
                  <Typography 
                    variant="h3" 
                    component="div" 
                    color="secondary" 
                    gutterBottom
                    sx={{ 
                      my: { xs: 2, md: 3 },
                      fontWeight: 700,
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                    }}
                  >
                    100 000 FCFA
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    paragraph 
                    sx={{ 
                      mb: { xs: 3, md: 4 },
                      fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' }
                    }}
                  >
                    Économisez 20% avec l'abonnement annuel
                  </Typography>
                  <Button
                    component={Link}
                    to="/subscription"
                    variant="contained"
                    color="secondary"
                    size={isMobile ? "medium" : "large"}
                    sx={{ 
                      width: '100%',
                      py: { xs: 0.75, sm: 1, md: 1.5 }
                    }}
                  >
                    Choisir
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Info Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center'
          }}
        >
          <Box 
            sx={{ 
              width: { xs: '100%', md: '45%' },
              minWidth: { xs: '100%', sm: '280px', md: '280px' },
              flex: '1 1 280px',
              maxWidth: '500px'
            }}
          >
            <Card
              sx={{ 
                background: 'rgba(35, 39, 47, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Pourquoi choisir MODERANT BRVM ?
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: '#A0AEC0', mb: 4 }}>
                  Notre plateforme offre des analyses approfondies et des recommandations
                  personnalisées pour vous aider à prendre les meilleures décisions
                  d'investissement sur le marché BRVM.
                </Typography>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    boxShadow: '0 4px 14px 0 rgba(0, 198, 174, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 20px 0 rgba(0, 198, 174, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Commencer maintenant
                </Button>
              </CardContent>
            </Card>
          </Box>

          <Box 
            sx={{ 
              width: { xs: '100%', md: '45%' },
              minWidth: { xs: '100%', sm: '280px', md: '280px' },
              flex: '1 1 280px',
              maxWidth: '500px'
            }}
          >
            <Card
              sx={{ 
                background: 'rgba(35, 39, 47, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Nos services
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#00C6AE' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Analyses techniques détaillées" 
                      primaryTypographyProps={{ 
                        sx: { 
                          color: '#FFFFFF',
                          fontWeight: 500
                        } 
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#00C6AE' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Recommandations personnalisées" 
                      primaryTypographyProps={{ 
                        sx: { 
                          color: '#FFFFFF',
                          fontWeight: 500
                        } 
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#00C6AE' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Alertes en temps réel" 
                      primaryTypographyProps={{ 
                        sx: { 
                          color: '#FFFFFF',
                          fontWeight: 500
                        } 
                      }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 