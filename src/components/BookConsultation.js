import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookConsultation.css";

export default function BookConsultation() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <section className="consultation-bar">
      <div className="consultation-container">
        {/* LEFT SIDE */}
        <div className="consultation-left">
          <h2 className="consultation-title">WE CARE FOR YOU</h2>
          <p className="consultation-text">
            Book a consultation with us to discuss your healthcare needs and how
            we can support you.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="consultation-right">
          <button 
            className="consultation-button"
            onClick={handleContactClick}
          >
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  );
}
