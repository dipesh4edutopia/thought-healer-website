import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import SubAdminAPI from '../../services/subAdminApi';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [userInfo, setUserInfo] = useState({
    email: 'admin@thoughthealer.com',
    role: 'Administrator'
  });
  const [permissions, setPermissions] = useState([]);
  const [isSubAdmin, setIsSubAdmin] = useState(false);

  useEffect(() => {
    // Get user information from localStorage
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    
    if (userEmail) {
      setUserInfo({
        email: userEmail,
        role: userRole === 'admin' ? 'Administrator' : userRole === 'sub_admin' ? 'Sub-Admin' : 'User'
      });
    }

    // Check if user is sub-admin and fetch permissions
    if (userRole === 'sub_admin') {
      setIsSubAdmin(true);
      fetchSubAdminPermissions();
    } else {
      setIsSubAdmin(false);
      setPermissions([]); // Admin has all permissions
    }

    // Handle window resize for responsive sidebar
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchSubAdminPermissions = async () => {
    try {
      const response = await SubAdminAPI.getProfile();
      if (response.success && response.data.permissions) {
        // Extract just the permission keys from the permission objects
        const permissionKeys = response.data.permissions
          .filter(p => p.is_enabled)
          .map(p => p.permission_key);
        setPermissions(permissionKeys);
        console.log('Sub-admin permissions loaded:', permissionKeys);
      }
    } catch (error) {
      console.error('Error fetching sub-admin permissions:', error);
    }
  };

  // Check if user has permission (admin always has all permissions)
  const hasPermission = (permission) => {
    if (!isSubAdmin) return true; // Admin has all permissions
    const hasAccess = permissions.includes(permission);
    console.log(`Permission check for ${permission}:`, hasAccess);
    return hasAccess;
  };

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

  // Menu items with their required permissions
  const allMenuItems = [
    {
      path: '/admin/users',
      icon: '👥',
      label: 'User Management',
      permission: 'users_view'
    },
    {
      path: '/admin/create-user',
      icon: '➕',
      label: 'Create User',
      permission: 'users_create'
    },
    {
      path: '/admin/coupons',
      icon: '🎟️',
      label: 'Coupon Management',
      permission: 'coupons_view'
    },
    {
      path: '/admin/marketing-coupons',
      icon: '📢',
      label: 'Marketing Coupons',
      permission: 'coupons_create'
    },
    {
      path: '/admin/psychologists',
      icon: '👨‍⚕️',
      label: 'Psychologists',
      permission: 'psychologists_view'
    },
    {
      path: '/admin/bookings',
      icon: '📅',
      label: 'Bookings',
      permission: 'bookings_view'
    },
    {
      path: '/admin/grant-subscription',
      icon: '💎',
      label: 'Grant Subscription',
      permission: 'subscriptions_grant'
    },
    {
      path: '/admin/2fa-setup',
      icon: '🔐',
      label: '2FA Security',
      permission: 'settings_manage_2fa'
    },
    {
      path: '/admin/sub-admins',
      icon: '👤',
      label: 'Sub-Admin Management',
      permission: 'subadmin_manage',
      adminOnly: true // Only main admin can access
    }
  ];

  // Filter menu items based on permissions
  const visibleMenuItems = allMenuItems.filter(item => {
    // Hide admin-only items for sub-admins
    if (item.adminOnly && isSubAdmin) return false;
    // Show all other items (will be disabled if no permission)
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              {/* Sidebar Toggle Button */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex-shrink-0"
                aria-label="Toggle Sidebar"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-white"
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
              
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">Admin Dashboard</h1>
                <p className="hidden sm:block text-xs sm:text-sm text-gray-600 dark:text-gray-300">ThoughtPro Management Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
              <div className="relative hidden sm:block">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg">
                  {userInfo.email.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-right hidden lg:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{userInfo.role}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-[150px]">{userInfo.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 sm:px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all flex items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
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
          } fixed lg:sticky top-[57px] sm:top-[73px] left-0 z-20 w-64 h-[calc(100vh-57px)] sm:h-[calc(100vh-73px)] bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <nav className="p-4 space-y-2">
            {visibleMenuItems.map((item, index) => {
              const isEnabled = hasPermission(item.permission);
              
              return (
                <React.Fragment key={item.path}>
                  {/* Add divider before settings section */}
                  {index > 0 && item.path === '/admin/grant-subscription' && (
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  )}
                  
                  {isEnabled ? (
                    <Link
                      to={item.path}
                      onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                        isActive(item.path)
                          ? 'bg-teal-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-not-allowed opacity-40 bg-gray-50 dark:bg-gray-800/50"
                      title="You don't have permission to access this"
                    >
                      <span className="text-xl grayscale">{item.icon}</span>
                      <span className="font-medium text-gray-500 dark:text-gray-600">{item.label}</span>
                      <span className="ml-auto text-xs">🔒</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          {/* Stats Overview */}
          {location.pathname === '/admin' && (
            <div className="p-3 sm:p-4 lg:p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {adminStats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-teal-600 dark:text-teal-400">{stat.label}</p>
                        <p className="text-xl sm:text-2xl font-bold text-teal-900 dark:text-teal-100">{stat.value}</p>
                      </div>
                      <div className="text-2xl sm:text-3xl opacity-80">{stat.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-3 sm:p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;