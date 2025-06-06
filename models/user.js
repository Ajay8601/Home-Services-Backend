const mongoose = require("mongoose");

// ------------------- User Schema -------------------
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// ------------------- Service Provider Schema -------------------
const spSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  serviceType: {
    type: String,
    required: [true, "Service type is required"],
    enum: ["Plumber", "Electrician", "Cleaner", "Painter", "Shifting", "Repairing", "Massage for Men", "Salon for Kids & Men", "Salon for Women", "Spa for women"],
  },
  experience: {
    type: Number,
    required: [true, "Experience is required"],
    min: [0, "Experience cannot be negative"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
}, { timestamps: true });

const ServiceProvider = mongoose.model("ServiceProvider", spSchema);

// ✅ Export both models
module.exports = {
  User,
  ServiceProvider,
};
