import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaGraduationCap, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaFacebook, FaYoutube, FaWhatsapp, FaHeart,
  FaArrowRight, FaLock
} from 'react-icons/fa';
import * as schoolService from '../../services/schoolService';
import * as contactService from '../../services/contactService';
import './Footer.css';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Faculty', path: '/faculty' },
  { label: 'Facilities', path: '/facilities' },
];
const moreLinks = [
  { label: 'Events & Gallery', path: '/gallery' },
  { label: 'Notices', path: '/notices' },
  { label: 'Achievements', path: '/achievements' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Footer() {
  const [schoolData, setSchoolData] = useState({
    fullName: 'Zilla Parishad High School, Anandhapuram',
    tagline: 'Empowering Minds, Shaping Futures',
    established: '1975',
    district: 'Vizianagaram',
    address: 'ZPHS Anandhapuram, Anandhapuram Village, Vizianagaram District, Andhra Pradesh - 535280',
    phone: '+91 98765 43210',
    email: 'zphs.anandhapuram@gmail.com',
    socialMedia: { facebook: '#', youtube: '#', whatsapp: '#' }
  });

  useEffect(() => {
    Promise.all([schoolService.get(), contactService.get()])
      .then(([schInfo, conInfo]) => {
        setSchoolData(prev => ({
          ...prev,
          ...schInfo,
          ...conInfo,
          socialMedia: { ...prev.socialMedia, ...conInfo?.socialMedia }
        }));
      })
      .catch(err => console.error('Failed to load footer info:', err));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--primary-dark)"/>
        </svg>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon"><FaGraduationCap /></div>
              <div>
                <div className="footer-logo-main">ZPHS</div>
                <div className="footer-logo-sub">Anandhapuram</div>
              </div>
            </div>
            <p className="footer-tagline">{schoolData.tagline}</p>
            <p className="footer-desc">Established in {schoolData.established}, ZPHS Anandhapuram has been a beacon of quality education in {schoolData.district} district, Andhra Pradesh.</p>
            <div className="footer-social">
              <a href={schoolData.socialMedia?.facebook || '#'} className="social-btn facebook" aria-label="Facebook"><FaFacebook /></a>
              <a href={schoolData.socialMedia?.youtube || '#'} className="social-btn youtube" aria-label="YouTube"><FaYoutube /></a>
              <a href={schoolData.socialMedia?.whatsapp || '#'} className="social-btn whatsapp" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul>
              {quickLinks.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="footer-link">
                    <FaArrowRight className="footer-link-icon" />{l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <ul>
              {moreLinks.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="footer-link">
                    <FaArrowRight className="footer-link-icon" />{l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <FaMapMarkerAlt className="fc-icon" />
                <span>{schoolData.address}</span>
              </div>
              <div className="footer-contact-item">
                <FaPhone className="fc-icon" />
                <span>{schoolData.phone}</span>
              </div>
              <div className="footer-contact-item">
                <FaEnvelope className="fc-icon" />
                <span>{schoolData.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} {schoolData.fullName}. All rights reserved.</p>
          <div className="footer-bottom-right">
            <p>Made with <FaHeart className="heart" /> for the students of ZPHS Anandhapuram</p>
            <Link to="/admin/login" className="admin-login-btn" title="Admin Portal Login">
              <FaLock /> Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
