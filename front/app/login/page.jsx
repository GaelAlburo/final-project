"use client";

import { Box, Button, Container, TextField, Paper, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alerts from "../components/alerts";
import { useRouter } from 'next/navigation';
import { useAuth } from "../contexts/SessionContext";

export default function Services() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [open, setOpen] = useState(false);
    const [secondaryInfo, setsecondaryInfo] = useState(false);
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
    const [errorBool, setErrorBool] = useState(true)
    const [helperTextPhone, setHelperTextPhone] = useState('phone number length must be 10 digits')
    const usageTypes = ["Personal", "Business"]
    const availableCountries = ["México", "EUA", "Canadá"]
    const { setGlobalCurrentUser, isAuthenticated, setIsAuthenticated } =
    useAuth();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    
    const validateEmail = async () => {
        try {
            const res = await axios.post("http://localhost:8003/api/v1/validate-email", currentUser);
            if(res.status == 200){
                setsecondaryInfo(true)
            }
        }
        catch (error) {
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

    const createUser = async () => {
        try {
            const res = await axios.post("http://localhost:8003/api/v1/users", currentUser);
            if(res.status == 200){
                setIsAuthenticated('true')
                setGlobalCurrentUser(currentUser)
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

    const handleUserInfo = (event) => {
        setCurrentUser({
        ...currentUser,
        [event.target.name]: event.target.value,
        });
        if(event.target.name == 'phone_number'){
            event.target.value > 1111111111 && event.target.value < 9999999999 ?
            (
                setErrorBool(false),
                setHelperTextPhone('')
            )
            :
            (
                setErrorBool(true),
                setHelperTextPhone('phone number length must be 10 digits')
            )
        }
    };

    const firstValidation = async () => {
        currentUser.name !== "" &&
        currentUser.email !== "" &&
        currentUser.password !== "" &&
        currentUser.confirmPassword !== ""
          ? (
            currentUser.password === currentUser.confirmPassword ?
            (
                await validateEmail()
            )
            : (setAlertConfig({
              severity: "error",
              message: "Passwords entered do not match",
            }), setOpen(true)))
          : (setAlertConfig({
              severity: "error",
              message: "Please fill in the required fields",
            }), setOpen(true));
    };

    const isAUser = async () => {
        currentUser.email !== "" &&
        currentUser.password !== "" &&
        currentUser.confirmPassword !== "" &&
        currentUser.name !== "" &&
        currentUser.phone_number !== "" &&
        currentUser.usage !== ""
          ? (
                await createUser(),
                setOpen(true)
            )
          : setAlertConfig({
              severity: "error",
              message: "Please fill in the required fields",
            });
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
          Login
        </Typography>

        
        { secondaryInfo == false ?
            
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
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              variant="outlined"
              value={currentUser.name}
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
            <Box gap={20}>
            <TextField
                required
                name="confirmPassword"
                label="Confirm password"
                type={showPassword2 ? "text" : "password"}
                id="confirmPassword"
                autoComplete="current-password"
                variant="outlined"
                helperText="Must be the same that has been entered"
                value={currentUser.confirmPassword}
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
                }}
              />
              <IconButton
                onClick={handleClickShowPassword2}
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
              Next
            </Button>
            <Link
              href="/sign-in"
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
              Have Already An Account
            </Link>
          </Box>


          :


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
            <TextField
                required
                fullWidth
                disabled
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                variant="outlined"
                value={currentUser.name}
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
            </Box>
            <TextField
                required
                fullWidth
                disabled
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
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

            <TextField
                required
                fullWidth
                type="number"
                id="phone_number"
                label="Phone_number"
                name="phone_number"
                autoComplete="phone_number"
                helperText={helperTextPhone}
                autoFocus
                variant="outlined"
                error={errorBool}
                value={currentUser.phone_number}
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

            <Box mb={3} alignContent={"center"} justifyContent={'center'}>
                <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Country</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                > 
                    {availableCountries.map((index) =>
                        <FormControlLabel key={index} value={index} onClick={() => handleUserInfo({
                            target:{
                                name: 'country',
                                value: index
                            }
                        })} control={<Radio />} label={index} />
                    )}
                </RadioGroup>
                </FormControl>
            </Box>

            <TextField
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                autoFocus
                variant="outlined"
                value={currentUser.city}
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

            <TextField
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                autoFocus
                variant="outlined"
                value={currentUser.state}
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

            <Box>
                <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Usage</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                > 
                    {usageTypes.map((index) =>
                        <FormControlLabel key={index} value={index} onClick={() => handleUserInfo({
                            target:{
                                name: 'usage',
                                value: index
                            }
                        })} control={<Radio />} label={index} />
                    )}
                    
                </RadioGroup>
                </FormControl>
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                href={'/admin'}
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
                onClick={() => isAUser()}
            >
                Create Account
            </Button>
        </Box>
        }
      </Paper>
    
      
      <Alerts open={open} setOpen={setOpen} alert={alertConfig} pos={"top"} />
    </Container>
  );
}