import React, { useState } from 'react';
import ElectricalEmployee from '../EmployeeId/ElectricalEmployee';

function Electrician({ onClose }) {

  const [showElectrician, setshowElectrician] = useState(false);
    return (
      <>
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Electrician</h2>
              <button onClick={onClose} className="close-button">
                <img src="/Component/cross.svg" alt="cross" height={30} />
              </button>
            </div>
    
            <div className="modal-body electrical-services">
              <div className="service-card" onClick={()=> setshowElectrician(true)}>
                <img src="/Image/Electrician/switch.webp" alt="Switch & Socket" />
                <p>Switch & socket</p>
              </div>
              <div className="service-card" onClick={()=> setshowElectrician(true)}>
                <img src="/Image/Electrician/fan.webp" alt="Fan" />
                <p>Fan</p>
              </div>
              <div className="service-card" onClick={()=> setshowElectrician(true)}>
                <img src="/Image/Electrician/wall.webp" alt="Wall/Ceiling Light" />
                <p>Wall/ceiling light</p>
              </div>
              <div className="service-card" onClick={()=> setshowElectrician(true)}>
                <img src="/Image/Electrician/writing.webp" alt="Wiring" />
                <p>Wiring</p>
              </div>
              <div className="service-card" onClick={()=> setshowElectrician(true)}>
                <img src="/Image/Electrician/Doorball.webp" alt="Doorbell" />
                <p>Doorbell</p>
              </div>
              <div className="service-card" onClick={()=> setshowElectrician(true)}>
                <img src="/Image/Electrician/MCB.webp" alt="MCB & Submeter" />
                <p>MCB & submeter</p>
              </div>
              <div className="service-card" onClick={()=> setshowElectrician(true)}>
                <img src="/Image/Electrician/inverter.webp" alt="Inverter & Stabiliser" />
                <p>Inverter & stabiliser</p>
              </div>
              <div className="service-card" onClick={()=> setshowElectrician(true)}>
                <img src="/Image/Electrician/Appliance.webp" alt="Appliance" />
                <p>Appliance</p>
              </div>
              <div className="service-card"onClick={()=> setshowElectrician(true)}>
                <img src="/Image/Electrician/Booka a visit.webp" alt="Book a Visit" />
                <p>Book a visit</p>
              </div>
            </div>
          </div>
        </div>
        {showElectrician && <ElectricalEmployee close={()=>setshowElectrician(false)}/>}
        </>
      );
};

export default Electrician;