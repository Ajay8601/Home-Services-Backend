import React, { useRef, useState, useEffect } from "react";
import "./mbs.css";
import Request from "../Request/Request";

const MostBookedServices = () => {
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [services, setServices] = useState([]);
  const [RequestForm, setRequestForm] = useState(false);

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

  // Update scroll button visibility
  const updateScrollState = () => {
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      setIsAtStart(scrollElement.scrollLeft === 0);
      setIsAtEnd(scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth - 1);
    }
  };

  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", updateScrollState);
      updateScrollState();
    }
    return () => {
      scrollElement?.removeEventListener("scroll", updateScrollState);
    };
  }, [services]);

  // Scroll buttons
  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <>
      <section className="most-booked-services">
        <h1>Most Booked Services</h1>
        <div className="scroll-container">
          {/* Left Arrow */}
          {!isAtStart && (
            <button className="scrollBtn-1" onClick={scrollLeft}>
              <img src="/Component/arrow.svg" alt="Previous" height={30}/>
            </button>
          )}

          {/* Scrollable Services */}
          <div className="most-booked" ref={scrollContainerRef}>
            {services.length > 0 ? (
              services.map((service, index) => (
                <div key={index} className="mbs" onClick={() => setRequestForm(true)}>
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

          {/* Right Arrow */}
          {!isAtEnd && (
            <button className="scrollBtn-2" onClick={scrollRight}>
              <img src="/Component/arrow.svg" alt="Next" height={30} />
            </button>
          )}
        </div>
      </section>

      {/* Request Form Popup */}
      {RequestForm && <Request close={() => setRequestForm(false)} />}
    </>
  );
};

export default MostBookedServices;
