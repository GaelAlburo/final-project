"use client";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Divider, Paper, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alerts from "./components/alerts";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Home() {
  const theme = useTheme();

  // State variable for the types
  const [types, setTypes] = useState([]);

  // State variable to control the visibility of the Alerts component
  const [openAlert, setOpenAlert] = useState(false);

  // State variable to store the alert message and severity
  const [alert, setAlert] = useState({
      severity: "",
      message: ""
  })

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
        setAlert({
            severity: "error",
            message: "Error fetching types data"
        });
    }
}

  return (
    <Container maxWidth="large" disableGutters>
        
      {/* Hero */}
      <Container maxWidth="large"
        sx={{
            borderBottomLeftRadius: {
              xs: "0",
              sm: "15%"
            },
            backgroundColor: "rgb(63,94,251)",
            background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
            height: {
              xs: 700,
              sm: 700,
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
        <Container maxWidth="lg" disableGutters>

          <Grid container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: {
                xs: 16,
                sm: 0
              }
            }}
          >

            <Grid size={{xs: 12, sm: 6}}>
              <Box 
                sx={{
                    textAlign: {
                      xs: "center",
                      sm: "left"
                    },
                  }}
                >
                <Typography fontWeight={700} color="white"
                  sx={{
                    fontSize: {
                      xs: "2.5rem",
                      sm: "2.8rem",
                      md: "3.5rem"
                    },
                    mb: 4
                  }}
                >
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

            <Grid size={{xs: 12, sm: 6}}
              sx={{
                display: {
                  xs: "flex",
                  sm: "inline"
                },
                justifyContent: "center",
                alignItems: "center",
                mt: {
                  xs: 2,
                  sm: 0
                }
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: {
                    xs: 400,
                    sm: "auto"
                  },
                  height: {
                    xs: 400,
                    sm: "auto"
                  }
                }}
              >
                <Image src="/cloud-services.svg" alt="cloud-service" width={750} height={750} layout="responsive" objectFit="cover"/>
              </Box>
            </Grid>

          </Grid>

        </Container>
      </Container>
      
      {/* Services */}
      <Container maxWidth="large" 
        sx={{
          mt: 10, 
          backgroundColor: "rgba(0, 0, 0, 0.015)",
          maxWidth: "100vw",
        }}
      >
        <Container maxWidth="lg" disableGutters 
          sx={{
            py: {
              xs: 6,
              sm: 10
            }
          }}
        > 
          <Grid container>
            
            <Grid size={{xs: 12, sm: 4}}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: {
                  xs: 4,
                  sm: 0
                }
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
                mb: {
                  xs: 4,
                  sm: 0
                }
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
      <Container maxWidth="lg" disableGutters
        sx={{
          my: {
            xs: 8,
            md: 15
          },
        }}
      >
        <Grid container sx={{mx: 4}}>

          <Grid size={{xs: 12, md: 6}}
            sx={{
              display: {
                xs: "flex",
                md: "inline"
              },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
              <Box 
                sx={{
                  textAlign: {
                    xs: "center",
                    md: "left"
                  },
                  maxWidth: {
                    xs: 500,
                    md: 400,
                    lg: 500
                  },
                  width: {
                    xs: "80%",
                    sm: "100%"
                  },
                  mb: {
                    xs: 8,
                    md: 0
                  }
                }}
              >
                <Typography variant="h4" gutterBottom fontWeight={700} sx={{mb: 6}} lineHeight={1.5}>
                  Develop products with different services from Cloud Bridge
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt harum consequuntur doloribus quam. Unde cum eius, quos quas consequuntur nobis suscipit repudiandae provident tenetur sint nisi laudantium harum.
                </Typography>
                <Button variant="outlined" size="large" href="/services"
                    sx={{
                      backgroundColor: "rgb(63,94,251)",
                      mt: 6,
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
              </Box>
          </Grid>

          <Grid size={{xs: 12, md: 6}}
            sx={{
              display: {
                xs: "flex",
                md: "inline"
              },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
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

      <Alerts 
        open = {openAlert}
        setOpen = {setOpenAlert}
        alert = {alert}
        pos = "bottom"
      />
    </Container>
  );
}