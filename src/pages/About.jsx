import { useState, useEffect } from 'react';
import { FaSchool, FaEye, FaBullseye, FaHistory, FaAward, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as schoolService from '../services/schoolService';
import { getImageUrl } from '../utils/imageUtils';
import './About.css';

const timeline = [
  { year: '1975', title: 'School Founded', desc: 'ZPHS Anandhapuram was established under the Zilla Parishad to provide quality education to the rural community.' },
  { year: '1985', title: 'Secondary Classes Added', desc: 'Classes 9 and 10 were introduced, enabling students to appear for SSC Board Examinations.' },
  { year: '1998', title: 'Science Laboratory', desc: 'A dedicated science laboratory was established to provide hands-on learning experiences.' },
  { year: '2008', title: 'Computer Education', desc: 'Computer lab setup under AP government\'s digital education initiative, connecting students to technology.' },
  { year: '2015', title: 'Smart Classrooms', desc: 'Classrooms upgraded with digital boards and e-learning resources through AP government funding.' },
  { year: '2025', title: 'District Best School', desc: 'Recognised as the Best Government School in Vizianagaram District for academic excellence and infrastructure.' },
];

export default function About() {
  const [schoolData, setSchoolData] = useState({
    fullName: 'Zilla Parishad High School, Anandhapuram',
    established: '1975',
    district: 'Vizianagaram',
    stats: { students: 650, teachers: 28, classrooms: 15, yearsOfExcellence: 51, passingPercentage: 98 },
    principal: { name: 'Sri. K. Venkateswara Rao', title: 'Headmaster', message: '', qualifications: 'M.A., B.Ed.', experience: '25+ years' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    schoolService.get()
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setSchoolData(prev => ({
            ...prev,
            ...data,
            stats: { ...prev.stats, ...data.stats },
            principal: { ...prev.principal, ...data.principal },
          }));
        }
      })
      .catch(err => console.error('Failed to load school info:', err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Learn about our school's history, values, and the vision that drives us forward.</p>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <div className="container">
          <div className="about-intro-grid">
            <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
              <div className="eyebrow" style={{ display:'inline-flex', marginBottom:'16px' }}><FaSchool /> Our School</div>
              <h2>Welcome to {schoolData.fullName}</h2>
              <p className="about-intro-text">
                Zilla Parishad High School, Anandhapuram has been a cornerstone of quality education in Vizianagaram District since {schoolData.established}.
                Located in the heart of Anandhapuram village, our school serves hundreds of students from surrounding villages and communities.
              </p>
              <p className="about-intro-text">
                We are committed to providing holistic education that goes beyond textbooks. Our dedicated team of {schoolData.stats.teachers} teachers
                work with passion to nurture every student's potential — academically, physically, and culturally. With government support and community
                participation, we continue to grow stronger every year.
              </p>
              <div className="about-stats-row">
                {[
                  { val: `${schoolData.stats.students}+`, label: 'Students Enrolled' },
                  { val: schoolData.stats.teachers, label: 'Qualified Teachers' },
                  { val: `${schoolData.stats.yearsOfExcellence}+`, label: 'Years of Service' },
                  { val: `${schoolData.stats.passingPercentage}%`, label: 'SSC Pass Rate' },
                ].map(s => (
                  <div key={s.label} className="about-stat">
                    <div className="about-stat-val">{s.val}</div>
                    <div className="about-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
              <img
                src={getImageUrl(schoolData.image || "images/gallery/school-building.jpeg")}
                alt="School building"
                className="about-img"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section vision-mission-section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaEye /> Our Purpose</div>
            <h2>Vision & Mission</h2>
            <div className="section-divider" />
          </div>
          <div className="grid-2">
            <div className="vm-card vision">
              <div className="vm-icon"><FaEye /></div>
              <h3>Our Vision</h3>
              <p>To be the leading government school in Andhra Pradesh that empowers every student with quality education, strong values, and the skills needed to thrive in the 21st century — regardless of their social or economic background.</p>
              <ul className="vm-list">
                <li>Universal access to quality education</li>
                <li>Inclusive and equitable learning environment</li>
                <li>Academic excellence and innovation</li>
                <li>Community-driven, government-supported growth</li>
              </ul>
            </div>
            <div className="vm-card mission">
              <div className="vm-icon mission-icon"><FaBullseye /></div>
              <h3>Our Mission</h3>
              <p>To provide holistic, value-based education that develops intelligent, responsible, and compassionate citizens — through dedicated teaching, modern facilities, and strong community partnerships.</p>
              <ul className="vm-list">
                <li>Deliver curriculum with innovative teaching methods</li>
                <li>Nurture physical, mental, and creative growth</li>
                <li>Build character through sports and cultural activities</li>
                <li>Maintain transparency and accountability to parents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaHistory /> Our Journey</div>
            <h2>School History & Milestones</h2>
            <p>Over five decades of shaping young minds in Anandhapuram.</p>
            <div className="section-divider" />
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.1 }}
                className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal Message */}
      <section className="section principal-section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaAward /> Leadership</div>
            <h2>Headmaster's Message</h2>
            <div className="section-divider" />
          </div>
          <div className="principal-card">
            <div className="principal-card-avatar">
              <div className="avatar-circle">
                {(schoolData.principal?.image || schoolData.principal?.photo) ? (
                  <img src={getImageUrl(schoolData.principal.image || schoolData.principal.photo)} alt={schoolData.principal?.name || 'Principal'} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  schoolData.principal?.name ? schoolData.principal.name[0] : 'P'
                )}
              </div>
              <h3>{schoolData.principal.name}</h3>
              <p>{schoolData.principal.title}</p>
              <div className="badge badge-primary">{schoolData.principal.qualifications}</div>
              <div style={{ marginTop:'8px' }} className="badge badge-accent">{schoolData.principal.experience}</div>
            </div>
            <div className="principal-card-message">
              <FaUsers className="quote-icon" />
              <p>{schoolData.principal.message}</p>
              <div className="principal-sign">
                <strong>{schoolData.principal.name}</strong>
                <span>{schoolData.principal.title}, {schoolData.fullName}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
