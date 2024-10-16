// src/models/Appointment.js
const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
  message: {
    type: String,
    required: false,
    default: "No message provided",
  },
  reason: {
    type: String,
    required: false,
    default: "No reason provided",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "canceled"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["pending", "active", "canceled", "rescheduled", "approved"], // Added "pending"
    default: "pending",
  },
  bookedOn: {
    type: Date,
  },
});
// Middleware to set the 'bookedOn' field to the current date/time before saving
AppointmentSchema.pre("save", function (next) {
  if (!this.bookedOn) {
    this.bookedOn = new Date();
  }
  next();
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
