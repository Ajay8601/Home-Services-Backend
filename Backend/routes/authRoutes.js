const express = require("express");
const { User, ServiceProvider } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();

// ======================== USER AUTH ========================

// ✅ User Registration
router.post("/user/register", async (req, res) => {
  try {
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
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: "User registration successful" });
  } catch (error) {
    console.error("User Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ User Login
router.post("/user/login", async (req, res) => {
  try {
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


// ======================== SERVICE PROVIDER AUTH ========================

// ✅ SP Registration
router.post("/serviceprovider/register", async (req, res) => {
  try {
    const { name, email, phone, username, password, serviceType, experience, location } = req.body;

    // ✅ 1. Check if all fields are provided
    if (!name || !email || !phone || !username || !password || !serviceType || experience === undefined || !location) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // ✅ 2. Ensure experience is a valid number
    const expYears = Number(experience);
    if (isNaN(expYears) || expYears < 0) {
      return res.status(400).json({ success: false, message: "Experience must be a non-negative number" });
    }

    // ✅ 3. Check if email or username already exists
    const existingSP = await ServiceProvider.findOne({ $or: [{ email }, { username }] });
    if (existingSP) {
      return res.status(400).json({ 
        success: false, 
        message: existingSP.email === email 
          ? "Email is already registered" 
          : "Username is already taken" 
      });
    }

    // ✅ 4. Create & Save Service Provider (Password is auto-hashed in the schema)
    const sp = new ServiceProvider({
      name,
      email,
      phone,
      username,
      password,  // DO NOT manually hash, it’s done in the schema
      serviceType,
      experience: expYears, // Store as a number
      location
    });

    await sp.save();

    res.status(201).json({ success: true, message: "Service Provider registered successfully" });

  } catch (error) {
    console.error("SP Registration Error:", error);

    // ✅ Handle MongoDB unique constraint error (duplicate email/username)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: error.keyValue.email ? "Email already exists" : "Username already exists"
      });
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
router.get("/serviceprovider/list", async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.status(200).json(providers);
  } catch (error) {
    console.error("Error fetching service providers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ✅ SP Login
router.post("/serviceprovider/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password" });
    }

    // ✅ Find service provider
    const sp = await ServiceProvider.findOne({ username });

    if (!sp) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // ✅ Correct password check (Fixes scope issue)
    let isMatch = password === sp.password;  // ✅ Now isMatch is always accessible

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // ✅ Generate JWT Token
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
