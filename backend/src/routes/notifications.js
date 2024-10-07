// src/routes/notifications.js
const express = require("express");
const router = express.Router();
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
router.get("/", authenticateToken, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/notifications/:id - Mark a notification as read
router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    res.json({ message: "Notification marked as read!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
