const express = require("express");
const { User, ServiceProvider } = require("../models/user");
const connectDB = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();

// ================= USER REGISTRATION =================
router.post("/user/register", async (req, res) => {
  try {
    await connectDB();
    const { fullName, email, phone, username, password } = req.body;

    if (!fullName || !email || !phone || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      phone,
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registration successful" });
  } catch (error) {
    console.error("User Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ================= USER LOGIN =================
router.post("/user/login", async (req, res) => {
  try {
    await connectDB();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("User Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ================= SERVICE PROVIDER REGISTRATION =================
router.post("/serviceprovider/register", async (req, res) => {
  try {
    await connectDB();
    const { name, email, phone, username, password, serviceType, experience, location } = req.body;

    if (!name || !email || !phone || !username || !password || !serviceType || experience === undefined || !location) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const expYears = Number(experience);
    if (isNaN(expYears) || expYears < 0) {
      return res.status(400).json({ success: false, message: "Experience must be a non-negative number" });
    }

    const existingSP = await ServiceProvider.findOne({ $or: [{ email }, { username }] });
    if (existingSP) {
      return res.status(400).json({
        success: false,
        message: existingSP.email === email ? "Email already exists" : "Username already taken"
      });
    }

    const sp = new ServiceProvider({
      name,
      email,
      phone,
      username,
      password,
      serviceType,
      experience: expYears,
      location,
    });

    await sp.save();
    res.status(201).json({ success: true, message: "Service Provider registered successfully" });
  } catch (error) {
    console.error("SP Registration Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ================= SERVICE PROVIDER LIST =================
router.get("/serviceprovider/list", async (req, res) => {
  try {
    await connectDB();
    const providers = await ServiceProvider.find();
    res.status(200).json(providers);
  } catch (error) {
    console.error("Error fetching service providers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ================= SERVICE PROVIDER LOGIN =================
router.post("/serviceprovider/login", async (req, res) => {
  try {
    await connectDB();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password" });
    }

    const sp = await ServiceProvider.findOne({ username });
    if (!sp || sp.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: sp._id, role: "serviceprovider" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("SP Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
