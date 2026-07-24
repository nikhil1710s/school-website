import { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import DataTable     from '../components/DataTable';
import Modal         from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormField     from '../components/FormField';
import { showToast } from '../components/Toast';
import * as service  from '../../services/galleryService';

const EMPTY = { title: '', caption: '', category: 'academic', image: '', date: '' };

const CATEGORIES = [
  { value: 'academic',    label: 'Academic'    },
  { value: 'sports',      label: 'Sports'      },
  { value: 'cultural',    label: 'Cultural'    },
  { value: 'national',    label: 'National'    },
  { value: 'environment', label: 'Environment' },
  { value: 'general',     label: 'General'     },
];

const COLUMNS = [
  { key: 'image',    label: 'Preview',  render: v => v ? <img src={getImageUrl(v)} alt="thumb" className="dt-thumb" /> : '—' },
  { key: 'title',    label: 'Title'    },
  { key: 'caption',  label: 'Caption'  },
  { key: 'category', label: 'Category', render: v => <span className="admin-badge">{v}</span> },
  { key: 'date',     label: 'Date',     render: v => v ? new Date(v).toLocaleDateString('en-IN') : '—' },
];

const getImageUrl = (path) => {
  if (!path) return "";

  // External URL
  if (path.startsWith("http")) return path;

  // Local image
  return `${import.meta.env.BASE_URL}${path}`;
};

export default function AdminGallery() {
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
    catch { showToast('Failed to load gallery.', 'error'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd    = () => { setForm(EMPTY); setEditId(null); setModal(true); };
  const openEdit   = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
  const openDelete = (row) => { setTarget(row); setConfirm(true); };

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      editId ? await service.update(editId, form) : await service.create(form);
      showToast(editId ? 'Gallery item updated.' : 'Image added.', 'success');
      setModal(false); await load();
    } catch { showToast('Operation failed.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await service.remove(target.id);
      showToast('Image deleted.', 'success');
      setConfirm(false); setTarget(null); await load();
    } catch { showToast('Delete failed.', 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Gallery</h1>
          <p className="page-sub">Manage school photo gallery.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <MdAdd /> Add Image
        </button>
      </div>

      <div className="admin-card">
        <DataTable columns={COLUMNS} rows={rows} loading={loading} onEdit={openEdit} onDelete={openDelete} emptyMsg="No gallery items found." />
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Edit Gallery Image' : 'Add Gallery Image'} size="md">
        <form onSubmit={handleSubmit} className="admin-form">
          <FormField label="Title"   name="title"   value={form.title}   onChange={handleChange} required placeholder="e.g. Annual Sports Day 2025" />
          <FormField label="Caption" name="caption" value={form.caption} onChange={handleChange} placeholder="Short description of the image" />
          <div className="form-row-2">
            <FormField label="Category" name="category" type="select" value={form.category} onChange={handleChange} options={CATEGORIES} />
            <FormField label="Date" name="date" type="date" value={form.date} onChange={handleChange} />
          </div>
          <FormField label="Image Path" name="image" type="text" value={form.image} onChange={handleChange} required placeholder="images/gallery/" hint="Example: images/gallery/school-building.jpeg" />
          {form.image && (
            <div className="img-preview">
              <img src={getImageUrl(form.image)} alt="preview" />
            </div>
          )}
          <div className="modal-footer">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setModal(false)} disabled={saving}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving…' : editId ? 'Update' : 'Add Image'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={confirm} onCancel={() => setConfirm(false)} onConfirm={handleDelete} loading={saving} message={`Delete "${target?.title}"?`} />
    </div>
  );
}
