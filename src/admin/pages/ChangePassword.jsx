import { useState } from 'react';
import FormField from '../components/FormField';
import { showToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';

export default function ChangePassword() {
  const { changePassword } = useAuth();
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    setSaving(true);
    try {
      await changePassword(form.currentPassword, form.newPassword);
      showToast('Password changed successfully (mock placeholder)!', 'success');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showToast(err.message || 'Failed to change password.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Change Password</h1>
          <p className="page-sub">Update your account password for enhanced security.</p>
        </div>
      </div>

      <div className="profile-container">
        <form onSubmit={handleSubmit} className="admin-form settings-form">
          <div className="admin-card p-24">
            <h3 className="settings-heading" style={{ marginBottom: '20px' }}>Security Settings</h3>
            
            <FormField
              label="Current Password"
              name="currentPassword"
              type="password"
              value={form.currentPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
            <div className="form-row-2">
              <FormField
                label="New Password"
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                hint="Minimum 6 characters."
              />
              <FormField
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <div className="admin-info-box" style={{ marginTop: '16px' }}>
              <strong>🔑 Firebase Auth Note:</strong> This form will trigger `updatePassword(auth.currentUser, newPassword)` after re-authenticating with Firebase Auth.
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '20px' }}>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
