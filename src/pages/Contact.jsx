import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as schoolService from '../services/schoolService';
import * as contactService from '../services/contactService';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [schoolData, setSchoolData] = useState({
    address: 'ZPHS Anandhapuram, Anandhapuram Village, Vizianagaram District, Andhra Pradesh - 535280',
    phone: '+91 98765 43210',
    altPhone: '+91 91234 56789',
    email: 'zphs.anandhapuram@gmail.com',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30592.82038456396!2d83.35!3d18.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c0f4b2c3d4e5f%3A0x1234567890abcdef!2sAnandhapuram%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([schoolService.get(), contactService.get()])
      .then(([schInfo, conInfo]) => {
        setSchoolData(prev => ({
          ...prev,
          ...schInfo,
          ...conInfo
        }));
      })
      .catch(err => console.error('Failed to load contact info:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: FaMapMarkerAlt, color: '#2563eb', label: 'Address', value: schoolData.address },
    { icon: FaPhone,        color: '#10b981', label: 'Phone',   value: schoolData.altPhone ? `${schoolData.phone} / ${schoolData.altPhone}` : schoolData.phone },
    { icon: FaEnvelope,     color: '#f59e0b', label: 'Email',   value: schoolData.email },
    { icon: FaClock,        color: '#8b5cf6', label: 'Office Hours', value: 'Mon – Sat: 9:00 AM – 4:00 PM' },
  ];

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you — parents, students, or visitors are always welcome.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Panel */}
            <div className="contact-info-panel">
              <h2>Get in Touch</h2>
              <p className="contact-intro">Have questions about admissions, academics, or school events? Reach us through any of the following channels.</p>

              <div className="contact-cards">
                {contactInfo.map(c => (
                  <motion.div
                    key={c.label}
                    whileHover={{ x: 6 }}
                    className="contact-card"
                  >
                    <div className="cc-icon" style={{ background: c.color + '18', color: c.color }}><c.icon /></div>
                    <div className="cc-body">
                      <div className="cc-label">{c.label}</div>
                      <div className="cc-value">{c.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Timings */}
              <div className="school-timings">
                <h4>🕐 School Timings</h4>
                <div className="timing-row"><span>Classes Begin</span><span>9:00 AM</span></div>
                <div className="timing-row"><span>Lunch Break</span><span>12:30 – 1:00 PM</span></div>
                <div className="timing-row"><span>Classes End</span><span>4:00 PM</span></div>
                <div className="timing-row"><span>Saturday</span><span>9:00 AM – 1:00 PM</span></div>
                <div className="timing-row"><span>Sunday</span><span>Holiday</span></div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-panel">
              <h2>Send a Message</h2>
              <p>Fill in your details and we'll get back to you within 1–2 working days.</p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="success-msg"
                >
                  <FaCheckCircle /> Your message was sent successfully! We'll respond soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" required placeholder="Your full name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input id="email" name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select id="subject" name="subject" required value={form.subject} onChange={handleChange}>
                      <option value="">Select a topic</option>
                      <option>Admission Enquiry</option>
                      <option>Academic Information</option>
                      <option>Facilities</option>
                      <option>Fee / Scholarship</option>
                      <option>Complaint / Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" required placeholder="Write your message here…" rows={5} value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="map-section">
        <div className="map-header container">
          <h2>📍 Find Us on the Map</h2>
          <p>ZPHS Anandhapuram, Vizianagaram District, Andhra Pradesh</p>
        </div>
        <div className="map-wrap">
          <iframe
            title="School Location"
            src={schoolData.mapEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
