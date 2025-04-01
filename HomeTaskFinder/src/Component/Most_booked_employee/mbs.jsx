import React, { useRef, useState, useEffect } from "react";
import "./mbs.css";

const MostBookedServices = () => {
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [services, setServices] = useState([]);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/most-booked-services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching most booked services:", error);
      }
    };

    fetchServices();
  }, []);

  // Update scroll state
  const updateScrollState = () => {
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      setIsAtStart(scrollElement.scrollLeft === 0);
      setIsAtEnd(scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", updateScrollState);
      updateScrollState();
    }
    return () => scrollElement?.removeEventListener("scroll", updateScrollState);
  }, []);

  // Smooth scroll functions
  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <section className="most-booked-services">
      <h1>Most Booked Services</h1>
      <div className="scroll-container">
        {!isAtStart && (
          <button className="circle-button-left" onClick={scrollLeft}>
            <img className="circle-btn1" src="/Component/arrow.svg" alt="Previous" />
          </button>
        )}

        <div className="most-booked" ref={scrollContainerRef}>
          {services.length > 0 ? (
            services.map((service, index) => (
              <div key={index} className="mbs">
                <img src={`http://localhost:5000${service.img}`} alt={service.title} />
                <h3>{service.title}</h3>
                <h5>
                  <img src="/Component/star.png" alt="Star" />
                  <p>{service.rating}</p>
                </h5>
                <h6>{service.price}</h6>
              </div>
            ))
          ) : (
            <p>Loading services...</p>
          )}
        </div>

        {!isAtEnd && (
          <button className="circle-button-right" onClick={scrollRight}>
            <img className="circle-btn" src="/Component/arrow.svg" alt="Next" />
          </button>
        )}
      </div>
    </section>
  );
};

export default MostBookedServices;
