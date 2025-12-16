import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-2xl font-display font-bold">
              <span className="text-primary-500 dark:text-primary-400">Synept</span>
              <span className="text-dark-900 dark:text-white">Labs</span>
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-dark-900 dark:text-white font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Home</a>
            <a href="#about" className="text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors">About Us</a>
            <a href="#team" className="text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Doctors</a>
            
            {/* Products Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                onBlur={() => setTimeout(() => setProductDropdownOpen(false), 200)}
                className="text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center"
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
                    onClick={() => setProductDropdownOpen(false)}
                  >
                    ThoughtPro
                  </Link>
                </div>
              )}
            </div>
            
            <a href="#contact" className="text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Contact</a>

            {/* Login Button */}
            <Link 
              to="/thoughtpro-signin"
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Login
            </Link>

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
          <div className="absolute top-full left-0 right-0 glass shadow-lg rounded-b-lg p-4 mt-0.5">
            <div className="flex flex-col space-y-4">
              <a 
                href="#" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark-900 dark:text-white font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Home
              </a>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                About Us
              </a>
              <a 
                href="#team" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Doctors
              </a>
              
              {/* Mobile Products Dropdown */}
              <div className="flex flex-col">
                <button 
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center justify-center gap-2"
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
                    <a 
                      href="thoughtpro.html" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-1"
                    >
                      ThoughtPro
                    </a>
                  </div>
                )}
              </div>
              
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Contact
              </a>

              <Link 
                to="/thoughtpro-signin"
                onClick={() => setMobileMenuOpen(false)}
                className="glow-button bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white px-6 py-2.5 rounded-full text-center transition-all"
              >
                <span className="relative z-10">Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
