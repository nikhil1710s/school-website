import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — wraps admin routes.
 * Redirects unauthenticated users to /admin/login.
 * TODO: When using Firebase Auth, the user object will be the Firebase User object.
 *       No changes needed here — just ensure AuthContext populates `user` correctly.
 */
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
