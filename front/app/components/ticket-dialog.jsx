import axios from "axios";
import Alerts from "./alerts";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

export default function TicketDialog({open, setOpen, action, ticket, setTicket, tickets, setTickets, openAlert, setOpenAlert, alert, setAlert}) {
    // Function to close the dialog
    const handleCloseDialog = () => {
        setOpen(false);
    }

    // Funtion that updates the ticket state when the user types in the inputs
    const handleChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        });
    }

    // Function that saves the ticket in the database, handles both add and edit actions
    const saveTicket = async () => {
        if (action === "add") {
            console.info("Adding new ticket: ", ticket);
            try{
                const res = await axios.post("http://localhost:5000/api/v1/tickets", ticket);
                setTickets([...tickets, res.data]);
                console.info("Ticket added successfully: ", res.data);
                setAlert({
                    severity: "success",
                    message: "Ticket added successfully!"
                })
            }
            catch (error) {
                console.error("Error adding ticket: ", error);
                setAlert({
                    severity: "error",
                    message: error.response.data.error
                })
            }
        }
        else if (action === "edit") {
            console.info("Editing ticket: ", ticket);
            try {
                const res = await axios.put(`http://localhost:5000/api/v1/tickets/${ticket._id}`, ticket);
                setTickets(tickets.map((t) => (t._id === ticket._id ? res.data : t)));
                console.info("Ticket edited successfully: ", res.data);
                setAlert({
                    severity: "success",
                    message: "Ticket edited successfully!"
                })
            }
            catch (error) {
                console.error("Error editing ticket: ", error);
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
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{action === "add" ? "Add Ticket" : "Edit Ticket"}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="name"
                    label="Name"
                    fullWidth
                    value={ticket.name}
                    onChange={handleChange}
                    placeholder="Enter the ticket name"
                    required={true}
                    color="info"
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    fullWidth
                    value={ticket.description}
                    onChange={handleChange}
                    placeholder="Enter the ticket description"
                    required={true}
                    color="info"   
                />
                <TextField
                    margin="dense"
                    name="status"
                    label="Status"
                    fullWidth
                    value={ticket.status}
                    onChange={handleChange}
                    placeholder="Enter the ticket status"
                    required={true}
                    color="info"
                />
                <TextField
                    margin="dense"
                    name="date"
                    label="Date"
                    fullWidth
                    value={ticket.date}
                    onChange={handleChange}
                    placeholder="Enter the ticket date"
                    required={true}
                    color="info"
                />
                <TextField
                    margin="dense"
                    name="user_id"
                    label="User ID"
                    fullWidth
                    value={ticket.user_id}
                    onChange={handleChange}
                    placeholder="Enter the ticket user ID"
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
                <Button onClick={saveTicket} 
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
    );
}