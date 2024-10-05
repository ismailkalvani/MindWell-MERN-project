const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const authenticateToken = require("../middleware/authenticateToken");
const checkAdmin = require("../middleware/checkAdmin");

// POST: Save contact message
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Contact message sent successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET: Fetch all contact messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/contact - Fetch all contact messages for the admin
router.get("/", authenticateToken, checkAdmin, async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

//Delete /api/contact/:contact

router.delete("/:contact", authenticateToken, checkAdmin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.contact);

    if (!message) return res.status(404).json({ msg: "Contact not found" });

    res.json({ msg: "Contact deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
