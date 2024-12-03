'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Email,
  LocationOn,
  Phone,
  WhatsApp,
  LinkedIn,
  Twitter,
} from '@mui/icons-material';

const ContactOption = ({ icon, title, content, onClick }) => (
  <Card 
    sx={{ 
      height: '100%',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }
    }}
    onClick={onClick}
  >
    <CardContent sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      p: 3
    }}>
      {icon}
      <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography color="text.secondary">
        {content}
      </Typography>
    </CardContent>
  </Card>
);

const SocialButton = ({ icon, tooltip, onClick }) => (
  <Tooltip title={tooltip}>
    <IconButton 
      onClick={onClick}
      sx={{ 
        bgcolor: 'background.paper',
        boxShadow: 1,
        '&:hover': {
          bgcolor: 'background.paper',
          transform: 'scale(1.1)'
        }
      }}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

const SupportPage = () => {
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
  };

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
  };

  const openMap = () => {
    window.open('https://www.google.com/maps/place/Facultad+de+Ingeniería+UNAM/@19.3313883,-99.1872813,17z', '_blank');
  };

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            We`&#39;`re here to help. Choose your preferred method of contact.
          </Typography>
        </Box>

        {/* Contact Options */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <ContactOption
              icon={<Email sx={{ fontSize: 40, color: '#FF1B6B' }} />}
              title="Email"
              content="contact@fi.unam.mx"
              onClick={() => handleCopyEmail('contact@fi.unam.mx')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactOption
              icon={<Phone sx={{ fontSize: 40, color: '#45CAFF' }} />}
              title="Phone"
              content="+52 (55) 5622-0866"
              onClick={() => handleCopyPhone('+52 (55) 5622-0866')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactOption
              icon={<WhatsApp sx={{ fontSize: 40, color: '#25D366' }} />}
              title="WhatsApp"
              content="Send us a message"
              onClick={() => window.open('https://wa.me/525556220866', '_blank')}
            />
          </Grid>
        </Grid>

        {/* Location Card */}
        <Paper 
          sx={{ 
            p: 4,
            borderRadius: 4,
            background: '#fff',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            mb: 6,
            overflow: 'hidden'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <LocationOn sx={{ fontSize: 40, color: '#FF1B6B' }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Visit Us
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                UNAM School of Engineering
              </Typography>
              <Typography variant="body1" paragraph>
                University Avenue 3000, University City
              </Typography>
              <Typography variant="body1" paragraph>
                Coyoacán, 04510 Mexico City, CDMX
              </Typography>
              <Typography 
                variant="body1" 
                color="primary" 
                sx={{ cursor: 'pointer' }}
                onClick={openMap}
              >
                View on Google Maps
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%', height: '400px', position: 'relative' }}>
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.0468743231837!2d-99.18728132573!3d19.331388287091488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce00015be0a713%3A0x3fc11681a8244370!2sFacultad%20de%20Ingenier%C3%ADa%20UNAM!5e0!3m2!1ses!2smx!4v1709619129043!5m2!1ses!2smx"
                  sx={{
                    border: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Social Media */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Follow Us on Social Media
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <SocialButton 
              icon={<LinkedIn sx={{ color: '#0077B5' }} />}
              tooltip="LinkedIn"
              onClick={() => window.open('https://www.linkedin.com/school/facultad-de-ingenieria-unam/', '_blank')}
            />
            <SocialButton 
              icon={<Twitter sx={{ color: '#1DA1F2' }} />}
              tooltip="Twitter"
              onClick={() => window.open('https://twitter.com/fiunam_mx', '_blank')}
            />
            <SocialButton 
              icon={<Email sx={{ color: '#FF1B6B' }} />}
              tooltip="Email"
              onClick={() => handleCopyEmail('contact@fi.unam.mx')}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SupportPage;