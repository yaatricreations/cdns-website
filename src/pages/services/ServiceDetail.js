import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import ServiceTemplate from "./ServiceTemplate";
import "./ServiceDetail.css";

const placeholderImg = "https://via.placeholder.com/400x220?text=Service+Image";

function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("care_services")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          console.error("Error fetching service:", error);
          setService(null);
        } else {
          setService(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchService();
  }, [slug]);

  if (loading) return <p>Loading service...</p>;
  if (!service)
    return (
      <div className="service-not-found">
        <p>Service not found.</p>
        <a href="/services">Back to Services</a>
      </div>
    );

  // Parse admin fields
  const faqs =
    service.faqs && service.faqs !== ""
      ? typeof service.faqs === "string"
        ? JSON.parse(service.faqs)
        : service.faqs
      : [];

  const whyItems =
    service.why_items && service.why_items !== ""
      ? typeof service.why_items === "string"
        ? service.why_items.split("\n").map((item) => item.trim()).filter(Boolean)
        : service.why_items
      : ["Personalised Support", "Continuity of Care", "Empowerment"];

  const whoItems =
    service.who_items && service.who_items !== ""
      ? typeof service.who_items === "string"
        ? service.who_items.split("\n").map((item) => item.trim()).filter(Boolean)
        : service.who_items
      : ["General Participants"];

  const titleDescription =
    service.title_description ||
    service.note ||
    "Supporting participants with structured care.";
  const overviewContent =
    service.overview_content ||
    service.note ||
    "This service provides tailored support to meet individual needs.";
  const overviewImage =
    service.overview_image_url || service.image_url || placeholderImg;
  const whyTitle = service.why_title || "Why Choose This Service?";
  const whySubtitle =
    service.why_content ||
    "Structured support to navigate critical stages with confidence.";

  return (
    <ServiceTemplate
      title={service.title}
      description={titleDescription}
      content={
        <>
          {/* Overview */}
          <section className="lst-overview">
            <div className="lst-overview-image">
              <img src={overviewImage} alt={service.title} />
            </div>
            <div className="lst-overview-text">
              <h2>Overview</h2>
              <p>{overviewContent}</p>
            </div>
          </section>

          {/* Why Choose */}
          <section className="why-lst">
            <h2>{whyTitle}</h2>
            <p className="why-sub">{whySubtitle}</p>
            <div className="why-grid">
              {whyItems.slice(0, 6).map((item, idx) => (
                <div className="why-card" key={idx}>
                  {service[`why_icon_${idx + 1}`] && (
                    <div className="card-image">
                      <img src={service[`why_icon_${idx + 1}`]} alt={item} />
                    </div>
                  )}
                  <h4>{item}</h4>
                  <p>
                    {service.qualifications && service.qualifications[idx]
                      ? service.qualifications[idx]
                      : "Support provided to meet individual needs."}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Ideal For */}
          <section className="who-lst">
            <h2>{service.who_title || "Ideal For"}</h2>
            <div className="who-grid">
              {whoItems.slice(0, 6).map((audience, idx) => (
                <div className="who-card" key={idx}>
                  {service[`who_icon_${idx + 1}`] && (
                    <div className="who-image">
                      <img src={service[`who_icon_${idx + 1}`]} alt={audience} />
                    </div>
                  )}
                  <h4>{audience}</h4>
                  <p>Tailored support available for {audience.toLowerCase()}.</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="faq-lst">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-container">
              <div className="faq-questions">
                {faqs.slice(0, 7).map((faq, idx) => (
                  <div
                    className={`faq-card ${openFaqIndex === idx ? "open" : ""}`}
                    key={idx}
                    onMouseEnter={() => setOpenFaqIndex(idx)}
                    onMouseLeave={() => setOpenFaqIndex(null)}
                  >
                    <button
                      className="faq-question"
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                      }
                    >
                      {faq.q}
                    </button>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="faq-image">
                <img
                  src={service.faq_image_url || placeholderImg}
                  alt="FAQ Illustration"
                />
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}

export default ServiceDetail;
