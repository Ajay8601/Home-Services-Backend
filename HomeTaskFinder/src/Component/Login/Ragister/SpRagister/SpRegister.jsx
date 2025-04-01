import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SpRegister.css";

export default function SpRegister({ close }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",  // Fixed: Added username field
    password: "",
    confirmPassword: "",
    serviceType: "",
    experience: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/sp-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Registration Successful! Redirecting to login page...");
        setTimeout(() => navigate("/sp-login"), 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please check your connection.");
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="SpRegister2">
      <div className="SpRegister">
        <h2>Service Provider Registration</h2>
        <h5 onClick={close} className="close_button4">
          Close
          <img src="/Component/cross.svg" alt="Close" height="30px" />
        </h5>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="container1">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label className="text-2">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <div className="container1">
            <label>Service Type</label>
            <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
              <option value="">Select Service Type</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Painter">Painter</option>
            </select>

            <label className="text-2">Experience (in years)</label>
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
          </div>

          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />

          <div className="container1">
            <label>Username</label>  
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />  

            <label className="text-2">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
