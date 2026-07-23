import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Faculty from './pages/Faculty';
import Facilities from './pages/Facilities';
import Gallery from './pages/Gallery';
import Notices from './pages/Notices';
import Achievements from './pages/Achievements';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';

// Admin Imports
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import AdminFaculty from './admin/pages/Faculty';
import AdminEvents from './admin/pages/Events';
import AdminNotices from './admin/pages/Notices';
import AdminGallery from './admin/pages/Gallery';
import AdminAchievements from './admin/pages/Achievements';
import AdminDownloads from './admin/pages/Downloads';
import AdminSchoolInfo from './admin/pages/SchoolInfo';
import AdminContactInfo from './admin/pages/ContactInfo';
import Profile from './admin/pages/Profile';
import ChangePassword from './admin/pages/ChangePassword';
import { ToastContainer } from './admin/components/Toast';

import './admin/admin.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <div style={{ padding: '120px 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', color: 'var(--primary)' }}>404</h2>
                <p style={{ color: 'var(--text-mid)', marginBottom: '24px' }}>Page not found</p>
                <a href="/school-website/" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                  Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/school-website">
      <AuthProvider>
        <ToastContainer />
        <Routes>
          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="faculty" element={<AdminFaculty />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="notices" element={<AdminNotices />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="achievements" element={<AdminAchievements />} />
            <Route path="downloads" element={<AdminDownloads />} />
            <Route path="school-info" element={<AdminSchoolInfo />} />
            <Route path="contact-info" element={<AdminContactInfo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          {/* Public Website Routes */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
