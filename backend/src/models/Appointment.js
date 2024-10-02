// src/models/Appointment.js
const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  name: {
    // Store the user's name
    type: String,
    required: true,
  },
  email: {
    // Store the user's email
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
