import axios from "axios";
import Alerts from "./alerts";
import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

export default function TicketDialog({open, setOpen, action, ticket, setTicket, tickets, setTickets, openAlert, setOpenAlert, alert, setAlert}) {
    // Function to close the dialog
    const handleCloseDialog = () => {
        setOpen(false);
    }

    // State that stores the response from the admin to the ticket
    const [response, setResponse] = useState("");

    // Funtion that updates the ticket state when the user types in the inputs
    const handleChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        });
    }

    // Function that updates the response state when the user types in the response input
    const handleResponseChange = (e) => {
        setResponse(e.target.value);
    }

    // Function that saves the ticket in the database, handles both add and edit actions
    const saveTicket = async () => {
        if (action === "add") {
            console.info("Adding new ticket: ", ticket);
            try{
                ticket.id_user = tickets.length + 1;
                ticket.date = new Date().toUTCString();
                const res = await axios.post("http://localhost:8001/api/v1/tickets", ticket);
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
                ticket.status = "solved";
                const res = await axios.put(`http://localhost:8001/api/v1/tickets/${ticket._id}`, ticket);
                setTickets(tickets.map((t) => (t._id === ticket._id ? ticket : t)));
                console.info("Ticket edited successfully: ", res.data);
                setAlert({
                    severity: "success",
                    message: "Ticket solved successfully!"
                })
                setResponse("");
            }
            catch (error) {
                console.error("Error solving ticket: ", error);
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
                {action === "edit" ? (
                    <>
                        <Typography variant="body2">
                            Ticket Submitted by {ticket.name_user}
                        </Typography>

                        <TextField
                            margin="dense"
                            name="text"
                            label="Text"
                            fullWidth
                            value={ticket.text}
                            disabled
                            multiline
                            color="info"
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            fullWidth
                            value={response}
                            onChange={handleResponseChange}
                            multiline
                            placeholder="Respond the Ticket"
                            required={true}
                            color="info"   
                        />
                    </>
                ) : (
                    <>
                        <TextField
                            margin="dense"
                            name="name_user"
                            label="User name"
                            fullWidth
                            placeholder="User name"
                            value={ticket.name_user}
                            onChange={handleChange}
                            color="info"
                        />
                        <TextField
                            margin="dense"
                            name="text"
                            label="Text"
                            fullWidth
                            placeholder="Text"
                            value={ticket.text}
                            onChange={handleChange}
                            required={true}
                            color="info"   
                        />
                    </>
                )}
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
                    {action === "add" ? "Add" : "Answer"}
                </Button>
            </DialogActions>
     </Dialog>
    );
}