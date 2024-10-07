// src/models/Appointment.js
const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
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
  reason: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "canceled"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["active", "canceled", "rescheduled", "approved"], // Added "approved"
    default: "active",
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
