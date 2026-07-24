import { useState, useEffect } from 'react';
import FormField     from '../components/FormField';
import { showToast } from '../components/Toast';
import * as service  from '../../services/schoolService';
import { getImageUrl } from '../../utils/imageUtils';

export default function AdminSchoolInfo() {
  const [form, setForm]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    service.get()
      .then(data => setForm(data))
      .catch(() => showToast('Failed to load school info.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Support nested keys like "principal.name" via dot notation
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(f => ({ ...f, [parent]: { ...f[parent], [child]: value } }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, stats: { ...f.stats, [name]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      await service.update(form);
      showToast('School information updated!', 'success');
    } catch { showToast('Update failed.', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="admin-page"><div className="dt-loading"><div className="admin-spinner" /><span>Loading…</span></div></div>;

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">School Information</h1>
          <p className="page-sub">Edit the core school details displayed across the website.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form settings-form">

        {/* Basic Info */}
        <div className="settings-section">
          <h2 className="settings-heading">Basic Information</h2>
          <div className="admin-card p-24">
            <div className="form-row-2">
              <FormField label="Short Name"   name="name"      value={form.name}      onChange={handleChange} required placeholder="ZPHS, Anandhapuram" />
              <FormField label="Established"  name="established" value={form.established} onChange={handleChange} placeholder="1975" />
            </div>
            <FormField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Zilla Parishad High School, Anandhapuram" />
            <FormField label="Tagline"   name="tagline"  value={form.tagline}  onChange={handleChange} placeholder="Empowering Minds, Shaping Futures" />
            <div className="form-row-2">
              <FormField label="District" name="district" value={form.district} onChange={handleChange} />
              <FormField label="State"    name="state"    value={form.state}    onChange={handleChange} />
            </div>
            <FormField label="School / Campus Image Path" name="image" value={form.image || ''} onChange={handleChange} placeholder="images/gallery/school-building.jpeg" hint="Example: images/gallery/school-building.jpeg" />
            {form.image && (
              <div className="img-preview" style={{ marginBottom: '16px' }}>
                <img src={getImageUrl(form.image)} alt="Campus preview" />
              </div>
            )}
            <FormField label="Welcome Message" name="welcomeMessage" type="textarea" rows={3} value={form.welcomeMessage} onChange={handleChange} />
          </div>
        </div>

        {/* Principal */}
        <div className="settings-section">
          <h2 className="settings-heading">Principal / Headmaster Details</h2>
          <div className="admin-card p-24">
            <div className="form-row-2">
              <FormField label="Name"   name="principal.name"  value={form.principal?.name  || ''} onChange={handleChange} />
              <FormField label="Title"  name="principal.title" value={form.principal?.title || ''} onChange={handleChange} placeholder="e.g. Headmaster" />
            </div>
            <div className="form-row-2">
              <FormField label="Qualifications" name="principal.qualifications" value={form.principal?.qualifications || ''} onChange={handleChange} />
              <FormField label="Experience"     name="principal.experience"     value={form.principal?.experience     || ''} onChange={handleChange} />
            </div>
            <FormField label="Principal Photo Path" name="principal.image" value={form.principal?.image || form.principal?.photo || ''} onChange={handleChange} placeholder="images/faculty/principal.jpg" hint="Example: images/faculty/principal.jpg" />
            {(form.principal?.image || form.principal?.photo) && (
              <div className="img-preview" style={{ marginBottom: '16px' }}>
                <img src={getImageUrl(form.principal.image || form.principal.photo)} alt="Principal preview" />
              </div>
            )}
            <FormField label="Message" name="principal.message" type="textarea" rows={4} value={form.principal?.message || ''} onChange={handleChange} />
          </div>
        </div>

        {/* Stats */}
        <div className="settings-section">
          <h2 className="settings-heading">School Statistics</h2>
          <div className="admin-card p-24">
            <div className="form-row-3">
              <FormField label="Total Students"    name="students"          type="number" value={form.stats?.students          || ''} onChange={handleStatsChange} />
              <FormField label="Total Teachers"    name="teachers"          type="number" value={form.stats?.teachers          || ''} onChange={handleStatsChange} />
              <FormField label="Classrooms"        name="classrooms"        type="number" value={form.stats?.classrooms        || ''} onChange={handleStatsChange} />
            </div>
            <div className="form-row-2">
              <FormField label="Years of Excellence" name="yearsOfExcellence" type="number" value={form.stats?.yearsOfExcellence || ''} onChange={handleStatsChange} />
              <FormField label="Passing Percentage"  name="passingPercentage" type="number" value={form.stats?.passingPercentage || ''} onChange={handleStatsChange} />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save School Information'}
          </button>
        </div>
      </form>
    </div>
  );
}
