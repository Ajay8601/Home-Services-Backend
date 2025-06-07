const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: String,
  username: { type: String, unique: true },
  password: String,
});

const serviceProviderSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  username: { type: String, unique: true },
  password: String,
  serviceType: String,
  experience: Number,
  location: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const ServiceProvider = mongoose.models.ServiceProvider || mongoose.model("ServiceProvider", serviceProviderSchema);

module.exports = { User, ServiceProvider };
