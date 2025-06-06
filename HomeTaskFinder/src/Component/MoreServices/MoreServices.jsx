import React, { useRef, useState, useEffect } from "react";
import "./MoreServices.css";
import MassageForMan from "../EmployeeId/MassageForMan";
import SalonEmployee from "../EmployeeId/SalonEmployee";
import Request from "../Request/Request";

const HomeServices = () => {
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [showcontainer4, setshowcontainer4] = useState(false);
  const [showcontainer5, setshowcontainer5] = useState(false);
  const [showRequest, setRequest] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      container?.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setIsAtStart(container.scrollLeft === 0);
      setIsAtEnd(container.scrollLeft + container.clientWidth >= container.scrollWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <>
      <div>
        {/* Quick Home Repairs */}
        <section className="most-booked-services">
          <h1>Quick Home Repairs</h1>
          <div className="scroll-container">
            {!isAtStart && (
              <button className="scrollBtn-1" onClick={scrollLeft}>
                <img className="circle-btn1" src="/Component/arrow.svg" alt="Previous" />
              </button>
            )}

            <div className="most-booked-2" ref={scrollContainerRef}>
              {[
                { img: "/Image/quick home repair/Tap repair.webp", title: "Tap repair", rating: "4.11 (158K)", price: "₹129" },
                { img: "/Image/quick home repair/Flush tank repair.webp", title: "Flush tank repair", rating: "4.69 (90K)", price: "₹99" },
                { img: "/Image/quick home repair/Jet spray.webp", title: "Jet spray installation/repair", rating: "4.12 (28K)", price: "₹139" },
                { img: "/Image/quick home repair/Drill & hand.webp", title: "Drill & hang (wall decor)", rating: "4.85 (100K)", price: "₹119" },
                { img: "/Image/quick home repair/Geyser installation.webp", title: "Geyser installation", rating: "4.5 (30K)", price: "₹549" },
                { img: "/Image/quick home repair/Fan repair.webp", title: "Fan repair (ceiling/exhaust/wall)", rating: "4.83 (149K)", price: "₹199" },
                { img: "/Image/quick home repair/Switchboard.webp", title: "Switchboard/switchbox repair", rating: "4.75 (58K)", price: "₹119" },
              ].map((service, index) => (
                <div className="mbs" key={index} onClick={() => setRequest(true)}>
                  <img src={service.img} alt={service.title} />
                  <h3>{service.title}</h3>
                  <h5>
                    <img src="/Component/star.png" alt="Star" />
                    <p>{service.rating}</p>
                  </h5>
                  <h6>{service.price}</h6>
                </div>
              ))}
            </div>

            {!isAtEnd && (
              <button className="scrollBtn-2" onClick={scrollRight}>
                <img className="circle-btn" src="/Component/arrow.svg" alt="Next" />
              </button>
            )}
          </div>
        </section>

        {/* Massage for Men */}
        <section className="salon_woman">
          <h1>Massage for Men</h1>
          <div className="salon-woman">
            {[
              { img: "/Image/massage for man/stress relief.webp", title: "Stress Relief" },
              { img: "/Image/massage for man/pain relief.webp", title: "Pain Relief" },
              { img: "/Image/massage for man/Post Workout.webp", title: "Post Workout" },
            ].map((massage, index) => (
              <div className="mbs-1" key={index} onClick={() => setshowcontainer4(true)}>
                <h5>{massage.title}</h5>
                <img src={massage.img} alt={massage.title} />
              </div>
            ))}
          </div>
        </section>

        {/* Salon for Kids & Men */}
        <section className="salon_woman">
          <h1>Salon for Kids & Men</h1>
          <div className="salon-woman">
            {[
              { img: "/Image/Salon for kids & men/heaircut and beard.webp", title: "Haircut & Beard Shaving" },
              { img: "/Image/Salon for kids & men/haire color.webp", title: "Hair Color & Hair Spa" },
              { img: "/Image/Salon for kids & men/pedicure.webp", title: "Pedicure & Manicure" },
              { img: "/Image/Salon for kids & men/Facial.webp", title: "Facial Cleanup" },
            ].map((salon, index) => (
              <div className="mbs-1" key={index} onClick={() => setshowcontainer5(true)}>
                <h5>{salon.title}</h5>
                <img src={salon.img} alt={salon.title} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Popups */}
      {showcontainer4 && <MassageForMan close={() => setshowcontainer4(false)} />}
      {showcontainer5 && <SalonEmployee close={() => setshowcontainer5(false)} />}
      {showRequest && <Request close={() => setRequest(false)} />}
    </>
  );
};

export default HomeServices;
