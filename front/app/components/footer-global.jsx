import { Box, Container, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function FooterGlobal() {
    return (
        <Container maxWidth="large" sx={{backgroundColor: "rgba(0, 0, 0, 0.015)"}}>
            <Container maxWidth="lg">
                <Grid container sx={{py: 6}}>

                    <Grid size={{md: 8}}>
                        <Grid container spacing={4}>

                            <Grid size={{md: 4}}>
                                <Typography variant="h6" fontWeight={700} sx={{mb: 2}}>Cloud Bridge</Typography>
                                <Typography variant="body2" sx={{mb: 2}}>About Us</Typography>
                                <Typography variant="body2" sx={{mb: 2}}>Contact Us</Typography>
                                <Typography variant="body2" sx={{mb: 2}}>Work With Us</Typography>
                            </Grid>

                            <Grid size={{md: 4}}>
                            <Typography variant="h6" fontWeight={700} sx={{mb: 2}}>Solutions</Typography>
                                <Typography variant="body2" sx={{mb: 2}}>Services</Typography>
                                <Typography variant="body2" sx={{mb: 2}}>Pricing</Typography>
                                <Typography variant="body2" sx={{mb: 2}}>FAQ</Typography>
                            </Grid>

                            <Grid size={{md: 4}}>
                            <Typography variant="h6" fontWeight={700} sx={{mb: 2}}>Legal</Typography>
                                <Typography variant="body2" sx={{mb: 2}}>Terms of Service</Typography>
                                <Typography variant="body2" sx={{mb: 2}}>Privacy Policy</Typography>
                                <Typography variant="body2" sx={{mb: 2}}>Cookie Policy</Typography>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid size={{md: 4}} 
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
                                textDecoration: "none",
                            }}
                            >
                            Follow Us
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <IconButton
                                    sx={{ p: 0, mr: 2 }}
                                >
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton
                                    sx={{ p: 0, mr: 2 }}
                                >
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton sx={{  p: 0 }}>
                                    <FacebookIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
                
                
            </Container>
        </Container>
    )
}