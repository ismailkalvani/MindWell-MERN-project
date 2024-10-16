import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null); // Add user state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setIsAdmin(decoded.user.isAdmin);
        setUser(decoded.user); // Set user details
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
    setUser(decoded.user); // Set user details
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null); // Clear user details on logout
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
