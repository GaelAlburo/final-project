import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function FooterGlobal() {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.015)',
        padding: '2.5rem 0'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item md={8}>
            <Grid container spacing={4}>
              <Grid item md={4}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Cloud Bridge
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  About Us
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Contact Us
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Work With Us
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Solutions
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Services
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Pricing
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  FAQ
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Legal
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Terms of Service
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Privacy Policy
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Cookie Policy
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "center"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                textAlign: "center",
                mr: 4
              }}
            >
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontWeight: 600,
                  letterSpacing: ".4rem",
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                Follow Us
              </Typography>
              <Box sx={{ mt: 2 }}>
                <IconButton
                  sx={{
                    p: 0,
                    mr: 2,
                    "&:hover": {
                      color: "#1DA1F2" // Twitter blue
                    }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  sx={{
                    p: 0,
                    mr: 2,
                    "&:hover": {
                      color: "#E1306C" // Instagram pink
                    }
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  sx={{
                    p: 0,
                    "&:hover": {
                      color: "#4267B2" // Facebook blue
                    }
                  }}
                >
                  <FacebookIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}