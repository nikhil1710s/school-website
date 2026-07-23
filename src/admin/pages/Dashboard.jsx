import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdPeople, MdEvent, MdAnnouncement, MdPhotoLibrary,
  MdEmojiEvents, MdDownload, MdArrowForward,
} from 'react-icons/md';
import StatCard from '../components/StatCard';
import * as facultyService      from '../../services/facultyService';
import * as eventsService       from '../../services/eventsService';
import * as noticesService      from '../../services/noticesService';
import * as galleryService      from '../../services/galleryService';
import * as achievementsService from '../../services/achievementsService';
import * as downloadsService    from '../../services/downloadsService';
import { useAuth } from '../context/AuthContext';

const QUICK_ACTIONS = [
  { label: 'Add Faculty',      to: '/admin/faculty',      icon: MdPeople,       color: '#2563eb' },
  { label: 'Add Event',        to: '/admin/events',       icon: MdEvent,        color: '#f59e0b' },
  { label: 'Add Notice',       to: '/admin/notices',      icon: MdAnnouncement, color: '#ef4444' },
  { label: 'Add Gallery Item', to: '/admin/gallery',      icon: MdPhotoLibrary, color: '#8b5cf6' },
  { label: 'Add Achievement',  to: '/admin/achievements', icon: MdEmojiEvents,  color: '#10b981' },
  { label: 'Add Download',     to: '/admin/downloads',    icon: MdDownload,     color: '#f97316' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    faculty: 0, events: 0, notices: 0,
    gallery: 0, achievements: 0, downloads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      facultyService.getAll(),
      eventsService.getAll(),
      noticesService.getAll(),
      galleryService.getAll(),
      achievementsService.getAll(),
      downloadsService.getAll(),
    ]).then(([faculty, events, notices, gallery, achievements, downloads]) => {
      setCounts({
        faculty:      faculty.length,
        events:       events.length,
        notices:      notices.length,
        gallery:      gallery.length,
        achievements: achievements.length,
        downloads:    downloads.length,
      });
    }).finally(() => setLoading(false));
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const STATS = [
    { icon: <MdPeople />,       label: 'Faculty Members', value: counts.faculty,      color: '#2563eb' },
    { icon: <MdEvent />,        label: 'Events',          value: counts.events,       color: '#f59e0b' },
    { icon: <MdAnnouncement />, label: 'Notices',         value: counts.notices,      color: '#ef4444' },
    { icon: <MdPhotoLibrary />, label: 'Gallery Items',   value: counts.gallery,      color: '#8b5cf6' },
    { icon: <MdEmojiEvents />,  label: 'Achievements',    value: counts.achievements, color: '#10b981' },
    { icon: <MdDownload />,     label: 'Downloads',       value: counts.downloads,    color: '#f97316' },
  ];

  return (
    <div className="admin-page">
      {/* Greeting */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {greeting()}, {user?.displayName?.split(' ')[0] || 'Admin'} 👋
          </h1>
          <p className="page-sub">Here's an overview of your school website content.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {STATS.map(s => (
          <StatCard
            key={s.label}
            icon={s.icon}
            label={s.label}
            value={loading ? '—' : s.value}
            color={s.color}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2 className="section-heading">Quick Actions</h2>
        <div className="quick-actions-grid">
          {QUICK_ACTIONS.map(qa => {
            const Icon = qa.icon;
            return (
              <Link key={qa.to} to={qa.to} className="quick-action-card">
                <div className="qa-icon" style={{ background: qa.color + '18', color: qa.color }}>
                  <Icon />
                </div>
                <span>{qa.label}</span>
                <MdArrowForward className="qa-arrow" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info banner */}
      <div className="dashboard-info-banner">
        <div className="info-banner-icon">🔥</div>
        <div>
          <strong>Firebase Integration Ready</strong>
          <p>All service files are prepared with Firebase-compatible function signatures. Connect your Firebase project to go live.</p>
        </div>
      </div>
    </div>
  );
}
