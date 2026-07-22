import { useState } from 'react';
import { FaBook, FaFlask, FaGlobe, FaCalculator, FaLanguage, FaDumbbell, FaDesktop, FaCalendarAlt, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Academics.css';

const classes = [
  { cls: 'Class 6', students: 65, sections: 'A, B' },
  { cls: 'Class 7', students: 70, sections: 'A, B' },
  { cls: 'Class 8', students: 68, sections: 'A, B' },
  { cls: 'Class 9', students: 72, sections: 'A, B' },
  { cls: 'Class 10', students: 75, sections: 'A, B' },
];

const subjects = [
  { icon: FaLanguage, name: 'Telugu', color: '#f59e0b', desc: 'Mother tongue language, literature and grammar' },
  { icon: FaBook, name: 'English', color: '#2563eb', desc: 'Communication, literature and language skills' },
  { icon: FaBook, name: 'Hindi', color: '#ec4899', desc: 'National language — reading, writing and conversation' },
  { icon: FaCalculator, name: 'Mathematics', color: '#10b981', desc: 'Arithmetic, algebra, geometry and trigonometry' },
  { icon: FaFlask, name: 'Science', color: '#8b5cf6', desc: 'Physics, chemistry and biology fundamentals' },
  { icon: FaGlobe, name: 'Social Studies', color: '#f97316', desc: 'History, geography, civics and economics' },
  { icon: FaDesktop, name: 'Computer Science', color: '#06b6d4', desc: 'Basic computing, MS Office and internet usage' },
  { icon: FaDumbbell, name: 'Physical Education', color: '#ef4444', desc: 'Sports, yoga, fitness and team games' },
];

const calendar = [
  { month: 'June', events: ['School Reopens', 'Uniform & Book Distribution', 'Admission for new students'] },
  { month: 'July', events: ['Unit Test 1', 'Independence Day Rehearsals'] },
  { month: 'August', events: ['Independence Day Celebration', 'Mid-Term Exams Begin'] },
  { month: 'September', events: ['Mid-Term Results', 'Parent-Teacher Meeting'] },
  { month: 'October', events: ['Half-Yearly Exams', 'Cultural Events'] },
  { month: 'November', events: ['Children\'s Day Celebrations', 'Unit Test 2'] },
  { month: 'December', events: ['Annual Day', 'Sports Day', 'Winter Break Begins'] },
  { month: 'January', events: ['School Reopens', 'Republic Day', 'Pre-Final Exams'] },
  { month: 'February', events: ['SSC Practical Exams', 'Farewell for Class 10'] },
  { month: 'March', events: ['SSC Board Exams', 'Annual Exams Class 6-9'] },
  { month: 'April', events: ['Annual Exam Results', 'Summer Vacation Begins'] },
  { month: 'May', events: ['Summer Vacation', 'SSC Results Announced'] },
];

const approaches = [
  { icon: FaLightbulb, title: 'Activity-Based Learning', desc: 'Hands-on experiments, projects, and group activities make concepts stick.' },
  { icon: FaDesktop, title: 'Digital Classrooms', desc: 'Smart boards and e-content bring lessons to life with visuals and videos.' },
  { icon: FaBook, title: 'SCERT Curriculum', desc: 'AP State curriculum with updated textbooks, worksheets, and assessments.' },
  { icon: FaFlask, title: 'Lab-Based Science', desc: 'Dedicated physics, chemistry, and biology labs for practical learning.' },
];

export default function Academics() {
  const [activeTab, setActiveTab] = useState('subjects');

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Academics</h1>
          <p>A rigorous, student-centred curriculum designed to build knowledge, skills, and love for learning.</p>
        </div>
      </div>

      {/* Classes */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaBook /> Classes</div>
            <h2>Classes Offered</h2>
            <p>We offer classes 6 through 10 following the AP State Board (SCERT) curriculum.</p>
            <div className="section-divider" />
          </div>
          <div className="classes-grid">
            {classes.map((c, i) => (
              <motion.div
                key={c.cls}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="class-card"
              >
                <div className="class-number">{c.cls.split(' ')[1]}</div>
                <div className="class-label">{c.cls}</div>
                <div className="class-meta">
                  <span>👥 {c.students} Students</span>
                  <span>📋 Sec: {c.sections}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs: Subjects / Approach / Calendar */}
      <section className="section acad-tabs-section">
        <div className="container">
          <div className="acad-tabs">
            {['subjects', 'approach', 'calendar'].map(t => (
              <button key={t} className={`acad-tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
                {t === 'subjects' ? '📚 Subjects' : t === 'approach' ? '💡 Teaching Approach' : '📅 Academic Calendar'}
              </button>
            ))}
          </div>

          {activeTab === 'subjects' && (
            <div className="grid-4" style={{ marginTop: '32px' }}>
              {subjects.map(s => (
                <motion.div key={s.name} whileHover={{ y: -4 }} className="subject-card">
                  <div className="subject-icon" style={{ background: s.color + '18', color: s.color }}><s.icon /></div>
                  <h4>{s.name}</h4>
                  <p>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'approach' && (
            <div className="grid-2" style={{ marginTop: '32px' }}>
              {approaches.map(a => (
                <div key={a.title} className="approach-card">
                  <div className="approach-icon"><a.icon /></div>
                  <div>
                    <h4>{a.title}</h4>
                    <p>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="calendar-grid" style={{ marginTop: '32px' }}>
              {calendar.map((m, i) => (
                <div key={m.month} className={`cal-month ${i < 4 ? 'cal-q1' : i < 8 ? 'cal-q2' : 'cal-q3'}`}>
                  <div className="cal-month-name"><FaCalendarAlt /> {m.month}</div>
                  <ul>
                    {m.events.map(e => <li key={e}>{e}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
