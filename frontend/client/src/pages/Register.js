import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const newUser = { name, email, password };

    // Send the registration request to the server
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        newUser
      );
      toast.success("Registration successful! Please login."); // Toast notification
      setTimeout(()=>{navigate("/login");} ,2000 ) // Navigate to login page
       
    } catch (err) {
      // Check if the error response indicates that the user already exists
      if (err.response?.data?.msg === "Email is already registered.") {
        toast.error("Email already exists! Please use a different email.");
        setErrorMessage(err.response?.data?.msg);
      } else {
        toast.error(
          err.response?.data?.msg || "An error occurred during registration"
        );
      }
    }
  };

  return (
    <div className="register-page">
      <ToastContainer />
      <div className="register-form">
        <h2 className="register-title">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              className="form-control"
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm Password"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="mt-3">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
