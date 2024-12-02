"use client";

import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  Stack, 
  Divider, 
  Button, 
  TextField, 
  Card, 
  CardContent 
} from "@mui/material";
import { useState } from "react";

export default function Invoices() {
  // Test
  const [invoices] = useState([
    {
      id: "INV001",
      date: "2024-11-20",
      services: [
        { name: "Cloud Storage", cost: 50 },
        { name: "Compute Engine", cost: 100 },
      ],
      total: 150,
    },
    {
      id: "INV002",
      date: "2024-11-27",
      services: [
        { name: "Virtual Network", cost: 30 },
        { name: "Database Hosting", cost: 70 },
      ],
      total: 100,
    },
  ]);

  return (
    <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
      {/* UP */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" fontWeight={700} sx={{ mt: 10 }}>
          Your Invoices
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Review all your weekly invoices for the services you've subscribed to. 
        </Typography>
      </Box>

    {/* Quick Stats */}
    <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700}>
                Services Used
              </Typography>
              <Typography variant="h4" color= "rgb(63,94,251)" fontWeight={700}>
                4
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700}>
                Total Invoices
              </Typography>
              <Typography variant="h4" color="rgb(63,94,251)" fontWeight={700}>
                2
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700}>
                Total Spent
              </Typography>
              <Typography variant="h4" color= "rgb(63,94,251)" fontWeight={700}>
                $250
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, mb: 5 }} />

      {/* LIST */}
      <Grid container spacing={4}>
        {invoices.map((invoice) => (
          <Grid item xs={12} md={6} key={invoice.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                "&:hover": {
                  transform: "scale(1.03)",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                Invoice ID: {invoice.id}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Date: {invoice.date}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                {invoice.services.map((service, index) => (
                  <Box key={index}>
                    <Typography variant="body1">
                      <strong>{service.name}</strong>: ${service.cost}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight={700}>
                Total: ${invoice.total}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
