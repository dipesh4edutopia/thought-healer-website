import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://thoughtprob2c.thoughthealer.org';

const ThoughtProSignin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' // Default to user
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Check for hardcoded admin login
      if (formData.role === 'admin' && formData.email === 'admin@example.com' && formData.password === 'admin1234') {
        // Admin login successful
        localStorage.setItem('authToken', 'admin-token-demo');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userId', 'admin-1');
        localStorage.setItem('userName', 'Admin User');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('isAuthenticated', 'true');
        
        // Navigate to admin dashboard
        navigate('/admin/users');
        return;
      }

      // Regular user login via API
      if (formData.role === 'user') {
        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Store auth token and user info in localStorage (persistent)
          localStorage.setItem('authToken', data.data.token);
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('userId', data.data.user.id);
          localStorage.setItem('userName', data.data.user.username || formData.email.split('@')[0]);
          localStorage.setItem('userRole', 'user');
          localStorage.setItem('isAuthenticated', 'true');
          
          // Check if there's a return URL (user was trying to access payment)
          const returnUrl = sessionStorage.getItem('returnUrl');
          const selectedPlan = sessionStorage.getItem('selectedPlan');
          
          if (returnUrl && selectedPlan) {
            sessionStorage.removeItem('returnUrl');
            navigate(returnUrl, { state: { plan: JSON.parse(selectedPlan) } });
          } else {
            // Navigate to plans page after successful login
            navigate('/thoughtpro-plans');
          }
        } else {
          throw new Error(data.message || 'Login failed');
        }
      } else {
        // Admin role but wrong credentials
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Error signing in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-dark-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-dark-200 dark:border-dark-700">
          <div className="flex-1 py-4 text-center text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 font-semibold border-b-2 border-primary-500">
            Sign In
          </div>
          <Link
            to="/thoughtpro-signup"
            className="flex-1 py-4 text-center text-dark-600 dark:text-dark-400 hover:bg-dark-50 dark:hover:bg-dark-700/50 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <div className="p-8">
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-dark-600 dark:text-dark-300 text-center mb-4">
            Sign in to your ThoughtPro account
          </p>
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login As Selection */}
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-3">
                Login As
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'user'})}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    formData.role === 'user'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-600 dark:text-dark-300 hover:border-primary-400'
                  }`}
                >
                  👤 User
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'admin'})}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    formData.role === 'admin'
                      ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400'
                      : 'border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-600 dark:text-dark-300 hover:border-secondary-400'
                  }`}
                >
                  🔐 Admin
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-700 border border-dark-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-dark-900 dark:text-white transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-700 border border-dark-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-dark-900 dark:text-white transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-500 border-dark-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-dark-600 dark:text-dark-400">Remember me</span>
              </label>
              <Link to="/thoughtpro-forgot-password" className="text-sm text-primary-500 dark:text-primary-400 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-dark-600 dark:text-dark-400">
            Don't have an account?{' '}
            <Link to="/thoughtpro-signup" className="text-primary-500 dark:text-primary-400 hover:underline font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtProSignin;
