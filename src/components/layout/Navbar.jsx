import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaGraduationCap, FaBars, FaTimes, FaChevronDown,
  FaPhone, FaEnvelope, FaFacebook, FaYoutube, FaWhatsapp
} from 'react-icons/fa';
import * as contactService from '../../services/contactService';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Faculty', path: '/faculty' },
  { label: 'Facilities', path: '/facilities' },
  {
    label: 'More', path: '#',
    children: [
      { label: 'Events & Gallery', path: '/gallery' },
      { label: 'Notices', path: '/notices' },
      { label: 'Achievements', path: '/achievements' },
      { label: 'Downloads', path: '/downloads' },
    ]
  },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [schoolData, setSchoolData] = useState({
    phone: '+91 98765 43210',
    email: 'zphs.anandhapuram@gmail.com',
    socialMedia: { facebook: '#', youtube: '#', whatsapp: '#' }
  });
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    contactService.get()
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setSchoolData(prev => ({
            ...prev,
            ...data,
            socialMedia: { ...prev.socialMedia, ...data.socialMedia }
          }));
        }
      })
      .catch(err => console.error('Failed to load navbar contact info:', err));
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <span><FaPhone /> {schoolData.phone}</span>
            <span><FaEnvelope /> {schoolData.email}</span>
          </div>
          <div className="topbar-right">
            <a href={schoolData.socialMedia?.facebook || '#'} aria-label="Facebook"><FaFacebook /></a>
            <a href={schoolData.socialMedia?.youtube || '#'} aria-label="YouTube"><FaYoutube /></a>
            <a href={schoolData.socialMedia?.whatsapp || '#'} aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon"><FaGraduationCap /></div>
            <div className="nav-logo-text">
              <span className="nav-logo-main">ZPHS</span>
              <span className="nav-logo-sub">Anandhapuram</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label} className="nav-item has-dropdown" ref={dropdownRef}>
                  <button
                    className={`nav-link dropdown-trigger${dropdownOpen ? ' active' : ''}`}
                    onClick={() => setDropdownOpen(o => !o)}
                  >
                    {link.label} <FaChevronDown className={`chevron${dropdownOpen ? ' open' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="dropdown">
                      {link.children.map(c => (
                        <NavLink key={c.path} to={c.path} className="dropdown-item">{c.label}</NavLink>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.label} className="nav-item">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
          <ul>
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label}>
                  <span className="mobile-group-label">{link.label}</span>
                  {link.children.map(c => (
                    <NavLink key={c.path} to={c.path} className="mobile-link sub">{c.label}</NavLink>
                  ))}
                </li>
              ) : (
                <li key={link.label}>
                  <NavLink to={link.path} className="mobile-link">{link.label}</NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
