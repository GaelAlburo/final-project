"use client";

import { Box, Button, Container, IconButton, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ServiceDialog from "../components/service-dialog";

export default function Admin() {

    // State variable to store the services fetched from the API
    const [services, setServices] = useState([]);

    // State variable to store the action to be performed (add, edit)
    const [action, setAction] = useState("");

    // State variable to store the service to be added or edited
    const [serv, setServ] = useState({
        _id: null,
        name: "",
        cost: null,
        company_name: "",
        description: "",
        type: ""
    });

    // State variable to control the visibility of the ServiceDialog component
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    // Function that fetches the services from the API
    const fetchServices = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/services");
            setServices(res.data);
            console.info("Services fetched successfully");
        }
        catch (error) {
            console.error("Error fetching services: ", error);
        }
    }

    // Function that handles the actions to be performed on the services (add, edit)
    const handleService = ({ action, service }) => {
        setAction(action);
        if (action === "add") {
            console.info("Adding new service");
            setServ({
                _id: null,
                name: "",
                cost: 0.0,
                company_name: "",
                description: "",
                type: ""
            });
        }
        else if (action === "edit") {
            console.info("Editing service: ", service);
            setServ(service);
        }
        else {
            console.error("Invalid action: ", action);
        }
        setOpenDialog(true);

    }

    // Function that deletes a service from the database
    const deleteService = async (_id) => {
        try {
            console.info("Deleting service: ", _id);
            const res = await axios.delete(`http://localhost:5000/api/v1/services/${_id}`);
            setServices(services.filter((serv) => serv._id !== _id));
            console.info("Service deleted successfully: ", res.data);
        }
        catch (error) {
            console.error("Error deleting service: ", error);
        }
    }

    // Columns for the DataGrid component. We define an edit and delete button for each row
    const columns = [
        { field: "_id", headerName: "ID", width: 30 },
        { field: "name", headerName: "Name", flex: 1.5 }, //flex means it will take the remaining space
        { field: "company_name", headerName: "Company", flex: 1 },
        { field: "type", headerName: "Type", flex: 1 },
        {
            field: "action",
            headerName: "Actions",
            width: 100,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        sx={{color: "rgb(63,94,251)"}}
                        onClick={() => handleService({ action: "edit", service: params.row })}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => deleteService(params.row._id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Container maxWidth="large" sx={{mt: 6, mb: 10}} disableGutters>

            {/* TITLE */}
            <Container maxWidth="lg" disableGutters>
                <Typography variant="h4" fontWeight={700} component="h1" gutterBottom
                    sx={{
                        background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Welcome to the Admin Page
                </Typography>
            </Container>

            {/* HERO */}
            <Container maxWidth="lg" 
                sx={{
                    border: "1px solid green",
                    backgroundColor: "rgb(63,94,251)",
                    borderRadius: "12px",
                    mt: 2,
                    mb: 8
                }}
            >
                
                <Grid container spacing={2}>

                    <Grid size={{md: 2}}>
                        <Box>
                            <Image src="/admin.svg" width={250} height={250} alt="admin" />
                        </Box>
                    </Grid>

                    <Grid size={{md: 8}} sx={{ml: 12, py: 6}} color="white">
                        <Typography variant="h4" component="h2" gutterBottom sx={{mb: 4}}>
                            USER NAME!
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            This is the admin page where you can manage the 
                                <strong> services</strong> and 
                                <strong> support tickets</strong>. 
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, architecto id?
                        </Typography>
                    </Grid>

                </Grid>

            </Container>
            
            {/* SERVICES AND TICKETS */}
            <Container maxWidth="lg" disableGutters>
                
                <Grid container spacing={6}>

                    { /* SERVICES */}
                    <Grid size={{md: 6}}>

                        {/* TITLE AND ADD BUTTON */}
                        <Box sx={{mb: 2}}>
                            <Typography variant="h5" gutterBottom sx={{mb: 2}}>
                                Services
                            </Typography>

                            <Button variant="outlined"
                                onClick={() => handleService({ action: "add" })}
                                sx={{
                                    color: "rgb(63,94,251)",
                                    borderColor: "rgb(63,94,251)",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        transition: "transform 0.4s ease-in-out",
                                        backgroundColor: "rgba(63, 94, 251, 0.1)"
                                    },
                                }}>
                                Add Service
                            </Button>
                        </Box>
                        
                        <Paper elevation={3}>
                            <DataGrid 
                                columns={columns}
                                rows={services}
                                getRowId={(service) => service._id}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 }
                                    }
                                }}
                                pageSizeOptions={[5, 10]}
                                sx={{
                                    border: "1px solid #DDD",
                                    backgroundColor: "#F9F9F9",
                                    "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
                                    "& .MuiDataGrid-columnHeaders": { borderBottom: "2px solid #DDD" },
                                    "& .MuiDataGrid-columnHeader:focus": { outline: "none", border: "none" },
                                    "& .MuiDataGrid-cell": { backgroundColor: "#F9F9F9" },
                                    "& .MuiDataGrid-cell:focus": { outline: "none", backgroundColor: "#F1F1F1" },
                                    "& .MuiDataGrid-actionsCell": { outline: "none", backgroundColor: "#F1F1F1", border: "none" },
                                    "& .MuiDataGrid-row:focus": { backgroundColor: "#F1F1F1" },
                                    "& .MuiDataGrid-row:hover": { backgroundColor: "#F5F5F5" },
                                    "& .MuiDataGrid-footerContainer": { backgroundColor: "#F1F1F1" },
                                }}
                            />
                        </Paper>

                    </Grid>
                    
                    { /* TICKETS */}
                    <Grid size={{md: 6}}>
                        <Typography variant="h5" gutterBottom>
                            Tickets
                        </Typography>
                        
                        <Paper elevation={3}>
                            <Typography variant="h6" component="p" gutterBottom>
                                Insert TICKETS API
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
                
            
            {/* DIALOG WHEN ADDING OR EDITING A SERVICE */}
            <ServiceDialog 
                open = {openDialog}
                setOpen = {setOpenDialog}
                action = {action}
                serv = {serv}
                setServ = {setServ}
                services = {services}
                setServices = {setServices}
            />

        </Container>
    )
}