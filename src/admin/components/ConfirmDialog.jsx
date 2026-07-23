import { MdWarning } from 'react-icons/md';

/**
 * ConfirmDialog — delete confirmation modal.
 *
 * Props:
 *   open     — boolean
 *   onCancel — () => void
 *   onConfirm — () => void
 *   title    — string
 *   message  — string
 *   loading  — boolean
 */
export default function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title   = 'Confirm Delete',
  message = 'Are you sure you want to delete this record? This action cannot be undone.',
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={!loading ? onCancel : undefined}>
      <div
        className="modal-box modal-sm confirm-dialog"
        onClick={e => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="confirm-icon">
          <MdWarning />
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-msg">{message}</p>
        <div className="confirm-actions">
          <button
            className="admin-btn admin-btn-ghost"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="admin-btn admin-btn-danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
