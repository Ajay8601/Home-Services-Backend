import React from 'react';
import './CleaningModal.css';

const CleaningModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Cleaning</h2>
          <button onClick={onClose} className="close-button">
            <img src="/Component/cross.svg" alt="cross" height={30} />
          </button>
        </div>

        <div className="modal-body">
          <div className="service-card">
            <img src="/Image/cleaning/showcleaning1.webp" alt="Bathroom Cleaning" />
            <p>Bathroom & kitchen cleaning</p>
          </div>
          <div className="service-card">
            <img src="/Image/cleaning/showcleaning2.webp" alt="Full Home Cleaning" />
            <p>Full Home Cleaning</p>
          </div>
          <div className="service-card">
            <img src="/Image/cleaning/show.webp" alt="Sofa Cleaning" />
            <p>Sofa & Carpet Cleaning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleaningModal;
