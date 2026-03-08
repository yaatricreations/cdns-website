import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/images/image1.jpg";
import AboutSection from "./AboutSection";
import OurCareServices from "./OurCareServices";
import BookConsultation from "./BookConsultation";
import TestimonialSection from "./Testimonial/TestimonialSection";



function HeroSection() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLearnMore = () => {
    // Scroll to About section or navigate to /about
    navigate("/contact"); 
  };

  return (
    <>
      {/* Hero Section - Panned design with real image */}
      <div 
        className="hero-overlay" 
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="hero-content">
          <h1>Transforming Healthcare, 
            <br/>One Life at a Time</h1>
          <p>
            Experience personalized care with our expert team of medical professionals. 
            From consultations to comprehensive treatment plans, we're here to support 
            your health journey every step of the way.
          </p>
          <div className="hero-btns">
            <button 
              className="btn--primary"
              onClick={handleSignup}
            >
              Get Started
            </button>
            <button 
              className="btn--outline"
              onClick={handleLearnMore}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />
      
      {/* Our Care Services */}
      <OurCareServices />

      {/* Testimonial Section */}
      <TestimonialSection />
      
      {/* Book Consultation CTA */}
      <BookConsultation />
    </>
  );
}

export default HeroSection;
