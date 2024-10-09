// src/routes/notifications.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Notification = require("../models/Notification");
const authenticateToken = require("../middleware/authenticateToken");

// POST /api/notifications - Create a new notification
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;

    const notification = new Notification({
      userId: req.user.id,
      message,
    });

    await notification.save();
    res.status(201).json({ message: "Notification created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/notifications - Get notifications for a user
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
      read: false,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/notifications/:id/mark-read - Mark a notification as read
router.patch("/:id/mark-read", authenticateToken, async (req, res) => {
  try {
    const notificationId = req.params.id;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return res.status(400).json({ message: "Invalid notification ID" });
    }

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
