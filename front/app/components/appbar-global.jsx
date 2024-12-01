"use client";

import { AppBar, Box, Button, Toolbar, Typography, Link, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud';
import FaceIcon from '@mui/icons-material/Face';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useTheme } from "@emotion/react";

export default function AppBarGlobal() {
    const theme = useTheme();

    // Navigation items
    const navItems = [
        { label: "Services", href: "/services" },
        { label: "Pricing", href: "/pricing" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];
    
    // Options for the user menu
    const settings = [
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/settings" },
        { label: "Logout", href: "/logout" },
    ];

    // State to handle the opening and closing of the menu when small screen size
    const [anchorElNav, setAnchorElNav] = useState(null);

    // State to handle the opening and closing of the user menu
    const [anchorElUser, setAnchorElUser] = useState(null);

    // Functions to handle the opening and closing of the menu when small screen size
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    }

    // Function to handle the closing of the menu when small screen size
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    }

    // Functions to handle the opening of the user menu
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    }

    // Function to handle the closing of the user menu
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    }


      return (
        <AppBar position="sticky"
          sx={{backgroundColor: "rgba(255,255,255, 0.2)", backdropFilter: "blur(50px)", borderBottom: "1px solid rgba(0,0,0,0.8)"}}
        >
          <Toolbar>

            {/* Logo on big screens */}
            <CloudIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2, color: "black" }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              Cloud Bridge
            </Typography>
            
            {/* Menu on small screens */}
            <Box sx={{flexGrow: 1, display: {sx: "flex", md: "none"}}}>

              <IconButton
                size="large"
                aria-label="open drawer"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{display: {xs: "block", md: "none"}}}
              >
                {navItems.map((item) => {
                  return(
                    <MenuItem key={item.label} >
                      <Typography sx={{textAlign: "center", color: "black", textDecoration: "none"}} component={Link} href={item.href}>
                        {item.label}
                      </Typography>
                    </MenuItem>
                  )
                })}
              </Menu>

            </Box>
            
            {/* Logo on small screens */}
            <CloudIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "black" }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx = {{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              Cloud Bridge
            </Typography>
            
            {/* Navigation items on big screns */}
            <Box sx={{ flexGrow: 1, ml: 4, display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item) => {
                return (
                  <Button
                    key={item.label}
                    component={Link}
                    href={item.href}
                    onClick={handleCloseNavMenu}
                    sx={{my: 2, mr: 4, color: "inherit", display: "block", color: "black"}}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </Box>
            
            {/* User options menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open user options">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0, color: "black"}}>
                  <FaceIcon />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{mt: 4}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  return (
                    <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                      <Typography sx={{textAlign: "center", color: "black", textDecoration: "none"}} component={Link} href={setting.href}>
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  )
                })}
              </Menu>
            </Box>

          </Toolbar>
        </AppBar>
      );
}