import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProduct, setUserProduct] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      const storedUserName = localStorage.getItem('userName');
      const storedProduct = localStorage.getItem('product');
      const storedRole = localStorage.getItem('userRole');
      const authStatus = localStorage.getItem('isAuthenticated');
      
      setIsAuthenticated(authToken && authStatus === 'true');
      setUserName(storedUserName || '');
      setUserProduct(storedProduct || '');
      setUserRole(storedRole || '');
    };
    
    checkAuth();
    
    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('product');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('rememberEmail');
    localStorage.removeItem('rememberProduct');
    
    // Update state
    setIsAuthenticated(false);
    setUserName('');
    setUserProduct('');
    setUserRole('');
    setUserDropdownOpen(false);
    
    // Navigate to home
    navigate('/');
  };

  const getProductDisplayName = (product) => {
    const productNames = {
      thoughtpro: 'ThoughtPro',
      miniminds: 'MiniMinds',
      admin: 'Admin'
    };
    return productNames[product] || product;
  };

  const getUserDashboardPath = () => {
    const dashboardPaths = {
      thoughtpro: '/thoughtpro-plans',
      miniminds: '/miniminds-plans',
      admin: '/admin'
    };
    return dashboardPaths[userProduct] || '/';
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productDropdownOpen && !event.target.closest('.relative')) {
        setProductDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [productDropdownOpen]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-sm' : 'glass py-4 sm:py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-xl sm:text-2xl font-display font-bold">
              <span className="text-primary-500 dark:text-primary-400">Synept</span>
              <span className="text-dark-900 dark:text-white">Labs</span>
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a href="#" className="text-dark-900 dark:text-white font-medium text-sm lg:text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Home</a>
            <a href="#about" className="text-dark-600 dark:text-dark-300 font-medium text-sm lg:text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors">About Us</a>
            <a href="#team" className="text-dark-600 dark:text-dark-300 font-medium text-sm lg:text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Doctors</a>
            
            {/* Products Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                className="text-dark-600 dark:text-dark-300 font-medium text-sm lg:text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center"
              >
                Our Products
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform ${productDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
                </svg>
              </button>
              {productDropdownOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 py-2 z-50">
                  <Link 
                    to="/thoughtpro" 
                    className="block px-4 py-2 text-dark-600 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    onClick={() => {
                      setProductDropdownOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    ThoughtPro
                  </Link>
                  <Link 
                    to="/thoughtpro-b2b" 
                    className="block px-4 py-2 text-dark-600 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    onClick={() => {
                      setProductDropdownOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    ThoughtPro B2B
                  </Link>
                  <Link 
                    to="/miniminds" 
                    className="block px-4 py-2 text-dark-600 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    onClick={() => {
                      setProductDropdownOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    MiniMinds
                  </Link>
                  <Link 
                    to="/hermind" 
                    className="block px-4 py-2 text-dark-600 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                    onClick={() => {
                      setProductDropdownOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    HerMind
                  </Link>
                </div>
              )}
            </div>
            
            <a href="#contact" className="text-dark-600 dark:text-dark-300 font-medium text-sm lg:text-base hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Contact</a>

            {/* User Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                  className="flex items-center space-x-2 text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span>{userName}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                {userDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-700">
                      <p className="text-sm font-medium text-dark-900 dark:text-white">{userName}</p>
                      <p className="text-xs text-dark-500 dark:text-dark-400">{getProductDisplayName(userProduct)} User</p>
                    </div>
                    <Link 
                      to={getUserDashboardPath()}
                      className="block px-4 py-2 text-dark-600 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/subscription-management"
                      className="block px-4 py-2 text-dark-600 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Subscriptions
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="px-3 lg:px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm lg:text-base rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle" 
              aria-label="Toggle dark mode"
            >
              <span className="sr-only">Toggle dark mode</span>
            </button>
          </nav>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle" 
              aria-label="Toggle dark mode"
            >
              <span className="sr-only">Toggle dark mode</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-dark-900 dark:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-dark-800 shadow-lg rounded-b-lg p-4 sm:p-6 mt-0.5 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <a 
                href="#" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark-900 dark:text-white font-medium text-base sm:text-lg hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Home
              </a>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark-600 dark:text-dark-300 font-medium text-base sm:text-lg hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                About Us
              </a>
              <a 
                href="#team" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark-600 dark:text-dark-300 font-medium text-base sm:text-lg hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Doctors
              </a>
              
              {/* Mobile Products Dropdown */}
              <div className="flex flex-col">
                <button 
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="text-dark-600 dark:text-dark-300 font-medium text-base sm:text-lg hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center justify-center gap-2"
                >
                  Our Products
                  <svg 
                    className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                {mobileProductsOpen && (
                  <div className="flex flex-col pl-4 mt-2 space-y-2">
                    <Link 
                      to="/thoughtpro" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-1"
                    >
                      ThoughtPro
                    </Link>
                    <Link 
                      to="/thoughtpro-b2b" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-1"
                    >
                      ThoughtPro B2B
                    </Link>
                    <Link 
                      to="/miniminds" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-1"
                    >
                      MiniMinds
                    </Link>
                    <Link 
                      to="/hermind" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-dark-500 dark:text-dark-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors py-1"
                    >
                      HerMind
                    </Link>
                  </div>
                )}
              </div>
              
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark-600 dark:text-dark-300 font-medium text-base sm:text-lg hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Contact
              </a>

              {/* Mobile User Authentication */}
              {isAuthenticated ? (
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-dark-900 dark:text-white font-medium">{userName}</p>
                      <p className="text-xs text-dark-500 dark:text-dark-400">{getProductDisplayName(userProduct)} User</p>
                    </div>
                  </div>
                  <Link
                    to={getUserDashboardPath()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 mb-2 bg-gray-50 dark:bg-gray-700 text-dark-900 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/subscription-management"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 mb-2 bg-gray-50 dark:bg-gray-700 text-dark-900 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    Subscriptions
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="glow-button bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white px-6 py-2.5 rounded-full text-center transition-all"
                >
                  <span className="relative z-10">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
