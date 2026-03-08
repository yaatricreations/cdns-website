import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext"; // ✅ Check login status
import "./OurCareServices.css";

const placeholderImg = "https://via.placeholder.com/400x220?text=Service+Image";

function OurCareServices() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth(); // ✅ Get auth status
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Navigate to service detail page
  const handleServiceClick = (service) => {
    navigate(`/services/${service.slug}`);
  };

  return (
    <section className="care-services">
      <h2>OUR CARE SERVICES</h2>

      {/* ✅ NO ADMIN MODE - PUBLIC VIEW ONLY */}
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div 
              className="service-card" 
              key={service.id}
              onClick={() => handleServiceClick(service)}
              style={{ cursor: "pointer" }}
            >
              <div className="service-image">
                <img
                  src={service.image_url || placeholderImg}
                  alt={service.title}
                />
              </div>

              <h3>{service.title}</h3>

              <ul>
                {service.qualifications?.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>

              <p className="service-note">* {service.note}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ REMOVED "MORE SERVICES" BUTTON - Public view only */}
    </section>
  );
}

export default OurCareServices;
