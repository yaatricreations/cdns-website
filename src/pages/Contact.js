// contact.js - COMPLETE CDNS CONTACT PAGE WITH CLEAN STROKE SVG ICONS
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  MdEmail, 
  MdPhone, 
  MdBusiness, 
  MdRateReview, 
  MdLocalPhone, 
  MdMarkEmailRead 
} from 'react-icons/md';
import './services/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // ✅ REPLACE THESE FROM EMAILJS DASHBOARD
  const SERVICE_ID = 'service_ypfdazq';
  const TEMPLATE_ID = 'template_us3ust8';
  const PUBLIC_KEY = 'ujKowXu5NGAGaDUIB';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
        .then((result) => {
          setSubmitStatus('✅ Thank you! Message sent to CDNS team.');
          setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
          e.target.reset();
        }, (error) => {
          setSubmitStatus('❌ Error sending. Please call 0450 906 280.');
        });
    } catch (error) {
      setSubmitStatus('❌ Error. Please call 0450 906 280.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get In Touch With CDNS</h1>
          <p>We're here to help you access quality NDIS support services across Australia.</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-container">
        {/* CDNS Contact Details + FEEDBACK */}
        <div className="contact-info">
          {/* Main Contact Card */}
          <div className="contact-card main-contact">
            <h2>Contact Information</h2>
            
            <div className="contact-item">
              <div className="contact-icon">
                <MdEmail />
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>
                  <a href="mailto:rizalarjun6@gmail.com">rizalarjun6@gmail.com</a><br/>
                  <a href="mailto:jeewan.wish@gmail.com">jeewan.wish@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <MdPhone />
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>
                  <a href="tel:+61450906280">0450 906 280</a><br/>
                  <a href="tel:+61415914512">0415 914 512</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <MdBusiness />
              </div>
              <div className="contact-details">
                <h3>Services</h3>
                <p>NDIS Registered Provider</p>
                <p>Disability Support | Plan Management | Community Participation</p>
              </div>
            </div>
          </div>

          {/* FEEDBACK & COMPLAINTS SECTION */}
          <div className="contact-card feedback-card">
            <div className="contact-icon feedback-icon">
              <MdRateReview />
            </div>
            <h3>Feedback and Complaints</h3>
            <p className="feedback-text">
              To provide you with better services, we need your feedback. Feedback can be 
              <strong> Compliments, Suggestions & Complaints</strong>. 
              <br/>We would love to hear from you!
            </p>
            <p className="feedback-instructions">
              Call us, or Email us directly.
            </p>
            
            <div className="feedback-contact">
              <div className="feedback-item">
                <MdLocalPhone className="feedback-item-icon" />
                <div>
                  <strong>Phone:</strong>
                  <div className="feedback-phone">
                    <a href="tel:+6110450 906 280">0450 906 280</a>
                   
                  </div>
                </div>
              </div>
            </div>

            <div className="feedback-contact">
              <div className="feedback-item">
                <MdMarkEmailRead className="feedback-item-icon" />
                <div>
                  <strong>Email:</strong>
                  <div className="feedback-email">
                    <a href="mailto:feedback@cdns.com.au">feedback@cdns.com.au</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simplified Contact Form */}
        <div className="contact-form-section">
          <h2 className="form-title">Send Us a Message</h2>
          
          {submitStatus && (
            <div className={`submit-status ${submitStatus.includes('Thank you') ? 'success' : 'error'}`}>
              {submitStatus}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone (Optional)</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you... (Compliments, suggestions, complaints, or general enquiries welcome!)"
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
