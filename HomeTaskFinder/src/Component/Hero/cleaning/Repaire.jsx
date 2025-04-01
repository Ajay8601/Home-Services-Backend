import React from 'react';
import './CleaningModal.css';

const Repaire = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Cleaning</h2>
          <button onClick={onClose} className="close-button">
            <img src="/Component/cross.svg" alt="cross" height={30} />
          </button>
        </div>

        <div className="modal-body repair-services">
          <div className="service-card">
            <img src="/Image/Electrician/Repaire1.webp" alt="AC Repair" />
            <p>AC Repair</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Repaire2.webp" alt="Fridge Repair" />
            <p>Fridge Repair</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Repaire3.webp" alt="Washing Machine Repair" />
            <p>Washing Machine Repair</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Repaire4.webp" alt="Microwave Repair" />
            <p>Air Cooler</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Repaire5.webp" alt="TV Repair" />
            <p>TV Repair</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Repaire6.webp" alt="Geyser Repair" />
            <p>Geyser Repair</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Repaire7.webp" alt="Laptop Repair" />
            <p>Laptop Repair</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Repaire8.webp" alt="Mobile Repair" />
            <p>Mobile Repair</p>
          </div>
          <div className="service-card">
            <img src="/Image/Electrician/Repaire9.webp" alt="Mobile Repair" />
            <p>Inverter</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repaire;
