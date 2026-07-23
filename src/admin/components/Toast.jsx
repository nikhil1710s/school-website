import { useEffect, useState } from 'react';
import { MdCheckCircle, MdError, MdInfo, MdWarning, MdClose } from 'react-icons/md';

const ICONS = {
  success: MdCheckCircle,
  error:   MdError,
  info:    MdInfo,
  warning: MdWarning,
};

/**
 * Toast — lightweight notification component.
 *
 * Usage:
 *   import { useToast } from './Toast';
 *   const toast = useToast();
 *   toast.show('Saved!', 'success');
 *
 * Or import the ToastContainer at the root and call the singleton helper:
 *   showToast('Saved!', 'success');
 */

let _setToasts = null;

export function showToast(message, type = 'success', duration = 3500) {
  if (!_setToasts) return;
  const id = Date.now();
  _setToasts(prev => [...prev, { id, message, type }]);
  setTimeout(() => {
    _setToasts(prev => prev.filter(t => t.id !== id));
  }, duration);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  _setToasts = setToasts;

  const dismiss = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <div className="toast-container">
      {toasts.map(({ id, message, type }) => {
        const Icon = ICONS[type] || MdInfo;
        return (
          <div key={id} className={`toast toast-${type}`}>
            <Icon className="toast-icon" />
            <span className="toast-msg">{message}</span>
            <button className="toast-close" onClick={() => dismiss(id)}>
              <MdClose />
            </button>
          </div>
        );
      })}
    </div>
  );
}
