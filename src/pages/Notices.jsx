import { useState } from 'react';
import { FaBell, FaSearch, FaThumbtack, FaFilePdf, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import noticesData from '../data/notices.json';
import './Notices.css';

const categories = ['All', 'exam', 'general', 'result', 'meeting', 'scholarship', 'event'];
const catColors = { exam: 'badge-danger', general: 'badge-primary', result: 'badge-accent', meeting: 'badge-purple', scholarship: 'badge-secondary', event: 'badge-accent' };

export default function Notices() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = noticesData
    .filter(n => filter === 'All' || n.category === filter)
    .filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Notices & Announcements</h1>
          <p>Stay updated with the latest circulars, exam schedules, and school announcements.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Controls */}
          <div className="notices-controls">
            <div className="notice-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search notices…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="notice-filters">
              <FaFilter className="filter-label-icon" />
              {categories.map(c => (
                <button
                  key={c}
                  className={`filter-chip${filter === c ? ' active' : ''}`}
                  onClick={() => setFilter(c)}
                >{c}</button>
              ))}
            </div>
          </div>

          <p className="result-count">
            Showing <strong>{filtered.length}</strong> notice{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Notices */}
          <div className="notices-stack">
            {filtered.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`notice-card${n.pinned ? ' pinned' : ''}`}
              >
                <div className="notice-card-left">
                  <div className="notice-date-block">
                    <span className="ndb-day">{new Date(n.date).getDate()}</span>
                    <span className="ndb-mon">{new Date(n.date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                    <span className="ndb-yr">{new Date(n.date).getFullYear()}</span>
                  </div>
                </div>
                <div className="notice-card-body">
                  <div className="notice-card-top">
                    <span className={`badge ${catColors[n.category] || 'badge-primary'}`}>{n.category}</span>
                    {n.pinned && (
                      <span className="pinned-tag"><FaThumbtack /> Pinned</span>
                    )}
                  </div>
                  <h3 className="notice-card-title">{n.title}</h3>
                  <p className="notice-card-content">{n.content}</p>
                  {n.pdfUrl && (
                    <a href={n.pdfUrl} className="pdf-btn" target="_blank" rel="noopener noreferrer">
                      <FaFilePdf /> Download PDF
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="no-results" style={{ textAlign:'center', padding:'60px 0', color:'var(--text-mid)' }}>
                <FaBell style={{ fontSize:'2.5rem', color:'var(--text-light)', display:'block', margin:'0 auto 12px' }} />
                <h3>No notices found</h3>
                <p>Try a different search or category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
