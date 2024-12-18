'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Link,
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import {
  Code,
  Security,
  Storage,
  Business,
  Email,
  Place,
  Phone,
  LinkedIn,
  GitHub,
  Twitter,
} from '@mui/icons-material';

// Team Card Component remains the same
const TeamCard = ({ icon, title, department, description, areas }) => (
  <Paper sx={{ 
    p: 3,
    height: '100%',
    borderRadius: 2,
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Box>
    <Typography variant="subtitle2" sx={{ color: '#FF1B6B', mb: 2 }}>
      {department}
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 2 }}>
      {description}
    </Typography>
    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
      Key Areas:
    </Typography>
    {areas.map((area, index) => (
      <Typography key={index} color="text.secondary" sx={{ mb: 0.5 }}>
        • {area}
      </Typography>
    ))}
  </Paper>
);

// Updated Contact Component with Social Links
const ContactSection = () => (
  <Paper sx={{ 
    p: 4, 
    mt: 8,
    borderRadius: 4, 
    background: 'linear-gradient(135deg, rgba(255,27,107,0.03) 0%, rgba(69,202,255,0.03) 100%)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
  }}>
    <Grid container spacing={4} alignItems="center">
      {/* Contact Information */}
      <Grid size={{xs: 12, md: 6}}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Get in Touch
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Interested in joining our team? Reach out through any of these channels:
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Email sx={{ color: '#FF1B6B', mr: 2 }} />
          <Link href="mailto:careers@cloudbridge.com" color="inherit" underline="hover">
            careers@cloudbridge.com
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Phone sx={{ color: '#45CAFF', mr: 2 }} />
          <Link href="tel:+15551234567" color="inherit" underline="hover">
            +1 (555) 123-4567
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Place sx={{ color: '#FF1B6B', mr: 2 }} />
          <Typography>123 Cloud Street, Tech City, TC 12345</Typography>
        </Box>
      </Grid>
      
      {/* Social Media Links */}
      <Grid size={{xs: 12, md: 6}}>
        <Paper sx={{ 
          p: 3, 
          borderRadius: 2,
          bgcolor: 'white',
          textAlign: 'center'
        }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Connect With Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <IconButton 
              href="https://linkedin.com/company/cloudbridge" 
              target="_blank"
              sx={{ 
                color: '#0077B5',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <LinkedIn fontSize="large" />
            </IconButton>
            <IconButton 
              href="https://github.com/cloudbridge" 
              target="_blank"
              sx={{ 
                color: '#333',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <GitHub fontSize="large" />
            </IconButton>
            <IconButton 
              href="https://twitter.com/cloudbridge" 
              target="_blank"
              sx={{ 
                color: '#1DA1F2',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <Twitter fontSize="large" />
            </IconButton>
          </Box>
          <Typography variant="body1" sx={{ mt: 3, color: 'text.secondary' }}>
            Follow us to stay updated about new opportunities and company news!
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Paper>
);

// Main component
const WorkWithUsPage = () => {
  // Teams data array
  const teams = [
    {
      icon: <Code sx={{ fontSize: 30, color: '#FF1B6B' }} />,
      title: "Backend Development",
      department: "Engineering",
      description: "Our engineering team focuses on building robust cloud infrastructure solutions.",
      areas: [
        "Cloud services and APIs",
        "Microservices architecture",
        "Performance optimization",
      ]
    },
    {
      icon: <Security sx={{ fontSize: 30, color: '#45CAFF' }} />,
      title: "Cloud Security",
      department: "Security",
      description: "The security team ensures the protection of our cloud infrastructure and client data.",
      areas: [
        "Security compliance",
        "Protocol implementation",
        "Best practices development",
      ]
    },
    {
      icon: <Storage sx={{ fontSize: 30, color: '#FF1B6B' }} />,
      title: "Data Engineering",
      department: "Data",
      description: "Our data team handles the core of our data processing infrastructure.",
      areas: [
        "Big data technologies",
        "Data pipeline architecture",
        "Data warehousing solutions",
      ]
    },
    {
      icon: <Business sx={{ fontSize: 30, color: '#45CAFF' }} />,
      title: "Solutions Architecture",
      department: "Solutions",
      description: "The solutions team designs and implements enterprise-level cloud solutions.",
      areas: [
        "System architecture design",
        "Cloud platform expertise",
        "Enterprise solutions",
      ]
    }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            Work With Us
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Join our team and help build the future of cloud infrastructure
          </Typography>
        </Box>

        {/* Benefits Section */}
        <Paper sx={{ p: 4, mb: 6, borderRadius: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Why Join Us?
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 4}}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                Competitive Package
              </Typography>
              <Typography color="text.secondary">
                Excellent salary, equity options, and comprehensive health benefits
              </Typography>
            </Grid>
            <Grid size={{xs: 12, md: 4}}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                Remote First
              </Typography>
              <Typography color="text.secondary">
                Work from anywhere with flexible hours and unlimited PTO
              </Typography>
            </Grid>
            <Grid size={{xs: 12, md: 4}}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                Growth Opportunities
              </Typography>
              <Typography color="text.secondary">
                Continuous learning with conference and course allowances
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Teams Section */}
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Our Teams
        </Typography>
        <Grid container spacing={4}>
          {teams.map((team, index) => (
            <Grid size={{xs: 12, md: 6}} key={index}>
              <TeamCard {...team} />
            </Grid>
          ))}
        </Grid>

        {/* Contact Section */}
        <ContactSection />
      </Container>
    </Box>
  );
};

export default WorkWithUsPage;