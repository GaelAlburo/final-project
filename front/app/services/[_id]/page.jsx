"use client";

import { useTheme } from "@emotion/react"
import { Box, Button, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckIcon from '@mui/icons-material/Check';
import CircleIcon from '@mui/icons-material/Circle';
import SpeedIcon from '@mui/icons-material/Speed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import DashboardIcon from '@mui/icons-material/Dashboard';
import axios from "axios";
import { use, useEffect, useState } from "react";
import Image from "next/image";

export default function IndivService({params}) {
    const theme = useTheme();

    // This unwraps the params object from the URL to fix the error shown in the console
    const unwrappedParams = use(params);

    // Array to render 4 list items
    const loop = [0, 1, 2, 3];

    // State variable to store the service data
    const [service, setService] = useState({});

    useEffect(() => {
        fetchService();
    }, []);

    // Function to fetch the service data from the backend
    const fetchService = async () => {
        const service_id = await unwrappedParams._id;
        try{
            const res  = await axios.get(`http://localhost:5000/api/v1/services/${service_id}`);
            setService(res.data);
            console.info("Service fetched: ", res.data);
        }
        catch (error) {
            console.error("Error fetching service: ", error);
        }
    }

    // Function to choose the image based on the service type
    const chooseImg = () => {
        let image = "";
        if (service.type === "Storage") {
            image = "/storage.svg"
        }
        else if (service.type === "Security") {
            image = "/security.svg"
        }
        else if (service.type === "Computation") {
            image = "/computation.svg"
        }
        else if (service.type === "Networking") {
            image = "/network.svg"
        }
        else {
            image = "/default.svg"
        }
        return <Image src={image} width={470} height={470} alt={image} />
    }

    return (
        <Container maxWidth="large" disableGutters>

            {/* Hero Section */}
            <Container maxWidth="lg" sx={{mt: 8, mb: 4}}>
                <Grid container>

                    <Grid size={{md: 6}}>
                        <Box>
                            <Typography variant="h3" fontWeight={700} sx={{mb: 6}}>
                                {service.name}
                            </Typography>
                            <Typography variant="h6">
                                {service.description}
                            </Typography>

                            <Button variant="outlined" size="large" href="/login"
                                sx={{
                                    backgroundColor: "rgb(63,94,251)",
                                    mt: 4,
                                    px: 3,
                                    py: 1.5,
                                    color: "white",
                                    border: "1px solid transparent",
                                    "&:hover": {
                                    transform: "scale(1.05)",
                                    transition: "transform 0.4s ease-in-out",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                    },
                                }}>
                                Log In to Hire
                            </Button>
                        </Box>
                        <Box sx={{mt: 4}}>
                            {loop.map((i) => (
                                <List dense={true} key={i}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckIcon color="success"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Lorem ipsum dolor sit amet consectetur adipiscing elit."
                                        />
                                    </ListItem>
                                </List>
                            ) )}
                        </Box>
                    </Grid>

                    <Grid size={{md: 6}} sx={{pl: 10}}>
                        {chooseImg()}
                    </Grid>

                </Grid>
            </Container>

            <Divider sx={{mb: 4}}/>
            
            {/* Pricing Section */}
            <Container maxWidth="lg" sx={{my: 8}}>
                <Typography variant="h4" fontWeight={700} sx={{mb: 6}}>
                    Pricing
                </Typography>

                <Typography variant="h5" sx={{mb: 4}}>
                    Price: <strong>${service.cost}/use</strong>
                </Typography>

                <Typography variant="h6" sx={{mb: 2}}>
                    Unlock the potential of {service.name}, designed to empower your business with:
                </Typography>

                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CircleIcon sx={{color: "black"}} fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="h6"><strong>Scalable Solutions:</strong> Adjust resources as your needs grow.</Typography>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CircleIcon sx={{color: "black"}} fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="h6"><strong>High Performance:</strong> Optimized for speed and reliability.</Typography>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CircleIcon sx={{color: "black"}} fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="h6"><strong>Secure Infrastructure:</strong> Built with robust security protocols.</Typography>}
                        />
                    </ListItem>
                </List>
            </Container>
            
            {/* Use Cases Section */}
            <Container maxWidth="large" sx={{my: 8, py: 8, backgroundColor: "rgba(0, 0, 0, 0.015)"}}>
                <Container maxWidth="lg">

                    <Typography variant="h4" fontWeight={700} sx={{mb: 8}} textAlign="center">
                        Use Cases
                    </Typography>

                    <Grid container textAlign="center" spacing={10}>

                        <Grid size={{md: 4}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2
                                }}
                            >
                                <SpeedIcon fontSize="large" sx={{mr: 2}} />
                                <Typography variant="h6">Enhanced Performance</Typography>
                            </Box>
                            <Typography variant="body1">
                            Optimize your operations with {service.name}. Whether you're running applications, managing data, or delivering content, this service ensures top-tier performance every time
                            </Typography>
                        </Grid>

                        <Grid size={{md: 4}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2
                                }}
                            >
                                <AttachMoneyIcon fontSize="large" sx={{mr: 2}} />
                                <Typography variant="h6">Cost Efficiency</Typography>
                            </Box>
                            <Typography variant="body1">
                                Reduce overhead and manage your budget effectively. {service.name} helps you save costs by only charging for the resources you use, without compromising quality.
                            </Typography>
                        </Grid>

                        <Grid size={{md: 4}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2
                                }}
                            >
                                <SwapVertIcon fontSize="large" sx={{mr: 2}} />
                                <Typography variant="h6">Seamless Scalability</Typography>
                            </Box>
                            <Typography variant="body1">
                                Easily adjust resources to match your needs. With {service.name}, you can scale up or down in real-time to adapt to fluctuating demands.
                            </Typography>
                        </Grid>

                        <Grid size={{md: 4}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2
                                }}
                            >
                                <SecurityIcon fontSize="large" sx={{mr: 2}} />
                                <Typography variant="h6">Robust Security</Typography>
                            </Box>
                            <Typography variant="body1">
                                Protect sensitive information with the latest security protocols. {service.name} offers encryption, regular updates, and compliance with industry standards.
                            </Typography>
                        </Grid>

                        <Grid size={{md: 4}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2
                                }}
                            >
                                <PublicIcon fontSize="large" sx={{mr: 2}} />
                                <Typography variant="h6">Global Availability</Typography>
                            </Box>
                            <Typography variant="body1">
                                Reach users wherever they are. {service.name} is designed to deliver reliable performance across multiple regions worldwide.
                            </Typography>
                        </Grid>

                        <Grid size={{md: 4}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2
                                }}
                            >
                                <DashboardIcon fontSize="large" sx={{mr: 2}} />
                                <Typography variant="h6">User-Friendly Management</Typography>
                            </Box>
                            <Typography variant="body1">
                                Simplify workflows with intuitive dashboards and tools. {service.name} makes it easy to monitor, control, and customize your operations without technical complexity.
                            </Typography>
                        </Grid>
                        
                    </Grid>

                </Container>
            </Container>
            
            {/* Login Section */}
            <Container maxWidth="large" sx={{py: 4, mb: 8, backgroundColor: "rgba(0, 0, 0, 0.8)"}}>
                <Container maxWidth="sm">
                    <Typography variant="h5" fontWeight={700} sx={{mb: 3}} color="white">
                        Start to use {service.name} now!
                    </Typography>
                    <Button variant="outlined" size="large" href="/login"
                        sx={{
                            backgroundColor: "rgb(63,94,251)",
                            px: 3,
                            py: 1,
                            color: "white",
                            border: "1px solid transparent",
                            "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.4s ease-in-out",
                            boxShadow: "0 4px 10px rgba(63, 94, 251, 0.2)",
                            },
                        }}>
                        Log In to Hire
                    </Button>
                </Container>
            </Container>
            
        </Container>
    )
}