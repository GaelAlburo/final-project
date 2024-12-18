"use client"

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Switch,
  Tabs,
  Tab,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider,
  createTheme,
  ThemeProvider
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF1B6B',
      light: '#ff4081',
      dark: '#c51162',
    },
    secondary: {
      main: '#45CAFF',
      light: '#80d8ff',
      dark: '#0091ea',
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const plans = [
  {
    title: 'Free Tier',
    subtitle: 'Perfect to get started',
    price: 0,
    features: [
      '2 CPU Cores',
      '4GB RAM',
      '100GB Storage',
      'Basic Support',
      '1 Database Instance'
    ],
    buttonText: 'CREATE FREE ACCOUNT',
  },
  {
    title: 'Developer',
    subtitle: 'Best for developers and testing',
    price: 39,
    features: [
      '4 CPU Cores',
      '8GB RAM',
      '250GB Storage',
      'Developer Support',
      '3 Database Instances',
      'API Access'
    ],
    highlighted: true,
    buttonText: 'START DEVELOPER PLAN',
  },
  {
    title: 'Business',
    subtitle: 'For production workloads',
    price: 119,
    features: [
      '8 CPU Cores',
      '16GB RAM',
      '1TB Storage',
      'Business Support',
      'Unlimited Databases',
      'Custom Solutions'
    ],
    buttonText: 'CONTACT SALES',
  }
];

const comparisonFeatures = [
  {
    category: 'Compute',
    features: [
      {
        name: 'CPU Cores',
        free: '2 Cores',
        developer: '4 Cores',
        business: '8 Cores',
        info: 'Number of CPU cores allocated'
      },
      {
        name: 'RAM',
        free: '4GB',
        developer: '8GB',
        business: '16GB',
        info: 'Memory allocation'
      },
      {
        name: 'Processing Power',
        free: 'Basic',
        developer: 'Enhanced',
        business: 'Maximum',
        info: 'Processing capability'
      }
    ]
  },
  {
    category: 'Storage',
    features: [
      {
        name: 'Storage Space',
        free: '100GB',
        developer: '250GB',
        business: '1TB',
        info: 'SSD storage allocation'
      },
      {
        name: 'Backup Retention',
        free: '1 day',
        developer: '7 days',
        business: '30 days',
        info: 'Backup retention period'
      }
    ]
  },
  {
    category: 'Support',
    features: [
      {
        name: 'Support Level',
        free: 'Community',
        developer: 'Business Hours',
        business: '24/7',
        info: 'Available support coverage'
      },
      {
        name: 'Response Time',
        free: 'Best Effort',
        developer: '< 24 hours',
        business: '< 1 hour',
        info: 'Guaranteed response time'
      }
    ]
  }
];

function CompareFeatures() {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 600 } }}>
            <TableCell>Features</TableCell>
            <TableCell>Free Tier</TableCell>
            <TableCell>Developer</TableCell>
            <TableCell>Business</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comparisonFeatures.map((section) => (
            <React.Fragment key={section.category}>
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.03)',
                    fontWeight: 700
                  }}
                >
                  {section.category}
                </TableCell>
              </TableRow>
              {section.features.map((feature) => (
                <TableRow key={feature.name}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {feature.name}
                      <InfoOutlinedIcon
                        fontSize="small"
                        sx={{ color: 'text.secondary', cursor: 'help' }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>{feature.free}</TableCell>
                  <TableCell>{feature.developer}</TableCell>
                  <TableCell>{feature.business}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Calculator() {
  const [resources, setResources] = useState({
    cpuCores: 2,
    ramGB: 4,
    storageGB: 100,
    users: 1
  });

  const calculatePrice = () => {
    const cpuPrice = resources.cpuCores * 10;
    const ramPrice = resources.ramGB * 5;
    const storagePrice = resources.storageGB * 0.1;
    const userPrice = resources.users * 20;
    return (cpuPrice + ramPrice + storagePrice + userPrice).toFixed(2);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Estimate your monthly cost
      </Typography>
      
      <Stack spacing={4}>
        <Box>
          <Typography gutterBottom>CPU Cores: {resources.cpuCores}</Typography>
          <Slider
            value={resources.cpuCores}
            onChange={(e, newValue) => setResources({ ...resources, cpuCores: newValue })}
            min={1}
            max={16}
            marks
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': {
                bgcolor: '#FF1B6B',
              },
              '& .MuiSlider-track': {
                bgcolor: '#FF1B6B',
              }
            }}
          />
        </Box>

        <Box>
          <Typography gutterBottom>RAM (GB): {resources.ramGB}</Typography>
          <Slider
            value={resources.ramGB}
            onChange={(e, newValue) => setResources({ ...resources, ramGB: newValue })}
            min={2}
            max={32}
            marks
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': {
                bgcolor: '#FF1B6B',
              },
              '& .MuiSlider-track': {
                bgcolor: '#FF1B6B',
              }
            }}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Storage (GB): {resources.storageGB}</Typography>
          <Slider
            value={resources.storageGB}
            onChange={(e, newValue) => setResources({ ...resources, storageGB: newValue })}
            min={100}
            max={1000}
            step={100}
            marks
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': {
                bgcolor: '#FF1B6B',
              },
              '& .MuiSlider-track': {
                bgcolor: '#FF1B6B',
              }
            }}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Number of Users: {resources.users}</Typography>
          <Slider
            value={resources.users}
            onChange={(e, newValue) => setResources({ ...resources, users: newValue })}
            min={1}
            max={25}
            marks
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': {
                bgcolor: '#FF1B6B',
              },
              '& .MuiSlider-track': {
                bgcolor: '#FF1B6B',
              }
            }}
          />
        </Box>

        <Box sx={{ 
          p: 3, 
          bgcolor: 'rgba(155,27,107,0.05)', 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h6" gutterBottom>
            Estimated Monthly Cost
          </Typography>
          <Typography variant="h4" sx={{ color: '#000000', fontWeight: 700 }}>
            ${calculatePrice()}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function PricingPage() {
  const [tabValue, setTabValue] = useState(0);
  const [annual, setAnnual] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: 'linear-gradient(45deg, #FF1B6B, #45CAFF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2
            }}
          >
            Cloud Bridge Pricing
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Pay only for what you use. No upfront costs or termination fees.
          </Typography>

          {/* Navigation Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                },
                '& .Mui-selected': {
                  color: '#FF1B6B',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#FF1B6B',
                },
              }}
            >
              <Tab label="Plans" />
              <Tab label="Compare Features" />
              <Tab label="Calculator" />
            </Tabs>
          </Box>

          {/* Billing Toggle */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 6,
            }}
          >
            <Typography
              sx={{
                color: !annual ? 'primary.main' : 'text.secondary',
                fontWeight: 500,
              }}
            >
              Pay Monthly
            </Typography>
            <Switch
              checked={annual}
              onChange={() => setAnnual(!annual)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#FF1B6B',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#FF1B6B',
                },
              }}
            />
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                sx={{
                  color: annual ? 'primary.main' : 'text.secondary',
                  fontWeight: 500,
                }}
              >
                Annual
              </Typography>
              {annual && (
                <Typography
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  Save 20%
                </Typography>
              )}
            </Stack>
          </Box>
        </Box>

        {/* Content based on selected tab */}
        {tabValue === 0 && (
          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan) => (
              <Grid size={{xs: 12, md: 4}} key={plan.title}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s ease-in-out',
                    border: plan.highlighted ? 2 : 1,
                    borderColor: plan.highlighted ? 'primary.main' : 'divider',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  {plan.highlighted && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'linear-gradient(45deg, #FF1B6B, #45CAFF)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      Most Popular
                    </Box>
                  )}
                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {plan.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {plan.subtitle}
                    </Typography>
                   <Typography variant="h4" sx={{ my: 3, fontWeight: 700 }}>
                      ${annual ? (plan.price * 0.8).toFixed(0) : plan.price}
                      <Typography component="span" variant="body1" color="text.secondary">
                        /mo
                      </Typography>
                    </Typography>
                    <Stack spacing={2}>
                      {plan.features.map((feature) => (
                        <Stack
                          key={feature}
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <CheckCircleIcon
                            sx={{
                              color: plan.highlighted ? 'primary.main' : 'secondary.main',
                            }}
                          />
                          <Typography variant='body1'>{feature}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      variant={plan.highlighted ? 'contained' : 'outlined'}
                      sx={{
                        mt: 4,
                        background: plan.highlighted
                          ? 'linear-gradient(45deg, #FF1B6B, #45CAFF)'
                          : 'transparent',
                        '&:hover': {
                          background: plan.highlighted
                            ? 'linear-gradient(45deg, #FF1B6B, #45CAFF)'
                            : 'transparent',
                          opacity: plan.highlighted ? 0.9 : 1,
                          transform: "scale(1.05)",
                          transition: "transform 0.4s ease-in-out",
                        },
                      }}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Compare Features Tab */}
        {tabValue === 1 && <CompareFeatures />}

        {/* Calculator Tab */}
        {tabValue === 2 && <Calculator />}
      </Container>
    </ThemeProvider>
  );
}
