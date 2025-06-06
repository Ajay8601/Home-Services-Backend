import React, { useEffect, useState } from "react";
import "./cleaning.css";
import Request from "../Request/Request";

function PaintingEmployee({ close }) {
  const [serviceprovider, setserviceprovider] = useState([]);
    const [showRequest, setshowRequest] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/serviceprovider/list") // ✅ Correct endpoint
      .then((response) => response.json())
      .then((data) => setserviceprovider(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <>
    <div className="body_container">
      <button onClick={close} className="close-button11">
        <img src="/Component/cross.svg" alt="cross" height={30} />
      </button>

      <div className="box-sizing">
        <div className="Employeeid">
          {serviceprovider.filter(provider => provider.serviceType.toLowerCase() === "painter").map((provider, index) => (
            <div className="plumbing_service1" key={index}>
              <div className="button-text">
                <div className="image-container1">
                  <img src="public/Image/painting.png" alt="clearning-img" />
                </div>
                <div className="text12">
                  <div className="text-section">
                    <h5>
                      <span>Name:</span> {provider.name}
                    </h5>
                    <h5>
                      <span>Service Type:</span> {provider.serviceType}
                    </h5>
                    <h5>
                      <span>Experience:</span> {provider.experience} year
                    </h5>
                    <h5>
                      <span>Location: </span>
                      {provider.location}
                    </h5>
                  </div>
                  <div className="button_key1" onClick={()=>setshowRequest(true)}>
                    <button className="service-via">Hire Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="add-id">
          <button>+ add now</button>
        </div> */}
      </div>
    </div>
        {showRequest && <Request close = {()=> setshowRequest(false)}/>}
    </>
  );
}

export default PaintingEmployee;
