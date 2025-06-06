import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SpLogin.css";
import SpRegister from "../Ragister/SpRagister/SpRegister";

export default function SpLogin({ close, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSpRegister, setShowSpRegister] = useState(false);
  const navigate = useNavigate();

  // Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/serviceprovider/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed, please try again.");
      }

      // Store token in localStorage (for authentication)
      localStorage.setItem("sp_token", data.token);

      alert("Login successful!");

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      } else {
        console.error("onLoginSuccess is not a function");
      }

      if (typeof close === "function") {
        close(); // ✅ Close the modal before navigating
      }

      navigate("/"); // ✅ Redirect to homepage or dashboard
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="container">
      {showSpRegister ? (
        <SpRegister close={() => setShowSpRegister(false)} />
      ) : (
        <div className="UserLogin">
          <h5 onClick={close} className="close_button1">
            Close
            <img src="Component/cross.svg" alt="Close" height="30px" />
          </h5>
          <div className="login-container">
            <h2>Service Provider Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button className="btn-11" type="submit">Login</button>
              <div className="footers">
                <p>
                  Don't have an account?&nbsp;
                  <span
                    onClick={() => setShowSpRegister(true)}
                    className="register-link"
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Register
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
