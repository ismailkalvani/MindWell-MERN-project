// routes/admin.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authenticateToken = require('../middleware/authenticateToken');
const checkAdmin = require('../middleware/checkAdmin');

// GET all appointments
router.get('/appointments', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE an appointment
router.delete('/appointments/:id', authenticateToken, checkAdmin, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
