import { FaFileAlt, FaCheckCircle, FaCalendarAlt, FaClipboardList, FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Admissions.css';

const steps = [
  { step: '01', title: 'Collect Application Form', desc: 'Visit the school office and collect the admission form free of charge. Forms also available for download below.' },
  { step: '02', title: 'Fill the Application', desc: 'Fill in student details, parent information, previous school details, and attach required documents.' },
  { step: '03', title: 'Submit Documents', desc: 'Submit the completed form along with all required documents to the school office before the deadline.' },
  { step: '04', title: 'Verification', desc: 'School staff will verify submitted documents. Parents may be called for a brief meeting if needed.' },
  { step: '05', title: 'Admission Confirmed', desc: 'Upon successful verification, admission is confirmed and the student can join from the scheduled date.' },
];

const documents = [
  'Birth Certificate (Original + Photocopy)',
  'Previous School Transfer Certificate (TC)',
  'Previous Year Mark Sheet / Progress Report',
  'Aadhaar Card of student (Photocopy)',
  'Aadhaar Card of parent/guardian (Photocopy)',
  'Caste Certificate (for SC/ST/BC categories)',
  '2 Recent Passport-Size Photographs',
  'Income Certificate (for scholarship eligibility)',
  'Residence Proof (Ration Card / Voter ID)',
];

const eligibility = [
  { class: 'Class 6', age: '10 – 12 years', prev: 'Passed Class 5 from any recognised school' },
  { class: 'Class 7', age: '11 – 13 years', prev: 'Passed Class 6 from any recognised school' },
  { class: 'Class 8', age: '12 – 14 years', prev: 'Passed Class 7 from any recognised school' },
  { class: 'Class 9', age: '13 – 15 years', prev: 'Passed Class 8 from any recognised school' },
  { class: 'Class 10', age: '14 – 16 years', prev: 'Passed Class 9 from any recognised school' },
];

const dates = [
  { event: 'Admission Forms Available', date: 'June 1, 2026' },
  { event: 'Last Date to Submit Forms', date: 'June 20, 2026' },
  { event: 'Document Verification', date: 'June 21 – 25, 2026' },
  { event: 'School Reopens / Classes Begin', date: 'June 11, 2026' },
  { event: 'Scholarship Applications Open', date: 'July 1, 2026' },
];

export default function Admissions() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Admissions</h1>
          <p>Join the ZPHS Anandhapuram family — quality government education, free for all.</p>
        </div>
      </div>

      {/* Notice Banner */}
      <section className="section-sm">
        <div className="container">
          <div className="admission-banner">
            <FaInfoCircle className="banner-icon" />
            <div>
              <strong>Admissions Open for 2026–27 Academic Year!</strong>
              <p>Admissions are now open for Classes 6 to 10. Education is completely free for all students. Contact the school office for any queries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaClipboardList /> How to Apply</div>
            <h2>Admission Process</h2>
            <p>Simple 5-step process — no donation, no fees.</p>
            <div className="section-divider" />
          </div>
          <div className="steps-container">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="step-item"
              >
                <div className="step-number">{s.step}</div>
                <div className="step-content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
                {i < steps.length - 1 && <FaArrowRight className="step-arrow" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility + Documents */}
      <section className="section" style={{ background: 'linear-gradient(180deg,#f0f7ff,#fff)' }}>
        <div className="container">
          <div className="grid-2">
            {/* Eligibility */}
            <div>
              <div className="eyebrow" style={{ display:'inline-flex', marginBottom:'16px' }}><FaCheckCircle /> Eligibility</div>
              <h2 style={{ marginBottom:'24px' }}>Eligibility Criteria</h2>
              <div className="eligibility-table">
                <div className="elig-head">
                  <span>Class</span><span>Age Range</span><span>Prerequisite</span>
                </div>
                {eligibility.map(e => (
                  <div key={e.class} className="elig-row">
                    <span className="elig-class">{e.class}</span>
                    <span>{e.age}</span>
                    <span>{e.prev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <div className="eyebrow" style={{ display:'inline-flex', marginBottom:'16px' }}><FaFileAlt /> Documents</div>
              <h2 style={{ marginBottom:'24px' }}>Required Documents</h2>
              <ul className="doc-list">
                {documents.map(d => (
                  <li key={d} className="doc-item">
                    <FaCheckCircle className="doc-check" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><FaCalendarAlt /> Dates</div>
            <h2>Important Dates — 2026–27</h2>
            <div className="section-divider" />
          </div>
          <div className="dates-grid">
            {dates.map((d, i) => (
              <div key={d.event} className="date-card">
                <div className="date-index">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="date-event">{d.event}</div>
                  <div className="date-val">{d.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
