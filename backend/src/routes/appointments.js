// src/routes/appointments.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const authenticateToken = require("../middleware/authenticateToken");
const checkAdmin = require("../middleware/checkAdmin");
const Notification = require("../models/Notification");

// POST /api/appointments - Book an appointment
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { message, date, time, service } = req.body;

    const appointment = new Appointment({
      user: req.user.id,
      name: req.user.name,
      email: req.user.email,
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
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// GET /api/appointments/admin - Fetch all appointments (admin only)
router.get("/admin", authenticateToken, checkAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "user",
      "name email"
    );
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching admin appointments:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// PUT /api/appointments/admin/:id - Admin action: Approve, cancel, reschedule
router.put("/admin/:id", authenticateToken, checkAdmin, async (req, res) => {
  try {
    const { status, reason, newDate, newTime } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (status) appointment.status = status;
    if (reason) appointment.reason = reason;
    if (newDate) appointment.date = newDate;
    if (newTime) appointment.time = newTime;

    await appointment.save();
    // Create a notification for the user
    const notification = new Notification({
      userId: appointment.user,
      message: `Your appointment on ${appointment.date} has been approved.`,
    });
    res.json({ message: "Appointment updated successfully!" });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// PATCH /api/appointments/:id/approve - Approve an appointment (admin only)
router.patch(
  "/:id/approve",
  authenticateToken,
  checkAdmin,
  async (req, res) => {
    try {
      const { reason } = req.body;
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment)
        return res.status(404).json({ message: "Appointment not found" });

      appointment.status = "approved";
      appointment.reason = reason || "Approved by admin";
      await appointment.save();

      // Create a notification
      const notification = new Notification({
        userId: appointment.user,
        message: `Your appointment on ${appointment.date.toDateString()} has been approved.`,
      });
      await notification.save();

      res.json({ message: "Appointment approved successfully!" });
    } catch (error) {
      console.error("Error approving appointment:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// PATCH /api/appointments/:id/reschedule - Reschedule an appointment
router.patch(
  "/:id/reschedule",
  authenticateToken,
  checkAdmin,
  async (req, res) => {
    try {
      const { date, time } = req.body;
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment)
        return res.status(404).json({ message: "Appointment not found" });

      appointment.date = date;
      appointment.time = time;
      await appointment.save();

      // Create a notification
      const notification = new Notification({
        userId: appointment.user,
        message: `Your appointment on ${appointment.date} has been rescheduled.`,
      });
      await notification.save();

      res.json({ message: "Appointment rescheduled successfully!" });
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE /api/appointments/:id - Delete an appointment (admin only)
router.delete("/:id", authenticateToken, checkAdmin, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/appointments/:id/cancel - Cancel an appointment
router.patch("/:id/cancel", authenticateToken, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, {
      status: "canceled",
    });
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment canceled successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch(
  "/:id/approve",
  authenticateToken,
  checkAdmin,
  async (req, res) => {
    try {
      const { status, reason } = req.body; // Expecting status and reason from request body
      const appointment = await Appointment.findByIdAndUpdate(req.params.id, {
        status,
        reason,
      });
      if (!appointment)
        return res.status(404).json({ message: "Appointment not found" });

      appointment.status = "approved";
      await appointment.save();

      // Create a notification for the user
      const notification = new Notification({
        userId: appointment.user,
        message: `Your appointment on ${appointment.date} has been approved.`,
      });
      await notification.save();

      res.json({ message: "Appointment approved successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
