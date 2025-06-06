import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UserLogin from "../Login/User/UserLogin";
import SpLogin from "../Login/ServicsProvider/SpLogin";
import "./Nevbar.css";

function Navbar() {
  const [showHiddenBtns, setShowHiddenBtns] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showSpLogin, setShowSpLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showProfile, setshowProfile] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowUserLogin(false);
    setShowSpLogin(false);
    setShowHiddenBtns(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="nav_bar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li className="contactHide">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>

        {isLoggedIn ? (
          <div className="After_Login">
            <div >
              <img src="Component/Booking.svg" alt="Booking" 
              height={40}
              className="booking"
               />
            </div>
            <div
              onClick={() => setshowProfile(!showProfile)}
              
            >
              <img src="Component/Profile.svg" alt="Profile"
              height={40}
              className="Profile" />
            </div>
            {showProfile && (
              <div className="profile-container">
                <p>profile</p>
                <p>help Center</p>
                <p>My booking</p>
                <p onClick={handleLogout}>Log out</p>
              </div>
            )}
          </div>
        ) : (
          <div className="login-btn">
            <div className="loginBtn">
              <button
                className="btn-1"
                onClick={() => setShowHiddenBtns(!showHiddenBtns)}
              >
                <span>Login</span>
              </button>
              {showHiddenBtns && (
                <div className="hiddenbtn">
                  <button onClick={() => setShowUserLogin(true)}>
                    Customer Login
                  </button>
                  <button onClick={() => setShowSpLogin(true)}>
                    Employee Login
                  </button>
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

      {/* Show Login Components with onLoginSuccess */}
      {showUserLogin && (
        <UserLogin
          close={() => setShowUserLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showSpLogin && (
        <SpLogin
          close={() => setShowSpLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default Navbar;
