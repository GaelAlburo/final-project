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
  Card,
  CardContent
} from "@mui/material";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/SessionContext";

export default function Invoices() {
  {/* INVOICES */}
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  {/* AUTH */}
  const { isAdminUser, currentUser } = useAuth();

  {/* QUICK STATS */}
  const totalServices = filteredInvoices.reduce(
    (sum, invoice) => sum + invoice.id_services.length, 
    0
  );
  const totalInvoices = filteredInvoices.length;
  const totalSpent = filteredInvoices.reduce(
    (sum, invoice) => sum + invoice.totalAmount, 
    0
  );

  {/* API */}
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8002/api/v1/bills");
        if (!response.ok) {
          throw new Error(`Error fetching invoices: ${response.statusText}`);
        }
        const data = await response.json();
        setInvoices(data);

        // Filter invoices based on user type
        if (isAdminUser) {
          setFilteredInvoices(data); // Admin sees all invoices
        } else {
          setFilteredInvoices(data.filter(invoice => invoice.id_user === currentUser));
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [isAdminUser, currentUser]);

  const deleteInvoice = async (id) => {
    try {
      const response = await fetch(`http://localhost:8002/api/v1/bills/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting invoice: ${response.statusText}`);
      }

      setInvoices(invoices.filter((invoice) => invoice._id !== id));
      setFilteredInvoices(filteredInvoices.filter((invoice) => invoice._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Typography>Loading Invoices...</Typography>;
  }

  return (
    <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>

      {/* HEADER */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" fontWeight={700} sx={{ mt: 10 }}>
          {isAdminUser ? "System Bills" : "Your Invoices"}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {isAdminUser
            ? "Here are all the bills registered in the system. You can view and manage them."
            : "Review all your weekly invoices for the services you are subscribed to."}
        </Typography>
      </Box>

      {/* QUICK STATS */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700}>
                Services Used
              </Typography>
              <Typography variant="h4" color="rgb(63,94,251)" fontWeight={700}>
                {totalServices}
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
                {totalInvoices}
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
              <Typography variant="h4" color="rgb(63,94,251)" fontWeight={700}>
                ${totalSpent.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, mb: 5 }} />

      {/* LIST */}
      <Grid container spacing={4}>
        {filteredInvoices.map((invoice) => (
          <Grid item xs={12} md={6} key={invoice._id}>
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
                Invoice ID: {invoice._id}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Date: {new Date(invoice.date).toLocaleDateString()}
              </Typography>
              {isAdminUser && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <strong>User ID:</strong> {invoice.id_user}
                </Typography>
              )}
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                {invoice.id_services.map((service, index) => (
                  <Box key={index}>
                    <Typography variant="body1">
                      <strong>{service.name}</strong>: ${service.amount.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight={700}>
                Total: ${invoice.totalAmount.toFixed(2)}
              </Typography>
              {isAdminUser && (
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => deleteInvoice(invoice._id)}
                >
                  Delete
                </Button>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
