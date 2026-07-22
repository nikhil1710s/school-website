import { useState } from 'react';
import { FaTrophy, FaStar, FaMedal, FaUserGraduate, FaChalkboardTeacher, FaSchool } from 'react-icons/fa';
import { motion } from 'framer-motion';
import achievementsData from '../data/achievements.json';
import './Achievements.css';

const tabs = [
  { key: 'students', label: 'Students', icon: FaUserGraduate },
  { key: 'teachers', label: 'Teachers', icon: FaChalkboardTeacher },
  { key: 'school', label: 'School', icon: FaSchool },
];

const categoryColors = { academic: '#2563eb', sports: '#10b981', cultural: '#f59e0b', other: '#8b5cf6' };

export default function Achievements() {
  const [activeTab, setActiveTab] = useState('students');

  const featuredStudents = achievementsData.students.filter(a => a.featured);
  const others = achievementsData[activeTab].filter(a => !a.featured);
  const allCurrent = achievementsData[activeTab];

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Achievements</h1>
          <p>Celebrating excellence — our students, teachers, and school shine bright on every stage.</p>
        </div>
      </div>

      {/* Featured */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaStar /> Top Achievements</div>
            <h2>Hall of Fame</h2>
            <p>Our proudest moments — students who made the entire school family proud.</p>
            <div className="section-divider" />
          </div>
          <div className="featured-grid">
            {featuredStudents.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="featured-card"
              >
                <div className="featured-trophy">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🏆'}
                </div>
                <div className="featured-award">{a.award}</div>
                <h3>{a.name}</h3>
                <div className="badge badge-primary" style={{ marginBottom: '8px' }}>{a.class}</div>
                <p>{a.achievement}</p>
                <div className="featured-year">{a.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="section">
        <div className="container">
          <div className="achiev-tabs">
            {tabs.map(t => (
              <button
                key={t.key}
                className={`achiev-tab${activeTab === t.key ? ' active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                <t.icon /> {t.label}
              </button>
            ))}
          </div>

          <div className="achiev-grid">
            {allCurrent.map((a, i) => {
              const color = a.category ? (categoryColors[a.category] || '#2563eb') : '#2563eb';
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className={`achiev-card${a.featured ? ' featured-border' : ''}`}
                  style={{ '--card-color': color }}
                >
                  <div className="achiev-icon" style={{ background: color + '18', color }}>
                    {a.featured ? <FaTrophy /> : <FaMedal />}
                  </div>
                  <div className="achiev-body">
                    <div className="achiev-year-tag">{a.year}</div>
                    <h4>{activeTab === 'students' ? a.achievement : activeTab === 'teachers' ? a.achievement : a.achievement}</h4>
                    <p className="achiev-name">
                      {activeTab === 'students' ? `${a.name} — ${a.class}` :
                       activeTab === 'teachers' ? `${a.name} (${a.subject})` :
                       `Awarded by: ${a.awardedBy}`}
                    </p>
                    {activeTab === 'students' && a.award && (
                      <span className="achiev-award-tag" style={{ background: color + '18', color }}>{a.award}</span>
                    )}
                    <p className="achiev-desc">{a.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
