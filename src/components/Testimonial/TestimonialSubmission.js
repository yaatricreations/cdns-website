// TestimonialSubmission.jsx - New Contact-Style Form
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./TestimonialSubmission.css";

export default function TestimonialSubmission() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    review: "",
    image: null,
    rating: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.review.trim()) newErrors.review = "Review is required";
    if (!formData.rating) newErrors.rating = "Rating is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus("");

    try {
      // EmailJS template for testimonial submission
      const templateParams = {
        from_name: formData.name,
        location: formData.location,
        message: formData.review,
        rating: formData.rating,
        to_name: "CDNS Team",
      };

      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TESTIMONIAL_TEMPLATE_ID", 
        templateParams,
        "YOUR_PUBLIC_KEY"
      );

      setStatus("success");
      setFormData({ name: "", location: "", review: "", image: null, rating: "" });
    } catch (error) {
      setStatus("error");
      console.error("EmailJS error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="testimonial-submission-hero">
      <div className="testimonial-container">
        <div className="testimonial-hero-content">
          <h1>Share Your Story</h1>
          <p>
            Help others by sharing your experience with Compliance Diagnostic 
            Nursing Services. Your testimonial will inspire future families.
          </p>
        </div>

        <div className="testimonial-form-section">
          <form onSubmit={handleSubmit} className="testimonial-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Location (City, State) *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={errors.location ? "error" : ""}
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Rating *</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className={errors.rating ? "error" : ""}
              >
                <option value="">Select Rating</option>
                <option value="⭐⭐⭐⭐⭐">5 Stars - Excellent</option>
                <option value="⭐⭐⭐⭐">4 Stars - Very Good</option>
                <option value="⭐⭐⭐">3 Stars - Good</option>
                <option value="⭐⭐">2 Stars - Fair</option>
                <option value="⭐">1 Star - Poor</option>
              </select>
              {errors.rating && <span className="error-message">{errors.rating}</span>}
            </div>

            <div className="form-group">
              <label>Your Testimonial *</label>
              <textarea
                name="review"
                rows="5"
                placeholder="Share your experience with our nursing services..."
                value={formData.review}
                onChange={handleInputChange}
                className={errors.review ? "error" : ""}
              />
              {errors.review && <span className="error-message">{errors.review}</span>}
            </div>

            <div className="form-group">
              <label>Photo (Optional)</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
              <small>Upload a photo to go with your testimonial (max 5MB)</small>
            </div>

            {status === "success" && (
              <div className="submit-status success">
                🎉 Thank you! Your testimonial has been submitted. We'll review and feature it soon!
              </div>
            )}
            {status === "error" && (
              <div className="submit-status error">
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Testimonial"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
