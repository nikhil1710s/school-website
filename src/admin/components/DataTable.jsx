import { MdEdit, MdDelete } from 'react-icons/md';

/**
 * DataTable — reusable table for all CRUD pages.
 *
 * Props:
 *   columns  — array of { key, label, render? }
 *   rows     — array of data objects
 *   onEdit   — (row) => void
 *   onDelete — (row) => void
 *   loading  — boolean
 *   emptyMsg — string
 */
export default function DataTable({
  columns  = [],
  rows     = [],
  onEdit,
  onDelete,
  loading  = false,
  emptyMsg = 'No records found.',
}) {
  if (loading) {
    return (
      <div className="dt-loading">
        <div className="admin-spinner" />
        <span>Loading…</span>
      </div>
    );
  }

  return (
    <div className="dt-wrapper">
      <table className="dt-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th className="dt-actions-th">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="dt-empty">
                {emptyMsg}
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={row.id ?? idx}>
                {columns.map(col => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="dt-actions">
                    {onEdit && (
                      <button
                        className="dt-btn edit"
                        onClick={() => onEdit(row)}
                        title="Edit"
                      >
                        <MdEdit />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="dt-btn delete"
                        onClick={() => onDelete(row)}
                        title="Delete"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
