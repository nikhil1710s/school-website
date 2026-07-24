import { useState, useEffect } from 'react';
import { FaSearch, FaEnvelope, FaChalkboardTeacher } from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as facultyService from '../services/facultyService';
import { getImageUrl, isImagePath } from '../utils/imageUtils';
import './Faculty.css';

const subjects = ['All', 'Telugu', 'English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Physical Education', 'Administration'];

const avatarColors = ['#2563eb','#f59e0b','#10b981','#8b5cf6','#ec4899','#f97316','#06b6d4','#ef4444','#84cc16','#0ea5e9'];

export default function Faculty() {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    facultyService.getAll()
      .then(data => setFacultyData(data))
      .catch(err => console.error('Failed to load faculty:', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = facultyData.filter(f => {
    const matchFilter = filter === 'All' || f.subject === filter;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                        f.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Our Faculty</h1>
          <p>Meet our dedicated team of qualified and experienced educators who inspire every day.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Search + Filter */}
          <div className="faculty-controls">
            <div className="faculty-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search teachers by name or subject…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="subject-filters">
              {subjects.map(s => (
                <button
                  key={s}
                  className={`filter-chip${filter === s ? ' active' : ''}`}
                  onClick={() => setFilter(s)}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="faculty-count">
            Showing <strong>{filtered.length}</strong> of {facultyData.length} teachers
          </p>

          {loading ? (
            <div className="text-center" style={{ padding: '60px 0' }}>
              <div className="spinner" style={{ margin: '0 auto 16px' }} />
              <p className="text-muted">Loading faculty details...</p>
            </div>
          ) : (
            <div className="faculty-grid">
            {filtered.map((f, i) => {
              const color = avatarColors[i % avatarColors.length];
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.08 }}
                  className="faculty-card"
                >
                  <div className="faculty-avatar" style={{ background: isImagePath(f.image || f.avatar) ? 'transparent' : `linear-gradient(135deg, ${color}, ${color}99)` }}>
                    {isImagePath(f.image || f.avatar) ? (
                      <img src={getImageUrl(f.image || f.avatar)} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    ) : (
                      f.avatar
                    )}
                  </div>
                  <div className="faculty-info">
                    <h3>{f.name}</h3>
                    <div className="faculty-role">{f.role}</div>
                    <div className="badge badge-primary" style={{ marginBottom: '8px' }}>{f.subject}</div>
                    <div className="faculty-meta">
                      <span>🎓 {f.qualifications}</span>
                      <span>⏱ {f.experience} experience</span>
                    </div>
                    <a href={`mailto:${f.email}`} className="faculty-email">
                      <FaEnvelope /> {f.email}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="no-results">
              <FaChalkboardTeacher />
              <h3>No teachers found</h3>
              <p>Try a different search term or filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
