import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching testimonials:", error.message);
      } else {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  const approveTestimonial = async (id) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ approved: true })
      .eq("id", id);

    if (error) {
      alert("Error approving testimonial: " + error.message);
    } else {
      alert("Testimonial approved!");
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved: true } : t)),
      );
    }
  };

  if (loading) return <p>Loading testimonials...</p>;

  return (
    <div className="admin-testimonials">
      <h2>Manage Testimonials</h2>
      {testimonials.map((t) => (
        <div key={t.id} className="testimonial-card">
          <p>
            <strong>{t.name}</strong> ({t.location})
          </p>
          <p>{t.text}</p>
          {t.image_url && (
            <img src={t.image_url} alt="testimonial" width="150" />
          )}
          <p>Status: {t.approved ? "✅ Approved" : "⏳ Pending"}</p>
          {!t.approved && (
            <button onClick={() => approveTestimonial(t.id)}>Approve</button>
          )}
        </div>
      ))}
    </div>
  );
}
