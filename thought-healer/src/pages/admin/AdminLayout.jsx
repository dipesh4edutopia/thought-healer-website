import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    // Clear all local storage to remove credentials
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.clear();
    
    // Redirect to login
    navigate('/thoughtpro-signin', { replace: true });
  };

  const isActive = (path) => location.pathname === path;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 to-primary-50 dark:from-dark-900 dark:to-dark-800">
      {/* Header */}
      <header className="bg-white dark:bg-dark-800 shadow-lg border-b border-dark-200 dark:border-dark-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Sidebar Toggle Button */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg bg-dark-100 dark:bg-dark-700 hover:bg-dark-200 dark:hover:bg-dark-600 transition-all"
                aria-label="Toggle Sidebar"
              >
                <svg
                  className="w-6 h-6 text-dark-900 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {sidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-dark-600 dark:text-dark-300">ThoughtPro Management Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-dark-900 dark:text-white">Admin User</p>
                <p className="text-xs text-dark-600 dark:text-dark-300">admin@example.com</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all flex items-center gap-2"
              >
                <span>🚪</span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:sticky top-[88px] left-0 z-20 w-64 h-[calc(100vh-88px)] bg-white dark:bg-dark-800 shadow-lg border-r border-dark-200 dark:border-dark-700 transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <nav className="p-4 space-y-2">
            <Link
              to="/admin/users"
              onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                isActive('/admin/users')
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-dark-700 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700'
              }`}
            >
              <span className="text-xl">👥</span>
              <span className="font-medium">User Management</span>
            </Link>

            <Link
              to="/admin/coupons"
              onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                isActive('/admin/coupons')
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-dark-700 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700'
              }`}
            >
              <span className="text-xl">🎟️</span>
              <span className="font-medium">Coupon Management</span>
            </Link>

            <Link
              to="/admin/psychologists"
              onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                isActive('/admin/psychologists')
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-dark-700 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700'
              }`}
            >
              <span className="text-xl">👨‍⚕️</span>
              <span className="font-medium">Psychologists</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;