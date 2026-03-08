import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Footer.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services exactly like OurCareServices
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("care_services")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching services:", error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  // Navigate to service detail page on click
  const handleServiceClick = (slug) => {
    navigate(`/services/${slug}`);
  };

  return (
    <footer className="cdns-footer">
      <div className="footer-grid">
        {/* BRAND + MAP */}
        <div className="footer-brand">
          <h1>C D N S</h1>
          <strong>We care for you</strong>

          <iframe
            className="footer-map"
            src="https://www.google.com/maps?q=Wantirna+VIC+3152&output=embed"
            loading="lazy"
            title="CDNS Location"
          />
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>
            <FaMapMarkerAlt /> Wantirna, VIC 3152
          </p>
          <p>
            <FaPhoneAlt /> 0450 906 280
          </p>
          <p>
            <FaPhoneAlt /> 0415 914 512
          </p>
          <p>
            <FaEnvelope />rizalarjun6@gmail.com
          </p>
          <p>
            <FaEnvelope />jeewan.wish@gmail.com
          </p>

          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* SERVICES - DYNAMIC FROM ADMIN */}
        <div className="footer-services">
          <h2 className="footer-title">Our Care Services</h2>
          <p className="footer-desc">
            Empowering independence <br /> through trusted NDIS care
          </p>
          <ul>
            {loading ? (
              <li>Loading services...</li>
            ) : services.length > 0 ? (
              services.slice(0, 6).map((service) => ( // Limit to 6 services
                <li
                  key={service.id}
                  onClick={() => handleServiceClick(service.slug)}
                  style={{ cursor: "pointer" }}
                >
                  {service.title}
                </li>
              ))
            ) : (
              <li>No services available</li>
            )}
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        Copyright © 2026 Care-Au | Website
        <br />
        Supported by <span>@ Yaatri Creations</span> 2026
      </div>
    </footer>
  );
}

export default Footer;
