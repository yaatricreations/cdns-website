import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Navbar from "../../components/Navbar";
import BookConsultation from "../../components/BookConsultation";
import "./ServicePage.css";

export default function ServiceTemplate({ title, description, content }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [otherServices, setOtherServices] = useState([]);

  useEffect(() => {
    const fetchOtherServices = async () => {
      try {
        const { data, error } = await supabase
          .from("care_services")
          .select("id, title, slug")
          .neq("slug", slug)
          .eq("is_active", true)
          .order("created_at", { ascending: true })
          .limit(4);

        if (error) {
          console.error("Error fetching other services:", error);
          setOtherServices([]);
        } else {
          setOtherServices(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setOtherServices([]);
      }
    };

    if (slug) fetchOtherServices();
  }, [slug]);

  return (
    <>
      <Navbar />
      <section className="service-hero">
        <div className="service-hero-overlay">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="service-content">
        <div className="service-container">{content}</div>
      </section>

      {/* Other Services */}
      <section className="other-services">
        <h2>Other Services</h2>
        <div className="other-grid">
          {otherServices.length > 0 ? (
            otherServices.map((s) => (
              <div
                key={s.id}
                className="other-card"
                onClick={() => navigate(`/services/${s.slug}`)}
              >
                {s.title}
              </div>
            ))
          ) : (
            <p>No other services available.</p>
          )}
        </div>
      </section>

      <BookConsultation />
    </>
  );
}
