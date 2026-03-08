import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TestimonialSection.css";

const reviews = [
  {
    name: "Full Name",
    location: "Sydney, NSW",
    text: "Thank you for the compassionate and professional care. The nurses truly made a difference in our lives.",
  },
  {
    name: "Full Name",
    location: "Melbourne, VIC",
    text: "Excellent service and clinical support. We felt safe, respected and well guided.",
  },
  {
    name: "Full Name",
    location: "Brisbane, QLD",
    text: "Highly professional team. Their compliance standards and care quality are outstanding.",
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleReviewClick = () => {
    navigate("/testimonials");
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-header">
        <h2>OUR DEAR INSPIRATIONS</h2>
        <button
          className="google-review-btn"
          onClick={() => navigate("/testimonials")}
        >
          Write a Review
        </button>
      </div>

      <div className="testimonial-carousel">
        <button className="arrow left" onClick={prev}>
          &#10094;
        </button>

        <div className="testimonial-card">
          <div className="review-img">Photo</div>
          <h3>{reviews[index].name}</h3>
          <small>{reviews[index].location}</small>
          <p>"{reviews[index].text}"</p>
        </div>

        <button className="arrow right" onClick={next}>
          &#10095;
        </button>
      </div>
    </section>
  );
}
