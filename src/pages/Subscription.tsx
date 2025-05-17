import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Subscription: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedPayment, setSelectedPayment] = useState('');

  const plans = [
    {
      id: 'monthly',
      title: 'Abonnement Mensuel',
      price: '10 000 FCFA',
      features: [
        'Accès à toutes les analyses',
        'Recommandations mensuelles',
        'Alertes en temps réel',
        'Support par email',
      ],
    },
    {
      id: 'yearly',
      title: 'Abonnement Annuel',
      price: '100 000 FCFA',
      features: [
        'Accès à toutes les analyses',
        'Recommandations mensuelles',
        'Alertes en temps réel',
        'Support prioritaire',
        'Économisez 20 000 FCFA',
      ],
    },
  ];

  const paymentMethods = [
    { id: 'tmoney', label: 'TMoney' },
    { id: 'moov', label: 'Moov Money' },
    { id: 'orange', label: 'Orange Money' },
    { id: 'wave', label: 'Wave' },
    { id: 'djamo', label: 'Djamo' },
  ];

  const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(event.target.value);
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };

  const handleSubscribe = () => {
    // TODO: Implémenter la logique d'abonnement
    console.log('Plan sélectionné:', selectedPlan);
    console.log('Méthode de paiement:', selectedPayment);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 3, md: 4 }, mb: { xs: 4, sm: 5, md: 6 } }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ 
          mb: { xs: 2, sm: 3, md: 4 },
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          fontWeight: 600,
        }}
      >
        Choisissez votre abonnement
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
          gap: { xs: 2, sm: 3, md: 3 },
          mt: { xs: 1, sm: 2 },
          mb: { xs: 3, sm: 4 }
        }}
      >
        {plans.map((plan) => (
          <Box 
            key={plan.id} 
            sx={{ 
              width: { xs: '100%', md: '50%' },
              flexGrow: { md: 1 },
              flexBasis: { md: 0 }
            }}
          >
            <Card
              sx={{
                height: '100%',
                border: selectedPlan === plan.id ? '2px solid #00C6AE' : '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
                transform: selectedPlan === plan.id ? 'translateY(-4px)' : 'none',
                boxShadow: selectedPlan === plan.id 
                  ? '0 8px 30px rgba(0, 198, 174, 0.15)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <FormLabel 
                      component="legend" 
                      sx={{ 
                        '&.Mui-focused': { color: 'text.primary' } 
                      }}
                    >
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '1.25rem', sm: '1.5rem' } 
                        }}
                      >
                        {plan.title}
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      value={selectedPlan}
                      onChange={handlePlanChange}
                    >
                      <FormControlLabel
                        value={plan.id}
                        control={<Radio color="primary" />}
                        label=""
                      />
                    </RadioGroup>
                  </Box>
                  <Typography 
                    variant="h4" 
                    color="primary" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 700,
                      mb: 3,
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
                    }}
                  >
                    {plan.price}
                  </Typography>
                </FormControl>

                <List sx={{ mt: 1 }}>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: { xs: 0, sm: 1 }, py: { xs: 0.5, sm: 1 } }}>
                      <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
                        <CheckCircleIcon color="primary" fontSize={isMobile ? "small" : "medium"} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature} 
                        primaryTypographyProps={{
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Card sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' } 
            }}
          >
            Méthode de paiement
          </Typography>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              value={selectedPayment}
              onChange={handlePaymentChange}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: { xs: 1, sm: 2 }
                }}
              >
                {paymentMethods.map((method) => (
                  <Box 
                    key={method.id} 
                    sx={{ 
                      width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.33% - 11px)' }
                    }}
                  >
                    <Card 
                      sx={{ 
                        p: { xs: 1, sm: 1.5 },
                        border: selectedPayment === method.id ? '1px solid #00C6AE' : '1px solid rgba(255, 255, 255, 0.05)',
                        bgcolor: selectedPayment === method.id ? 'rgba(0, 198, 174, 0.05)' : 'transparent',
                      }}
                    >
                      <FormControlLabel
                        value={method.id}
                        control={<Radio color="primary" />}
                        label={method.label}
                        sx={{ 
                          m: 0,
                          width: '100%',
                          '& .MuiFormControlLabel-label': { 
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            fontWeight: selectedPayment === method.id ? 600 : 400
                          }
                        }}
                      />
                    </Card>
                  </Box>
                ))}
              </Box>
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: { xs: 3, sm: 4 }, textAlign: 'center' }}>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              onClick={handleSubscribe}
              disabled={!selectedPlan || !selectedPayment}
              sx={{ 
                px: { xs: 3, sm: 4, md: 6 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' }
              }}
            >
              S'abonner maintenant
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Subscription; 