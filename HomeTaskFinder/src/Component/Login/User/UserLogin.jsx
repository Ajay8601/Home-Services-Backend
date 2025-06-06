import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";
import UserRegister from "../Ragister/UserRagister/UserRagister";

export default function UserLogin({ close, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showUserRegister, setShowUserRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      alert("Login successful!");

      if (data.token) {
        localStorage.setItem("token", data.token);

        if (typeof onLoginSuccess === "function") {
          onLoginSuccess();
        } else {
          console.error("onLoginSuccess is not a function");
        }

        if (typeof close === "function") {
          close(); // ✅ Close the login modal before navigating
        }

        navigate("/"); // ✅ Ensure navigation happens
      }
    } catch (error) {
      setError(error.message || "An error occurred. Please check your connection.");
    }
  };

  return (
    <>
      <div className="UserLogin">
        <h5 onClick={close} className="close_button1">
          Close
          <img src="Component/cross.svg" alt="Close" height="30px" />
        </h5>
        <div className="login-container">
          <h2>Customer Login</h2>
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
                Don't have an account?{" "}
                <span
                  onClick={() => setShowUserRegister(true)}
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
      {showUserRegister && <UserRegister close={() => setShowUserRegister(false)} />}
    </>
  );
}
