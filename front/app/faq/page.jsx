'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  borderRadius: '8px !important',
  border: '1px solid rgba(0,0,0,0.08)',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    padding: theme.spacing(2, 3),
  },
  '& .MuiAccordionDetails-root': {
    padding: theme.spacing(2, 3),
    borderTop: '1px solid rgba(0,0,0,0.08)',
  },
}));

const GradientTypography = styled(Typography)({
  background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

const FAQPage = () => {
  const faqs = [
    {
      question: "What is Cloud Bridge?",
      answer: "Cloud Bridge is a cloud services platform that provides infrastructure solutions to help you get the most out of your cloud deployments."
    },
    {
      question: "How do I get started?",
      answer: "You can create a free account and start using our services immediately. Our Free Tier includes 2 CPU cores, 4GB RAM, and 100GB storage."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and wire transfers for business accounts. You can pay monthly or annually."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer different levels of support based on your plan: Basic Support (Free Tier), Developer Support (Developer Plan), and Business Support (Business Plan)."
    }
  ];

  return (
    <Box sx={{ mt: 8 }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <GradientTypography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Frequently Asked Questions
          </GradientTypography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Find answers to common questions about our services
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <StyledAccordion key={index}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ 
                    color: '#FF1B6B',
                    transition: 'transform 0.3s',
                    '&.Mui-expanded': {
                      transform: 'rotate(180deg)',
                    }
                  }} />
                }
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 500,
                    color: '#2D3748'
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.7
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQPage;