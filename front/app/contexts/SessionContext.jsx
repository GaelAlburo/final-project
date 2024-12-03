"use client";
// AuthContext.js
import React, { createContext, useContext, useState } from "react";

// We create the context
const AuthContext = createContext();

// Provider to wrap the application
export const AuthProvider = ({ children }) => {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setGlobalCurrentUser] = useState("");

  // Function to log in and set if it's an admin
  const login = (auth, isAdmin) => {
    setIsAdminUser(isAdmin);
    setIsAuthenticated(auth);
  };

 // Function to log out
  const logout = () => {
    setIsAdminUser(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminUser,
        isAuthenticated,
        currentUser,
        setIsAdminUser,
        setIsAuthenticated,
        setGlobalCurrentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => useContext(AuthContext);
