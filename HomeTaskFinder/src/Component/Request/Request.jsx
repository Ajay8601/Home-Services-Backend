import React, { useState } from "react";
import "./Request.css";
import { useNavigate } from "react-router-dom";

export default function RequestForm({ close }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !message) {
      setError("Please fill in all fields.");
      setSuccess("");
    } else {
      setError("");
      setSuccess("Request sent successfully!");

      // Reset form fields
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");

      // Navigate with slight delay
      setTimeout(() => {
        alert("Request sent successfully");
        close(); // close the modal first
        navigate("/"); // then navigate
      }, 500);
    }
  };

  return (
    <div className="UserLogin">
      <div className="closeBtn" onClick={close}>
        <h5>
          Close
          <img src="Component/cross.svg" alt="Close" height="30px" />
        </h5>
      </div>

      <div className="login-container1">
        <h2>Send Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button className="btn-11" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
