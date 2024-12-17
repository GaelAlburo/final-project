"use client";

import { Box, Button, Checkbox, Chip, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "../contexts/SessionContext";

export default function Services() {

    // State variable for the checkbox
    const [checked, setChecked] = useState([""]);

    // State variable for the selected types
    const [selectedType, setSelectedType] = useState(["All"]);

    // State variable for the selected services based on the selected types filter
    const [selectedServices, setSelectedServices] = useState([]);

    // State variable for the services
    const [services, setServices] = useState([]);

    // State variable for the types
    const [types, setTypes] = useState([]);

    // Auth context
    const {idAdminUser, isAuthenticated, currentUser} = useAuth();

    // State variable for the button configuration
    const [configButton1, setConfigButton1] = useState({
        label: "Start by Logging In",
        href: "/login",
    })

    // If the user is authenticated, we change the button configuration
    if (isAuthenticated) {
        setConfigButton1({
            label: "View my Services",
            href: "/bills",
        })
    }

    if(isAuthenticated == 'true'){
        setConfigButton1({label: 'Hire Service', href: "/"})
    }

    // useEffect hook to fetch the services and types from the backend
    useEffect(() => {
        fetchReviews();
        fetchTypes();
    }, [])

    // Function that fetches the services from the backend
    const fetchReviews = async () => {
        try{
            const res = await axios.get("http://localhost:5000/api/v1/services");
            setServices(res.data);
            console.info("Data fetched: ", res.data);
        }
        catch (error) {
            console.error("Error fetching services data: ", error);
        }
    }

    // Function that fetches the types of services from the backend
    const fetchTypes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/services/types");
            setTypes(res.data);
            console.info("Types fetched: ", res.data);
        }
        catch (error) {
            console.error("Error fetching types data: ", error);
        }
    }

    // Function that handles the checkbox toggle
    // It updates the selected types and services based on the selected types
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        const newSelectedType = [...selectedType];

        if (currentIndex === -1) {
            newChecked.push(value);
            newSelectedType.push(value);
        }
        else {
            newChecked.splice(currentIndex, 1);
            newSelectedType.splice(currentIndex, 1);
        }

        const currServs = services.filter((serv) => newSelectedType.includes(serv.type));

        setSelectedType(newSelectedType);
        setChecked(newChecked);
        setSelectedServices(currServs);
    }

    // Function that handles the deletion of a selected type through the chips component in the UI
    const handleDelete = (type) => {
        const newSelectedType = [...selectedType];
        const newChecked = [...checked];

        const index = newSelectedType.indexOf(type);
        newSelectedType.splice(index, 1);
        newChecked.splice(index, 1);

        const currServs = services.filter((serv) => newSelectedType.includes(serv.type));

        setChecked(newChecked);
        setSelectedType(newSelectedType);
        setSelectedServices(currServs);
    }

    return (
        <Container maxWidth="lg" disableGutters>
            {/* HERO */}
            <Grid container spacing={2}
                sx={{
                    mt: 4,
                    mb: 8,
                    mx: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <Grid size={{xs: 12, md: 7}}
                    sx={{
                        textAlign: {
                            xs: "center",
                            md: "left"
                        }
                    }}
                >
                    <Box>
                        <Typography variant="h2" fontWeight={700}
                            sx={{
                                mt: 10, 
                                background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Cloud Bridge Services
                        </Typography>
                        <Typography variant="body1" sx={{mt: 5}}>
                            We provide a range of services to help you get the most out of your cloud infrastructure.
                            To hire our services, you just need to log in to your account or create a new one.
                        </Typography>
                        
                        <Box
                            sx={{
                                display: {
                                    xs: "flex",
                                    sm: "inline"
                                },
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Button variant="contained" size="large" href={configButton1.href}
                                sx={{
                                    backgroundColor: "rgb(63,94,251)",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        transition: "transform 0.4s ease-in-out",
                                    },
                                    mt: {
                                        xs: 2,
                                        sm: 4
                                    }
                                }}>
                                {configButton1.label}
                            </Button>
                            <Button variant="outlined" size="large" href="/pricing"
                                sx={{
                                    color: "rgb(63,94,251)",
                                    borderColor: "rgb(63,94,251)",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        transition: "transform 0.4s ease-in-out",
                                        backgroundColor: "rgba(63, 94, 251, 0.1)"
                                    },
                                    mt: {
                                        xs: 2,
                                        sm: 4
                                    },
                                    ml: {
                                        xs: 0,
                                        sm: 4
                                    }
                                }}>
                                Information About Pricing
                            </Button>
                        </Box>
                        
                    </Box>
                </Grid>

                <Grid size={{xs: 12, md: 5}}
                    sx={{
                        display: {
                            xs: "flex",
                            md: "inline"
                        },
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: {
                                xs: 400,
                                md: "auto"
                            },
                            height: {
                                xs: 300,
                                md: "auto"
                            },
                            pt: 4,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Image src="/services.svg" alt="cloud-service" width={600} height={600} layout="responsive" objectFit="cover"/>
                    </Box>
                </Grid>
            </Grid>


            {/* SERVICES */}
            <Grid container spacing={2}
                sx={{
                    mb: 6, 
                    mx: 2
                }}
            >
                <Grid size={{xs: 12, md: 3}}
                    sx={{
                        display: {
                            xs: "flex",
                            md: "inline"
                        },
                        flexDirection: "column",
                        justifyContent: "center",	
                        alignItems: "center",
                        mb: {
                            xs: 4,
                            md: 0
                        }
                    }}
                >
                    
                    {/* CHECKLIST */}
                    <Paper elevation={3} 
                        sx={{
                            maxWidth: {
                                md: 250
                            },
                            width: {
                                xs: "80%",
                                md: "auto"
                            },
                            p: 0
                        }}
                    >
                        <List 
                            sx={{ 
                                width: '100%', 
                                my: {
                                    xs: 0,
                                    md: 4
                                },
                                pt: 2, 
                                display: {
                                    xs: "flex",
                                    md: "block"
                                },
                                flexWrap: "wrap",
                                justifyContent: "center",
                                alignContent: "center",
                                
                            }}
                            subheader={
                                <ListSubheader
                                    sx={{
                                        mb: 2,
                                        pb: 1, 
                                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                                        width: "100%",
                                        textAlign: {
                                            xs: "center",
                                            md: "left"
                                        }
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={700}>
                                        Filter By Type:
                                    </Typography>
                                </ListSubheader>
                            }
                        >
                            {types.map((type) => {
                                return (
                                    <ListItem
                                        key={type}
                                        disablePadding
                                        sx={{
                                            width: {
                                                xs: 200,
                                                md: "auto"
                                            }
                                        }}
                                    >
                                        <ListItemButton role="undefined" onClick={handleToggle(type)}>
                                            <ListItemIcon>
                                                <Checkbox 
                                                    edge="start"
                                                    checked={checked.includes(type)}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{'aria-labelledby': `checkbox-list-label-${type}`}}
                                                    sx={{
                                                        "&.Mui-checked": {
                                                            color: "rgb(63,94,251)"
                                                        }
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={type} primary={`${type}`} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Paper>
                </Grid>
                
                {/* SERVICE LIST */}
                <Grid size={{xs: 12, md: 9}}>
                    
                    {selectedType.length == 1
                        /* If only one type is selected means there is no filter selected, so we show all services */
                        ? 
                            <Box>
                                <Typography variant="h4" fontWeight={700} ml={2} my={4}
                                    sx={{
                                        textAlign: {
                                            xs: "center",
                                            md: "left"
                                        }
                                    }}
                                >
                                    {selectedType} Services
                                </Typography>
                                <Grid container>

                                    {services.map((serv) => {
                                        return(
                                            <Grid size={{xs: 12, sm: 6, lg: 4}} key={serv._id} component={Link} href={`/services/${serv._id}`}
                                                sx={{textDecoration: "none"}}
                                            >
                                                <Paper
                                                    sx={{
                                                        height: 250,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        padding: 2,
                                                        m: 2,
                                                        "&:hover": {
                                                            transform: "scale(1.05)",
                                                            transition: "transform 0.4s ease-in-out",
                                                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                                        },
                                                    }}
                                                >
                                                    <Typography variant="h5" fontWeight={700} mb={2}>
                                                        {serv.name}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {serv.description}
                                                    </Typography>
                                                    <Typography variant="body1" sx={{mt: 2}}>
                                                        <strong>Cost:</strong> ${serv.cost}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        <strong>Company:</strong> {serv.company_name}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                        /* If more than one type is selected, we show the services of the selected types */
                        : 
                            <Box>
                                <Stack direction="row" spacing={1}
                                    sx={{
                                        flexWrap: "wrap",
                                        justifyContent: {
                                            xs: "center",
                                            md: "flex-start"
                                        },
                                        alignItems: "center",
                                        gap: 1,
                                        ml: {
                                            xs: 0,
                                            md: 2
                                        }
                                    }}
                                >
                                    {selectedType.map((type) => {
                                        if (type == "All") return;
                                        return (
                                            <Chip label={type} key={type} onClick={() => (handleDelete(type))} onDelete={() => handleDelete(type)}>
                                                {type}
                                            </Chip>
                                        )
                                    })}
                                </Stack>
                                {selectedType.map((type) => {
                                    return(
                                        <Box key={type}>
                                            {type != "All" && <Typography variant="h4" fontWeight={700} ml={2} my={4}>{type} Services</Typography>}
                                            <Grid container>
                                                {selectedServices.filter((serv) => serv.type == type).map((serv) => {
                                                    return (
                                                        <Grid size={{xs: 12, sm: 6, lg: 4}} key={serv._id} component={Link} href={`/services/${serv._id}`}
                                                            sx={{textDecoration: "none"}}
                                                        >
                                                            <Paper
                                                                sx={{
                                                                    height: 250,
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    justifyContent: "center",
                                                                    padding: 2,
                                                                    m: 2,
                                                                    "&:hover": {
                                                                        transform: "scale(1.05)",
                                                                        transition: "transform 0.4s ease-in-out",
                                                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                                                    },
                                                                }}
                                                            >
                                                                <Typography variant="h5" fontWeight={700} mb={2}>
                                                                    {serv.name}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {serv.description}
                                                                </Typography>
                                                                <Typography variant="body1" sx={{mt: 2}}>
                                                                    <strong>Cost:</strong> ${serv.cost}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    <strong>Company:</strong> {serv.company_name}
                                                                </Typography>
                                                            </Paper>
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        </Box>
                                    )
                                })}
                        </Box>                    
                    }
                </Grid>
            </Grid>
        </Container>
    );
}