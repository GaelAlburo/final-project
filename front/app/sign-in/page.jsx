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
import localStorage from "../storage/local-storage";

export default function Services() {

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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleUserInfo = (event) => {
        setCurrentUser({
        ...currentUser,
        [event.target.name]: event.target.value,
        });
    };

    // useEffect hook to fetch the services and types from the backend
    // useEffect(() => {
    //     //fetchReviews();
    //     //fetchTypes();
    // }, [])

    const isAUser = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:5000/api/v1/is-user", currentUser);
            if(res.status == 200){
                setAlertConfig({
                    severity: "success",
                    message: "Welcome",
                  }), 
                  setOpen(true),
                  localStorage.setUserInfo(currentUser)
                  localStorage.setUserLogged('true')
                  router.push('/admin')
            }else{
                localStorage.setUserLogged('false')
            }
        }
        catch (error) {
            localStorage.setUserLogged('false')
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
        }}
        >
      <Paper
        elevation={7}
        sx={{
          padding: 6,
          borderRadius: 2,
          maxWidth: "650px",
          width: "100%",
          my: 8,
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
          Sign In
        </Typography>

            <Box
            sx={{
              "& .MuiTextField-root": { mb: 3 },
            }}
          >
            <Box
              sx={{
                  "& .MuiTextField-root": { mb: 3 },
              }}
            >
            </Box>
            <TextField
              required
              fullWidth
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
            <Box gap={20}>
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
                  width: "85%",
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
                sx={{
                  justifyContent: "center",
                }}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility/>}
              </IconButton>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 4,
                py: 1.5,
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