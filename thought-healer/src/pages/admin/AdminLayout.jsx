import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: 'admin@thoughthealer.com',
    role: 'Administrator'
  });

  useEffect(() => {
    // Get user information from localStorage
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    
    if (userEmail) {
      setUserInfo({
        email: userEmail,
        role: userRole === 'admin' ? 'Administrator' : 'User'
      });
    }
  }, []);

  const handleLogout = () => {
    // Clear all local storage to remove credentials
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('product');
    localStorage.clear();
    
    // Redirect to unified login
    navigate('/login', { replace: true });
  };

  const isActive = (path) => location.pathname === path;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const adminStats = [
    { label: 'Total Users', value: '1,234', icon: '👥' },
    { label: 'Active Coupons', value: '45', icon: '🎟️' },
    { label: 'Psychologists', value: '78', icon: '👨‍⚕️' },
  ];

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
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {userInfo.email.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-dark-900 dark:text-white">{userInfo.role}</p>
                <p className="text-xs text-dark-600 dark:text-dark-300">{userInfo.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline font-medium">Logout</span>
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
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
          }`}
        >
          {/* Stats Overview */}
          {location.pathname === '/admin' && (
            <div className="p-6 bg-white dark:bg-dark-800 border-b border-dark-200 dark:border-dark-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adminStats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-4 rounded-lg border border-primary-200 dark:border-primary-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-primary-900 dark:text-primary-100">{stat.value}</p>
                      </div>
                      <div className="text-3xl opacity-80">{stat.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;