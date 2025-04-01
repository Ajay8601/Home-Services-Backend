import React from 'react';
import './CleaningModal.css';

const Shifting = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Cleaning</h2>
          <button onClick={onClose} className="close-button">
            <img src="/Component/cross.svg" alt="cross" height={30} />
          </button>
        </div>

        <div className="modal-body shifting-services">
          <div className="service-card">
            <img src="/Image/Electrician/Shifting1.png" alt="House Shifting" />
            <p>House Shifting</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Shifting2.png" alt="Office Shifting" />
            <p>Office Shifting</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Shifting3.png" alt="Vehicle Shifting" />
            <p>Vehicle Shifting</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Shifting4.png" alt="Storage Service" />
            <p>Storage Service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shifting;
