// src/pages/about.jsx - WHY CHOOSE WITH SLIDER (EXACT About Intro Section)
import './about.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookConsultation from "../components/BookConsultation";
import { useState } from "react";
import image6 from "../assets/images/image6.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import image7 from "../assets/images/image7.jpg";
import image8 from "../assets/images/image8.jpg";
import image9 from "../assets/images/image9.jpg";

function About() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const whyChooseSlides = [
    {
      title: "Qualified Professionals",
      content: "Registered Nurses, Disability Support Workers, and allied health specialists with specialized training in complex care delivery across Australia.",
      image: image3
    },
    {
      title: "Comprehensive NDIS Coverage",
      content: "Full spectrum of 30+ NDIS services from high-intensity personal care to community participation and therapeutic supports.",
      image: image4
    },
    {
      title: "Specialized High-Risk Care",
      content: "Expertise in tracheostomy, PEG feeding, ventilator management, complex wound care, and catheter management by qualified clinicians.",
      image: image5
    },
    {
      title: "24/7 Availability",
      content: "Reliable support and crisis response with person-centered care plans tailored to individual needs.",
      image: image7
    }
  ];

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <>
      {/* ✅ NAVBAR */}
      <Navbar />
      
      {/* ✅ ABOUT HERO SECTION */}
      <div 
        className="about-hero" 
        style={{ backgroundImage: `url(${image6})` }}
      >
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <div className="about-text-block">
            <h1>Compliance Diagnostic <br/>Nursing Services</h1>
            <p>
              As a premier NDIS-registered provider, CDNS delivers exceptional nursing and disability 
              support services across Australia, empowering individuals with ideal lifestyles through clinical excellence and compassionate care.
            </p>
          </div>
          <div className="about-hero-btns">
            <button className="btn--primary" onClick={handleSignup}>
              Get Started
            </button>
            <button className="btn--outline" onClick={handleContact}>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* ✅ WHY CHOOSE US - EXACT ABOUT INTRO SLIDER STRUCTURE */}
      <section className="why-choose-intro">
        <div className="why-choose-container">
          <div className="why-choose-left">
            <h2 className="why-choose-title">Why Choose CDNS?</h2>
            <div 
              className="about-slider feature-card"
              key={activeSlide}
            >
              <h3>{whyChooseSlides[activeSlide].title}</h3>
              <p>{whyChooseSlides[activeSlide].content}</p>
            </div>
            
            {/* ✅ SLIDER DOTS - EXACT AboutSection style */}
            <div className="slider-dots">
              {whyChooseSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`dot ${activeSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="why-choose-right">
            <img 
              src={whyChooseSlides[activeSlide].image} 
              alt={`Why Choose CDNS - ${whyChooseSlides[activeSlide].title}`}
            />
          </div>
        </div>
      </section>

      {/* ✅ SERVICES SECTION */}
      <section className="services-section">
        <div className="container">
          <h2>What Do We Serve?</h2>
          
          {/* Core Services */}
          <div className="service-category">
            <h3>Core Services</h3>
            <div className="service-grid">
              <div className="service-item">
                <div className="service-icon">🧑‍⚕️</div>
                <h4>Assistance with Daily Personal Activities (High Intensity)</h4>
                <p>Professional support for complex personal care needs including mobility, hygiene, and meal preparation. Delivered by qualified Disability Support Workers and Registered Nurses.</p>
              </div>
              <div className="service-item">
                <div className="service-icon">🏥</div>
                <h4>Community Nursing Care by Registered Nurses</h4>
                <p>Registered Nurses provide clinical assessments, medication management, and health monitoring in home and community settings.</p>
              </div>
              <div className="service-item">
                <div className="service-icon">🏠</div>
                <h4>Assistance with Daily Tasks/Shared Living</h4>
                <p>Comprehensive support for Supported Independent Living, Independent Living Options, and Short Term Accommodation.</p>
              </div>
              <div className="service-item">
                <div className="service-icon">🎯</div>
                <h4>Development of Life Skills and Independence</h4>
                <p>Skill-building programs teaching daily living skills, household management, and community navigation.</p>
              </div>
            </div>
          </div>

          {/* Specialized Clinical Care */}
          <div className="service-category">
            <h3>Specialized Clinical Care</h3>
            <div className="service-grid">
              <div className="service-item">
                <div className="service-icon">🫁</div>
                <h4>Complex health needs: Tracheostomy, PEG/ventilator management</h4>
                <p>Expert clinical care for participants requiring tracheostomy maintenance, PEG feeding tubes, and ventilator support.</p>
              </div>
              <div className="service-item">
                <div className="service-icon">🩹</div>
                <h4>Complex wound care and catheter management</h4>
                <p>Advanced wound care protocols and suprapubic/intermittent catheter management by qualified clinicians.</p>
              </div>
              <div className="service-item">
                <div className="service-icon">💉</div>
                <h4>Sub-cutaneous injections and severe dysphagia support</h4>
                <p>Safe administration of subcutaneous medications and specialized feeding support for swallowing difficulties.</p>
              </div>
            </div>
          </div>

          
        </div>
      </section>

      {/* ✅ STANDARDS SECTION */}
    <section className="standards-section">
  <div className="standards-container">
    <div className="standards-content">
      <h2>Actuating Global Standards in Nursing Services</h2>
      <p className="standards-text">
        Industry observers note CDNS sets itself apart through its rigorous adherence to NDIS compliance standards 
        while maintaining a comprehensive service portfolio that rivals larger providers. Our clinical excellence 
        combined with compassionate, person-centered care defines our unwavering dedication.
      </p>
    </div>
    <div className="standards-images">
      <div className="standards-image">
        <img src={image9} alt="Compliance Standards" />
      </div>
      <div className="standards-image">
        <img src={image8} alt="Clinical Excellence" />
      </div>
    </div>
  </div>
</section>


      {/* ✅ BOOK CONSULTATION */}
      <BookConsultation />
    </>
  );
}

export default About;
