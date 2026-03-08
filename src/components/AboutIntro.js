import React, { useState, useEffect } from "react";
import "./AboutIntro.css";
import careImg from "../assets/images/image6.jpg";

const slides = [
  {
    title: "Compliance Disablity Nursing Services",
    text: `CDNS is a premier NDIS 
    registered provider specialising in compliance-driven, nurse-led disability 
    support across Australia.`,
  },
  {
    title: "Our Mission",
    text: `To deliver clinically governed, compassionate care that empowers 
    individuals with disabilities to live safely, independently and with dignity.`,
  },
  {
    title: "Our Vision",
    text: `To redefine disability support in Australia through nurse-led excellence,
    compliance leadership and human-centred care.`,
  },
  {
    title: "Our Values",
    text: `Clinical Integrity • Respect • Empowerment • Accountability • 
    Compassion • Compliance Excellence`,
  },
];

export default function AboutIntro() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Optional: auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 300); // fade-out duration
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="about-intro">
      <div className="about-intro-container">
        {/* LEFT SIDE */}
        <div className="about-left">
          <h1 className="about-title">WHO WE ARE</h1>

          <div className={`about-slider ${fade ? "fade-in" : "fade-out"}`}>
            <h3>{slides[index].title}</h3>
            <p>{slides[index].text}</p>
          </div>

          <div className="slider-dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={i === index ? "dot active" : "dot"}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setIndex(i);
                    setFade(true);
                  }, 300);
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="about-right">
          <img src={careImg} alt="CDNS Care" />
        </div>
      </div>
    </section>
  );
}
