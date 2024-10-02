// routes/user.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authenticateToken = require('../middleware/authenticateToken');

// GET user-specific appointments
router.get('/appointments', authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ email: req.user.email });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE user-specific appointment
router.delete('/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      email: req.user.email,
    });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
