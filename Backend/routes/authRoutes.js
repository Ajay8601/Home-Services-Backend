// routes/authRoutes.js (Backend)
const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
  const { fullName, email, phone, username, password } = req.body;

  if (!fullName || !email || !phone || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = new User({ fullName, email, phone, username, password });
    await user.save();
    res.status(201).json({ message: "Registration complete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;