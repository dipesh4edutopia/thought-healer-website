import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TwoFactorVerification from '../components/TwoFactorVerification';
import { API_BASE_URL } from '../config/api';


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState('thoughtpro');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show2FA, setShow2FA] = useState(false);

  // Handle URL query parameters for product preselection
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productFromUrl = searchParams.get('product');
    if (productFromUrl && (productFromUrl === 'thoughtpro' || productFromUrl === 'miniminds' || productFromUrl === 'admin')) {
      setSelectedProduct(productFromUrl);
    }
  }, [location]);

  const products = {
    thoughtpro: {
      name: 'ThoughtPro',
      description: 'Professional mental health monitoring',
      icon: '🧠',
      color: 'from-purple-500 to-blue-600',
      bgColor: 'from-purple-50 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30',
      features: ['Self-monitor 16 vital parameters', 'Advanced interventions', 'Professional guidance'],
      redirectPath: '/thoughtpro-plans'
    },
    miniminds: {
      name: 'MiniMinds',
      description: 'Child mental health support',
      icon: '👶',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'from-blue-50 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30',
      features: ['Monitor 50+ mental health issues', 'Child-friendly interface', 'Parent dashboard'],
      redirectPath: '/miniminds-plans'
    },
    admin: {
      name: 'Admin Panel',
      description: 'Administrative dashboard',
      icon: '⚡',
      color: 'from-red-500 to-orange-600',
      bgColor: 'from-red-50 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30',
      features: ['User management', 'Analytics dashboard', 'System configuration'],
      redirectPath: '/admin'
    }
  };

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
      console.log(`🔄 ${products[selectedProduct].name} Login attempt:`, { 
        email: formData.email, 
        product: selectedProduct 
      });
      
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          product: selectedProduct,
          role: selectedProduct === 'thoughtpro' ? 'user' : selectedProduct === 'miniminds' ? 'parent' : selectedProduct === 'les' ? 'parent' : 'admin'
        }),
      });
      
      const result = await response.json();
      console.log('📥 Login response:', result);
      console.log('📥 Response structure:', JSON.stringify(result, null, 2));
      
      if (response.ok && result.success) {
        // Check if 2FA is required for admin login
        if (result.data?.requires2FA && selectedProduct === 'admin') {
          console.log('🔐 2FA required for admin login');
          setShow2FA(true);
          setLoading(false);
          return;
        }

        // Check token availability - prioritize 'token' field as per API response
        const token = result.data?.token || result.data?.accessToken || result.token || result.data?.access_token;
        const refreshToken = result.data?.refreshToken || result.data?.refresh_token || result.refreshToken;
        
        console.log('🔍 Token extraction:', { 
          dataToken: result.data?.token,
          accessToken: result.data?.accessToken, 
          extractedToken: token ? 'found' : 'missing'
        });
        
        if (!token) {
          console.error('❌ No token found in response');
          console.error('Available data keys:', Object.keys(result.data || {}));
          throw new Error('Login successful but no token received');
        }
        
        // Store auth data
        localStorage.setItem('authToken', token);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', result.data?.user?.username || formData.email.split('@')[0]);
        localStorage.setItem('userId', result.data?.user?.id || result.data?.user?.user_id);
        localStorage.setItem('userRole', selectedProduct === 'admin' ? 'admin' : result.data?.user?.role || 'user');
        localStorage.setItem('product', selectedProduct);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Store additional user info
        if (result.data?.user) {
          localStorage.setItem('userPlanType', result.data.user.plan_type || '');
          localStorage.setItem('userSubscriptionId', result.data.user.subscription_id || '');
        }
        
        // Verify token was stored
        const storedToken = localStorage.getItem('authToken');
        console.log('✅ Token stored:', storedToken ? 'success' : 'failed');
        console.log('✅ User data stored:', {
          email: localStorage.getItem('userEmail'),
          role: localStorage.getItem('userRole'),
          product: localStorage.getItem('product')
        });
        
        if (rememberMe) {
          localStorage.setItem('rememberEmail', formData.email);
          localStorage.setItem('rememberProduct', selectedProduct);
        }
        
        console.log(`✅ Login successful, redirecting to ${selectedProduct}`);
        
        // Navigate based on selected product
        navigate(products[selectedProduct].redirectPath);
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handle2FASuccess = (result) => {
    console.log('✅ 2FA verification successful');
    
    // Store auth data
    const token = result.data?.token;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', result.data?.user?.username || formData.email.split('@')[0]);
    localStorage.setItem('userId', result.data?.user?.id || 'admin-user');
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('product', 'admin');
    localStorage.setItem('isAuthenticated', 'true');
    
    if (rememberMe) {
      localStorage.setItem('rememberEmail', formData.email);
      localStorage.setItem('rememberProduct', 'admin');
    }
    
    setShow2FA(false);
    navigate('/admin');
  };

  const handle2FACancel = () => {
    setShow2FA(false);
    setLoading(false);
  };

  const currentProduct = products[selectedProduct];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentProduct.bgColor} flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-all duration-300`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${currentProduct.color} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-base sm:text-lg">{currentProduct.icon}</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">SyneptLabs</span>
          </div>
        </div>
        <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Choose your product and sign in to continue
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-10 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Product Selection */}
          <div className="mb-6">
            <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
              Select Product
            </label>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {Object.entries(products).map(([key, product]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedProduct(key)}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedProduct === key
                      ? `border-transparent bg-gradient-to-r ${product.color} text-white shadow-lg transform scale-105`
                      : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0">{product.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-base sm:text-lg mb-1 truncate">{product.name}</div>
                      <div className={`text-xs sm:text-sm mb-2 sm:mb-3 ${selectedProduct === key ? 'opacity-90' : 'opacity-70'}`}>
                        {product.description}
                      </div>
                      <div className="space-y-1">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className={`text-[10px] sm:text-xs flex items-start ${selectedProduct === key ? 'opacity-90' : 'opacity-60'}`}>
                            <span className="mr-2 flex-shrink-0">•</span>
                            <span className="break-words">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-3 sm:p-4">
                <div className="text-xs sm:text-sm text-red-700 dark:text-red-200">{error}</div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-xs sm:text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-gradient-to-r ${currentProduct.color} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  `Sign in to ${currentProduct.name}`
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  New to {currentProduct.name}?
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <Link
                to={selectedProduct === 'thoughtpro' ? '/thoughtpro-signup' : '/miniminds-signup'}
                className={`w-full flex justify-center py-2.5 sm:py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200`}
              >
                Create {currentProduct.name} account
              </Link>
            </div>

            <div className="mt-3 sm:mt-4 text-center">
              <Link to="/" className="text-xs sm:text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {show2FA && (
        <TwoFactorVerification
          email={formData.email}
          password={formData.password}
          onSuccess={handle2FASuccess}
          onCancel={handle2FACancel}
        />
      )}
    </div>
  );
};

export default Login;