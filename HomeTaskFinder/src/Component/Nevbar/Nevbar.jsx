import { Link } from "react-router-dom";
import { useState } from "react";
import UserLogin from "../Login/User/UserLogin";
import SpLogin from "../Login/ServicsProvider/SpLogin";
import "./Nevbar.css";

function Navbar() {
  const [showHiddenBtns, setShowHiddenBtns] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showSpLogin, setShowSpLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set login state to true on success
    setShowUserLogin(false);
    setShowSpLogin(false);
    setShowHiddenBtns(false);
  };

  return (
    <>
      <div className="nav_bar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>

        {/* After Login Section */}
        {isLoggedIn ? (
          <div className="After_Login">
            <div className="booking">
              <img src="Component/Booking.svg" alt="Booking" height={40} />
            </div>
            <div className="Profile">
              <img src="Component/Profile.svg" alt="Profile" height={40} />
            </div>
          </div>
        ) : (
          <div className="login-btn">
            <div className="loginBtn">
              <button className="btn-1" onClick={() => setShowHiddenBtns(!showHiddenBtns)}>
                <span>Login</span>
              </button>
              {showHiddenBtns && (
                <div className="hiddenbtn">
                  <button onClick={() => setShowUserLogin(true)}>Customer Login</button>
                  <button onClick={() => setShowSpLogin(true)}>Employee Login</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <hr />
      <div>
        <img src="/Image/logo1.png" alt="logo" className="logo_part" />
      </div>

      {/* Show Login Components */}
      {showUserLogin && <UserLogin close={() => setShowUserLogin(false)} onLoginSuccess={handleLoginSuccess} />}
      {showSpLogin && <SpLogin close={() => setShowSpLogin(false)} onLoginSuccess={handleLoginSuccess} />}
    </>
  );
}

export default Navbar;
