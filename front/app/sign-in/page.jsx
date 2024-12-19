"use client";

import { Box, Button, Container, TextField, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alerts from "../components/alerts";
import { useRouter } from 'next/navigation';
import { useAuth } from "../contexts/SessionContext";

export default function SignIn() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone_number: "",
        country: "",
        city: "",
        state: "",
        usage: "",
        type: "",
    });
    const [alertConfig, setAlertConfig] = useState({
        severity: "",
        message: "",
    });
    const { login, setGlobalCurrentUser, setIsAuthenticated } =
    useAuth();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleUserInfo = (event) => {
        setCurrentUser({
        ...currentUser,
        [event.target.name]: event.target.value,
        });
    };

    const isAUser = async () => {
        try {
            const res = await axios.post("http://localhost:8003/api/v1/is-user", currentUser);
            if(res.status == 200){
                setAlertConfig({
                    severity: "success",
                    message: "Welcome",
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

    const firstValidation = async () => {
        currentUser.email !== "" &&
        currentUser.password !== ""
          ? 
            await isAUser()
          : (setAlertConfig({
              severity: "error",
              message: "Please fill in the required fields",
            }), setOpen(true));
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
                py: 3,
                mt: {
                  xs: 0,
                  sm: 8
                }
            }}
            >
            <Paper
              elevation={7}
              sx={{
                padding: 6,
                mx: 2,
                borderRadius: 2,
                maxWidth: "550px",
                width: "100%",
                my: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h2" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 4,
                    background: '#000',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                Sign In
              </Typography>

                <Box
                  sx={{
                    "& .MuiTextField-root": { mb: 3 },
                    width: {
                      xs: "100%",
                      sm: "80%",	
                    },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    required
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    helperText="Must follow email format: username@domain"
                    variant="outlined"
                    value={currentUser.email}
                    onChange={handleUserInfo}
                    sx={{
                      width: "100%",
                      
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
                  <Box 
                    sx={{ 
                      width: "100%", 
                      display: "flex",
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}
                  >
                    <TextField
                      required
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      variant="outlined"
                      helperText="At least 8 alphanumeric values"
                      value={currentUser.password}
                      onChange={handleUserInfo}
                      sx={{
                        width: "100%",
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
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{mb: 5.5}}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility/>}
                    </IconButton>
                  </Box>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 4,
                      py: 1.5,
                      width: "50%",
                      background: 'linear-gradient(90deg, #FF1B6B 0%, #45CAFF 100%)',
                      "&:hover": {
                        bgcolor: "#232222",
                      },
                      color: "white",
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                    onClick={() => firstValidation()}
                  >
                    Sign In
                  </Button>
                  <Link
                    href="/login"
                    variant="body1"
                    sx={{
                      display: "block",
                      textAlign: "center",
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Create An Account
                  </Link>
                </Box>
            </Paper>
          
            
            <Alerts open={open} setOpen={setOpen} alert={alertConfig} pos={"top"} />
          </Container>
  );
}