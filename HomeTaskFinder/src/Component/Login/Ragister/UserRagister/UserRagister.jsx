import { useState } from "react";
import "./UserRagister.css";
import { useNavigate } from "react-router-dom";

export default function UserLogin({ close }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    // Check for empty fields before sending request
    if (!fullName || !email || !phone || !username || !password) {
      setError("Please fill in all fields");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/user/register", {
        method: "POST",
        body: JSON.stringify({
          fullName,
          email,
          phone,
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Failed to send data");
      }
  
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/userLogin"), 2000);


    } catch (err) {
      setError("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="UserLogin">
      <h5 onClick={close} className="close_button2">
        Close
        <img src="Component/cross.svg" alt="Close" height="30px" />
      </h5>
      <div className="login-container1">
        <h2>Customer Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <button className="btn-11" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
