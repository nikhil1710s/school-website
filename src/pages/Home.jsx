import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight, FaBell, FaCalendarAlt, FaChevronLeft, FaChevronRight,
  FaStar, FaUsers, FaChalkboardTeacher, FaTrophy, FaBook,
  FaFlask, FaFutbol, FaBus, FaImages, FaExternalLinkAlt,
  FaGraduationCap, FaMapMarkerAlt, FaCheckCircle
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import schoolData from '../data/school.json';
import notices from '../data/notices.json';
import events from '../data/events.json';
import gallery from '../data/gallery.json';
import './Home.css';

const heroSlides = [
  {
    bg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #0f172a 100%)',
    accent: 'rgba(245,158,11,0.2)',
    title: 'Empowering Minds,',
    title2: 'Shaping Futures',
    sub: 'Welcome to ZPHS Anandhapuram — where quality education meets care and opportunity for every child.',
  },
  {
    bg: 'linear-gradient(135deg, #059669 0%, #047857 50%, #0f172a 100%)',
    accent: 'rgba(16,185,129,0.2)',
    title: 'Excellence in',
    title2: 'Education Since 1975',
    sub: 'Delivering outstanding academic results with a 100% pass rate and district topper students every year.',
  },
  {
    bg: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #0f172a 100%)',
    accent: 'rgba(139,92,246,0.2)',
    title: 'Nurturing Talent,',
    title2: 'Building Character',
    sub: 'From sports champions to science innovators — ZPHS students excel in every field.',
  },
];

const quickLinks = [
  { icon: FaGraduationCap, label: 'Academics', path: '/academics', color: '#2563eb' },
  { icon: FaBell, label: 'Notices', path: '/notices', color: '#f59e0b' },
  { icon: FaTrophy, label: 'Achievements', path: '/achievements', color: '#10b981' },
  { icon: FaImages, label: 'Gallery', path: '/gallery', color: '#8b5cf6' },
  { icon: FaBook, label: 'Admissions', path: '/admissions', color: '#ec4899' },
  { icon: FaChalkboardTeacher, label: 'Faculty', path: '/faculty', color: '#f97316' },
];

const highlights = [
  { icon: FaCheckCircle, color: '#2563eb', title: 'Quality Education', desc: 'Experienced teachers delivering SCERT-aligned curriculum with interactive teaching methods.' },
  { icon: FaTrophy, color: '#f59e0b', title: 'Award-Winning', desc: 'Best Government School in Vizianagaram District with 100% SSC pass rate for 3 consecutive years.' },
  { icon: FaFlask, color: '#10b981', title: 'Modern Facilities', desc: 'Well-equipped laboratories, digital library, computer room, and hygienic mid-day meal kitchen.' },
  { icon: FaFutbol, color: '#8b5cf6', title: 'Sports & Culture', desc: 'State-level sports champions and vibrant cultural events that nurture all-round development.' },
  { icon: FaBus, color: '#ec4899', title: 'Safe Transport', desc: 'Bus service connecting nearby villages ensuring safe, affordable commute for all students.' },
  { icon: FaUsers, color: '#f97316', title: 'Inclusive Community', desc: 'Welcoming students from all backgrounds — government scholarships available for eligible students.' },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [gallerySlide, setGallerySlide] = useState(0);
  const upcomingEvents = events.filter(e => e.upcoming).slice(0, 3);
  const recentNotices = notices.slice(0, 5);
  const galleryImages = gallery.slice(0, 6);

  const nextSlide = useCallback(() => setSlide(s => (s + 1) % heroSlides.length), []);
  const prevSlide = () => setSlide(s => (s - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const nextGallery = () => setGallerySlide(s => (s + 1) % galleryImages.length);
  const prevGallery = () => setGallerySlide(s => (s - 1 + galleryImages.length) % galleryImages.length);

  const categoryBadge = (cat) => {
    const map = { exam: 'badge-danger', general: 'badge-primary', result: 'badge-accent', meeting: 'badge-purple', scholarship: 'badge-secondary', event: 'badge-accent' };
    return map[cat] || 'badge-primary';
  };

  const s = heroSlides[slide];

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero" style={{ background: s.bg }}>
        <div className="hero-overlay" style={{ background: `radial-gradient(circle at 80% 50%, ${s.accent}, transparent 60%)` }} />
        <div className="hero-shapes">
          <div className="shape s1" /><div className="shape s2" /><div className="shape s3" />
        </div>
        <div className="container hero-content">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-text"
          >
            <div className="hero-badge"><FaGraduationCap /> Est. {schoolData.established} · {schoolData.district}, AP</div>
            <h1 className="hero-title">
              {s.title}<br /><span className="hero-title-accent">{s.title2}</span>
            </h1>
            <p className="hero-sub">{s.sub}</p>
            <div className="hero-cta">
              <Link to="/admissions" className="btn btn-secondary">Apply Now <FaArrowRight /></Link>
              <Link to="/about" className="btn btn-white">Learn More</Link>
            </div>
          </motion.div>
          <div className="hero-stats">
            {[
              { val: `${schoolData.stats.students}+`, label: 'Students' },
              { val: schoolData.stats.teachers, label: 'Teachers' },
              { val: `${schoolData.stats.passingPercentage}%`, label: 'Pass Rate' },
              { val: `${schoolData.stats.yearsOfExcellence}+`, label: 'Years' },
            ].map(st => (
              <div key={st.label} className="hero-stat">
                <div className="hero-stat-val">{st.val}</div>
                <div className="hero-stat-label">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-controls">
          <button onClick={prevSlide} className="hero-btn"><FaChevronLeft /></button>
          <div className="hero-dots">
            {heroSlides.map((_, i) => (
              <button key={i} className={`hero-dot${i === slide ? ' active' : ''}`} onClick={() => setSlide(i)} />
            ))}
          </div>
          <button onClick={nextSlide} className="hero-btn"><FaChevronRight /></button>
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section className="section-sm quick-links-section">
        <div className="container">
          <div className="quick-links-grid">
            {quickLinks.map(ql => (
              <Link key={ql.path} to={ql.path} className="quick-link-card">
                <div className="ql-icon" style={{ background: ql.color + '1a', color: ql.color }}>
                  <ql.icon />
                </div>
                <span>{ql.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notices + Events ── */}
      <section className="section notices-events">
        <div className="container">
          <div className="notices-events-grid">
            {/* Notices */}
            <div className="ne-card">
              <div className="ne-card-header">
                <div className="ne-card-title"><FaBell className="ne-icon" /> Latest Notices</div>
                <Link to="/notices" className="ne-view-all">View All <FaArrowRight /></Link>
              </div>
              <ul className="notice-list">
                {recentNotices.map(n => (
                  <li key={n.id} className="notice-item">
                    {n.pinned && <span className="pinned-dot" title="Pinned" />}
                    <div className="notice-item-body">
                      <div className="notice-item-top">
                        <span className={`badge ${categoryBadge(n.category)}`}>{n.category}</span>
                        <span className="notice-date">{new Date(n.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                      </div>
                      <p className="notice-title">{n.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Events */}
            <div className="ne-card">
              <div className="ne-card-header">
                <div className="ne-card-title"><FaCalendarAlt className="ne-icon" /> Upcoming Events</div>
                <Link to="/gallery" className="ne-view-all">View All <FaArrowRight /></Link>
              </div>
              <div className="event-list">
                {upcomingEvents.map(ev => (
                  <div key={ev.id} className="event-item">
                    <div className="event-date-badge">
                      <span className="event-day">{new Date(ev.date).getDate()}</span>
                      <span className="event-month">{new Date(ev.date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                    </div>
                    <div className="event-info">
                      <p className="event-name">{ev.title}</p>
                      <p className="event-meta"><FaMapMarkerAlt /> {ev.venue} · {ev.time}</p>
                      <p className="event-desc">{ev.description.slice(0, 80)}…</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── School Highlights ── */}
      <section className="section highlights-section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaStar /> Why Choose Us</div>
            <h2>Why ZPHS Anandhapuram?</h2>
            <p>A school that cares, inspires, and delivers — giving every child the best foundation for life.</p>
            <div className="section-divider" />
          </div>
          <div className="grid-3">
            {highlights.map(h => (
              <motion.div
                key={h.title}
                whileHover={{ y: -6 }}
                className="highlight-card"
              >
                <div className="highlight-icon" style={{ background: h.color + '18', color: h.color }}>
                  <h.icon />
                </div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery Carousel ── */}
      <section className="section gallery-preview-section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaImages /> Photo Gallery</div>
            <h2>Life at ZPHS Anandhapuram</h2>
            <p>Glimpses of our vibrant school life — sports, culture, academics and more.</p>
            <div className="section-divider" />
          </div>
          <div className="gallery-carousel">
            <div className="gallery-main">
              <img
                src={galleryImages[gallerySlide].image}
                alt={galleryImages[gallerySlide].caption}
                className="gallery-main-img"
              />
              <div className="gallery-caption">
                <strong>{galleryImages[gallerySlide].title}</strong>
                <span>{galleryImages[gallerySlide].caption}</span>
              </div>
              <button className="gal-btn gal-prev" onClick={prevGallery}><FaChevronLeft /></button>
              <button className="gal-btn gal-next" onClick={nextGallery}><FaChevronRight /></button>
            </div>
            <div className="gallery-thumbs">
              {galleryImages.map((img, i) => (
                <button
                  key={img.id}
                  className={`gallery-thumb${i === gallerySlide ? ' active' : ''}`}
                  onClick={() => setGallerySlide(i)}
                >
                  <img src={img.image} alt={img.caption} />
                </button>
              ))}
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '32px' }}>
            <Link to="/gallery" className="btn btn-primary">View Full Gallery <FaExternalLinkAlt /></Link>
          </div>
        </div>
      </section>

      {/* ── Principal Message Strip ── */}
      <section className="principal-strip">
        <div className="container principal-inner">
          <div className="principal-avatar">
            <div className="principal-avatar-circle">
              {schoolData.principal.name.split(' ').slice(-1)[0][0]}
            </div>
          </div>
          <div className="principal-content">
            <div className="eyebrow" style={{ display:'inline-flex', marginBottom:'12px' }}>From the Headmaster's Desk</div>
            <blockquote>"{schoolData.principal.message.slice(0, 200)}…"</blockquote>
            <div className="principal-meta">
              <strong>{schoolData.principal.name}</strong>
              <span>{schoolData.principal.title} · {schoolData.principal.qualifications}</span>
            </div>
          </div>
          <Link to="/about" className="btn btn-outline" style={{ flexShrink: 0 }}>Read More <FaArrowRight /></Link>
        </div>
      </section>
    </div>
  );
}
