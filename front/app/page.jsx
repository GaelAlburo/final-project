"use client";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Divider, Paper, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import axios from "axios";


export default function Home() {
  const theme = useTheme();

  // State variable for the types
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchServicesTypes();
  }, []);

  // Function that fetches the types of services from the backend
  const fetchServicesTypes = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/v1/services/types");
        setTypes(res.data);
        console.info("Types fetched: ", res.data);
    }
    catch (error) {
        console.error("Error fetching types data: ", error);
    }
}

  return (
    <Container maxWidth="large" disableGutters>
        
      {/* Hero */}
      <Container maxWidth="large" 
        sx={{
            borderBottomLeftRadius: "15%",
            backgroundColor: "rgb(63,94,251)",
            background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
          }}>
        <Container maxWidth="lg" disableGutters>

          <Grid container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <Grid size={{xs: 12, sm: 6}}>
              <Box>
                <Typography variant="h2" fontWeight={700} color="white" sx={{pb: 10}}>
                  Cloud Services with Cloud Bridge
                </Typography>
                <Button variant="outlined" size="large" href="/services"
                  sx={{
                    px: 3,
                    py: 2,
                    color: "white",
                    borderColor: "white",
                    fontSize: "1.2rem",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.4s ease-in-out",
                    },
                  }}>
                  Our Services
                </Button>
              </Box>
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Box>
                <Image src="/cloud-services.svg" width={700} height={700} alt="cloud-service" />
              </Box>
            </Grid>

          </Grid>

        </Container>
      </Container>
      
      {/* Services */}
      <Container maxWidth="large" sx={{mt: 10, backgroundColor: "rgba(0, 0, 0, 0.015)"}}>
        <Container maxWidth="lg" sx={{py: 10}} disableGutters> 
          <Grid container>
            
            <Grid size={{xs: 12, sm: 4}}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper elevation={3}
                sx={{
                  width: 300,
                  height: 376,
                  "&:hover": {
                    backgroundColor: "rgba(63,94,251,0.1)",
                    transform: "scale(1.05)",
                    transition: "transform 0.4s ease-in-out",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Box sx={{p: 4}}>
                  <Typography variant="h5" fontWeight={700} sx={{mb: 3, height: 96}}>
                    Maximize the value of your products
                  </Typography>
                  <Typography variant="body1">
                    We provide the best cloud services in the world. We are the best in the world. We provide the best cloud services in the world. We are the best in the world. We provide the best cloud services in the world. We are the best in the world.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{xs: 12, sm: 4}}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper elevation={3}
                sx={{
                  width: 300,
                  height: 376,
                  "&:hover": {
                    backgroundColor: "rgba(63,94,251,0.1)",
                    transform: "scale(1.05)",
                    transition: "transform 0.4s ease-in-out",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Box sx={{p: 4}}>
                  <Typography variant="h5" fontWeight={700} sx={{mb: 3, height: 96}}>
                    Increase the efficiency of your business
                  </Typography>
                  <Typography variant="body1">
                    We provide the best cloud services in the world. We are the best in the world. We provide the best cloud services in the world. We are the best in the world. We provide the best cloud services in the world. We are the best in the world.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{xs: 12, sm: 4}}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper elevation={3}
                sx={{
                  width: 300,
                  height: 376,
                  "&:hover": {
                    backgroundColor: "rgba(63,94,251,0.1)",
                    transform: "scale(1.05)",
                    transition: "transform 0.4s ease-in-out",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Box sx={{p: 4}}>
                  <Typography variant="h5" fontWeight={700} sx={{mb: 3, height: 96}}>
                    Harness the power of the cloud
                  </Typography>
                  <Typography variant="body1">
                    We provide the best cloud services in the world. We are the best in the world. We provide the best cloud services in the world. We are the best in the world. We provide the best cloud services in the world. We are the best in the world.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

          </Grid>

        </Container>
      </Container>

      {/* Description of Services */}
      <Container maxWidth="lg" sx={{my: 15}} disableGutters>
        <Grid container>

          <Grid size={{md: 6}}>
              <Typography variant="h4" gutterBottom fontWeight={700} sx={{mb: 6}} lineHeight={1.5}>
                Develop products with different services from Cloud Bridge
              </Typography>
              <Typography variant="body1" sx={{width: 480}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt harum consequuntur doloribus quam. Unde cum eius, quos quas consequuntur nobis suscipit repudiandae provident tenetur sint nisi laudantium harum.
              </Typography>
              <Button variant="outlined" size="large" href="/services"
                  sx={{
                    backgroundColor: "rgb(63,94,251)",
                    mt: 4,
                    px: 3,
                    py: 1.5,
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.4s ease-in-out",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}>
                  Our Services
                </Button>
          </Grid>

          <Grid size={{md: 6}}>
            
            {types.map((type) => {
              return (
                <Accordion key={type}
                  sx={{
                    boxShadow: "0 0px 20px rgba(0, 0, 0, 0)",
                    borderTop: "1px solid rgba(63, 94, 251, 0.2)",
                    py: 2,
                    mb: 4,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography variant="h6">
                      {type}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt harum consequuntur doloribus quam. Unde cum eius, quos quas consequuntur nobis suscipit repudiandae provident tenetur sint nisi laudantium harum.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )
            })}

          </Grid>

        </Grid>
      </Container>
    </Container>
  );
}