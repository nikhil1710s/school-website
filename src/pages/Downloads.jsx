import { useState, useEffect } from 'react';
import { FaDownload, FaFilePdf, FaSearch, FaFolderOpen, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as downloadsService from '../services/downloadsService';
import './Downloads.css';

const CATEGORIES = [
  { id: 'all', label: 'All Files' },
  { id: 'academic', label: 'Academic' },
  { id: 'admission', label: 'Admissions' },
  { id: 'exam', label: 'Examinations' },
  { id: 'fee', label: 'Fees Structure' },
  { id: 'scholarship', label: 'Scholarships' },
  { id: 'report', label: 'Reports' },
];

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    downloadsService
      .getAll()
      .then((data) => setDownloads(data))
      .catch((err) => console.error('Failed to load downloads:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredDownloads = downloads.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="downloads-page">
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Download Center</h1>
            <p>Access official school documents, forms, exam schedules, and circulars.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Section ── */}
      <section className="section">
        <div className="container">
          {/* Controls Bar */}
          <div className="downloads-controls">
            {/* Category Pills */}
            <div className="category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Grid / List of Downloads */}
          {loading ? (
            <div className="text-center" style={{ padding: '60px 0' }}>
              <div className="spinner" style={{ margin: '0 auto 16px' }} />
              <p className="text-muted">Loading documents...</p>
            </div>
          ) : filteredDownloads.length === 0 ? (
            <div className="empty-downloads">
              <FaFolderOpen className="empty-icon" />
              <h3>No documents found</h3>
              <p>Try clearing your search term or selecting a different category.</p>
            </div>
          ) : (
            <div className="downloads-grid">
              {filteredDownloads.map((doc, idx) => (
                <motion.div
                  key={doc.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="download-card"
                >
                  <div className="download-card-header">
                    <div className="file-icon-wrap">
                      <FaFilePdf />
                    </div>
                    <span className="badge badge-primary">{doc.category}</span>
                  </div>

                  <div className="download-card-body">
                    <h4>{doc.title}</h4>
                    <p>{doc.description}</p>
                  </div>

                  <div className="download-card-meta">
                    <span>
                      <FaCalendarAlt /> {doc.date ? new Date(doc.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently added'}
                    </span>
                    <span>
                      <FaFileAlt /> {doc.fileSize || 'PDF'}
                    </span>
                  </div>

                  <div className="download-card-footer">
                    <a
                      href={doc.fileUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-download"
                      onClick={(e) => {
                        if (doc.fileUrl === '#' || !doc.fileUrl) {
                          e.preventDefault();
                          alert('This document placeholder will link to Firebase Storage once connected.');
                        }
                      }}
                    >
                      <FaDownload /> Download File
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
