import { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import DataTable     from '../components/DataTable';
import Modal         from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormField     from '../components/FormField';
import { showToast } from '../components/Toast';
import * as service  from '../../services/noticesService';

const EMPTY = {
  title: '', date: '', category: 'general', content: '', pinned: false, pdfUrl: '',
};

const CATEGORIES = [
  { value: 'general',     label: 'General'     },
  { value: 'exam',        label: 'Exam'        },
  { value: 'result',      label: 'Result'      },
  { value: 'meeting',     label: 'Meeting'     },
  { value: 'scholarship', label: 'Scholarship' },
  { value: 'event',       label: 'Event'       },
  { value: 'holiday',     label: 'Holiday'     },
];

const COLUMNS = [
  { key: 'title',    label: 'Title' },
  { key: 'date',     label: 'Date',     render: v => v ? new Date(v).toLocaleDateString('en-IN') : '—' },
  { key: 'category', label: 'Category', render: v => <span className="admin-badge">{v}</span> },
  { key: 'pinned',   label: 'Pinned',   render: v => v ? <span className="admin-badge badge-green">Pinned</span> : '—' },
  { key: 'pdfUrl',   label: 'PDF',      render: v => v ? <a href={v} target="_blank" rel="noreferrer" className="dt-link">View</a> : '—' },
];

export default function AdminNotices() {
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
    catch { showToast('Failed to load notices.', 'error'); }
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
      showToast(editId ? 'Notice updated.' : 'Notice added.', 'success');
      setModal(false); await load();
    } catch { showToast('Operation failed.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await service.remove(target.id);
      showToast('Notice deleted.', 'success');
      setConfirm(false); setTarget(null); await load();
    } catch { showToast('Delete failed.', 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notices</h1>
          <p className="page-sub">Manage school notices and announcements.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <MdAdd /> Add Notice
        </button>
      </div>

      <div className="admin-card">
        <DataTable columns={COLUMNS} rows={rows} loading={loading} onEdit={openEdit} onDelete={openDelete} emptyMsg="No notices found." />
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Edit Notice' : 'Add Notice'} size="lg">
        <form onSubmit={handleSubmit} className="admin-form">
          <FormField label="Notice Title" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Annual Examinations Schedule" />
          <div className="form-row-2">
            <FormField label="Date"     name="date"     type="date"   value={form.date}     onChange={handleChange} required />
            <FormField label="Category" name="category" type="select" value={form.category} onChange={handleChange} options={CATEGORIES} />
          </div>
          <FormField label="Content" name="content" type="textarea" rows={4} value={form.content} onChange={handleChange} required placeholder="Notice details…" />
          <FormField label="PDF Link (optional)" name="pdfUrl" type="url" value={form.pdfUrl || ''} onChange={handleChange} placeholder="https://…" hint="Link to a PDF attachment." />
          <FormField label="Pin this notice" name="pinned" type="checkbox" value={form.pinned} onChange={handleChange} />
          <div className="modal-footer">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setModal(false)} disabled={saving}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving…' : editId ? 'Update' : 'Add Notice'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={confirm} onCancel={() => setConfirm(false)} onConfirm={handleDelete} loading={saving} message={`Delete notice "${target?.title}"?`} />
    </div>
  );
}
