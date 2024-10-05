// src/App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Appointments from "./pages/Appointments";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Counseling from "./pages/Counseling";
import Workshops from "./pages/Workshops";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContactMessages from "./pages/AdminContactMessages";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

const App = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/appointments"
          element={
            isAuthenticated ? <Appointments /> : <Navigate to="/appointments" />
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user/dashboard"
          element={
            isAuthenticated ? (
              <UserDashboard />
            ) : (
              <Navigate to="/user/dashboard" />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated && isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />
        <Route
          path="/admin/contact"
          element={
            isAuthenticated && isAdmin ? (
              <AdminContactMessages />
            ) : (
              <Navigate to="/admin/contact" />
            )
          }
        />
        <Route
          path="/counseling"
          element={
            isAuthenticated ? <Counseling /> : <Navigate to="/counseling" />
          }
        />
        <Route
          path="/workshops"
          element={
            isAuthenticated ? <Workshops /> : <Navigate to="/workshops" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
