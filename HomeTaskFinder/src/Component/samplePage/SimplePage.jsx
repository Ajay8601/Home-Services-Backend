import React, { useRef, useState, useEffect } from "react";
import "./SimplePage.css";
import SalonForWomanEmployee from "../EmployeeId/SalonForWomanEmployee";
import SpaForMassageEmployee from "../EmployeeId/SpaForMassageEmployee";
import CleaningEmploee from "../EmployeeId/CleaningEmployee";
import RepairingEmployee from "../EmployeeId/RepairingEmployee";

const SalonServices = () => {
  const scrollContainerRef = useRef(null);
  const [showcontainer, setshowcontainer] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [showcontainer1, setshowcontainer1] = useState(false);
  const [showcontainer2, setshowcontainer2] = useState(false);
  const [showcontainer3, setshowcontainer3] = useState(false);

  const updateScrollState = () => {
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      setIsAtStart(scrollElement.scrollLeft === 0);
      setIsAtEnd(
        scrollElement.scrollLeft + scrollElement.clientWidth >=
        scrollElement.scrollWidth - 1
      );
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
  }, []); // ✅ Corrected: removed invalid dependency

  const scrollLeft = () =>
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <>
      <div>
        {/* Salon for Women */}
        <section className="salon_woman">
          <h1>Salon for Women</h1>
          <div className="salon-woman">
            <div className="mbs-1" onClick={() => setshowcontainer(true)}>
              <h5>Facial & cleanup</h5>
              <img
                src="/Image/salon for woman/cleaning face.webp"
                alt="Facial & cleanup"
                className="salon-image"
              />
            </div>
            <div className="mbs-1" onClick={() => setshowcontainer(true)}>
              <h5>Bleach & Detan</h5>
              <img
                src="/Image/salon for woman/Bleach.webp"
                alt="Bleach & Detan"
                className="salon-image"
              />
            </div>
            <div className="mbs-1" onClick={() => setshowcontainer(true)}>
              <h5>Manicure</h5>
              <img
                src="/Image/salon for woman/manicure.webp"
                alt="Manicure"
                className="salon-image"
              />
            </div>
            <div className="mbs-1" onClick={() => setshowcontainer(true)}>
              <h5>Pedicure</h5>
              <img
                src="/Image/salon for woman/pedicure.webp"
                alt="Pedicure"
                className="salon-image"
              />
            </div>
            <div className="mbs-1" onClick={() => setshowcontainer(true)}>
              <h5>Waxing</h5>
              <img
                src="/Image/salon for woman/waxing.webp"
                alt="Waxing"
                className="salon-image"
              />
            </div>
          </div>
        </section>

        {/* Spa for Women */}
        <section className="salon_woman">
          <h1>Spa for Women</h1>
          <div className="salon-woman">
            <div className="mbs-1" onClick={() => setshowcontainer1(true)}>
              <h5>Stress relief</h5>
              <img
                src="/Image/spa images/stress relief.webp"
                alt="Stress relief"
                className="salon-image"
              />
            </div>
            <div className="mbs-1" onClick={() => setshowcontainer1(true)}>
              <h5>Pain relief</h5>
              <img
                src="/Image/spa images/pain relief.webp"
                alt="Pain relief"
                className="salon-image"
              />
            </div>
            <div className="mbs-1" onClick={() => setshowcontainer1(true)}>
              <h5>Natural skincare</h5>
              <img
                src="/Image/spa images/natural skiincare.webp"
                alt="Natural skincare"
                className="salon-image"
              />
            </div>
          </div>
        </section>

        {/* Cleaning & Pest Control */}
        <section className="salon_woman">
          <h1>Cleaning & Pest Control</h1>
          <div className="salon-woman">
            <div className="mbs-1" onClick={() => setshowcontainer2(true)}>
              <h5>Bathroom & Pest Control</h5>
              <img
                src="/Image/cleaning/bathroom kitchen.webp"
                alt="Bathroom & Pest Control"
                className="salon-image"
              />
            </div>
            <div className="mbs-1" onClick={() => setshowcontainer2(true)}>
              <h5>Full Home Cleaning</h5>
              <img
                src="/Image/cleaning/Full Home Cleaning.webp"
                alt="Full Home Cleaning"
                className="salon-image"
              />
            </div>
            <div className="mbs-1" onClick={() => setshowcontainer2(true)}>
              <h5>Sofa & Carpet Cleaning</h5>
              <img
                src="/Image/cleaning/sofa and carpet cleaning.webp"
                alt="Sofa & Carpet Cleaning"
                className="salon-image"
              />
            </div>
          </div>
        </section>

        {/* AC & Appliance Repair */}
        <section className="salon_woman">
          <h1>AC & Appliance Repair</h1>
          <div className="scroll-container">
            {!isAtStart && (
              <button className="scrollBtn-1" onClick={scrollLeft}>
                <img src="Component/arrow.svg" alt="Previous" height={30} />
              </button>
            )}
            <div className="ac_repaire" ref={scrollContainerRef}>
              {[
                { name: "AC Service and Repair", src: "/Image/ac repire/AC service repair.webp" },
                { name: "Refrigerator Repair", src: "/Image/ac repire/Refrigerator Repair.webp" },
                { name: "Washing Machine Repair", src: "/Image/ac repire/washing machine repair.webp" },
                { name: "Chimney Repair", src: "/Image/ac repire/Chimney Rejpair.webp" },
                { name: "Water Purifier Repair", src: "/Image/ac repire/water purifier.webp" },
                { name: "Television Repair", src: "/Image/ac repire/Television Repair.webp" },
                { name: "Microwave Repair", src: "/Image/ac repire/microwave.webp" },
                { name: "Geyser Repair", src: "/Image/ac repire/Geyser Repair.webp" }
              ].map((item, index) => (
                <div className="mbs-1" onClick={() => setshowcontainer3(true)} key={index}>
                  <h5>{item.name}</h5>
                  <img src={item.src} alt={item.name} className="salon-image" />
                </div>
              ))}
            </div>
            {!isAtEnd && (
              <button className="scrollBtn-2" onClick={scrollRight}>
                <img src="Component/arrow.svg" alt="Next" height={30} />
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Popups */}
      {showcontainer && (
        <SalonForWomanEmployee close={() => setshowcontainer(false)} />
      )}
      {showcontainer1 && (
        <SpaForMassageEmployee close={() => setshowcontainer1(false)} />
      )}
      {showcontainer2 && (
        <CleaningEmploee close={() => setshowcontainer2(false)} />
      )}
      {showcontainer3 && (
        <RepairingEmployee close={() => setshowcontainer3(false)} />
      )}
    </>
  );
};

export default SalonServices;
