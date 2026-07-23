import { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import DataTable    from '../components/DataTable';
import Modal        from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import FormField    from '../components/FormField';
import { showToast } from '../components/Toast';
import * as service from '../../services/facultyService';

const EMPTY = {
  name: '', role: '', subject: '', qualifications: '', experience: '', email: '', avatar: '',
};

const COLUMNS = [
  { key: 'avatar',         label: 'Avatar' },
  { key: 'name',           label: 'Name' },
  { key: 'role',           label: 'Role' },
  { key: 'subject',        label: 'Subject' },
  { key: 'qualifications', label: 'Qualifications' },
  { key: 'experience',     label: 'Experience' },
  { key: 'email',          label: 'Email' },
];

export default function AdminFaculty() {
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
    try {
      const data = await service.getAll();
      setRows(data);
    } catch {
      showToast('Failed to load faculty.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModal(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
  const openDelete = (row) => { setTarget(row); setConfirm(true); };
  const closeModal = () => setModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await service.update(editId, form);
        showToast('Faculty member updated.', 'success');
      } else {
        await service.create(form);
        showToast('Faculty member added.', 'success');
      }
      closeModal();
      await load();
    } catch {
      showToast('Operation failed. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await service.remove(target.id);
      showToast('Faculty member deleted.', 'success');
      setConfirm(false);
      setTarget(null);
      await load();
    } catch {
      showToast('Delete failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Faculty</h1>
          <p className="page-sub">Manage school faculty and staff members.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <MdAdd /> Add Faculty
        </button>
      </div>

      <div className="admin-card">
        <DataTable
          columns={COLUMNS}
          rows={rows}
          loading={loading}
          onEdit={openEdit}
          onDelete={openDelete}
          emptyMsg="No faculty members found. Click 'Add Faculty' to get started."
        />
      </div>

      {/* Add / Edit Modal */}
      <Modal
        open={modal}
        onClose={closeModal}
        title={editId ? 'Edit Faculty Member' : 'Add Faculty Member'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row-2">
            <FormField label="Full Name"      name="name"           value={form.name}           onChange={handleChange} required placeholder="e.g. Sri. M. Subrahmanyam" />
            <FormField label="Role / Designation" name="role"       value={form.role}           onChange={handleChange} required placeholder="e.g. Senior Teacher" />
          </div>
          <div className="form-row-2">
            <FormField label="Subject"        name="subject"        value={form.subject}        onChange={handleChange} required placeholder="e.g. Mathematics" />
            <FormField label="Qualifications" name="qualifications" value={form.qualifications} onChange={handleChange} placeholder="e.g. M.Sc., B.Ed." />
          </div>
          <div className="form-row-2">
            <FormField label="Experience"     name="experience"     value={form.experience}     onChange={handleChange} placeholder="e.g. 15 years" />
            <FormField label="Avatar Initials" name="avatar"        value={form.avatar}         onChange={handleChange} placeholder="e.g. MS" hint="2 capital letters shown on faculty card." />
          </div>
          <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="teacher@zphs.edu" />
          <div className="modal-footer">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={closeModal} disabled={saving}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Saving…' : editId ? 'Update' : 'Add Faculty'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={handleDelete}
        loading={saving}
        message={`Delete "${target?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
