import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdMenu, MdPerson, MdSettings, MdLogout, MdOpenInNew } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

export default function AdminTopbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onMenuClick} aria-label="Toggle sidebar">
          <MdMenu />
        </button>
        <div className="topbar-breadcrumb">Admin Panel</div>
      </div>

      <div className="topbar-right">
        {/* View Site link */}
        <a
          href="/school-website/"
          target="_blank"
          rel="noreferrer"
          className="topbar-site-link"
        >
          <MdOpenInNew /> View Site
        </a>

        {/* User dropdown */}
        <div className="topbar-user" ref={dropRef}>
          <button
            className="topbar-avatar-btn"
            onClick={() => setDropOpen(o => !o)}
            aria-haspopup="true"
            aria-expanded={dropOpen}
          >
            <div className="topbar-avatar">{user?.avatar || 'A'}</div>
            <div className="topbar-user-info">
              <span className="topbar-name">{user?.displayName || 'Admin'}</span>
              <span className="topbar-role">Administrator</span>
            </div>
          </button>

          {dropOpen && (
            <div className="topbar-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-avatar">{user?.avatar || 'A'}</div>
                <div>
                  <div className="dropdown-name">{user?.displayName}</div>
                  <div className="dropdown-email">{user?.email}</div>
                </div>
              </div>
              <div className="dropdown-divider" />
              <Link
                to="/admin/profile"
                className="dropdown-item"
                onClick={() => setDropOpen(false)}
              >
                <MdPerson /> My Profile
              </Link>
              <Link
                to="/admin/change-password"
                className="dropdown-item"
                onClick={() => setDropOpen(false)}
              >
                <MdSettings /> Change Password
              </Link>
              <div className="dropdown-divider" />
              <button className="dropdown-item danger" onClick={handleLogout}>
                <MdLogout /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
