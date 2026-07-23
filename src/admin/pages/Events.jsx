import { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import DataTable     from '../components/DataTable';
import Modal         from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormField     from '../components/FormField';
import { showToast } from '../components/Toast';
import * as service  from '../../services/eventsService';

const EMPTY = {
  title: '', date: '', time: '', venue: '',
  category: 'academic', description: '', image: '', upcoming: true,
};

const CATEGORIES = [
  { value: 'academic',  label: 'Academic'  },
  { value: 'cultural',  label: 'Cultural'  },
  { value: 'sports',    label: 'Sports'    },
  { value: 'national',  label: 'National'  },
  { value: 'general',   label: 'General'   },
];

const COLUMNS = [
  { key: 'title',    label: 'Title' },
  { key: 'date',     label: 'Date',     render: v => v ? new Date(v).toLocaleDateString('en-IN') : '—' },
  { key: 'time',     label: 'Time' },
  { key: 'venue',    label: 'Venue' },
  { key: 'category', label: 'Category',  render: v => <span className="admin-badge">{v}</span> },
  { key: 'upcoming', label: 'Upcoming',  render: v => <span className={`admin-badge ${v ? 'badge-green' : 'badge-grey'}`}>{v ? 'Yes' : 'No'}</span> },
];

export default function AdminEvents() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [form,    setForm]    = useState(EMPTY);
  const [editId,  setEditId]  = useState(null);
  const [target,  setTarget]  = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setRows(await service.getAll()); }
    catch { showToast('Failed to load events.', 'error'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setForm(EMPTY); setEditId(null); setModal(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
  const openDelete = (row) => { setTarget(row); setConfirm(true); };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      editId ? await service.update(editId, form) : await service.create(form);
      showToast(editId ? 'Event updated.' : 'Event added.', 'success');
      setModal(false); await load();
    } catch { showToast('Operation failed.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await service.remove(target.id);
      showToast('Event deleted.', 'success');
      setConfirm(false); setTarget(null); await load();
    } catch { showToast('Delete failed.', 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Events</h1>
          <p className="page-sub">Manage school events and programs.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <MdAdd /> Add Event
        </button>
      </div>

      <div className="admin-card">
        <DataTable columns={COLUMNS} rows={rows} loading={loading} onEdit={openEdit} onDelete={openDelete} emptyMsg="No events found." />
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Edit Event' : 'Add Event'} size="lg">
        <form onSubmit={handleSubmit} className="admin-form">
          <FormField label="Event Title" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Annual Sports Day" />
          <div className="form-row-3">
            <FormField label="Date"  name="date"  type="date"  value={form.date}  onChange={handleChange} required />
            <FormField label="Time"  name="time"  type="text"  value={form.time}  onChange={handleChange} placeholder="e.g. 9:00 AM" />
            <FormField label="Category" name="category" type="select" value={form.category} onChange={handleChange} options={CATEGORIES} />
          </div>
          <FormField label="Venue" name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. School Playground" />
          <FormField label="Description" name="description" type="textarea" rows={3} value={form.description} onChange={handleChange} />
          <FormField label="Image URL" name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://…" hint="Paste a direct image URL." />
          <FormField label="Mark as Upcoming" name="upcoming" type="checkbox" value={form.upcoming} onChange={handleChange} />
          <div className="modal-footer">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setModal(false)} disabled={saving}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving…' : editId ? 'Update' : 'Add Event'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={confirm} onCancel={() => setConfirm(false)} onConfirm={handleDelete} loading={saving} message={`Delete "${target?.title}"?`} />
    </div>
  );
}
