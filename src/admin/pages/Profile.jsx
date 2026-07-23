import { useState } from 'react';
import FormField from '../components/FormField';
import { showToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'admin',
    avatar: user?.avatar || 'SA',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      showToast('Profile updated successfully!', 'success');
    } catch {
      showToast('Failed to update profile.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-sub">Manage your admin account details and preferences.</p>
        </div>
      </div>

      <div className="profile-container">
        <div className="admin-card profile-card-header p-24">
          <div className="profile-avatar-xl">{form.avatar || 'A'}</div>
          <div className="profile-info-header">
            <h2 className="profile-name">{user?.displayName || 'Admin'}</h2>
            <span className="admin-badge badge-blue">{user?.role || 'Administrator'}</span>
            <p className="profile-email-sub">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="admin-form settings-form" style={{ marginTop: '24px' }}>
          <div className="admin-card p-24">
            <h3 className="settings-heading" style={{ marginBottom: '20px' }}>Account Information</h3>
            <div className="form-row-2">
              <FormField
                label="Display Name"
                name="displayName"
                value={form.displayName}
                onChange={handleChange}
                required
                placeholder="e.g. School Admin"
              />
              <FormField
                label="Avatar Initials"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                placeholder="e.g. SA"
                hint="1-2 letters displayed in topbar and profile."
              />
            </div>
            <div className="form-row-2">
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="admin@school.com"
              />
              <FormField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="admin-info-box" style={{ marginTop: '16px' }}>
              <strong>🔒 Firebase Auth Note:</strong> Profile updates will automatically sync with Firebase Auth user profile (`updateProfile`) and Firestore user document when Firebase is connected.
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '20px' }}>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
