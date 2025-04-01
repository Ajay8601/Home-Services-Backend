import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="logo_container">
        <img src="public/Image/logo1.png" alt="logo" height="130px" />
      </div>
      <div className="Main_container">
        <h2>Main Link</h2>
        <p>
          Booking Tracking
          <br />
          New Booking
          <br />
          Contact Us
          <br />
          News & Blogs
        </p>
      </div>
      <div className="Suppor_container">
        <h2>Support</h2>
        <p>
          About Us
          <br />
          Privacy Policy
          <br />
          Terms & Condition
        </p>
      </div>
      <div className="New_container">
        <h2>Join Our Newsletter</h2>
        <input className="input-btn" type="email" name="email" placeholder="Enter your email Address" />
        <h3>Follow Us</h3>
        <div className="follow-container">
          <a href="https://www.instagram.com/">
            <img src="Image/footer/instagram_3955027.png" height="25px" width="25px" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/">
            <img src="Image/footer/facebook_145802.png" height="25px" width="25px" alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/in/ajay-vishwakarma-688506306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
            <img src="Image/footer/linkedin_2504923.png" height="25px" width="25px" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
