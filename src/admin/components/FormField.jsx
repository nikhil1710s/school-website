/**
 * FormField — reusable labeled form control.
 *
 * Props:
 *   label       — string
 *   name        — string (html name attr)
 *   type        — 'text' | 'email' | 'number' | 'date' | 'time' | 'url' |
 *                 'textarea' | 'select' | 'checkbox'
 *   value       — controlled value
 *   onChange    — (e) => void
 *   options     — array of { value, label } — for type='select'
 *   required    — boolean
 *   placeholder — string
 *   rows        — number (for textarea)
 *   hint        — string (helper text below the field)
 *   error       — string (validation error)
 */
export default function FormField({
  label,
  name,
  type        = 'text',
  value,
  onChange,
  options     = [],
  required    = false,
  placeholder = '',
  rows        = 3,
  hint,
  error,
}) {
  const id = `field-${name}`;

  const sharedProps = {
    id,
    name,
    required,
    onChange,
    className: `admin-input${error ? ' input-error' : ''}`,
  };

  const renderControl = () => {
    if (type === 'textarea') {
      return (
        <textarea
          {...sharedProps}
          value={value ?? ''}
          placeholder={placeholder}
          rows={rows}
        />
      );
    }
    if (type === 'select') {
      return (
        <select {...sharedProps} value={value ?? ''}>
          <option value="">— Select —</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }
    if (type === 'checkbox') {
      return (
        <label className="admin-checkbox-label" htmlFor={id}>
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={!!value}
            onChange={onChange}
            className="admin-checkbox"
          />
          <span>{placeholder || label}</span>
        </label>
      );
    }
    return (
      <input
        {...sharedProps}
        type={type}
        value={value ?? ''}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div className="admin-form-group">
      {type !== 'checkbox' && (
        <label htmlFor={id} className="admin-label">
          {label}
          {required && <span className="admin-required">*</span>}
        </label>
      )}
      {renderControl()}
      {hint && !error && <span className="admin-hint">{hint}</span>}
      {error && <span className="admin-error">{error}</span>}
    </div>
  );
}
