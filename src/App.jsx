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
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path=""             element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/academics"    element={<Academics />} />
          <Route path="/admissions"   element={<Admissions />} />
          <Route path="/faculty"      element={<Faculty />} />
          <Route path="/facilities"   element={<Facilities />} />
          <Route path="/gallery"      element={<Gallery />} />
          <Route path="/notices"      element={<Notices />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="*" element={
            <div style={{ padding:'120px 0', textAlign:'center' }}>
              <h2 style={{ fontSize:'3rem', color:'var(--primary)' }}>404</h2>
              <p style={{ color:'var(--text-mid)', marginBottom:'24px' }}>Page not found</p>
              <a href="/" className="btn btn-primary" style={{ display:'inline-flex' }}>Go Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/school-website">
      <AppLayout />
    </BrowserRouter>
  );
}
