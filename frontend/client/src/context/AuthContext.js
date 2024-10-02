// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setIsAdmin(decoded.user.isAdmin);
      } catch (err) {
        console.error("Invalid token", err);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token); // Store token in localStorage
    const decoded = jwtDecode(token);
    setIsAuthenticated(true);
    setIsAdmin(decoded.user.isAdmin);
     
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
