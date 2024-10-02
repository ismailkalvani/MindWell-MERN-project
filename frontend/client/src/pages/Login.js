// src/pages/Login.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      const token = res.data.token;
      login(token); // Use the login function from context to set token and user state
      toast.success("Logged in successfully!");

      // Redirect based on the user's role
      const decoded = jwtDecode(token);
      setTimeout(() => {
        if (decoded.user.isAdmin) {
          navigate("/");
        } else {
          navigate("/");
        }
      }, 1500); // Delay of 2000ms (2 seconds)
    } catch (err) {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <p className="mt-3">
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
