import React, { useRef, useState, useEffect } from "react";
import "./SimplePage.css";

const services = {
  "Salon for Women": [
    { name: "Facial & cleanup", img: "/Image/salon for woman/cleaning face.webp" },
    { name: "Bleach & Detan", img: "/Image/salon for woman/Bleach.webp" },
    { name: "Manicure", img: "/Image/salon for woman/manicure.webp" },
    { name: "Pedicure", img: "/Image/salon for woman/pedicure.webp" },
    { name: "Waxing", img: "/Image/salon for woman/waxing.webp" },
  ],
  "Spa for women": [
    { name: "Stress relief", img: "/Image/spa images/stress relief.webp" },
    { name: "Pain relief", img: "/Image/spa images/pain relief.webp" },
    { name: "Natural skincare", img: "/Image/spa images/natural skiincare.webp" },
  ],
  "Cleaning & pest control": [
    { name: "Bathroom & pest control", img: "/Image/cleaning/bathroom kitchen.webp" },
    { name: "Full Home Cleaning", img: "/Image/cleaning/Full Home Cleaning.webp" },
    { name: "Sofa & Carpet Cleaning", img: "/Image/cleaning/sofa and carpet cleaning.webp" },
  ],
  "AC & appliance repair": [
    { name: "AC Service and Repair", img: "/Image/ac repire/AC service repair.webp" },
    { name: "Refrigerator Repair", img: "/Image/ac repire/Refrigerator Repair.webp" },
    { name: "Washing Machine Repair", img: "/Image/ac repire/washing machine repair.webp" },
    { name: "Chimney Repair", img: "public/Image/ac repire/Chimney Rejpair.webp" },
    { name: "Water Purifier Repair", img: "/Image/ac repire/water purifier.webp" },
    { name: "Television Repair", img: "/Image/ac repire/Television Repair.webp" },
    { name: "Microwave Repair", img: "/Image/ac repire/microwave.webp" },
    { name: "Geyser Repair", img: "/Image/ac repire/Geyser Repair.webp" },
  ],
};

const ServiceSection = ({ title, items }) => {
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    
    const updateScrollState = () => {
      if (scrollElement) {
        setIsAtStart(scrollElement.scrollLeft === 0);
        setIsAtEnd(scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth);
      }
    };

    if (scrollElement) {
      scrollElement.addEventListener("scroll", updateScrollState);
      updateScrollState();
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", updateScrollState);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300;
    }
  };

  return (
    <section className="salon_woman">
      <h1>{title}</h1>
      <div className="scroll-container">
        {title === "AC & appliance repair" && !isAtStart && (
          <button className="circle-button-left" onClick={scrollLeft}>
            <img className="circle-btn1" src="Component/arrow.svg" alt="Previous" />
          </button>
        )}
        <div
          className={title === "AC & appliance repair" ? "ac_repaire" : "salon-woman"}
          ref={title === "AC & appliance repair" ? scrollContainerRef : null}
        >
          {items.map((item, index) => (
            <div className="mbs-1" key={index}>
              <h5>{item.name}</h5>
              <img src={item.img} alt={item.name} className="salon-image" />
            </div>
          ))}
        </div>
        {title === "AC & appliance repair" && !isAtEnd && (
          <button className="circle-button-right" onClick={scrollRight}>
            <img className="circle-btn" src="Component/arrow.svg" alt="Next" />
          </button>
        )}
      </div>
    </section>
  );
};

const SalonServices = () => {
  return (
    <div>
      {Object.entries(services).map(([title, items], index) => (
        <ServiceSection key={index} title={title} items={items} />
      ))}
    </div>
  );
};

export default SalonServices;
