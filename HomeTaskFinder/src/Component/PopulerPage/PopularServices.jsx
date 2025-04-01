import React, { useEffect, useState } from "react";
import "./PopularServices.css";

const PopularServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/services") // Make sure backend runs on port 3000
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error("Error fetching services:", error));
    }, []);

    return (
        <section className="populer_section">
            <div className="titlename">
                <h1>Popular Services</h1>
            </div>
            <div className="populer_service">
                {services.map((service, index) => (
                    <div className="plumbing_service" key={index}>
                        <div className="img_section">
                            <img src={`http://localhost:5000${service.img}`} alt={service.alt} />
                        </div>
                        <div className="button-text">
                            <div className="text-section">
                                <h1>{service.title}</h1>
                                <p>{service.description}</p>
                            </div>
                            <div className="button_key">
                                <button className="service-via">Hire Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularServices;
