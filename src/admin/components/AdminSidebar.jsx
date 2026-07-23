import { NavLink } from 'react-router-dom';
import {
  MdDashboard, MdPeople, MdEvent, MdAnnouncement,
  MdPhotoLibrary, MdEmojiEvents, MdDownload,
  MdSchool, MdContactPhone, MdChevronLeft, MdChevronRight,
} from 'react-icons/md';

const NAV_ITEMS = [
  { to: '/admin',              icon: MdDashboard,    label: 'Dashboard',     end: true },
  { to: '/admin/faculty',      icon: MdPeople,       label: 'Faculty' },
  { to: '/admin/events',       icon: MdEvent,        label: 'Events' },
  { to: '/admin/notices',      icon: MdAnnouncement, label: 'Notices' },
  { to: '/admin/gallery',      icon: MdPhotoLibrary, label: 'Gallery' },
  { to: '/admin/achievements', icon: MdEmojiEvents,  label: 'Achievements' },
  { to: '/admin/downloads',    icon: MdDownload,     label: 'Downloads' },
  { to: '/admin/school-info',  icon: MdSchool,       label: 'School Info' },
  { to: '/admin/contact-info', icon: MdContactPhone, label: 'Contact Info' },
];

export default function AdminSidebar({ open, onToggle }) {
  return (
    <aside className={`admin-sidebar${open ? '' : ' collapsed'}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <MdSchool />
        </div>
        {open && (
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">ZPHS</span>
            <span className="sidebar-brand-sub">Admin Panel</span>
          </div>
        )}
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {open ? <MdChevronLeft /> : <MdChevronRight />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {open && <span className="sidebar-section-label">Main Menu</span>}
        {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' active' : ''}`
            }
            title={!open ? label : undefined}
          >
            <Icon className="sidebar-link-icon" />
            {open && <span className="sidebar-link-label">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer hint */}
      {open && (
        <div className="sidebar-footer">
          <span>Firebase Ready</span>
        </div>
      )}
    </aside>
  );
}
