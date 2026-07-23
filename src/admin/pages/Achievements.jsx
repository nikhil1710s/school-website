import { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import DataTable     from '../components/DataTable';
import Modal         from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormField     from '../components/FormField';
import { showToast } from '../components/Toast';
import * as service  from '../../services/achievementsService';

const EMPTY = {
  type: 'student', name: '', achievement: '', award: '', year: '',
  category: 'academic', featured: false, description: '',
  subject: '', awardedBy: '', class: '',
};

const TYPES      = [{ value: 'student', label: 'Student' }, { value: 'teacher', label: 'Teacher' }, { value: 'school', label: 'School' }];
const CATEGORIES = [{ value: 'academic', label: 'Academic' }, { value: 'sports', label: 'Sports' }, { value: 'cultural', label: 'Cultural' }];

const COLUMNS = [
  { key: 'type',        label: 'Type',        render: v => <span className="admin-badge">{v}</span> },
  { key: 'name',        label: 'Name / Title' },
  { key: 'achievement', label: 'Achievement'  },
  { key: 'award',       label: 'Award'        },
  { key: 'year',        label: 'Year'         },
  { key: 'featured',    label: 'Featured',    render: v => v ? <span className="admin-badge badge-green">Yes</span> : '—' },
];

export default function AdminAchievements() {
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [target, setTarget]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setRows(await service.getAll()); }
    catch { showToast('Failed to load achievements.', 'error'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd    = () => { setForm(EMPTY); setEditId(null); setModal(true); };
  const openEdit   = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
  const openDelete = (row) => { setTarget(row); setConfirm(true); };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      editId ? await service.update(editId, form) : await service.create(form);
      showToast(editId ? 'Achievement updated.' : 'Achievement added.', 'success');
      setModal(false); await load();
    } catch { showToast('Operation failed.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await service.remove(target.id, target.type);
      showToast('Achievement deleted.', 'success');
      setConfirm(false); setTarget(null); await load();
    } catch { showToast('Delete failed.', 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Achievements</h1>
          <p className="page-sub">Manage student, teacher and school achievements.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <MdAdd /> Add Achievement
        </button>
      </div>

      <div className="admin-card">
        <DataTable columns={COLUMNS} rows={rows} loading={loading} onEdit={openEdit} onDelete={openDelete} emptyMsg="No achievements found." />
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Edit Achievement' : 'Add Achievement'} size="lg">
        <form onSubmit={handleSubmit} className="admin-form">
          <FormField label="Achievement Type" name="type" type="select" value={form.type} onChange={handleChange} options={TYPES} required />

          {form.type === 'student' && (
            <div className="form-row-2">
              <FormField label="Student Name" name="name"  value={form.name}  onChange={handleChange} required placeholder="e.g. K. Lakshmi Prasanna" />
              <FormField label="Class"        name="class" value={form.class} onChange={handleChange} placeholder="e.g. Class 10" />
            </div>
          )}
          {form.type === 'teacher' && (
            <div className="form-row-2">
              <FormField label="Teacher Name" name="name"    value={form.name}    onChange={handleChange} required />
              <FormField label="Subject"      name="subject" value={form.subject} onChange={handleChange} />
            </div>
          )}
          {form.type === 'school' && (
            <FormField label="Award / Achievement Title" name="achievement" value={form.achievement} onChange={handleChange} required />
          )}

          {form.type !== 'school' && (
            <FormField label="Achievement" name="achievement" value={form.achievement} onChange={handleChange} required placeholder="e.g. District Topper — SSC 2025" />
          )}

          <div className="form-row-3">
            <FormField label="Award / Prize" name="award" value={form.award || ''} onChange={handleChange} placeholder="e.g. Gold Medal" />
            <FormField label="Year"          name="year"  type="text" value={form.year}  onChange={handleChange} placeholder="e.g. 2025" />
            {form.type === 'student' && (
              <FormField label="Category" name="category" type="select" value={form.category} onChange={handleChange} options={CATEGORIES} />
            )}
            {form.type === 'school' && (
              <FormField label="Awarded By" name="awardedBy" value={form.awardedBy || ''} onChange={handleChange} placeholder="e.g. District Collector" />
            )}
          </div>

          <FormField label="Description" name="description" type="textarea" rows={3} value={form.description} onChange={handleChange} />
          <FormField label="Mark as Featured" name="featured" type="checkbox" value={form.featured} onChange={handleChange} />

          <div className="modal-footer">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setModal(false)} disabled={saving}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving…' : editId ? 'Update' : 'Add Achievement'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={confirm} onCancel={() => setConfirm(false)} onConfirm={handleDelete} loading={saving} message={`Delete this achievement?`} />
    </div>
  );
}
