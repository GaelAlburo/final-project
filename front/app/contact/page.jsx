'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { Message, Help, Support, Close, Send } from '@mui/icons-material';

const SupportPage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [supportType, setSupportType] = useState('sales');

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header with gradient */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            Cloud Bridge Support
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            We're here to help. Select the type of support you need.
          </Typography>
        </Box>

        {/* Support Options */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper 
              onClick={() => setSupportType('sales')}
              sx={{ 
                p: 3,
                cursor: 'pointer',
                height: '100%',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                background: supportType === 'sales' 
                  ? 'linear-gradient(135deg, #FF1B6B 0%, #FF758C 100%)'
                  : '#fff',
                boxShadow: supportType === 'sales'
                  ? '0 8px 32px rgba(255, 27, 107, 0.15)'
                  : '0 2px 12px rgba(0,0,0,0.08)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(255, 27, 107, 0.2)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Help sx={{ 
                  fontSize: 40,
                  color: supportType === 'sales' ? '#fff' : '#FF1B6B'
                }} />
                <Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 'bold',
                    color: supportType === 'sales' ? '#fff' : '#000',
                    mb: 1
                  }}>
                    Sales Support
                  </Typography>
                  <Typography sx={{ 
                    color: supportType === 'sales' ? 'rgba(255,255,255,0.9)' : 'text.secondary'
                  }}>
                    Contact our sales team for information about products and services.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              onClick={() => setSupportType('technical')}
              sx={{ 
                p: 3,
                cursor: 'pointer',
                height: '100%',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                background: supportType === 'technical' 
                  ? 'linear-gradient(135deg, #45CAFF 0%, #45EEEE 100%)'
                  : '#fff',
                boxShadow: supportType === 'technical'
                  ? '0 8px 32px rgba(69, 202, 255, 0.15)'
                  : '0 2px 12px rgba(0,0,0,0.08)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(69, 202, 255, 0.2)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Support sx={{ 
                  fontSize: 40,
                  color: supportType === 'technical' ? '#fff' : '#45CAFF'
                }} />
                <Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 'bold',
                    color: supportType === 'technical' ? '#fff' : '#000',
                    mb: 1
                  }}>
                    Technical Support
                  </Typography>
                  <Typography sx={{ 
                    color: supportType === 'technical' ? 'rgba(255,255,255,0.9)' : 'text.secondary'
                  }}>
                    Solve technical issues and get help with our services.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Form */}
        <Paper sx={{ 
          p: 4,
          borderRadius: 4,
          background: '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
        }}>
          <Typography variant="h4" sx={{ 
            mb: 4,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {supportType === 'sales' ? 'Sales Contact' : 'Technical Support'}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Full Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Subject</InputLabel>
                <Select label="Subject">
                  {supportType === 'sales' ? (
                    <>
                      <MenuItem value="info">Product Information</MenuItem>
                      <MenuItem value="demo">Request Demo</MenuItem>
                      <MenuItem value="quote">Get Quote</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem value="problem">Report Problem</MenuItem>
                      <MenuItem value="query">Technical Query</MenuItem>
                      <MenuItem value="access">Access Issues</MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Message"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #FF1B6B 20%, #45CAFF 100%)',
                  }
                }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Floating Chat */}
        <Fab 
          sx={{ 
            position: 'fixed', 
            bottom: 32, 
            right: 32,
            background: 'linear-gradient(135deg, #FF1B6B 0%, #45CAFF 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #FF1B6B 20%, #45CAFF 100%)',
            }
          }}
          onClick={() => setChatOpen(true)}
        >
          <Message />
        </Fab>

        {/* Chat Dialog */}
        <Dialog 
          open={chatOpen} 
          onClose={() => setChatOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ 
            background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            Support Chat
            <IconButton onClick={() => setChatOpen(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Box sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flexGrow: 1, mb: 2, bgcolor: '#f8f9fa', borderRadius: 2, p: 2 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  size="small"
                />
                <IconButton sx={{ 
                  background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #FF1B6B 20%, #45CAFF 100%)',
                  }
                }}>
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default SupportPage;