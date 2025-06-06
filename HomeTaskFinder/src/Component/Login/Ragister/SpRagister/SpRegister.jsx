import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SpRegister.css";

export default function SpRegister({ close }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    serviceType: "",
    experience: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    try {
      const response = await  fetch("http://localhost:5000/api/auth/serviceprovider/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // ✅ FIX: Send formData directly
      });
  
      const data = await response.json();
      console.log(data);
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to send data");
      }
  
      setSuccessMessage("Registration Successful! Redirecting...");
      setTimeout(() => navigate("spLogin"), 2000);
  
    } catch (err) {
      setError(err.message || "Error connecting to server. Please try again.");
    }
  };
  

  return (
    <div className="SpRegister2">
      <div className="SpRegister">
        <div className="register-header">
          <h2>Service Provider Registration</h2>
          <h5 onClick={close} className="close_button4">
            Close <img src="/Component/cross.svg" alt="Close" height="30px" />
          </h5>
        </div>

        {/* Error & Success Messages */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Registration Form */}
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
              <option value="Repairing">Repairing</option>
              <option value="Shifting">Shifting</option>
              <option value="Massage for Men">Massage for Men</option>
              <option value="Salon for Kids & Men">Salon for Kids & Men</option>
              <option value="Salon for Women">Salon for Women</option>
              <option value="Spa for women">Spa for women</option>
            </select>

            <label className="text-2">Experience (in years)</label>
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
          </div>

          <label>Address</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />

          <div className="container1">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />

            <label className="text-2">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
