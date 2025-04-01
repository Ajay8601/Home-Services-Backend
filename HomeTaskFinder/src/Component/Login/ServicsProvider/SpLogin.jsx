// SpLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SpLogin.css';
import SpRegister from '../Ragister/SpRagister/SpRegister';

export default function SpLogin({ close }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSpRegister, setShowSpRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    console.log("Service Provider Login:", { username, password });
    alert("Login successful!");
    navigate("/");
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

// CSS Tip for Close Button
// Ensure this in your CSS to avoid overlap
// .close_button1 { position: absolute; top: 10px; right: 10px; cursor: pointer; }
