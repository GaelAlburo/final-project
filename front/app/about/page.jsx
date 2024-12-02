import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  LinearProgress
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Cloud as CloudIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Code as CodeIcon,
  Analytics as AnalyticsIcon,
  DataObject as DataObjectIcon,
  CloudQueue as CloudQueueIcon
} from '@mui/icons-material';

const AboutUs = () => {
  const stats = [
    { number: "98%", label: "Infrastructure Optimization" },
    { number: "500+", label: "Cloud Solutions Delivered" },
    { number: "50+", label: "Enterprise Clients" },
    { number: "24/7", label: "Cloud Support" }
  ];

  const partners = [
    { icon: <CloudIcon sx={{ fontSize: 40 }} />, name: "AWS" },
    { icon: <StorageIcon sx={{ fontSize: 40 }} />, name: "Azure" },
    { icon: <DataObjectIcon sx={{ fontSize: 40 }} />, name: "Google Cloud" },
    { icon: <CloudQueueIcon sx={{ fontSize: 40 }} />, name: "Digital Ocean" }
  ];

  const metrics = [
    { label: "Faster Deployment", value: "40%", color: "#FF4081" },
    { label: "System Uptime", value: "99.99%", color: "#9C27B0" },
    { label: "Cost Reduction", value: "60%", color: "#673AB7" },
    { label: "Security Track Record", value: "100%", color: "#3F51B5" }
  ];

  return (
    <Box sx={{ bgcolor: '#fff' }}>
      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 50%, #3F51B5 100%)',
        pt: { xs: 8, md: 12 },
        pb: { xs: 12, md: 16 },
        color: 'white'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3
              }}>
                Cloud Infrastructure Experts
              </Typography>
              <Typography variant="h5" sx={{ 
                mb: 4,
                opacity: 0.9,
                maxWidth: '800px'
              }}>
                We specialize in creating powerful cloud solutions that transform 
                how businesses operate in the digital space.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'white',
                  color: '#E91E63',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                  px: 4,
                  py: 1.5
                }}
              >
                Start Your Cloud Journey
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{
                height: '100%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700,
                    color: '#E91E63',
                    mb: 1
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mission & Vision Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{
              height: '100%',
              background: '#f8f9fa',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: 'none'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h3" sx={{ 
                  mb: 3,
                  color: '#2C3E50',
                  fontWeight: 700
                }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
                  To revolutionize cloud infrastructure by providing innovative, secure, 
                  and efficient solutions that empower businesses to thrive in the digital age.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{
              height: '100%',
              background: '#f8f9fa',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: 'none'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h3" sx={{ 
                  mb: 3,
                  color: '#2C3E50',
                  fontWeight: 700
                }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.7 }}>
                  To be the global leader in cloud solutions, recognized for our innovation,
                  reliability, and commitment to client success in the digital transformation journey.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Partners Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ 
            textAlign: 'center',
            mb: 6,
            color: '#2C3E50',
            fontWeight: 700
          }}>
            Our Technology Partners
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {partners.map((partner, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Card sx={{
                  textAlign: 'center',
                  p: 3,
                  border: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease',
                    borderColor: '#E91E63'
                  }
                }}>
                  <Box sx={{ color: '#E91E63', mb: 2 }}>
                    {partner.icon}
                  </Box>
                  <Typography variant="h6" color="#2C3E50">
                    {partner.name}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Success Story Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ 
          textAlign: 'center',
          mb: 6,
          color: '#2C3E50',
          fontWeight: 700
        }}>
          Success Story
        </Typography>
        
        <Card sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          boxShadow: 'none',
          border: '1px solid rgba(0,0,0,0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #E91E63, #9C27B0)'
          }
        }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <Typography variant="h3" sx={{ 
                  color: '#E91E63',
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '1.75rem', md: '2.25rem' }
                }}>
                  Enterprise Cloud Migration
                </Typography>
                
                <Typography variant="body1" sx={{ 
                  color: '#666',
                  mb: 4,
                  lineHeight: 1.7
                }}>
                  Successfully migrated a Fortune 500 company's infrastructure to the cloud, 
                  reducing operational costs by 60% and improving performance by 200%.
                </Typography>

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(90deg, #E91E63, #9C27B0)',
                    px: 3,
                    py: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(90deg, #D81B60, #8E24AA)',
                    }
                  }}
                >
                  READ CASE STUDY
                </Button>
              </Grid>

              <Grid item xs={12} md={7}>
                <Box sx={{ 
                  bgcolor: 'rgba(0,0,0,0.02)',
                  p: 4,
                  borderRadius: 2
                }}>
                  {metrics.map((metric, index) => (
                    <Box key={index} sx={{ mb: index !== metrics.length - 1 ? 4 : 0 }}>
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1
                      }}>
                        <Typography sx={{ color: '#666' }}>
                          {metric.label}
                        </Typography>
                        <Typography sx={{ 
                          color: metric.color,
                          fontWeight: 600
                        }}>
                          {metric.value}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={parseFloat(metric.value)}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'rgba(0,0,0,0.05)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: metric.color,
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      {/* Final CTA Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ 
            mb: 3,
            color: '#2C3E50',
            fontWeight: 700
          }}>
            Ready to Transform Your Cloud Infrastructure?
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 4,
            color: '#666',
            maxWidth: '600px',
            mx: 'auto'
          }}>
            Let's discuss how we can help optimize and secure your cloud environment.
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: 'linear-gradient(90deg, #E91E63, #9C27B0)',
              px: 4,
              py: 2,
              '&:hover': {
                background: 'linear-gradient(90deg, #D81B60, #8E24AA)',
              }
            }}
          >
            Contact Us Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;