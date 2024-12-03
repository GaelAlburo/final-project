"use client";

import { Box, Button, Container, TextField, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Alerts from "../components/alerts";
import { useRouter } from 'next/navigation';
import { useAuth } from "../contexts/SessionContext";

export default function Profile() {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { login, setGlobalCurrentUser, setIsAuthenticated, currentUser} = useAuth();
    const [editedUser, setCurrentUser] = useState(currentUser);
    const [alertConfig, setAlertConfig] = useState({
        severity: "",
        message: "",
    });
    const [nameButton, setNameButton] = useState(true)
    const [phoneNumberButton, setPhoneNumberButton] = useState(true)
    const [cityButton, setCityButton] = useState(true)
    const [errorBool, setErrorBool] = useState(true)
    const [helperTextPhone, setHelperTextPhone] = useState('phone number length must be 10 digits')

    const handleUserInfo = (event) => {
        setCurrentUser({
        ...editedUser,
        [event.target.name]: event.target.value,
        });
        if(event.target.name == "name"){
          setNameButton(false)
        }else if(event.target.name == "phone_number"){
          event.target.value > 1111111111 && event.target.value < 9999999999 ?
            (
                setErrorBool(false),
                setHelperTextPhone(''),
                setPhoneNumberButton(false)
            )
            :
            (
                setErrorBool(true),
                setHelperTextPhone('phone number length must be 10 digits'),
                setPhoneNumberButton(true)
            )
        }else if(event.target.name == "city"){
          setCityButton(false)
        }
    }

    const editAUser = async () => {
        try {
            const res = await axios.put(`http://localhost:8003/api/v1/users/${currentUser._id}`, currentUser);
            if(res.status == 200){
                setAlertConfig({
                    severity: "success",
                    message: "Edited successfuly",
                  }), 
                  setOpen(true),
                  setIsAuthenticated('true')
                  login('true', 'true')
                  setGlobalCurrentUser(res.data.user_info)
                  router.push('/admin')
            }else{
                setIsAuthenticated('false')
            }
        }
        catch (error) {
            setIsAuthenticated('false')
            try {
                if(error.response.status == 400){
                    setAlertConfig({
                        severity: "error",
                        message: error.response.data.Error,
                    })
                    setOpen(true)
                }else{
                    setAlertConfig({
                        severity: "error",
                        message: "Server error",
                    })
                    setOpen(true)
                }
            } catch (error) {
                setAlertConfig({
                    severity: "error",
                    message: "Server error",
                })
                setOpen(true)
            }
        }
    }

    const closeAccount = async () => {
      try {
        editedUser.type = currentUser.type
        const res = await axios.delete(`http://localhost:8003/api/v1/users/${currentUser._id}`, currentUser);
        if(res.status == 200){
            setAlertConfig({
                severity: "success",
                message: "Account deleted",
              }), 
              setOpen(true),
              setIsAuthenticated('false')
              login('false', 'false')
              setGlobalCurrentUser("")
              router.push('/')
        }else{
            setIsAuthenticated('true')
        }
    }
    catch (error) {
        setIsAuthenticated('true')
        console.log(error)
        try {
            if(error.response.status == 400){
                setAlertConfig({
                    severity: "error",
                    message: error.response.data.Error,
                })
                setOpen(true)
            }else{
                setAlertConfig({
                    severity: "error",
                    message: "Server error",
                })
                setOpen(true)
            }
        } catch (error) {
            setAlertConfig({
                severity: "error",
                message: "Server error",
            })
            setOpen(true)
        }
    }
      };

    return (
        <Container
        maxWidth="xl"
        disableGutters
        sx={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
        <Paper
            sx={{
            padding: 6,
            
            width: "100%",
            }}
        >
        <Typography variant="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              background: '#000',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
          Account
        </Typography>

            <Paper
            sx={{
              "& .MuiTextField-root": { mb: 3 },
              m:5,
              padding:3
            }}
          >
            <Paper
              sx={{
                  "& .MuiTextField-root": { mb: 3 },
                  m:5,
                  padding:5
              }}
            >
              <Typography variant="h7" 
                sx={{ 
                  fontWeight: 'bold',
                  mt: 5,
                  background: '#000',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              Account Settings
            </Typography>
            
            <TextField
              required
              fullWidth
              disabled
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              value={currentUser.email}
              onChange={handleUserInfo}
              sx={{
                mt: 5,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.400",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "grey.700",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey.600",
                  "&.Mui-focused": {
                    color: "grey.700",
                  },
                },
              }}
            />
            <Box alignItems={'center'} display={'flex'} gap={5}>
            <TextField
              required
              id="name"
              label="Name"
              name="name"
              variant="outlined"
              value={currentUser.name}
              onChange={handleUserInfo}
              sx={{
                width: '80%',
                mt: 5,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.400",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "grey.700",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey.600",
                  "&.Mui-focused": {
                    color: "grey.700",
                  },
                },
              }}
            />
            <Button disabled={nameButton} color="success" variant="outlined" onClick={()=>  editAUser()}>Save</Button>
            </Box>

            <Box alignItems={'center'} display={'flex'} gap={5}>
            <TextField
              required
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              helperText={helperTextPhone}
              variant="outlined"
              error={errorBool}
              type="number"
              value={currentUser.phone_number}
              onChange={handleUserInfo}
              sx={{
                width: '80%',
                mt: 5,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.400",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "grey.700",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey.600",
                  "&.Mui-focused": {
                    color: "grey.700",
                  },
                },
              }}
            />
            <Button disabled={phoneNumberButton} color="success" variant="outlined" onClick={()=>  editAUser()}>Save</Button>
            </Box>
            </Paper>

            <Paper
              sx={{
                  "& .MuiTextField-root": { mb: 3 },
                  m:5,
                  padding:5
              }}
            >
              <Typography variant="h7" 
                sx={{ 
                  fontWeight: 'bold',
                  mt: 5,
                  background: '#000',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              Account Information
            </Typography>
            <Box alignItems={'center'} display={'flex'} gap={5}>
            <TextField
              required
              id="city"
              label="City"
              name="city"
              variant="outlined"
              type="number"
              value={currentUser.city}
              onChange={handleUserInfo}
              sx={{
                width: '80%',
                mt: 5,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.400",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "grey.700",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey.600",
                  "&.Mui-focused": {
                    color: "grey.700",
                  },
                },
              }}
            />
            <Button disabled={cityButton} color="success" variant="outlined" onClick={()=>  editAUser()}>Save</Button>
            </Box>

            <Box alignItems={'center'} display={'flex'} gap={5}>
            <TextField
              required
              id="state"
              label="State"
              name="state"
              variant="outlined"
              type="number"
              value={currentUser.state}
              onChange={handleUserInfo}
              sx={{
                width: '80%',
                mt: 5,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.400",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "grey.700",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "grey.600",
                  "&.Mui-focused": {
                    color: "grey.700",
                  },
                },
              }}
            />
            <Button disabled={cityButton} color="success" variant="outlined" onClick={()=>  editAUser()}>Save</Button>
            </Box>


            </Paper>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 4,
                py: 1.5,
                textTransform: "none",
                fontSize: "1rem",
              }}
              onClick={() => closeAccount()}
            >
              Close Account
            </Button>
          </Paper>
      </Paper>
    
      
      <Alerts open={open} setOpen={setOpen} alert={alertConfig} pos={"top"} />
    </Container>
  );
}