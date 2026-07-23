import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`admin-shell${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      <AdminSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} />
      <div className="admin-main">
        <AdminTopbar onMenuClick={() => setSidebarOpen(o => !o)} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
