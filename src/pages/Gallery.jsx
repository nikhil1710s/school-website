import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaTag } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import * as galleryService from '../services/galleryService';
import * as eventsService from '../services/eventsService';
import './Gallery.css';

const categories = ['All', 'sports', 'cultural', 'academic', 'national', 'environment'];
const catLabels = { All: 'All', sports: '🏅 Sports', cultural: '🎭 Cultural', academic: '📚 Academic', national: '🇮🇳 National', environment: '🌿 Environment' };

export default function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [tab, setTab] = useState('gallery');

  useEffect(() => {
    Promise.all([galleryService.getAll(), eventsService.getAll()])
      .then(([gal, ev]) => {
        setGalleryData(gal);
        setEventsData(ev);
      })
      .catch(err => console.error('Failed to load gallery/events:', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = galleryData.filter(g => filter === 'All' || g.category === filter);

  const openLightbox = (img) => setLightbox(img);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };
  const nextImg = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx + 1) % filtered.length]);
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Events & Gallery</h1>
          <p>Relive the memories — sports days, cultural events, academic milestones and more.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="text-center" style={{ padding: '60px 0' }}>
              <div className="spinner" style={{ margin: '0 auto 16px' }} />
              <p className="text-muted">Loading gallery and events...</p>
            </div>
          ) : (
            <>
              {/* Tab Toggle */}
          <div className="gal-tabs">
            <button className={`gal-tab${tab === 'gallery' ? ' active' : ''}`} onClick={() => setTab('gallery')}>📸 Photo Gallery</button>
            <button className={`gal-tab${tab === 'events' ? ' active' : ''}`} onClick={() => setTab('events')}>📅 All Events</button>
          </div>

          {tab === 'gallery' && (
            <>
              {/* Category Filter */}
              <div className="gal-filters">
                {categories.map(c => (
                  <button key={c} className={`filter-chip${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>
                    {catLabels[c]}
                  </button>
                ))}
              </div>

              {/* Image Grid */}
              <motion.div layout className="gal-grid">
                <AnimatePresence>
                  {filtered.map((img) => (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="gal-item"
                      onClick={() => openLightbox(img)}
                    >
                      <img src={img.image} alt={img.caption} loading="lazy" />
                      <div className="gal-overlay">
                        <div className="gal-item-info">
                          <span className="badge badge-primary">{img.category}</span>
                          <p>{img.caption}</p>
                          <small><FaCalendarAlt /> {new Date(img.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filtered.length === 0 && (
                <div className="no-results" style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-mid)' }}>
                  <FaSearch style={{ fontSize: '2.5rem', marginBottom: '12px', display: 'block', margin: '0 auto 12px' }} />
                  <p>No photos in this category yet.</p>
                </div>
              )}
            </>
          )}

          {tab === 'events' && (
            <div className="events-list">
              {eventsData.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="event-full-card"
                >
                  <div className="efc-img-wrap">
                    <img src={ev.image} alt={ev.title} />
                    {ev.upcoming && <span className="upcoming-badge">Upcoming</span>}
                  </div>
                  <div className="efc-body">
                    <div className="efc-meta">
                      <span className="badge badge-primary"><FaTag /> {ev.category}</span>
                      <span className="efc-date">
                        <FaCalendarAlt /> {new Date(ev.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <h3>{ev.title}</h3>
                    <p>{ev.description}</p>
                    <div className="efc-details">
                      <span>🕐 {ev.time}</span>
                      <span>📍 {ev.venue}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lb-close" onClick={closeLightbox}><FaTimes /></button>
            <button className="lb-prev" onClick={(e) => { e.stopPropagation(); prevImg(); }}><FaChevronLeft /></button>
            <motion.div
              className="lb-content"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.image} alt={lightbox.caption} />
              <div className="lb-caption">
                <strong>{lightbox.title}</strong>
                <span>{lightbox.caption}</span>
              </div>
            </motion.div>
            <button className="lb-next" onClick={(e) => { e.stopPropagation(); nextImg(); }}><FaChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
