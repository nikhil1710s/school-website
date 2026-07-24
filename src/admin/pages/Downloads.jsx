import { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import DataTable     from '../components/DataTable';
import Modal         from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormField     from '../components/FormField';
import { showToast } from '../components/Toast';
import * as service  from '../../services/downloadsService';

const EMPTY = {
  title: '', description: '', fileUrl: '#', category: 'academic',
  date: '', fileSize: '', fileType: 'PDF',
};

const CATEGORIES = [
  { value: 'academic',    label: 'Academic'    },
  { value: 'admission',   label: 'Admission'   },
  { value: 'fee',         label: 'Fee'         },
  { value: 'exam',        label: 'Exam'        },
  { value: 'scholarship', label: 'Scholarship' },
  { value: 'report',      label: 'Report'      },
  { value: 'general',     label: 'General'     },
];

const FILE_TYPES = [
  { value: 'PDF',  label: 'PDF'  },
  { value: 'DOCX', label: 'DOCX' },
  { value: 'XLSX', label: 'XLSX' },
  { value: 'PPTX', label: 'PPTX' },
  { value: 'ZIP',  label: 'ZIP'  },
];

const COLUMNS = [
  { key: 'title',       label: 'Title'     },
  { key: 'category',    label: 'Category',  render: v => <span className="admin-badge">{v}</span> },
  { key: 'fileType',    label: 'Type',      render: v => <span className="admin-badge badge-blue">{v}</span> },
  { key: 'fileSize',    label: 'Size'      },
  { key: 'date',        label: 'Date',      render: v => v ? new Date(v).toLocaleDateString('en-IN') : '—' },
  { key: 'fileUrl',     label: 'File',      render: v => v && v !== '#' ? <a href={v} target="_blank" rel="noreferrer" className="dt-link">Open</a> : <span className="text-muted">—</span> },
];

export default function AdminDownloads() {
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
    catch { showToast('Failed to load downloads.', 'error'); }
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
      showToast(editId ? 'Download updated.' : 'Download added.', 'success');
      setModal(false); await load();
    } catch { showToast('Operation failed.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await service.remove(target.id);
      showToast('Download deleted.', 'success');
      setConfirm(false); setTarget(null); await load();
    } catch { showToast('Delete failed.', 'error'); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Downloads</h1>
          <p className="page-sub">Manage downloadable files visible to website visitors.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <MdAdd /> Add Download
        </button>
      </div>

      <div className="admin-card">
        <DataTable columns={COLUMNS} rows={rows} loading={loading} onEdit={openEdit} onDelete={openDelete} emptyMsg="No downloads found." />
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Edit Download' : 'Add Download'} size="lg">
        <form onSubmit={handleSubmit} className="admin-form">
          <FormField label="File Title" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Admission Form 2026-27" />
          <FormField label="Description" name="description" type="textarea" rows={2} value={form.description} onChange={handleChange} placeholder="Brief description of the file…" />

          <div className="form-row-3">
            <FormField label="Category"  name="category" type="select" value={form.category} onChange={handleChange} options={CATEGORIES} />
            <FormField label="File Type" name="fileType" type="select" value={form.fileType} onChange={handleChange} options={FILE_TYPES} />
            <FormField label="File Size" name="fileSize" value={form.fileSize} onChange={handleChange} placeholder="e.g. 1.2 MB" />
          </div>

          <div className="form-row-2">
            <FormField label="Upload Date" name="date" type="date" value={form.date} onChange={handleChange} />
            <FormField
              label="File Path / URL"
              name="fileUrl"
              value={form.fileUrl}
              onChange={handleChange}
              placeholder="e.g. downloads/admission-form.pdf or URL"
              hint="Enter local file path (e.g. downloads/...) or external URL."
            />
          </div>

          <div className="admin-info-box">
            <strong>📎 Local File / Path Note:</strong> Store static downloadable files in the project (e.g. inside public/downloads/) or paste an external download URL above.
          </div>

          <div className="modal-footer">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setModal(false)} disabled={saving}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving…' : editId ? 'Update' : 'Add Download'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={confirm} onCancel={() => setConfirm(false)} onConfirm={handleDelete} loading={saving} message={`Delete "${target?.title}"?`} />
    </div>
  );
}
