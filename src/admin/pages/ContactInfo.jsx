import { useState, useEffect } from 'react';
import FormField     from '../components/FormField';
import { showToast } from '../components/Toast';
import * as service  from '../../services/contactService';

export default function AdminContactInfo() {
  const [form, setForm]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    service.get()
      .then(data => setForm(data))
      .catch(() => showToast('Failed to load contact info.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, socialMedia: { ...f.socialMedia, [name]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      await service.update(form);
      showToast('Contact information updated!', 'success');
    } catch { showToast('Update failed.', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="admin-page"><div className="dt-loading"><div className="admin-spinner" /><span>Loading…</span></div></div>;

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Contact Information</h1>
          <p className="page-sub">Edit address, contact details and social media links.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form settings-form">

        {/* Address & Contact */}
        <div className="settings-section">
          <h2 className="settings-heading">Address &amp; Contact</h2>
          <div className="admin-card p-24">
            <FormField label="Full Address" name="address" type="textarea" rows={2} value={form.address} onChange={handleChange} required />
            <div className="form-row-2">
              <FormField label="Primary Phone"   name="phone"    value={form.phone}    onChange={handleChange} placeholder="+91 98765 43210" />
              <FormField label="Alternate Phone" name="altPhone" value={form.altPhone} onChange={handleChange} placeholder="+91 91234 56789" />
            </div>
            <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="zphs.school@gmail.com" />
          </div>
        </div>

        {/* Social Media */}
        <div className="settings-section">
          <h2 className="settings-heading">Social Media Links</h2>
          <div className="admin-card p-24">
            <div className="form-row-3">
              <FormField label="Facebook URL"  name="facebook"  value={form.socialMedia?.facebook  || ''} onChange={handleSocialChange} placeholder="https://facebook.com/…" />
              <FormField label="YouTube URL"   name="youtube"   value={form.socialMedia?.youtube   || ''} onChange={handleSocialChange} placeholder="https://youtube.com/…" />
              <FormField label="WhatsApp Link" name="whatsapp"  value={form.socialMedia?.whatsapp  || ''} onChange={handleSocialChange} placeholder="https://wa.me/…" />
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="settings-section">
          <h2 className="settings-heading">Google Maps Embed</h2>
          <div className="admin-card p-24">
            <FormField
              label="Embed URL"
              name="mapEmbed"
              type="textarea"
              rows={3}
              value={form.mapEmbed}
              onChange={handleChange}
              hint="Go to Google Maps → Share → Embed → copy the src URL from the iframe tag."
              placeholder="https://www.google.com/maps/embed?pb=…"
            />
            {form.mapEmbed && (
              <div className="map-preview">
                <iframe src={form.mapEmbed} width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" title="Map Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save Contact Information'}
          </button>
        </div>
      </form>
    </div>
  );
}
