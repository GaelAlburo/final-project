import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import Alerts from "./alerts";

export default function ServiceDialog({open, setOpen, action, serv, setServ, services, setServices, openAlert, setOpenAlert, alert, setAlert}) {
    // Function to close the dialog
    const handleCloseDialog = () => {
        setOpen(false);
    }

    // Funtion that updates the service state when the user types in the inputs
    const handleChange = (e) => {
        setServ({
            ...serv,
            [e.target.name]: e.target.value
        });
    }

    // Function that saves the service in the database, handles both add and edit actions
    const saveService = async () => {
        if (action === "add") {
            console.info("Adding new service: ", serv);
            try{
                serv.cost = parseFloat(serv.cost);
                const res = await axios.post("http://localhost:8000/api/v1/services", serv);
                setServices([...services, res.data]);
                console.info("Service added successfully: ", res.data);
                setAlert({
                    severity: "success",
                    message: "Service added successfully!"
                })
            }
            catch (error) {
                console.error("Error adding service: ", error);
                setAlert({
                    severity: "error",
                    message: error.response.data.error
                })
            }
        }
        else if (action === "edit") {
            console.info("Editing service: ", serv);
            try {
                serv.cost = parseFloat(serv.cost);
                const res = await axios.put(`http://localhost:8000/api/v1/services/${serv._id}`, serv);
                setServices(services.map((s) => (s._id === serv._id ? res.data : s)));
                console.info("Service edited successfully: ", res.data);
                setAlert({
                    severity: "success",
                    message: "Service edited successfully!"
                })
            }
            catch (error) {
                console.error("Error editing service: ", error);
                setAlert({
                    severity: "error",
                    message: error.response.data.error
                })
            }
        }
        else {
            console.error("Invalid action: ", action);
            setAlert({
                severity: "error",
                message: "Invalid action!"
            })
        }
        setOpenAlert(true);
        handleCloseDialog();
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{action === "add" ? "Add Service" : "Edit Service"}</DialogTitle>
            <DialogContent>

                <TextField 
                    margin="dense"
                    name="name"
                    label="Name"
                    fullWidth
                    value={serv.name}
                    onChange={handleChange}
                    placeholder="Service name"
                    required={true}
                    color="info"
                />

                <TextField 
                    margin="dense"
                    name="company_name"
                    label="Company"
                    fullWidth
                    value={serv.company_name}
                    onChange={handleChange}
                    placeholder="Service company"
                    required={true}
                    color="info"
                />

                <TextField 
                    margin="dense"
                    name="description"
                    label="Description"
                    fullWidth
                    value={serv.description}
                    onChange={handleChange}
                    placeholder="Service description"
                    required={true}
                    color="info"
                />

                <TextField 
                    margin="dense"
                    name="cost"
                    label="Cost"
                    fullWidth
                    value={serv.cost}
                    onChange={handleChange}
                    placeholder="Service cost"
                    required={true}
                    color="info"
                />

                <TextField 
                    margin="dense"
                    name="type"
                    label="Type"
                    fullWidth
                    value={serv.type}
                    onChange={handleChange}
                    placeholder="Service type"
                    required={true}
                    color="info"
                />

            </DialogContent>

            <DialogActions>

                <Button color="primary" onClick={handleCloseDialog}
                    sx={{
                        "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.4s ease-in-out",
                        },
                    }}
                >
                    Cancel
                </Button>

                <Button onClick={saveService} 
                    sx={{
                        color: "rgb(63,94,251)",
                        "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.4s ease-in-out",
                            backgroundColor: "rgba(63, 94, 251, 0.1)"
                        },
                    }}
                >
                    {action === "add" ? "Add" : "Edit"}
                </Button>

            </DialogActions>
        </Dialog>
    )
}