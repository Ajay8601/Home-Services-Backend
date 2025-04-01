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

        <div className="modal-body plumbing-services">
          <div className="service-card">
            <img src="/Image/Electrician/Plumbing1.webp" alt="Bath Fittings" />
            <p>Bath fittings</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Plumbing2.webp" alt="Basin & Sink" />
            <p>Basin & sink</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Plumbing3.webp" alt="Grouting" />
            <p>Grouting</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Plumbing4.webp" alt="Water Filter" />
            <p>Water filter</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Plumbing5.webp" alt="Drainage" />
            <p>Drainage</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Plumbing6.webp" alt="Toilet" />
            <p>Toilet</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Plumbing7.webp" alt="Tap & Mixer" />
            <p>Tap & mixer</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Plumbin8.webp" alt="Water Tank" />
            <p>Water tank</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Plumbin9.webp" alt="Motor" />
            <p>Motor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleaningModal;
