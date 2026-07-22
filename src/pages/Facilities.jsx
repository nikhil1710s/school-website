import { useState } from 'react';
import { FaSchool, FaBook, FaFlask, FaFutbol, FaBus, FaTint, FaDesktop, FaUtensils, FaToilet, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Facilities.css';

const facilities = [
  {
    id: 'classrooms',
    icon: FaSchool,
    color: '#2563eb',
    title: 'Classrooms',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80',
    desc: 'Our school has 15 well-ventilated, spacious classrooms equipped with ceiling fans, proper lighting, and comfortable benches for all students. Smart boards are installed in 8 classrooms for interactive digital learning.',
    features: ['15 Spacious Classrooms', 'Smart Boards in 8 Rooms', 'Proper Ventilation & Lighting', 'Comfortable Furniture', 'Blackboards & Displays'],
  },
  {
    id: 'library',
    icon: FaBook,
    color: '#f59e0b',
    title: 'Library',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&q=80',
    desc: 'Our school library houses over 3,000 books including textbooks, reference books, storybooks, encyclopedias, and newspapers. Students can use the library during free periods for reading and self-study.',
    features: ['3,000+ Books Collection', 'Daily Newspapers & Magazines', 'Reference & Story Books', 'Quiet Reading Space', 'Book Lending Facility'],
  },
  {
    id: 'labs',
    icon: FaFlask,
    color: '#10b981',
    title: 'Science Lab',
    image: 'https://images.unsplash.com/photo-1532094349884-543559c3661a?w=700&q=80',
    desc: 'A well-equipped science laboratory with dedicated sections for Physics, Chemistry, and Biology experiments. Students from Class 8 onwards conduct practical experiments as part of their curriculum.',
    features: ['Physics Experiments', 'Chemistry Lab Equipment', 'Biology Specimens & Models', 'Safety Equipment', 'Lab Assistants Available'],
  },
  {
    id: 'computer',
    icon: FaDesktop,
    color: '#8b5cf6',
    title: 'Computer Lab',
    image: 'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=700&q=80',
    desc: 'A modern computer laboratory with 25 computers and high-speed internet access, enabling students to learn basic computing, MS Office applications, and access educational online resources.',
    features: ['25 Computers', 'High-Speed Internet', 'MS Office & Basic Computing', 'Educational Software', 'Digital Learning Resources'],
  },
  {
    id: 'playground',
    icon: FaFutbol,
    color: '#ec4899',
    title: 'Playground',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&q=80',
    desc: 'A large open playground that supports cricket, kabaddi, kho-kho, volleyball, and athletics. The ground is maintained and used for daily PT sessions, sports competitions, and inter-house events.',
    features: ['Cricket Ground', 'Kabaddi & Kho-Kho Fields', 'Volleyball Court', 'Athletics Track', 'Daily PT Sessions'],
  },
  {
    id: 'transport',
    icon: FaBus,
    color: '#f97316',
    title: 'Transport',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=700&q=80',
    desc: 'School bus services connecting 8 nearby villages ensure safe, timely, and affordable transportation for students. The buses are maintained in good condition with trained drivers.',
    features: ['8 Village Routes Covered', '2 School Buses', 'Trained Drivers', 'Safe & Punctual', 'Affordable Charges'],
  },
  {
    id: 'water',
    icon: FaTint,
    color: '#06b6d4',
    title: 'Drinking Water',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=700&q=80',
    desc: 'Clean and safe drinking water is available 24/7 through RO purification systems installed at multiple locations across the campus. Water quality is tested periodically.',
    features: ['RO Purified Water', 'Multiple Dispensing Points', 'Regular Quality Testing', 'Adequate Supply', 'Hygienic Containers'],
  },
  {
    id: 'midday',
    icon: FaUtensils,
    color: '#84cc16',
    title: 'Mid-Day Meal',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80',
    desc: 'Nutritious mid-day meals are provided free to all students under the AP Government scheme. The meals are prepared hygienically in our dedicated kitchen by trained cooks.',
    features: ['Free Nutritious Meals', 'Government Scheme', 'Hygienic Kitchen', 'Trained Kitchen Staff', 'Weekly Balanced Menu'],
  },
];

export default function Facilities() {
  const [active, setActive] = useState(facilities[0]);

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Facilities</h1>
          <p>Modern, well-maintained facilities that create the best environment for learning and growth.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="facilities-layout">
            {/* Sidebar */}
            <div className="facilities-sidebar">
              {facilities.map(f => (
                <button
                  key={f.id}
                  className={`fac-nav-item${active.id === f.id ? ' active' : ''}`}
                  onClick={() => setActive(f)}
                  style={{ '--fac-color': f.color }}
                >
                  <div className="fac-nav-icon" style={{ background: f.color + '18', color: f.color }}><f.icon /></div>
                  <span>{f.title}</span>
                </button>
              ))}
            </div>

            {/* Detail */}
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="fac-detail"
            >
              <img src={active.image} alt={active.title} className="fac-img" />
              <div className="fac-detail-body">
                <div className="fac-detail-header">
                  <div className="fac-detail-icon" style={{ background: active.color + '18', color: active.color }}>
                    <active.icon />
                  </div>
                  <h2>{active.title}</h2>
                </div>
                <p className="fac-desc">{active.desc}</p>
                <div className="fac-features">
                  {active.features.map(feat => (
                    <div key={feat} className="fac-feature-item">
                      <span className="fac-check" style={{ color: active.color }}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#f0f7ff,#fff)' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaLeaf /> At a Glance</div>
            <h2>All Facilities</h2>
            <div className="section-divider" />
          </div>
          <div className="grid-4">
            {facilities.map((f, i) => (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="fac-overview-card"
                onClick={() => { setActive(f); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <div className="fac-ov-icon" style={{ background: f.color + '18', color: f.color }}><f.icon /></div>
                <span>{f.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
