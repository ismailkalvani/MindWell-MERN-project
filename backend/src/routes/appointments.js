const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const authenticateToken = require("../middleware/authenticateToken"); // Middleware for authentication
const checkAdmin = require("../middleware/checkAdmin"); // Middleware to check if the user is an admin

// POST /api/appointments
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { message, date, time, service } = req.body;

    // Create a new appointment with user ID and name
    const appointment = new Appointment({
      user: req.user.id, // Get user ID from the decoded token
      name: req.user.name, // Get name from the decoded token
      email: req.user.email, // Get email from the decoded token
      message,
      date,
      time,
      service,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// GET /api/appointments/user - Fetch user-specific appointments
router.get("/user", authenticateToken, async (req, res) => {
  try {
    // Find appointments by user ID from the decoded token
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// GET /api/appointments/admin - Fetch all appointments with user details
router.get("/admin", authenticateToken, checkAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "user",
      "name email"
    );
    console.log("Fetched appointments for admin:", appointments); // Log fetched appointments
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching admin appointments:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// DELETE /api/user/appointments/:id
router.delete("/:id", authenticateToken, async (req, res) => {
  // Corrected to match the API endpoint
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

module.exports = router;
