const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();
// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body; // Only receive name, email, password from frontend

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "Email is already registered.",
      });
    }

    // Default isAdmin to false when registering from this route
    user = new User({ name, email, password, isAdmin: false });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        name: user.name, // Include name in the payload
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name, 
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Logged-In User
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
